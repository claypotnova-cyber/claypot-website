/**
 * POST /api/spin
 *
 * Decides spin outcome atomically using Upstash Redis.
 * Redis atomic INCR prevents two concurrent spins from claiming the same prize slot.
 *
 * Required env vars (set in Vercel dashboard → Storage → Redis):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Request headers:
 *   x-session-token  — browser UUID stored in localStorage
 *
 * Response:
 *   { alreadySpun: true }
 *   { isWin: false, prizeKey, wheelIndex }
 *   { isWin: true, prizeKey, wheelIndex, prizeLabel, couponCode, issuedAt, expiresAt }
 */

import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import {
  DAILY_PRIZE_POOL,
  WIN_PROBABILITY,
  COUPON_VALIDITY_DAYS,
  PRIZE_LABELS,
  PRIZE_WHEEL_INDEX,
  type PrizeKey,
} from "@/lib/prizes";

export const runtime = "nodejs";

// ── Redis client ───────────────────────────────────────────────────────────────
const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ── Daily limits derived from DAILY_PRIZE_POOL ────────────────────────────────
// e.g. { NAAN: 2, LASSI: 1, MLASSI: 1, DESSERT: 2, "5OFF": 1, "10OFF": 2, BOGO: 1 }
const DAILY_LIMITS = DAILY_PRIZE_POOL.reduce<Record<string, number>>((acc, key) => {
  acc[key] = (acc[key] ?? 0) + 1;
  return acc;
}, {});

// ── Helpers ────────────────────────────────────────────────────────────────────

function getBusinessDay(): string {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

function generateCouponCode(prizeKey: string): string {
  const date = getBusinessDay().replace(/-/g, "");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `CLY-${prizeKey}-${date}-${rand}`;
}

// ── Route handler ──────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const sessionToken =
      request.headers.get("x-session-token")?.trim() || "anonymous";
    const day = getBusinessDay();

    // ── 1. Duplicate spin guard ──────────────────────────────────────────────
    const spinKey = `spin:done:${day}:${sessionToken}`;
    const alreadySpun = await redis.exists(spinKey);
    if (alreadySpun) {
      return NextResponse.json({ alreadySpun: true });
    }

    // ── 2. Derive remaining prize slots for today ────────────────────────────
    // Fetch current counts for all prize types in one pipeline
    const pipeline = redis.pipeline();
    const prizeKeys = Object.keys(DAILY_LIMITS);
    for (const key of prizeKeys) {
      pipeline.get(`spin:count:${day}:${key}`);
    }
    const counts = await pipeline.exec<(number | null)[]>();

    // Build the remaining pool (one entry per available slot)
    const remaining: string[] = [];
    prizeKeys.forEach((key, i) => {
      const issued = (counts[i] as number | null) ?? 0;
      const slots  = DAILY_LIMITS[key] - issued;
      for (let s = 0; s < slots; s++) remaining.push(key);
    });

    // ── 3. Decide outcome ────────────────────────────────────────────────────
    let resultKey: PrizeKey = "TRY_AGAIN";
    let couponCode: string | null = null;

    const shouldWin =
      remaining.length > 0 && Math.random() < WIN_PROBABILITY;

    if (shouldWin) {
      // Shuffle remaining so picks are random
      const shuffled = remaining.sort(() => Math.random() - 0.5);

      for (const pick of shuffled) {
        const countKey = `spin:count:${day}:${pick}`;

        // Atomic increment — safe against concurrent spins
        const newCount = await redis.incr(countKey);

        if (newCount <= DAILY_LIMITS[pick]) {
          // Slot successfully claimed
          resultKey  = pick as PrizeKey;
          couponCode = generateCouponCode(pick);

          const issuedAt  = new Date();
          const expiresAt = new Date(issuedAt);
          expiresAt.setDate(expiresAt.getDate() + COUPON_VALIDITY_DAYS);

          // Store coupon (keep for 90 days for staff lookup)
          await redis.set(
            `coupon:${couponCode}`,
            JSON.stringify({
              couponCode,
              prizeKey:   pick,
              prizeLabel: PRIZE_LABELS[pick as PrizeKey],
              issuedAt:   issuedAt.toISOString(),
              expiresAt:  expiresAt.toISOString(),
              status:     "pending",
              businessDay: day,
              sessionToken,
            }),
            { ex: 60 * 60 * 24 * 90 }
          );

          break;
        } else {
          // Race condition — another spin claimed this slot first; undo and try next
          await redis.decr(countKey);
        }
      }
    }

    // ── 4. Record this spin (25 h TTL covers timezone edge cases) ────────────
    await redis.set(spinKey, "1", { ex: 60 * 60 * 25 });

    // ── 5. Respond ───────────────────────────────────────────────────────────
    const isWin = resultKey !== "TRY_AGAIN";

    if (!isWin) {
      return NextResponse.json({
        isWin:      false,
        prizeKey:   resultKey,
        wheelIndex: PRIZE_WHEEL_INDEX[resultKey],
      });
    }

    const issuedAt  = new Date();
    const expiresAt = new Date(issuedAt);
    expiresAt.setDate(expiresAt.getDate() + COUPON_VALIDITY_DAYS);

    return NextResponse.json({
      isWin:      true,
      prizeKey:   resultKey,
      wheelIndex: PRIZE_WHEEL_INDEX[resultKey as PrizeKey],
      prizeLabel: PRIZE_LABELS[resultKey as PrizeKey],
      couponCode,
      issuedAt:   issuedAt.toISOString(),
      expiresAt:  expiresAt.toISOString(),
    });
  } catch (err) {
    console.error("[spin] error:", err);
    return NextResponse.json(
      { error: "Spin failed. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/spin
 *
 * Decides spin outcome using Redis (ioredis + REDIS_URL from Vercel).
 * Atomic INCR prevents concurrent spins from claiming the same prize slot.
 *
 * Required env var (auto-added by Vercel Redis integration):
 *   REDIS_URL  — e.g. rediss://default:TOKEN@host.upstash.io:6379
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
import Redis from "ioredis";
import {
  DAILY_PRIZE_POOL,
  WIN_PROBABILITY,
  COUPON_VALIDITY_DAYS,
  PRIZE_LABELS,
  PRIZE_WHEEL_INDEX,
  type PrizeKey,
} from "@/lib/prizes";

export const runtime = "nodejs";

// ── Redis singleton ────────────────────────────────────────────────────────────
// Module-level client is reused across warm Lambda invocations
let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis(process.env.REDIS_URL!, {
      tls: process.env.REDIS_URL?.startsWith("rediss://")
        ? { rejectUnauthorized: false }
        : undefined,
      maxRetriesPerRequest: 3,
      enableReadyCheck: false,
      lazyConnect: true,
    });
  }
  return _redis;
}

// ── Daily limits derived from DAILY_PRIZE_POOL ────────────────────────────────
// e.g. { NAAN: 2, LASSI: 1, MLASSI: 1, DESSERT: 2, "5OFF": 1, "10OFF": 2, BOGO: 1 }
const DAILY_LIMITS = DAILY_PRIZE_POOL.reduce<Record<string, number>>(
  (acc, key) => { acc[key] = (acc[key] ?? 0) + 1; return acc; },
  {}
);

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
    const redis = getRedis();
    const sessionToken =
      request.headers.get("x-session-token")?.trim() || "anonymous";
    const day = getBusinessDay();

    // ── 1. Duplicate spin guard ──────────────────────────────────────────────
    const spinKey = `spin:done:${day}:${sessionToken}`;
    const alreadySpun = await redis.exists(spinKey);
    if (alreadySpun) {
      return NextResponse.json({ alreadySpun: true });
    }

    // ── 2. Derive remaining prize slots via pipeline ─────────────────────────
    const prizeKeys = Object.keys(DAILY_LIMITS);
    const pipeline = redis.pipeline();
    for (const key of prizeKeys) {
      pipeline.get(`spin:count:${day}:${key}`);
    }
    const results = await pipeline.exec();

    const remaining: string[] = [];
    prizeKeys.forEach((key, i) => {
      const issued = parseInt((results?.[i]?.[1] as string) ?? "0", 10) || 0;
      const slots  = DAILY_LIMITS[key] - issued;
      for (let s = 0; s < slots; s++) remaining.push(key);
    });

    // ── 3. Decide outcome ────────────────────────────────────────────────────
    let resultKey: PrizeKey = "TRY_AGAIN";
    let couponCode: string | null = null;

    const shouldWin =
      remaining.length > 0 && Math.random() < WIN_PROBABILITY;

    if (shouldWin) {
      const shuffled = [...remaining].sort(() => Math.random() - 0.5);

      for (const pick of shuffled) {
        const countKey = `spin:count:${day}:${pick}`;

        // Atomic increment — safe against concurrent spins
        const newCount = await redis.incr(countKey);

        if (newCount <= DAILY_LIMITS[pick]) {
          // Set expiry on first increment (keeps Redis clean)
          if (newCount === 1) {
            await redis.expire(countKey, 60 * 60 * 26); // 26 h
          }

          resultKey  = pick as PrizeKey;
          couponCode = generateCouponCode(pick);

          const issuedAt  = new Date();
          const expiresAt = new Date(issuedAt);
          expiresAt.setDate(expiresAt.getDate() + COUPON_VALIDITY_DAYS);

          // Store coupon for 90 days (staff lookup)
          await redis.set(
            `coupon:${couponCode}`,
            JSON.stringify({
              couponCode,
              prizeKey:    pick,
              prizeLabel:  PRIZE_LABELS[pick as PrizeKey],
              issuedAt:    issuedAt.toISOString(),
              expiresAt:   expiresAt.toISOString(),
              status:      "pending",
              businessDay: day,
              sessionToken,
            }),
            "EX",
            60 * 60 * 24 * 90
          );

          break;
        } else {
          // Race condition — undo and try next prize
          await redis.decr(countKey);
        }
      }
    }

    // ── 4. Record spin (25 h TTL) ────────────────────────────────────────────
    await redis.set(spinKey, "1", "EX", 60 * 60 * 25);

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

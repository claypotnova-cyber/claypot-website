/**
 * POST /api/spin
 *
 * Decides spin outcome securely on the server:
 * - Order value <= $50 -> Eligible for $5 OFF ("5OFF")
 * - Order value > $50  -> Eligible for $10 OFF ("10OFF")
 * - Server-side Daily Discount Limit: Maximum cumulative total of $100 per calendar day.
 * - Atomic Redis INCRBY/Lua evaluation prevents race conditions and over-allocation.
 * - Duplicate spin guard per session/day prevents re-spinning.
 */

import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";
import {
  WIN_PROBABILITY,
  COUPON_VALIDITY_DAYS,
  DAILY_MAX_DISCOUNT_AMOUNT,
  CART_THRESHOLD_AMOUNT,
  PRIZE_LABELS,
  PRIZE_WHEEL_INDEX,
  PRIZE_DISCOUNT_VALUES,
  type PrizeKey,
} from "@/lib/prizes";

export const runtime = "nodejs";

// ── Redis singleton ────────────────────────────────────────────────────────────
let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  if (!_redis) {
    _redis = new Redis(process.env.REDIS_URL, {
      tls: process.env.REDIS_URL.startsWith("rediss://")
        ? { rejectUnauthorized: false }
        : undefined,
      maxRetriesPerRequest: 3,
      enableReadyCheck: false,
      lazyConnect: true,
    });
  }
  return _redis;
}

// ── Local Dev Memory Fallback (when REDIS_URL is not set) ──────────────────────
const inMemorySpun = new Set<string>();
const inMemoryDailyTotals: Record<string, number> = {};

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

// Lua script for atomic daily total reservation:
// Returns new total if sum <= limit, or -1 if limit would be exceeded.
const RESERVE_DISCOUNT_LUA = `
  local key = KEYS[1]
  local amount = tonumber(ARGV[1])
  local limit = tonumber(ARGV[2])
  local current = tonumber(redis.call('get', key) or "0")
  if (current + amount) <= limit then
    local new_val = redis.call('incrby', key, amount)
    if new_val == amount then
      redis.call('expire', key, 93600)
    end
    return new_val
  else
    return -1
  end
`;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const redis = getRedis();
    const day = getBusinessDay();
    const sessionToken =
      request.headers.get("x-session-token")?.trim() || "anonymous";
    const spinKey = `spin:done:${day}:${sessionToken}`;

    // Parse cart amount from request body
    const body = await request.json().catch(() => ({}));
    const rawCart = parseFloat(body.cartAmount);
    const cartAmount = isNaN(rawCart) || rawCart < 0 ? 0 : rawCart;

    // ── 0. Handle Redis-less environments (Local Dev Fallback) ─────────────────
    if (!redis) {
      console.warn("[spin] REDIS_URL not found. Using local in-memory fallback.");
      if (inMemorySpun.has(spinKey)) {
        return NextResponse.json({ alreadySpun: true });
      }

      const shouldWin = Math.random() < WIN_PROBABILITY;
      inMemorySpun.add(spinKey);

      if (!shouldWin) {
        return NextResponse.json({
          isWin: false,
          prizeKey: "TRY_AGAIN",
          wheelIndex: PRIZE_WHEEL_INDEX["TRY_AGAIN"],
        });
      }

      // Check cart tier candidate
      const targetDiscount = cartAmount > CART_THRESHOLD_AMOUNT ? 10 : 5;
      const currentTotal = inMemoryDailyTotals[day] ?? 0;

      let awardedKey: PrizeKey | null = null;
      let awardedDiscount = 0;

      if (currentTotal + targetDiscount <= DAILY_MAX_DISCOUNT_AMOUNT) {
        awardedDiscount = targetDiscount;
        awardedKey = targetDiscount === 10 ? "10OFF" : "5OFF";
      } else if (targetDiscount === 10 && currentTotal + 5 <= DAILY_MAX_DISCOUNT_AMOUNT) {
        // Fallback to $5 OFF if $10 exceeds limit but $5 fits
        awardedDiscount = 5;
        awardedKey = "5OFF";
      }

      if (!awardedKey || awardedDiscount <= 0) {
        return NextResponse.json({
          isWin: false,
          prizeKey: "TRY_AGAIN",
          wheelIndex: PRIZE_WHEEL_INDEX["TRY_AGAIN"],
        });
      }

      inMemoryDailyTotals[day] = currentTotal + awardedDiscount;
      const couponCode = generateCouponCode(awardedKey);
      const issuedAt = new Date();
      const expiresAt = new Date(issuedAt);
      expiresAt.setDate(expiresAt.getDate() + COUPON_VALIDITY_DAYS);

      return NextResponse.json({
        isWin: true,
        prizeKey: awardedKey,
        wheelIndex: PRIZE_WHEEL_INDEX[awardedKey],
        prizeLabel: PRIZE_LABELS[awardedKey],
        couponCode,
        issuedAt: issuedAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        discountAmount: awardedDiscount,
      });
    }

    // ── 1. Duplicate spin guard ────────────────────────────────────────────────
    const alreadySpun = await redis.exists(spinKey);
    if (alreadySpun) {
      return NextResponse.json({ alreadySpun: true });
    }

    // ── 2. Decide spin win/lose probability ────────────────────────────────────
    const shouldWin = Math.random() < WIN_PROBABILITY;

    if (!shouldWin) {
      await redis.set(spinKey, "1", "EX", 60 * 60 * 25);
      return NextResponse.json({
        isWin: false,
        prizeKey: "TRY_AGAIN",
        wheelIndex: PRIZE_WHEEL_INDEX["TRY_AGAIN"],
      });
    }

    // ── 3. Candidate prize evaluation based on cart value & daily limit ────────
    const preferredDiscount = cartAmount > CART_THRESHOLD_AMOUNT ? 10 : 5;
    const candidates: { key: PrizeKey; amount: number }[] =
      preferredDiscount === 10
        ? [
            { key: "10OFF", amount: 10 },
            { key: "5OFF", amount: 5 },
          ]
        : [{ key: "5OFF", amount: 5 }];

    let winningKey: PrizeKey = "TRY_AGAIN";
    let winningDiscount = 0;

    const dailyLimitKey = `spin:daily_total_discount:${day}`;

    for (const cand of candidates) {
      const res = await redis.eval(
        RESERVE_DISCOUNT_LUA,
        1,
        dailyLimitKey,
        cand.amount,
        DAILY_MAX_DISCOUNT_AMOUNT
      );

      const newTotal = typeof res === "number" ? res : parseInt(String(res), 10);
      if (newTotal >= 0) {
        winningKey = cand.key;
        winningDiscount = cand.amount;
        break;
      }
    }

    // Record that spin was executed today
    await redis.set(spinKey, "1", "EX", 60 * 60 * 25);

    if (winningKey === "TRY_AGAIN" || winningDiscount <= 0) {
      return NextResponse.json({
        isWin: false,
        prizeKey: "TRY_AGAIN",
        wheelIndex: PRIZE_WHEEL_INDEX["TRY_AGAIN"],
      });
    }

    // ── 4. Generate & Store Coupon Metadata ─────────────────────────────────────
    const couponCode = generateCouponCode(winningKey);
    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt);
    expiresAt.setDate(expiresAt.getDate() + COUPON_VALIDITY_DAYS);

    await redis.set(
      `coupon:${couponCode}`,
      JSON.stringify({
        couponCode,
        prizeKey: winningKey,
        prizeLabel: PRIZE_LABELS[winningKey],
        discountAmount: winningDiscount,
        cartAmount,
        issuedAt: issuedAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        status: "pending",
        businessDay: day,
        sessionToken,
      }),
      "EX",
      60 * 60 * 24 * 90 // 90 days TTL
    );

    return NextResponse.json({
      isWin: true,
      prizeKey: winningKey,
      wheelIndex: PRIZE_WHEEL_INDEX[winningKey],
      prizeLabel: PRIZE_LABELS[winningKey],
      couponCode,
      issuedAt: issuedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      discountAmount: winningDiscount,
    });
  } catch (err) {
    console.error("[spin] error:", err);
    return NextResponse.json(
      { error: "Spin failed. Please try again." },
      { status: 500 }
    );
  }
}

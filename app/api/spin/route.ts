/**
 * POST /api/spin
 *
 * Atomically decides the spin outcome and issues a coupon when the player wins.
 * All DB writes happen inside a single SQLite transaction to prevent race conditions.
 *
 * Request headers:
 *   x-session-token  — browser-generated UUID (stored in localStorage)
 *
 * Response JSON:
 *   { alreadySpun: true }                       — session already spun today
 *   { isWin: false, prizeKey, wheelIndex }       — try again
 *   { isWin: true, prizeKey, wheelIndex,
 *     prizeLabel, couponCode, issuedAt, expiresAt } — winner
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  DAILY_PRIZE_POOL,
  WIN_PROBABILITY,
  COUPON_VALIDITY_DAYS,
  PRIZE_LABELS,
  PRIZE_WHEEL_INDEX,
  type PrizeKey,
} from "@/lib/prizes";

// Force Node.js runtime so better-sqlite3 native bindings work
export const runtime = "nodejs";

// ── Helpers ────────────────────────────────────────────────────────────────────

function getBusinessDay(): string {
  // YYYY-MM-DD in the server's local time
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
    const businessDay = getBusinessDay();
    const db = getDb();

    // Wrap everything in a transaction — prevents two concurrent winners
    // from consuming the same prize slot
    const spinTx = db.transaction(() => {
      // ── 1. Check for duplicate spin ──────────────────────────────────────
      const existingSpin = db
        .prepare(
          "SELECT id FROM daily_spins WHERE business_day = ? AND session_token = ?"
        )
        .get(businessDay, sessionToken);

      if (existingSpin) {
        return { alreadySpun: true } as const;
      }

      // ── 2. Derive remaining prize pool for today ─────────────────────────
      // Count how many of each prize have already been issued today
      const issuedRows = db
        .prepare(
          "SELECT prize_key FROM coupons WHERE business_day = ? AND prize_key != 'TRY_AGAIN'"
        )
        .all(businessDay) as { prize_key: string }[];

      const remaining = [...DAILY_PRIZE_POOL] as string[];
      for (const { prize_key } of issuedRows) {
        const idx = remaining.indexOf(prize_key);
        if (idx !== -1) remaining.splice(idx, 1);
      }

      // ── 3. Decide outcome ────────────────────────────────────────────────
      let resultKey: PrizeKey = "TRY_AGAIN";
      let couponCode: string | null = null;
      let couponId: number | null = null;

      const shouldWin =
        remaining.length > 0 && Math.random() < WIN_PROBABILITY;

      if (shouldWin) {
        const pick = remaining[
          Math.floor(Math.random() * remaining.length)
        ] as Exclude<PrizeKey, "TRY_AGAIN">;

        resultKey = pick;

        // ── 4. Generate and store coupon ─────────────────────────────────
        const issuedAt = new Date();
        const expiresAt = new Date(issuedAt);
        expiresAt.setDate(expiresAt.getDate() + COUPON_VALIDITY_DAYS);

        couponCode = generateCouponCode(pick);

        const { lastInsertRowid } = db
          .prepare(
            `INSERT INTO coupons
               (coupon_code, prize_key, prize_label, issued_at, expires_at,
                status, business_day, session_token)
             VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)`
          )
          .run(
            couponCode,
            pick,
            PRIZE_LABELS[pick],
            issuedAt.toISOString(),
            expiresAt.toISOString(),
            businessDay,
            sessionToken
          );

        couponId = lastInsertRowid as number;
      }

      // ── 5. Record the spin (prevents repeat) ─────────────────────────────
      db.prepare(
        `INSERT INTO daily_spins (business_day, session_token, result_key, coupon_id)
         VALUES (?, ?, ?, ?)`
      ).run(businessDay, sessionToken, resultKey, couponId);

      return { resultKey, couponCode } as const;
    });

    const outcome = spinTx();

    // ── Already spun ─────────────────────────────────────────────────────────
    if ("alreadySpun" in outcome) {
      return NextResponse.json({ alreadySpun: true });
    }

    const { resultKey, couponCode } = outcome;
    const isWin = resultKey !== "TRY_AGAIN";

    if (!isWin) {
      return NextResponse.json({
        isWin: false,
        prizeKey: resultKey,
        wheelIndex: PRIZE_WHEEL_INDEX[resultKey],
      });
    }

    // ── Winner — compute dates for response ──────────────────────────────────
    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt);
    expiresAt.setDate(expiresAt.getDate() + COUPON_VALIDITY_DAYS);

    return NextResponse.json({
      isWin: true,
      prizeKey: resultKey,
      wheelIndex: PRIZE_WHEEL_INDEX[resultKey as PrizeKey],
      prizeLabel: PRIZE_LABELS[resultKey as PrizeKey],
      couponCode,
      issuedAt: issuedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
    });
  } catch (err) {
    console.error("[spin] error:", err);
    return NextResponse.json(
      { error: "Spin failed. Please try again." },
      { status: 500 }
    );
  }
}

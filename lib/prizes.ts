/**
 * Clay Pot Spin Wheel — Prize Configuration
 *
 * TO CHANGE daily winner counts  → edit DAILY_PRIZE_POOL below
 * TO CHANGE coupon validity       → edit COUPON_VALIDITY_DAYS below
 * TO CHANGE win probability       → edit WIN_PROBABILITY below (0–1)
 * TO VERIFY coupon data           → query .data/claypot.db (coupons table)
 */

// ── Coupon settings ────────────────────────────────────────────────────────────

/** Days a winning coupon stays valid */
export const COUPON_VALIDITY_DAYS = 7;

/** Maximum cumulative total discount awarded per calendar day across all users ($100) */
export const DAILY_MAX_DISCOUNT_AMOUNT = 100;

/** Cart threshold separating $5 OFF (<= $50) and $10 OFF (> $50) */
export const CART_THRESHOLD_AMOUNT = 50;

/**
 * Probability (0–1) of a spin actually being a winner when the daily limit
 * has not been reached. 0.30 = 30% chance.
 */
export const WIN_PROBABILITY = 0.3;

// ── Prize keys ─────────────────────────────────────────────────────────────────

export type PrizeKey =
  | "NAAN"
  | "LASSI"
  | "MLASSI"
  | "DESSERT"
  | "5OFF"
  | "10OFF"
  | "BOGO"
  | "TRY_AGAIN";

/** Human-readable label for each prize key */
export const PRIZE_LABELS: Record<PrizeKey, string> = {
  NAAN:      "$5 OFF",
  LASSI:     "$5 OFF",
  MLASSI:    "$10 OFF",
  DESSERT:   "$5 OFF",
  "5OFF":    "$5 OFF",
  "10OFF":   "$10 OFF",
  BOGO:      "$10 OFF",
  TRY_AGAIN: "Try Again",
};

/** Dollar value for monetary discount prizes */
export const PRIZE_DISCOUNT_VALUES: Record<PrizeKey, number> = {
  NAAN:      0,
  LASSI:     0,
  MLASSI:    0,
  DESSERT:   0,
  "5OFF":    5,
  "10OFF":   10,
  BOGO:      0,
  TRY_AGAIN: 0,
};

// ── Daily prize pool ───────────────────────────────────────────────────────────

/**
 * Exactly 10 winners per business day.
 * Each entry represents one available winning slot.
 * Modify here to change per-prize daily allocation.
 *
 * Current allocation:
 *   BOGO          → 1
 *   10OFF         → 2
 *   5OFF          → 1
 *   DESSERT       → 2
 *   MLASSI        → 1
 *   LASSI         → 1
 *   NAAN          → 2
 *   ──────────────────
 *   Total         → 10
 */
export const DAILY_PRIZE_POOL: Exclude<PrizeKey, "TRY_AGAIN">[] = [
  "BOGO",
  "10OFF", "10OFF",
  "5OFF",
  "DESSERT", "DESSERT",
  "MLASSI",
  "LASSI",
  "NAAN", "NAAN",
];

// ── Wheel index map ────────────────────────────────────────────────────────────

/**
 * Maps each prize key to its 0-based index on the wheel.
 * Must match the order of SPIN_REWARDS in lib/data/promotions.ts.
 *
 * Wheel order:
 *   0 → NAAN
 *   1 → TRY_AGAIN
 *   2 → LASSI
 *   3 → 5OFF
 *   4 → DESSERT
 *   5 → 10OFF
 *   6 → MLASSI
 *   7 → BOGO
 */
export const PRIZE_WHEEL_INDEX: Record<PrizeKey, number> = {
  NAAN:      0,
  TRY_AGAIN: 1,
  LASSI:     2,
  "5OFF":    3,
  DESSERT:   4,
  "10OFF":   5,
  MLASSI:    6,
  BOGO:      7,
};

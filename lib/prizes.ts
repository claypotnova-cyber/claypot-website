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

/**
 * Probability (0–1) of a spin actually being a winner when the daily pool
 * still has prizes remaining. 0.30 = 30% chance → keeps it exciting but
 * not every early spin wins.
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
  NAAN:      "Free Garlic Naan",
  LASSI:     "Free Lassi",
  MLASSI:    "Free Mango Lassi",
  DESSERT:   "Free Dessert",
  "5OFF":    "$5 Off Pickup",
  "10OFF":   "10% Off Pickup",
  BOGO:      "Buy 1 Get 1 Half Off",
  TRY_AGAIN: "Try Again",
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

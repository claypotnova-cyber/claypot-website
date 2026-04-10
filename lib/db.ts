/**
 * Clay Pot — SQLite database singleton (better-sqlite3)
 *
 * Database file lives at .data/claypot.db (gitignored).
 * TO VERIFY coupon data → open .data/claypot.db with any SQLite client
 *   and query the `coupons` table.
 */

import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_DIR = path.join(process.cwd(), ".data");
const DB_PATH = path.join(DB_DIR, "claypot.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  // Ensure storage directory exists
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  _db = new Database(DB_PATH);

  // WAL mode for concurrent read safety; foreign keys on
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");

  initSchema(_db);
  return _db;
}

function initSchema(db: Database.Database): void {
  db.exec(`
    -- Winning coupons issued to players
    CREATE TABLE IF NOT EXISTS coupons (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      coupon_code  TEXT    UNIQUE NOT NULL,
      prize_key    TEXT    NOT NULL,
      prize_label  TEXT    NOT NULL,
      issued_at    TEXT    NOT NULL,
      expires_at   TEXT    NOT NULL,
      status       TEXT    NOT NULL DEFAULT 'pending',   -- pending | redeemed | expired
      redeemed_at  TEXT,
      business_day TEXT    NOT NULL,                     -- YYYY-MM-DD
      session_token TEXT,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    -- One record per (business_day, session_token) — prevents duplicate spins
    CREATE TABLE IF NOT EXISTS daily_spins (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      business_day  TEXT    NOT NULL,
      session_token TEXT    NOT NULL,
      result_key    TEXT    NOT NULL,
      coupon_id     INTEGER REFERENCES coupons(id),
      created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
      UNIQUE (business_day, session_token)
    );

    CREATE INDEX IF NOT EXISTS idx_coupons_code    ON coupons(coupon_code);
    CREATE INDEX IF NOT EXISTS idx_coupons_day     ON coupons(business_day);
    CREATE INDEX IF NOT EXISTS idx_spins_day_token ON daily_spins(business_day, session_token);
  `);
}

"use client";

import { motion } from "framer-motion";

export interface CouponData {
  prizeLabel: string;
  couponCode: string;
  issuedAt: string;   // ISO string
  expiresAt: string;  // ISO string
}

interface Props {
  coupon: CouponData;
  onClose: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SpinCouponModal({ coupon, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(26,8,1,0.92)", backdropFilter: "blur(16px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-sm"
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        {/* ── Coupon card ──────────────────────────────────────────────────── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #FFF8F1 0%, #FFF2E4 100%)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,163,0,0.3)",
          }}
        >
          {/* Gold top bar */}
          <div
            className="h-2 w-full"
            style={{ background: "linear-gradient(90deg, #F4A300, #C9962B, #F4A300)" }}
          />

          <div className="px-7 pt-7 pb-2">
            {/* Brand */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-black tracking-[0.25em] uppercase"
                  style={{ color: "#651F12" }}
                >
                  Clay Pot
                </span>
                <span
                  className="text-[10px] font-black tracking-[0.25em] uppercase"
                  style={{ color: "#F4A300" }}
                >
                  · Spin Wheel Winner
                </span>
              </div>
              <motion.div
                className="text-5xl mb-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                🎉
              </motion.div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-1"
                style={{ color: "#C9962B" }}
              >
                Congratulations! You won
              </p>
              <h2
                className="text-2xl font-black leading-tight"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "#1A0801",
                }}
              >
                {coupon.prizeLabel}
              </h2>
            </div>

            {/* Dashed divider */}
            <div
              className="my-4 border-t-2 border-dashed"
              style={{ borderColor: "rgba(244,163,0,0.35)" }}
            />

            {/* Coupon code */}
            <div className="text-center mb-4">
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                style={{ color: "#651F12" }}
              >
                Coupon Code
              </p>
              <div
                className="inline-block px-5 py-2.5 rounded-xl font-black text-lg tracking-widest"
                style={{
                  background: "linear-gradient(135deg, #1A0801, #3D1209)",
                  color: "#F4A300",
                  letterSpacing: "0.18em",
                  fontFamily: "monospace",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                {coupon.couponCode}
              </div>
            </div>

            {/* Dates */}
            <div className="flex justify-between text-center mb-4">
              <div>
                <p
                  className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: "#651F12" }}
                >
                  Issued On
                </p>
                <p className="text-xs font-semibold" style={{ color: "#1A0801" }}>
                  {formatDate(coupon.issuedAt)}
                </p>
              </div>
              <div
                className="w-px"
                style={{ background: "rgba(244,163,0,0.3)" }}
              />
              <div>
                <p
                  className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: "#651F12" }}
                >
                  Valid Until
                </p>
                <p className="text-xs font-semibold" style={{ color: "#1A0801" }}>
                  {formatDate(coupon.expiresAt)}
                </p>
              </div>
            </div>

            {/* Screenshot instruction */}
            <div
              className="rounded-xl px-4 py-3 mb-4 text-center"
              style={{
                background: "rgba(244,163,0,0.12)",
                border: "1px solid rgba(244,163,0,0.3)",
              }}
            >
              <p className="text-[11px] font-black uppercase tracking-wide mb-0.5" style={{ color: "#651F12" }}>
                📸 Take a Screenshot
              </p>
              <p className="text-[10px] font-medium leading-snug" style={{ color: "#1A0801" }}>
                Show this screen at the Clay Pot counter to redeem your offer.
              </p>
            </div>

            {/* Dashed divider */}
            <div
              className="mb-4 border-t-2 border-dashed"
              style={{ borderColor: "rgba(244,163,0,0.25)" }}
            />

            {/* Terms */}
            <div className="mb-5 space-y-0.5">
              <p
                className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: "#651F12" }}
              >
                Terms &amp; Conditions
              </p>
              {[
                "One-time use only",
                "Pickup or dine-in only — not valid on delivery",
                "Cannot be combined with other offers",
                "Expired coupons will not be accepted",
              ].map((t) => (
                <p key={t} className="text-[9px] leading-snug" style={{ color: "#651F12" }}>
                  · {t}
                </p>
              ))}
            </div>
          </div>

          {/* Gold bottom bar */}
          <div
            className="h-1.5 w-full"
            style={{ background: "linear-gradient(90deg, #C9962B, #F4A300, #C9962B)" }}
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #F4A300, #C9962B)",
            color: "#1A0801",
            boxShadow: "0 6px 24px rgba(244,163,0,0.35)",
          }}
        >
          Got It — Close
        </button>

        <p className="text-center text-white/40 text-[10px] mt-3 font-medium">
          One spin per day. Try again tomorrow!
        </p>
      </motion.div>
    </motion.div>
  );
}

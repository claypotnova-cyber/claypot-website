"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPIN_REWARDS, type SpinReward } from "@/lib/data/promotions";
import SpinCouponModal, { type CouponData } from "@/components/SpinCouponModal";

const SEGMENT_COUNT = SPIN_REWARDS.length; // 8
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT; // 45°

// ── Wheel gradient ─────────────────────────────────────────────────────────────
function buildConicGradient(): string {
  const stops = SPIN_REWARDS.map((r, i) => {
    const start = i * SEGMENT_ANGLE;
    const end = (i + 1) * SEGMENT_ANGLE;
    return `${r.bgColor} ${start}deg ${end}deg`;
  });
  return `conic-gradient(from 0deg, ${stops.join(", ")})`;
}
const CONIC = buildConicGradient();

// ── localStorage helpers ───────────────────────────────────────────────────────
const STORAGE_TOKEN_KEY = "claypot_session_token";
const STORAGE_SPUN_KEY  = "claypot_spun_date";

function getOrCreateToken(): string {
  let token = localStorage.getItem(STORAGE_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(STORAGE_TOKEN_KEY, token);
  }
  return token;
}

function todayStr(): string {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

function hasSpunToday(): boolean {
  return localStorage.getItem(STORAGE_SPUN_KEY) === todayStr();
}

function markSpunToday(): void {
  localStorage.setItem(STORAGE_SPUN_KEY, todayStr());
}

// ── Target rotation for a given wheel slice index ──────────────────────────────
// Pointer is at top (12 o'clock). Conic starts at 3 o'clock (CSS default),
// so the pointer effectively sits at 270° in conic-space.
//
// IMPORTANT: We must normalise currentRotation before computing the delta so
// that accumulated rotation from previous spins doesn't displace the landing
// position. The formula:
//   1. Convert currentRotation to its visual equivalent (mod 360).
//   2. Find the desired visual angle for the target slice (targetAngle).
//   3. Compute the *forward* delta to reach targetAngle from the current angle.
//   4. Add random full rotations on top to make the wheel spin visibly.
function targetRotationForIndex(
  sliceIndex: number,
  currentRotation: number
): number {
  // Centre of the target slice in conic-space (from top, clockwise)
  const segmentCenter = sliceIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
  // Visual angle (in CSS transform-space) where that slice sits under the pointer
  const targetAngle   = (270 - segmentCenter + 360) % 360;
  // Where the wheel visually is right now (0–359°)
  const currentAngle  = ((currentRotation % 360) + 360) % 360;
  // How much we need to rotate forward to reach targetAngle (always positive)
  const delta = ((targetAngle - currentAngle) + 360) % 360 || 360;
  // Add 5–8 full spins so the animation is long enough to feel exciting
  const extraSpins = 5 + Math.floor(Math.random() * 4);
  return currentRotation + extraSpins * 360 + delta;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function SpinWheel() {
  const [open, setOpen]               = useState(false);
  const [spinning, setSpinning]       = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [result, setResult]           = useState<SpinReward | null>(null);
  const [coupon, setCoupon]           = useState<CouponData | null>(null);
  const [showCoupon, setShowCoupon]   = useState(false);

  // "already spun today" is derived from localStorage; set on open
  const [alreadySpun, setAlreadySpun] = useState(false);
  const [error, setError]             = useState<string | null>(null);

  // Check localStorage state when modal opens
  function handleOpen() {
    setAlreadySpun(hasSpunToday());
    setError(null);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setResult(null);
      setError(null);
      // keep alreadySpun in sync with localStorage — do NOT reset it
    }, 400);
  }

  async function handleSpin() {
    if (spinning || result || alreadySpun) return;
    setError(null);
    setSpinning(true);

    try {
      const token = getOrCreateToken();

      const res = await fetch("/api/spin", {
        method: "POST",
        headers: { "x-session-token": token },
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      // Server says already spun (e.g. localStorage cleared but server knows)
      if (data.alreadySpun) {
        markSpunToday();
        setAlreadySpun(true);
        setSpinning(false);
        return;
      }

      // If no win, always land on TRY_AGAIN (index 1) — never on a prize slice
      const TRY_AGAIN_INDEX = 1;
      const wheelIndex: number = data.isWin ? (data.wheelIndex ?? TRY_AGAIN_INDEX) : TRY_AGAIN_INDEX;
      const sliceReward = SPIN_REWARDS[wheelIndex];

      // Compute final rotation and animate
      const finalRotation = targetRotationForIndex(wheelIndex, totalRotation);
      setTotalRotation(finalRotation);

      // Wait for animation (4 s) then show result
      setTimeout(() => {
        setSpinning(false);
        setResult(sliceReward);
        markSpunToday();
        setAlreadySpun(true);

        if (data.isWin && data.couponCode) {
          setCoupon({
            prizeLabel: data.prizeLabel,
            couponCode: data.couponCode,
            issuedAt:   data.issuedAt,
            expiresAt:  data.expiresAt,
          });
          // Short delay so the wheel result renders before coupon takes over
          setTimeout(() => setShowCoupon(true), 900);
        }
      }, 4200);
    } catch {
      setSpinning(false);
      setError("Something went wrong. Please try again.");
    }
  }



  return (
    <>
      {/* ── Floating trigger ──────────────────────────────────────────────── */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full
          font-black text-sm uppercase tracking-widest shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #F4A300, #C9962B)",
          color: "#1A0801",
          boxShadow: "0 8px 32px rgba(244,163,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
        }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        aria-label="Spin to win a reward"
      >
        <span className="text-lg">🎡</span>
        Spin to Win
      </motion.button>

      {/* ── Coupon modal (winner) ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showCoupon && coupon && (
          <SpinCouponModal
            coupon={coupon}
            onClose={() => {
              setShowCoupon(false);
              setCoupon(null);
              handleClose();
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Spin wheel modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && !showCoupon && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(26,8,1,0.85)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && !spinning && handleClose()}
          >
            <motion.div
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #FFF8F1, #FFF2E4)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(244,163,0,0.2)",
              }}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                disabled={spinning}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center
                  text-maroon/40 hover:text-maroon/80 hover:bg-maroon/8 transition-all disabled:opacity-30"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="p-7 pb-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <p className="text-saffron text-xs font-black uppercase tracking-[0.25em] mb-1">
                    Clay Pot Exclusive
                  </p>
                  <h2
                    className="text-3xl font-black text-maroon"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Spin &amp; Win
                  </h2>
                  <p className="text-maroon/50 text-sm mt-1">
                    {alreadySpun
                      ? "You already used today's spin."
                      : "One spin per day. Good luck!"}
                  </p>
                </div>

                {/* Wheel */}
                <div className="relative mx-auto mb-6" style={{ width: 280, height: 280 }}>
                  {/* Pointer */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20"
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                  >
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft:  "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderTop:   "22px solid #651F12",
                      }}
                    />
                  </div>

                  {/* Spinning wheel disc */}
                  <motion.div
                    className="w-full h-full rounded-full"
                    style={{
                      background: CONIC,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 0 0 4px rgba(255,255,255,0.15)",
                    }}
                    animate={{ rotate: totalRotation }}
                    transition={
                      spinning
                        ? { duration: 4, ease: [0.1, 0.9, 0.4, 1.0] }
                        : { duration: 0 }
                    }
                  >
                    {/* Segment labels */}
                    {SPIN_REWARDS.map((reward, i) => {
                      const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
                      const rad   = ((angle - 90) * Math.PI) / 180;
                      const r     = 92;
                      const x     = 140 + r * Math.cos(rad);
                      const y     = 140 + r * Math.sin(rad);
                      return (
                        <div
                          key={reward.id}
                          className="absolute text-center pointer-events-none select-none"
                          style={{
                            left:      x,
                            top:       y,
                            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                            width:     70,
                          }}
                        >
                          <span className="block text-lg leading-none">{reward.emoji}</span>
                          <span
                            className="block text-[8px] font-black uppercase leading-tight mt-0.5"
                            style={{
                              color:      reward.textColor,
                              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            }}
                          >
                            {reward.label}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* Center hub */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12
                      rounded-full border-4 border-white flex items-center justify-center z-10"
                    style={{ background: "#651F12", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
                  >
                    <span className="text-white text-xs font-black">CP</span>
                  </div>
                </div>

                {/* Result / spin button / already-spun state */}
                <AnimatePresence mode="wait">
                  {alreadySpun && !result ? (
                    // Already spun today — no result to show yet in this session
                    <motion.div
                      key="already-spun"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="rounded-2xl p-5 mb-3 bg-maroon/5 border border-maroon/10">
                        <span className="text-3xl block mb-2">🗓️</span>
                        <h3
                          className="text-lg font-black text-maroon mb-1"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          Already Spun Today
                        </h3>
                        <p className="text-maroon/60 text-sm">
                          You already used today&apos;s spin.
                          <br />
                          Come back tomorrow for another chance!
                        </p>
                      </div>
                    </motion.div>
                  ) : result ? (
                    // Show result card
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      {result.isWin ? (
                        // Winner — coupon modal auto-opens; this is a brief flash
                        <div
                          className="rounded-2xl p-5 mb-3"
                          style={{
                            background: `${result.bgColor}18`,
                            border:     `1px solid ${result.bgColor}40`,
                          }}
                        >
                          <span className="text-4xl block mb-2">{result.emoji}</span>
                          <h3
                            className="text-xl font-black text-maroon mb-1"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {result.label}
                          </h3>
                          <p className="text-maroon/60 text-sm">
                            Your coupon is loading…
                          </p>
                        </div>
                      ) : (
                        // Try again
                        <div className="rounded-2xl p-5 mb-3 bg-maroon/5 border border-maroon/10">
                          <span className="text-4xl block mb-2">{result.emoji}</span>
                          <h3
                            className="text-xl font-black text-maroon mb-1"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            No Prize This Time
                          </h3>
                          <p className="text-maroon/60 text-sm">
                            Better luck tomorrow — try again then!
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="rounded-2xl p-4 mb-3 bg-red-50 border border-red-200">
                        <p className="text-red-700 text-sm font-semibold">{error}</p>
                      </div>
                      <button
                        onClick={handleSpin}
                        className="px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest"
                        style={{
                          background: "linear-gradient(135deg, #F4A300, #C9962B)",
                          color: "#1A0801",
                        }}
                      >
                        Try Again
                      </button>
                    </motion.div>
                  ) : (
                    // Default — spin button
                    <motion.div key="spin-btn" className="text-center">
                      <button
                        onClick={handleSpin}
                        disabled={spinning}
                        className="px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest
                          transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: spinning
                            ? "#C9962B"
                            : "linear-gradient(135deg, #F4A300, #C9962B)",
                          color: "#1A0801",
                          boxShadow: "0 6px 24px rgba(244,163,0,0.35)",
                        }}
                      >
                        {spinning ? "Spinning…" : "Spin Now"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-maroon/10 text-center space-y-0.5">
                  <p className="text-[10px] text-maroon/40 font-semibold">
                    Offers valid for dine-in and in-store pickup only.
                  </p>
                  <p className="text-[10px] text-maroon/30 italic">
                    Not valid for delivery or third-party orders. One spin per day.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

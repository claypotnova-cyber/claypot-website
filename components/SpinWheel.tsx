"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPIN_REWARDS, type SpinReward } from "@/lib/data/promotions";

const SEGMENT_COUNT = SPIN_REWARDS.length; // 8
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT; // 45°

// Build a conic-gradient string for the wheel
function buildConicGradient(): string {
  const stops = SPIN_REWARDS.map((r, i) => {
    const start = i * SEGMENT_ANGLE;
    const end = (i + 1) * SEGMENT_ANGLE;
    return `${r.bgColor} ${start}deg ${end}deg`;
  });
  return `conic-gradient(from 0deg, ${stops.join(", ")})`;
}

const CONIC = buildConicGradient();

export default function SpinWheel() {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [result, setResult] = useState<SpinReward | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const spinCountRef = useRef(0);

  function handleSpin() {
    if (spinning || hasSpun) return;

    // Pick a random winning segment (bias away from "try again")
    const winnable = SPIN_REWARDS.filter((r) => r.isWin);
    const pool = [...winnable, ...winnable, SPIN_REWARDS.find((r) => !r.isWin)!];
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    const chosenIndex = SPIN_REWARDS.findIndex((r) => r.id === chosen.id);

    // The pointer is at the top (270° from conic start = 12 o'clock)
    // Segment center for chosenIndex:
    const segmentCenter = chosenIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    // We need segmentCenter to land at 270° (top pointer):
    const targetAngle = (270 - segmentCenter + 360) % 360;
    // Add extra full spins for drama
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const finalRotation = totalRotation + extraSpins * 360 + targetAngle;

    setSpinning(true);
    setTotalRotation(finalRotation);
    spinCountRef.current += 1;

    setTimeout(() => {
      setSpinning(false);
      setResult(chosen);
      setHasSpun(true);
    }, 4200);
  }

  function handleClose() {
    setOpen(false);
    // Reset after close animation
    setTimeout(() => {
      setResult(null);
      setHasSpun(false);
      setTotalRotation(0);
    }, 400);
  }

  return (
    <>
      {/* ── Floating trigger ──────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(true)}
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

      {/* ── Modal overlay ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(26,8,1,0.85)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
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
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center
                  text-maroon/40 hover:text-maroon/80 hover:bg-maroon/8 transition-all"
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
                    Spin & Win
                  </h2>
                  <p className="text-maroon/50 text-sm mt-1">
                    One spin per visit. Good luck!
                  </p>
                </div>

                {/* Wheel container */}
                <div className="relative mx-auto mb-6" style={{ width: 280, height: 280 }}>
                  {/* Pointer at top */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20"
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                  >
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderTop: "22px solid #651F12",
                      }}
                    />
                  </div>

                  {/* Spinning wheel */}
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
                      const rad = ((angle - 90) * Math.PI) / 180;
                      const r = 92;
                      const x = 140 + r * Math.cos(rad);
                      const y = 140 + r * Math.sin(rad);
                      return (
                        <div
                          key={reward.id}
                          className="absolute text-center pointer-events-none select-none"
                          style={{
                            left: x,
                            top: y,
                            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                            width: 70,
                          }}
                        >
                          <span className="block text-lg leading-none">{reward.emoji}</span>
                          <span
                            className="block text-[8px] font-black uppercase leading-tight mt-0.5"
                            style={{ color: reward.textColor, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
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

                {/* Result or Spin button */}
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      {result.isWin ? (
                        <>
                          <div
                            className="rounded-2xl p-5 mb-4"
                            style={{
                              background: `${result.bgColor}18`,
                              border: `1px solid ${result.bgColor}40`,
                            }}
                          >
                            <span className="text-4xl block mb-2">{result.emoji}</span>
                            <h3
                              className="text-xl font-black text-maroon mb-1"
                              style={{ fontFamily: "var(--font-playfair)" }}
                            >
                              {result.label}
                            </h3>
                            <p className="text-maroon/60 text-sm">{result.sublabel}</p>
                          </div>
                          <p
                            className="text-[11px] font-semibold text-maroon/50 mb-1"
                          >
                            {result.applicability}
                          </p>
                          <p className="text-[10px] text-maroon/35 italic">
                            {result.disclaimer}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="rounded-2xl p-5 mb-4 bg-maroon/5 border border-maroon/10">
                            <span className="text-4xl block mb-2">{result.emoji}</span>
                            <h3
                              className="text-xl font-black text-maroon mb-1"
                              style={{ fontFamily: "var(--font-playfair)" }}
                            >
                              {result.label}
                            </h3>
                            <p className="text-maroon/60 text-sm">{result.sublabel}</p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ) : (
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

                {/* Disclaimer footer */}
                <div
                  className="mt-5 pt-4 border-t border-maroon/10 text-center space-y-0.5"
                >
                  <p className="text-[10px] text-maroon/40 font-semibold">
                    Offers valid for dine-in and in-store pickup only.
                  </p>
                  <p className="text-[10px] text-maroon/30 italic">
                    Not valid for delivery or third-party orders. One offer per visit.
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

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROMO_BAR_MESSAGES } from "@/lib/data/promotions";

export default function PromoBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_BAR_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="z-[60] overflow-hidden"
      style={{
        position: "fixed",
        top: "var(--ann-bar-h)",
        left: 0,
        right: 0,
        background: "linear-gradient(90deg, #651F12 0%, #8B2A18 50%, #651F12 100%)",
      }}
    >
      <div className="h-10 flex items-center justify-center px-4 relative">
        {/* Shimmer accent */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(244,163,0,0.3), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-cream-100 text-xs md:text-sm font-medium tracking-wide text-center"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {PROMO_BAR_MESSAGES[currentIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex gap-1">
          {PROMO_BAR_MESSAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-saffron scale-110"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Promotion ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

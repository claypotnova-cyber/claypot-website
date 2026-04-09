"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { COMBO_PRESETS, type ComboPreset } from "@/lib/data/promotions";
import { SITE } from "@/lib/data/site";

const CTA_CONFIG = {
  pickup: {
    primary: { label: "Order for Pickup", href: SITE.toastOrderUrl, external: true },
    secondary: { label: "Call to Confirm", href: `tel:${SITE.phoneRaw}`, external: true },
  },
  "dine-in": {
    primary: { label: "Reserve a Table", href: "/contact", external: false },
    secondary: { label: "View Full Menu", href: "/menu", external: false },
  },
  party: {
    primary: { label: "Inquire About Catering", href: "/catering#inquiry", external: false },
    secondary: { label: "Call to Plan", href: `tel:${SITE.phoneRaw}`, external: true },
  },
};

function ComboCard({ preset, active }: { preset: ComboPreset; active: boolean }) {
  const cta = CTA_CONFIG[preset.ctaType];

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={preset.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Category columns */}
          <div className="space-y-4">
            <p className="text-maroon/50 text-sm leading-relaxed font-medium">
              {preset.description}
            </p>
            <p className="text-saffron text-xs font-black uppercase tracking-[0.2em]">
              Serves {preset.serves}
            </p>
            {preset.categories.map((cat) => (
              <div key={cat.label}>
                <p className="text-maroon/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.suggestions.map((dish) => (
                    <span
                      key={dish}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold text-maroon/70 border border-maroon/10"
                      style={{ background: "rgba(101,31,18,0.05)" }}
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA panel */}
          <div
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{
              background: "linear-gradient(145deg, #1A0801, #2D0E05)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <div>
              <p className="text-saffron text-xs font-black uppercase tracking-[0.25em] mb-3">
                {preset.ctaType === "pickup"
                  ? "Pickup Combo"
                  : preset.ctaType === "dine-in"
                  ? "Dine-In Suggestion"
                  : "Party Meal"}
              </p>
              <h3
                className="text-cream text-2xl font-black leading-tight mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {preset.label}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">
                {preset.ctaType === "pickup"
                  ? "Valid for in-store pickup only. Not valid on delivery."
                  : preset.ctaType === "dine-in"
                  ? "Best enjoyed in our dining room. Reserve for a premium experience."
                  : "Contact us to finalize your custom menu and quantities."}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {cta.primary.external ? (
                <a
                  href={cta.primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                    font-black text-xs uppercase tracking-widest text-charcoal transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
                >
                  {cta.primary.label} →
                </a>
              ) : (
                <Link
                  href={cta.primary.href}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                    font-black text-xs uppercase tracking-widest text-charcoal transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
                >
                  {cta.primary.label} →
                </Link>
              )}

              {cta.secondary.external ? (
                <a
                  href={cta.secondary.href}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                    font-semibold text-xs text-cream border border-white/15 hover:border-saffron/50 transition-all"
                >
                  {cta.secondary.label}
                </a>
              ) : (
                <Link
                  href={cta.secondary.href}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                    font-semibold text-xs text-cream border border-white/15 hover:border-saffron/50 transition-all"
                >
                  {cta.secondary.label}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ComboBuilder() {
  const [activeId, setActiveId] = useState(COMBO_PRESETS[0].id);
  const activePreset = COMBO_PRESETS.find((p) => p.id === activeId)!;

  return (
    <section
      className="py-24 px-4 md:px-8"
      style={{ background: "linear-gradient(180deg, #FFF8F1 0%, #FFF2E4 100%)" }}
      aria-label="Meal combo builder"
    >
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-black tracking-[0.25em] uppercase">
                Meal Ideas
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-maroon"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Build Your Perfect{" "}
              <span className="text-saffron">Meal</span>
            </h2>
            <p className="text-maroon/50 text-base mt-3 max-w-lg mx-auto">
              Discover curated combinations for any occasion — pickup, dine-in, or a special gathering.
            </p>
          </div>
        </AnimatedSection>

        {/* Combo type tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {COMBO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setActiveId(preset.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm
                  transition-all duration-300"
                style={
                  activeId === preset.id
                    ? {
                        background: "linear-gradient(135deg, #651F12, #3D1209)",
                        color: "#FFF8F1",
                        boxShadow: "0 4px 16px rgba(101,31,18,0.25)",
                      }
                    : {
                        background: "rgba(101,31,18,0.07)",
                        color: "#651F12",
                        border: "1px solid rgba(101,31,18,0.12)",
                      }
                }
              >
                <span>{preset.emoji}</span>
                {preset.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Active combo card */}
        <AnimatedSection delay={0.15}>
          <div
            className="rounded-3xl p-7 md:p-10"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(244,163,0,0.15)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
            }}
          >
            <ComboCard preset={activePreset} active={true} />
          </div>
        </AnimatedSection>

        {/* Disclaimer */}
        <AnimatedSection delay={0.2}>
          <p className="text-center text-maroon/35 text-xs italic mt-6">
            Combo suggestions are for inspiration only. Visit our full menu for complete offerings.
            Pickup orders placed via Toast. Dine-in and catering by inquiry.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

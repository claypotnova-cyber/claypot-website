"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CATERING_PROMOTIONS, type Promotion, type PromotionPlacement } from "@/lib/data/promotions";

const colorMap = {
  saffron: {
    gradient: "linear-gradient(135deg, #F4A300 0%, #C9962B 100%)",
    badge: "rgba(255,255,255,0.22)",
    badgeText: "#1A0801",
    glow: "rgba(244,163,0,0.3)",
    btn: "rgba(26,8,1,0.9)",
    btnText: "#FFD56B",
    iconBg: "rgba(255,255,255,0.15)",
  },
  maroon: {
    gradient: "linear-gradient(135deg, #651F12 0%, #3D1209 100%)",
    badge: "rgba(255,255,255,0.12)",
    badgeText: "#FFD56B",
    glow: "rgba(101,31,18,0.4)",
    btn: "rgba(244,163,0,1)",
    btnText: "#1A0801",
    iconBg: "rgba(255,255,255,0.08)",
  },
  gold: {
    gradient: "linear-gradient(135deg, #7A5B1A 0%, #C9962B 50%, #7A5B1A 100%)",
    badge: "rgba(255,255,255,0.14)",
    badgeText: "#FFF8F1",
    glow: "rgba(201,150,43,0.35)",
    btn: "rgba(255,255,255,0.95)",
    btnText: "#5A410E",
    iconBg: "rgba(255,255,255,0.1)",
  },
};

// ── Single promo card ─────────────────────────────────────────────────────────

function CateringPromoCard({ promo, index }: { promo: Promotion; index: number }) {
  const colors = colorMap[promo.color];
  return (
    <AnimatedSection delay={index * 0.12} direction="up">
      <motion.div
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background: colors.gradient,
          boxShadow: `0 8px 32px ${colors.glow}, 0 2px 8px rgba(0,0,0,0.15)`,
          minHeight: 300,
        }}
        whileHover={{
          y: -8,
          boxShadow: `0 24px 56px ${colors.glow}, 0 4px 16px rgba(0,0,0,0.2)`,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        {/* Shine */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%)" }}
        />

        <div className="relative p-7 flex flex-col h-full">
          {/* Icon + badge */}
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: colors.iconBg }}
            >
              {promo.icon}
            </div>
            {promo.badge && (
              <span
                className="text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-full"
                style={{ background: colors.badge, color: colors.badgeText }}
              >
                {promo.badge}
              </span>
            )}
          </div>

          {/* Copy */}
          <h3
            className="text-white text-2xl font-black mb-3 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {promo.title}
          </h3>
          <p className="text-white/65 text-sm leading-relaxed flex-1 mb-6">
            {promo.description}
          </p>

          {/* CTA */}
          <div className="space-y-2">
            <Link
              href={promo.ctaHref}
              className="inline-flex items-center justify-center w-full gap-2 py-3.5 px-6 rounded-xl
                font-black text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5"
              style={{ background: colors.btn, color: colors.btnText }}
            >
              {promo.ctaLabel} →
            </Link>
            <p className="text-white/35 text-[10px] text-center italic">
              {promo.applicability}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// ── Catering Highlight Banner (single wide card) ──────────────────────────────

function CateringHighlightBanner() {
  const promo = CATERING_PROMOTIONS.find(
    (p) => p.placement.includes("catering-highlight") && p.active
  );
  if (!promo) return null;

  return (
    <AnimatedSection>
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 60%, #3D1209 100%)",
          boxShadow: "0 16px 56px rgba(0,0,0,0.25), 0 0 0 1px rgba(244,163,0,0.12)",
        }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 50%, #F4A300, transparent 50%), radial-gradient(circle at 85% 50%, #651F12, transparent 50%)",
          }}
        />
        {/* Shine */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.3), transparent 50%)" }}
        />

        <div className="relative px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <span
              className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-saffron mb-3 px-3 py-1.5
                rounded-full border border-saffron/25"
              style={{ background: "rgba(244,163,0,0.1)" }}
            >
              {promo.badge}
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-cream leading-tight mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {promo.title}
            </h2>
            <p className="text-white/55 text-base leading-relaxed max-w-lg">
              {promo.description}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <Link
              href={promo.ctaHref}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm
                uppercase tracking-widest text-charcoal transition-all hover:-translate-y-1 hover:shadow-xl whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
            >
              {promo.ctaLabel} →
            </Link>
            <p className="text-white/30 text-[10px] italic text-right">
              {promo.disclaimer}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// ── Main exports by placement ─────────────────────────────────────────────────

interface CateringPromosProps {
  placement: PromotionPlacement;
}

export default function CateringPromos({ placement }: CateringPromosProps) {
  if (placement === "catering-highlight" || placement === "catering-banner") {
    return (
      <section className="py-10 px-4 md:px-8" aria-label="Featured catering offer">
        <div className="max-w-7xl mx-auto">
          <CateringHighlightBanner />
        </div>
      </section>
    );
  }

  // catering-cards: grid of promo cards
  const cards = CATERING_PROMOTIONS.filter(
    (p) => p.placement.includes("catering-cards") && p.active
  );

  if (cards.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 bg-cream" aria-label="Catering promotions">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-black tracking-[0.25em] uppercase">
                Catering Offers
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-maroon"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Every Event,{" "}
              <span className="text-saffron">Perfectly Catered</span>
            </h2>
            <p className="text-maroon/50 text-base mt-3 max-w-xl mx-auto">
              From intimate gatherings to grand celebrations — Clay Pot brings bold, authentic
              Indian flavors to your venue.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {cards.map((promo, i) => (
            <CateringPromoCard key={promo.id} promo={promo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { PROMOTIONS } from "@/lib/data/promotions";

const colorMap = {
  saffron: {
    gradient: "linear-gradient(135deg, #F4A300 0%, #C9962B 100%)",
    badge: "rgba(244,163,0,0.18)",
    badgeText: "#F4A300",
    glow: "rgba(244,163,0,0.25)",
    btn: "rgba(244,163,0,1)",
    btnText: "#1F1F1F",
  },
  maroon: {
    gradient: "linear-gradient(135deg, #651F12 0%, #3D1209 100%)",
    badge: "rgba(255,255,255,0.12)",
    badgeText: "#FFD56B",
    glow: "rgba(101,31,18,0.35)",
    btn: "rgba(255,255,255,0.95)",
    btnText: "#651F12",
  },
  gold: {
    gradient: "linear-gradient(135deg, #7A5B1A 0%, #C9962B 50%, #7A5B1A 100%)",
    badge: "rgba(255,255,255,0.12)",
    badgeText: "#FFD56B",
    glow: "rgba(201,150,43,0.3)",
    btn: "rgba(255,255,255,0.95)",
    btnText: "#5A410E",
  },
};

// Only show active dine-in and pickup promotions in this section
const ACTIVE_PROMOS = PROMOTIONS.filter(
  (p) => p.active && (p.promotionType === "dine-in" || p.promotionType === "pickup")
);

export default function PromotionsSection() {
  if (ACTIVE_PROMOS.length === 0) return null;

  return (
    <section className="section-padding" aria-label="Current promotions">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                What&apos;s On
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-charcoal mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Specials & Offers
            </h2>
            <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
              Great food is even better with great deals. Here&apos;s what we&apos;re featuring right now.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {ACTIVE_PROMOS.map((promo, i) => {
            const colors = colorMap[promo.color];
            return (
              <AnimatedSection key={promo.id} delay={i * 0.12} direction="up">
                <motion.div
                  className="relative rounded-2xl overflow-hidden cursor-default flex flex-col"
                  style={{
                    background: colors.gradient,
                    boxShadow: `0 8px 32px ${colors.glow}, 0 2px 8px rgba(0,0,0,0.15)`,
                  }}
                  whileHover={{
                    y: -8,
                    rotateX: 3,
                    rotateY: -3,
                    boxShadow: `0 20px 48px ${colors.glow}, 0 4px 16px rgba(0,0,0,0.2)`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Shine overlay */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    }}
                  />

                  <div className="relative p-7 flex flex-col flex-1 min-h-[280px]">
                    {/* Icon + Badge row */}
                    <div className="flex items-start justify-between mb-5">
                      <span className="text-4xl">{promo.icon}</span>
                      {promo.badge && (
                        <span
                          className="text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full"
                          style={{
                            background: colors.badge,
                            color: colors.badgeText,
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {promo.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3
                      className="text-white text-2xl font-bold mb-3 leading-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {promo.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1">
                      {promo.description}
                    </p>

                    {/* CTA */}
                    {promo.ctaHref.startsWith("http") ? (
                      <a
                        href={promo.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full
                          font-semibold text-sm tracking-wide transition-all duration-300
                          hover:opacity-90 hover:-translate-y-0.5 focus:outline-none focus:ring-2 mb-3"
                        style={{ background: colors.btn, color: colors.btnText }}
                      >
                        {promo.ctaLabel}
                      </a>
                    ) : (
                      <Link
                        href={promo.ctaHref}
                        className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full
                          font-semibold text-sm tracking-wide transition-all duration-300
                          hover:opacity-90 hover:-translate-y-0.5 focus:outline-none focus:ring-2 mb-3"
                        style={{ background: colors.btn, color: colors.btnText }}
                      >
                        {promo.ctaLabel}
                      </Link>
                    )}

                    {/* Disclaimer */}
                    <p className="text-white/40 text-[10px] italic leading-snug">
                      {promo.applicability}. {promo.disclaimer}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

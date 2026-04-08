"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const HIGHLIGHTS = [
  {
    icon: "🍲",
    text: "Recipes rooted in generations of culinary tradition",
  },
  {
    icon: "🌿",
    text: "Fresh, locally sourced produce and handpicked spices",
  },
  {
    icon: "🥃",
    text: "Vibrant lounge bar with handcrafted Indian-inspired cocktails",
  },
  {
    icon: "🎊",
    text: "Warm hospitality — every guest treated like family",
  },
];

export default function AboutPreview() {
  return (
    <section
      className="section-padding"
      style={{ background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 100%)" }}
      aria-label="About Clay Pot"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Main image */}
              <div
                className="relative h-80 md:h-[460px] rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,163,0,0.12)",
                }}
              >
                <Image
                  src="/images/restaurant-interior.png"
                  alt="Clay Pot restaurant elegant dining room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(20,4,1,0.4) 100%)",
                  }}
                />
              </div>

              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-5 -right-5 rounded-xl px-5 py-4 z-10"
                style={{
                  background: "linear-gradient(135deg, #F4A300, #C9962B)",
                  boxShadow: "0 12px 36px rgba(244,163,0,0.4)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-charcoal/70 text-[11px] font-medium mb-0.5">
                  Est. Centreville
                </p>
                <p
                  className="text-charcoal font-bold text-2xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ⭐ 4.8 / 5
                </p>
                <p className="text-charcoal/60 text-[11px] mt-0.5">
                  500+ Google Reviews
                </p>
              </motion.div>

              {/* Ambient glow */}
              <div
                className="absolute -top-8 -left-8 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
                style={{ background: "#F4A300" }}
              />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="right">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-saffron" />
                <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                  Our Story
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-bold text-cream-100 mb-6 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Where Tradition
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #F4A300, #E8B84C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Meets Elegance
                </span>
              </h2>

              <p className="text-white/60 text-base leading-relaxed mb-6">
                Clay Pot was born from a passion for authentic Indian flavors and a desire
                to share them in an atmosphere worthy of the cuisine. Nestled in the heart of
                Centreville, Virginia, we&apos;ve created a space where every meal is a journey —
                from the aromatic spice blends of the kitchen to the warm glow of candlelit tables.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Every dish at Clay Pot tells a story — of heritage, craft, and love. Our chefs
                bring decades of experience and a genuine commitment to authenticity, creating
                plates that honor tradition while delighting the modern palate.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {HIGHLIGHTS.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 p-3.5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <p className="text-white/65 text-sm leading-snug">{item.text}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm
                  border-2 border-saffron text-saffron transition-all hover:bg-saffron hover:text-charcoal hover:-translate-y-0.5"
              >
                Our Full Story →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

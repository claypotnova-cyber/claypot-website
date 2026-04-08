"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";
import { SITE } from "@/lib/data/site";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 80]);
  const textY = useTransform(scrollY, [0, 400], [0, -30]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src="/images/restaurant-interior.png"
          alt="Clay Pot Indian Restaurant elegant interior"
          fill
          priority
          quality={90}
          className="object-cover object-center scale-105"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(20,4,1,0.92) 0%, rgba(20,4,1,0.70) 55%, rgba(20,4,1,0.20) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(20,4,1,0.8) 0%, transparent 60%)",
        }}
      />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl z-10 opacity-10 pointer-events-none animate-float"
        style={{ background: "#F4A300" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full blur-3xl z-10 opacity-8 pointer-events-none"
        style={{ background: "#651F12", animationDelay: "3s" }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full pt-28 pb-16 md:pt-36">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY, opacity }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span
              className="h-px w-8"
              style={{ background: "#F4A300" }}
            />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#F4A300" }}
            >
              Centreville, Virginia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bold Indian
            <br />
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #F4A300, #E8B84C, #C9962B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Flavors.
            </span>
            <br />
            Elevated Dining.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-white/65 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            From handcrafted curries to a vibrant lounge bar — Clay Pot brings
            authentic Indian warmth to a modern, immersive dining experience.
          </motion.p>

          {/* CTA group */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-order-online"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base tracking-wide
                transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg focus:outline-none focus:ring-2 focus:ring-saffron"
              style={{
                background: "linear-gradient(135deg, #F4A300, #C9962B)",
                color: "#1F1F1F",
              }}
            >
              🍽️ Order Online
            </a>

            <Link
              href="/catering"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base tracking-wide
                border-2 border-white/30 text-white transition-all duration-300
                hover:border-saffron hover:text-saffron hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-saffron"
            >
              🎉 Catering
            </Link>

            <a
              href={SITE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-base
                text-white/70 transition-all duration-300 hover:text-saffron hover:-translate-y-0.5
                focus:outline-none"
            >
              📍 Get Directions
            </a>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mt-10"
          >
            {[
              "⭐⭐⭐⭐⭐ Google Rated",
              "🍜 Authentic Recipes",
              "🥃 Full Bar & Lounge",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium
                  text-white/70 border border-white/12 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 origin-top"
          style={{ background: "linear-gradient(to bottom, #F4A300, transparent)" }}
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

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
      transition: { staggerChildren: 0.15 },
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

  const waNumber = SITE.phoneRaw.replace(/\D/g, "");
  const waLink = `https://wa.me/${waNumber}?text=Hi%20Clay%20Pot,%20I%20would%20like%20to%20inquire%20about%20an%20order.`;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Dark base layer — fallback */}
      <div className="absolute inset-0 z-0" style={{ background: "#1A0801" }} />

      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ y: imageY }}
      >
        <Image
          src="/images/dish-mandi-platter-hero.png"
          alt="Clay Pot Signature Mandi Platter"
          fill
          priority
          quality={90}
          className="object-cover object-center scale-105"
        />
      </motion.div>

      {/* Dark-to-transparent left overlay so text is readable */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(20,6,0,0.97) 0%, rgba(20,6,0,0.85) 38%, rgba(20,6,0,0.5) 65%, rgba(20,6,0,0.1) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(26,8,1,0.95) 0%, transparent 60%)",
        }}
      />
      {/* Top vignette */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,8,1,0.6) 0%, transparent 30%)",
        }}
      />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl z-10 opacity-20 pointer-events-none animate-float"
        style={{ background: "#F4A300" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full blur-3xl z-10 opacity-15 pointer-events-none"
        style={{ background: "#E8B84C", animationDelay: "3s" }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full pt-28 pb-16 md:pt-36">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY, opacity }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-saffron/30 bg-saffron/10 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            <span
              className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase"
              style={{ color: "#F4A300" }}
            >
              Herndon's Favorite Spot for Authentic Flavors
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.08]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Experience Clay Pot&apos;s
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
              Signature Mandi.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-cream/80 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Enjoy bold Indian flavors, explosive signature Mandi platters, fragrant biryanis, curries, and full-service catering for every occasion.
          </motion.p>

          {/* CTA group */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase
                transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg focus:outline-none"
              style={{
                background: "linear-gradient(135deg, #F4A300, #C9962B)",
                color: "#1F1F1F",
              }}
            >
              Order Online
            </a>

            <Link
              href="/catering"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase
                border-2 border-white/20 text-white transition-all duration-300 hover:bg-white/10
                hover:border-saffron hover:text-saffron focus:outline-none"
            >
              Book Catering
            </Link>
            
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase
                bg-white/10 text-white backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 focus:outline-none"
            >
              📞 Call Now
            </a>
            
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase
                bg-[#25D366]/20 text-white border border-[#25D366]/30 transition-all duration-300 hover:bg-[#25D366]/30 hover:-translate-y-0.5 focus:outline-none"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mt-10"
          >
            {[
              "🔥 Massive Mandi Platters",
              "🍛 Crave-Inducing Biryani",
              "🎉 Fast Catering Quotes",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider
                  text-white border border-white/10 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}

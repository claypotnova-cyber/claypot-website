"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function MenuHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Cinematic Background */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/restaurant-interior.png" // Placeholder or existing image
          alt="Clay Pot Restaurant Ambiance"
          fill
          priority
          className="object-cover object-center brightness-[0.25] saturate-[0.8]"
        />
        {/* Layered Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-cream" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/60" />
      </motion.div>

      {/* Floating Decorative Elements (3D Feel) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-saffron rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-20 right-[10%] w-80 h-80 bg-maroon rounded-full blur-[140px] pointer-events-none"
      />

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-saffron/40" />
            <span className="px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-[10px] font-black tracking-[0.4em] uppercase backdrop-blur-md">
              The Art of Indian Cuisine
            </span>
            <div className="h-px w-12 bg-saffron/40" />
          </div>

          <h1 
            className="text-6xl md:text-8xl font-extrabold text-maroon mb-6 leading-tight"
            style={{ 
              fontFamily: "var(--font-playfair)",
              textShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}
          >
            A Symphony of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-[#E8B84C] to-saffron animate-shimmer bg-[length:200%_auto]">
              Spices & Flavors
            </span>
          </h1>

          <p className="text-maroon/40 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed italic">
            Experience the soul of Hyderabad and beyond, crafted with passion and served with tradition.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-maroon/30">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-maroon/20 to-transparent" />
      </motion.div>
      
      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}

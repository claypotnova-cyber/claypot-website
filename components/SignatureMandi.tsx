"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Category panels ──────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "mandi",
    label: "Signature Mandi",
    tagline: "The showstopper platter",
    desc: "Massive slow-cooked rice platters loaded with your choice of chicken, goat, or shrimp — made for the table to share.",
    img: "/images/dish-mandi-platter.png",
    accent: "#F4A300",
    cta: "/menu#biryanis",
    ctaLabel: "Explore Mandis",
    badge: "Fan Favourite",
  },
  {
    id: "biryani",
    label: "Dum Biryanis",
    tagline: "Sealed. Slow-cooked. Perfect.",
    desc: "Fragrant basmati layered with marinated meat and saffron, dum-cooked the traditional way — each grain kissed with spice.",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    accent: "#E8B84C",
    cta: "/menu#biryanis",
    ctaLabel: "View Biryanis",
    badge: "Most Ordered",
  },
  {
    id: "curries",
    label: "Signature Curries",
    tagline: "Bold. Rich. Unforgettable.",
    desc: "From velvety Butter Chicken to fiery Chettinad — every curry is a story of spice, craft, and authentic Indian tradition.",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    accent: "#C05818",
    cta: "/menu#non-veg-curries",
    ctaLabel: "View Curries",
    badge: "Chef's Pick",
  },
];

// ── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 60,  suffix: "+",  label: "Menu Items" },
  { value: 5,   suffix: "★",  label: "Google Rating" },
  { value: 100, suffix: "%",  label: "Fresh Daily" },
  { value: 10,  suffix: "+",  label: "Mandi Varieties" },
];

// ── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-3xl group cursor-pointer"
      style={{ minHeight: 460 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: imgY }}
      >
        <img
          src={cat.img}
          alt={cat.label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* Accent color sweep on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${cat.accent}, transparent 60%)` }}
      />

      {/* Badge */}
      <div
        className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-charcoal"
        style={{ background: cat.accent }}
      >
        {cat.badge}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
        <p
          className="text-xs font-black uppercase tracking-[0.25em] mb-2 opacity-80"
          style={{ color: cat.accent }}
        >
          {cat.tagline}
        </p>

        <h3 className="text-3xl md:text-4xl font-black text-white font-playfair mb-3 leading-tight">
          {cat.label}
        </h3>

        {/* Description — slides up on hover */}
        <motion.p
          className="text-white/70 text-sm leading-relaxed mb-5 max-w-sm overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ height: 0, opacity: 0 }}
        >
          {cat.desc}
        </motion.p>

        {/* Always-visible short desc */}
        <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-sm line-clamp-2 group-hover:hidden">
          {cat.desc}
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={cat.cta}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-charcoal transition-all hover:-translate-y-0.5"
            style={{ background: cat.accent }}
          >
            {cat.ctaLabel} →
          </Link>
          <a
            href={ORDER_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-all"
          >
            Order Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Stats counter row ────────────────────────────────────────────────────────
function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const c0 = useCounter(STATS[0].value, 1800, inView);
  const c1 = useCounter(STATS[1].value, 1200, inView);
  const c2 = useCounter(STATS[2].value, 1500, inView);
  const c3 = useCounter(STATS[3].value, 1600, inView);
  const counts = [c0, c1, c2, c3];

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
      style={{ background: "rgba(244,163,0,0.12)", border: "1px solid rgba(244,163,0,0.15)" }}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          className="flex flex-col items-center justify-center py-8 px-4 bg-cream"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.6 }}
        >
          <span className="text-4xl md:text-5xl font-black text-maroon font-playfair leading-none">
            {counts[i]}{s.suffix}
          </span>
          <span className="text-maroon/50 text-xs font-black uppercase tracking-[0.2em] mt-2">
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function SignatureMandi() {
  return (
    <section className="py-24 px-4 md:px-8 bg-cream" aria-label="Food Categories">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-saffron" />
            <span className="text-saffron text-xs font-black tracking-[0.25em] uppercase">
              What We Do Best
            </span>
            <span className="h-px w-8 bg-saffron" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-maroon font-playfair leading-tight">
            Three Reasons to <span className="text-saffron">Come Back</span>
          </h2>
        </div>

        {/* 3-panel category showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        {/* Animated stats row */}
        <StatsRow />

      </div>
    </section>
  );
}

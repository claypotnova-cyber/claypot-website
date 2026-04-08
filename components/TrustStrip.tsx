"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

const TRUST_ITEMS = [
  {
    icon: "🍽️",
    title: "Online Ordering",
    desc: "Order from anywhere via Toast",
    href: "https://order.toasttab.com/online/clay-pot-3065-centerville-rd-ste-g",
    external: true,
  },
  {
    icon: "🎉",
    title: "Catering Available",
    desc: "Events, offices & celebrations",
    href: "/catering",
    external: false,
  },
  {
    icon: "🥃",
    title: "Dine-In & Lounge",
    desc: "Premium dining experience",
    href: "/about",
    external: false,
  },
  {
    icon: "📍",
    title: "Centreville, VA",
    desc: "3065 Centreville Rd, Suite G",
    href: "https://maps.google.com/?q=3065+Centreville+Rd+Suite+G+Centreville+VA+20120",
    external: true,
  },
];

export default function TrustStrip() {
  return (
    <section
      className="relative z-10 px-4 md:px-8"
      aria-label="Quick info highlights"
    >
      <div className="max-w-7xl mx-auto -mt-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {TRUST_ITEMS.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1} direction="up">
              <motion.a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center text-center p-4 md:p-5 rounded-2xl cursor-pointer
                  transition-all duration-300 group"
                style={{
                  background: "rgba(255,248,241,0.9)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(244,163,0,0.15)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(244,163,0,0.3)",
                }}
              >
                <span className="text-2xl md:text-3xl mb-2.5 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {item.icon}
                </span>
                <h3
                  className="font-semibold text-charcoal text-sm md:text-base mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.title}
                </h3>
                <p className="text-charcoal/55 text-xs md:text-sm leading-snug">
                  {item.desc}
                </p>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

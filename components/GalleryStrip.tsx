"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const GALLERY_IMAGES = [
  {
    src: "/images/real-cocktails.jpg",
    alt: "Colorful cocktails on a tray at Clay Pot bar",
    label: "Signature Cocktails",
  },
  {
    src: "/images/real-chaat.jpg",
    alt: "Clay Pot chaat starter with a drink",
    label: "Chaat Starter",
  },
  {
    src: "/images/real-mandi.jpg",
    alt: "Hyderabadi Mandi platter with chicken and raita",
    label: "Mandi Platter",
  },
  {
    src: "/images/real-samosa.jpg",
    alt: "Crispy samosas with green chutney and tamarind",
    label: "Samosas",
  },
  {
    src: "/images/real-bar-2.jpg",
    alt: "Clay Pot bar with full liquor selection",
    label: "The Bar",
  },
  {
    src: "/images/real-curry-naan.jpg",
    alt: "Butter chicken and curry with garlic naan",
    label: "Curry & Naan",
  },
];

export default function GalleryStrip() {
  return (
    <section
      className="py-16 md:py-20 overflow-hidden"
      style={{ background: "#1A0801" }}
      aria-label="Gallery of dishes and ambiance"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <AnimatedSection>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                The Experience
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-cream-100"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              See & Taste
            </h2>
          </div>
        </AnimatedSection>
      </div>

      {/* Gallery grid */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <AnimatedSection key={img.src} delay={i * 0.06} direction="up">
              <motion.div
                className="relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{
                  aspectRatio: i === 0 || i === 5 ? "4/3" : "4/3",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-end p-4 transition-all duration-300
                    opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(20,4,1,0.8) 0%, transparent 60%)",
                  }}
                >
                  <p
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {img.label}
                  </p>
                </div>

                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(244,163,0,0.4)" }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

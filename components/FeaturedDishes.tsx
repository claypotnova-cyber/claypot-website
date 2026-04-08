"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FEATURED_DISHES } from "@/lib/data/menu";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

const DIETARY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  veg: { bg: "rgba(34,197,94,0.12)", text: "#16a34a", dot: "#22c55e" },
  "non-veg": { bg: "rgba(239,68,68,0.12)", text: "#dc2626", dot: "#ef4444" },
  vegan: { bg: "rgba(34,197,94,0.12)", text: "#15803d", dot: "#4ade80" },
  "gluten-free": { bg: "rgba(251,191,36,0.12)", text: "#d97706", dot: "#fbbf24" },
};

const SPICE_ICONS: Record<string, string> = {
  mild: "🌶️",
  medium: "🌶️🌶️",
  spicy: "🌶️🌶️🌶️",
  "very-spicy": "🔥🔥",
};

const PLACEHOLDER_IMAGES: Record<string, string> = {
  appetizers: "/images/dish-tandoori.png",
  "mains-nonveg": "/images/dish-butter-chicken.png",
  "mains-veg": "/images/dish-palak-paneer.png",
  biryani: "/images/dish-biryani.png",
  tandoor: "/images/dish-tandoori.png",
  drinks: "/images/dish-mango-lassi.png",
};

export default function FeaturedDishes() {
  const dishes = FEATURED_DISHES.slice(0, 6);

  return (
    <section
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #FFF8F1 0%, #FFF2E4 100%)" }}
      aria-label="Featured menu items"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-saffron" />
                <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                  Our Specialties
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold text-charcoal mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Signature Dishes
              </h2>
              <p className="text-charcoal/60 text-lg max-w-lg">
                Handcrafted with authentic recipes passed through generations, elevated with a modern touch.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/menu"
                className="px-6 py-3 rounded-full font-semibold text-sm border-2 border-saffron text-saffron
                  transition-all hover:bg-saffron hover:text-white hover:-translate-y-0.5"
              >
                Full Menu
              </Link>
              <a
                href={ORDER_ONLINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold text-sm text-charcoal
                  transition-all hover:-translate-y-0.5 hover:shadow-glow"
                style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
              >
                Order Now
              </a>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {dishes.map((dish, i) => {
            const imgSrc =
              dish.image || PLACEHOLDER_IMAGES[dish.category] || "/images/dish-butter-chicken.png";
            const primaryDietary = dish.dietary[0];
            const dietaryStyle = primaryDietary ? DIETARY_COLORS[primaryDietary] : null;

            return (
              <AnimatedSection key={dish.id} delay={i * 0.08} direction="up">
                <motion.div
                  className="rounded-2xl overflow-hidden bg-white group cursor-default"
                  style={{
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)",
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(244,163,0,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Badges overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {dish.bestseller && (
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-white"
                          style={{ background: "linear-gradient(135deg, #651F12, #8B2A18)" }}
                        >
                          Bestseller
                        </span>
                      )}
                      {dish.chefsPick && !dish.bestseller && (
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-charcoal"
                          style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
                        >
                          Chef&apos;s Pick
                        </span>
                      )}
                    </div>
                    {/* Spice */}
                    {dish.spice && (
                      <div className="absolute top-3 right-3">
                        <span
                          className="px-2 py-1 rounded-full text-[11px] backdrop-blur-sm"
                          style={{ background: "rgba(0,0,0,0.5)", color: "white" }}
                        >
                          {SPICE_ICONS[dish.spice]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Dietary + Category */}
                    <div className="flex items-center gap-2 mb-2.5">
                      {dietaryStyle && (
                        <span
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: dietaryStyle.bg,
                            color: dietaryStyle.text,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{ background: dietaryStyle.dot }}
                          />
                          {primaryDietary.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-charcoal font-bold text-lg mb-2 leading-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {dish.name}
                    </h3>
                    <p className="text-charcoal/55 text-sm leading-relaxed mb-4 line-clamp-2">
                      {dish.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className="font-bold text-lg"
                        style={{ color: "#651F12" }}
                      >
                        {dish.price}
                      </span>
                      <a
                        href={ORDER_ONLINE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-charcoal
                          transition-all hover:-translate-y-0.5 hover:shadow-glow"
                        style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
                      >
                        Order →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-maroon font-semibold hover:text-saffron transition-colors"
            >
              Explore the Full Menu
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

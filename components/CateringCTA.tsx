"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const EVENT_TYPES = [
  { icon: "💼", label: "Office Lunches" },
  { icon: "🎉", label: "Birthday Parties" },
  { icon: "💍", label: "Weddings & Receptions" },
  { icon: "🏢", label: "Corporate Events" },
  { icon: "👨‍👩‍👧‍👦", label: "Family Gatherings" },
  { icon: "🎓", label: "Graduation Parties" },
];

export default function CateringCTA() {
  return (
    <section
      className="relative overflow-hidden section-padding"
      style={{
        background: "linear-gradient(135deg, #FFF8F1 0%, #FFF0DC 50%, #FFF8F1 100%)",
      }}
      aria-label="Catering services"
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "#F4A300" }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "#651F12" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <AnimatedSection direction="left">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-saffron" />
                <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                  Catering Services
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-bold text-charcoal mb-5 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Bringing Clay Pot
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #651F12, #8B2A18)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  To Your Event
                </span>
              </h2>

              <p className="text-charcoal/65 text-lg leading-relaxed mb-8">
                From intimate office lunches to grand celebrations, our full-service catering
                delivers the authentic Clay Pot experience to your venue. We handle everything —
                from menu planning to setup.
              </p>

              {/* Event type chips */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {EVENT_TYPES.map((et) => (
                  <span
                    key={et.label}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium
                      text-charcoal border border-charcoal/12 transition-all duration-200
                      hover:border-saffron/50 hover:bg-saffron/8"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                  >
                    {et.icon} {et.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/catering"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide
                    text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-maroon"
                  style={{ background: "linear-gradient(135deg, #651F12, #8B2A18)" }}
                >
                  🎉 Explore Catering
                </Link>
                <a
                  href="tel:+17035550134"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm
                    border-2 border-maroon text-maroon transition-all duration-300
                    hover:bg-maroon hover:text-white hover:-translate-y-0.5"
                >
                  📞 Call to Inquire
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — visual feature block */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "50+",
                  label: "Events Catered",
                  desc: "From intimate to grand",
                  icon: "🎊",
                  grad: "linear-gradient(135deg, #F4A300, #C9962B)",
                },
                {
                  title: "100+",
                  label: "Guest Capacity",
                  desc: "Per event we can serve",
                  icon: "👥",
                  grad: "linear-gradient(135deg, #651F12, #8B2A18)",
                },
                {
                  title: "Full",
                  label: "Service Included",
                  desc: "Setup, serving & cleanup",
                  icon: "✅",
                  grad: "linear-gradient(135deg, #2D0E05, #651F12)",
                },
                {
                  title: "Custom",
                  label: "Menus Available",
                  desc: "Tailored to your event",
                  icon: "📋",
                  grad: "linear-gradient(135deg, #7A5B1A, #C9962B)",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.title}
                  className="rounded-2xl p-5 text-white"
                  style={{
                    background: stat.grad,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <span className="text-2xl mb-2 block">{stat.icon}</span>
                  <p
                    className="text-3xl font-bold mb-0.5"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {stat.title}
                  </p>
                  <p className="text-white/80 text-sm font-semibold">{stat.label}</p>
                  <p className="text-white/55 text-xs mt-1">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

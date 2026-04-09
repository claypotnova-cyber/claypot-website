"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/data/site";

const EVENT_TYPES = [
  { icon: "🎂", label: "Birthday Parties" },
  { icon: "💼", label: "Office Lunches" },
  { icon: "👨‍👩‍👧‍👦", label: "Family Gatherings" },
  { icon: "🎊", label: "Celebrations" },
];

export default function CateringCTA() {
  const waNumber = SITE.phoneRaw.replace(/\D/g, "");
  const waLink = `https://wa.me/${waNumber}?text=Hi%20Clay%20Pot,%20I%20would%20like%20to%20inquire%20about%20catering.`;

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
                  Bring Clay Pot to You
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-black text-charcoal mb-5 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Catering for Parties, Office Lunches & Special Events
              </h2>

              <p className="text-charcoal/70 text-lg md:text-xl font-medium leading-relaxed mb-8">
                Bring Clay Pot to your next event. From our massive signature Mandi platters to aromatic biryanis, classic curries, breads, and desserts — we deliver authentic Indian flavors that your guests will never forget. No event is too small or too large.
              </p>

              {/* Event type chips */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {EVENT_TYPES.map((et) => (
                  <span
                    key={et.label}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider
                      text-charcoal border border-maroon/10 transition-all duration-200
                      hover:border-saffron/50 hover:bg-saffron/10"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                  >
                    {et.icon} {et.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase
                    text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-maroon bg-maroon shadow-lg"
                >
                  📞 Call for Catering
                </a>
                
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase
                    text-charcoal transition-all duration-300 hover:-translate-y-1 bg-[#25D366]/20 border border-[#25D366]/30 hover:bg-[#25D366]/30"
                >
                  Chat on WhatsApp
                </a>

                <Link
                  href="/catering"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase
                    border-2 border-saffron text-charcoal transition-all duration-300 hover:bg-saffron/10 hover:-translate-y-0.5"
                >
                  Request a Custom Quote
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — visual feature block */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Signature",
                  label: "Mandi Platters",
                  desc: "Crowd favorites",
                  icon: "🥘",
                  grad: "linear-gradient(135deg, #F4A300, #C9962B)",
                },
                {
                  title: "Any Size",
                  label: "Group Catering",
                  desc: "Intimate to grand",
                  icon: "👥",
                  grad: "linear-gradient(135deg, #651F12, #8B2A18)",
                },
                {
                  title: "Custom",
                  label: "Event Menus",
                  desc: "Tailored to your needs",
                  icon: "📋",
                  grad: "linear-gradient(135deg, #2D0E05, #651F12)",
                },
                {
                  title: "Fast",
                  label: "Quote Turnaround",
                  desc: "Via WhatsApp & Phone",
                  icon: "⚡",
                  grad: "linear-gradient(135deg, #7A5B1A, #C9962B)",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.title}
                  className="rounded-2xl p-6 text-white flex flex-col justify-between"
                  style={{
                    background: stat.grad,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    aspectRatio: "1/1",
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <span className="text-3xl mb-auto">{stat.icon}</span>
                  <div>
                    <p
                      className="text-2xl sm:text-3xl font-black mb-1 leading-none"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {stat.title}
                    </p>
                    <p className="text-white/90 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                    <p className="text-white/60 text-xs mt-1 font-medium">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

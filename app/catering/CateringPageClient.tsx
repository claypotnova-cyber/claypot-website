"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/data/site";

const EVENT_TYPES = [
  {
    icon: "💼",
    title: "Office Lunches",
    desc: "Fuel your team with authentic flavors. We handle delivery and setup for corporate offices of all sizes.",
    tag: "Most Popular",
  },
  {
    icon: "🏢",
    title: "Corporate Events",
    desc: "Impress clients and colleagues with a full-service Indian catering experience at your next corporate event.",
    tag: "",
  },
  {
    icon: "🎉",
    title: "Birthday Parties",
    desc: "Make your celebration memorable with vibrant Indian flavors and a premium catering spread.",
    tag: "",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Gatherings",
    desc: "Bring the family together over authentic home-style Indian cooking elevated for large gatherings.",
    tag: "",
  },
  {
    icon: "💍",
    title: "Weddings & Receptions",
    desc: "A sophisticated, abundant Indian feast curated for your special day with full presentation services.",
    tag: "Premium",
  },
  {
    icon: "🎓",
    title: "Graduations & Milestones",
    desc: "Celebrate achievements with food worthy of the moment — colorful, delicious, and well-presented.",
    tag: "",
  },
];

const WHY_US = [
  { icon: "🍲", title: "Authentic Recipes", desc: "Every dish crafted from traditional recipes" },
  { icon: "🚚", title: "Full Delivery & Setup", desc: "We bring everything to your venue" },
  { icon: "📋", title: "Custom Menus", desc: "Tailored to your event and guest count" },
  { icon: "🌿", title: "Dietary Accommodations", desc: "Veg, vegan, and gluten-free options" },
  { icon: "⏰", title: "On-Time Guarantee", desc: "Reliable delivery and professional service" },
  { icon: "💬", title: "Dedicated Support", desc: "Personal point of contact throughout" },
];

export default function CateringPageClient() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    eventType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mailto fallback — backend to be wired later
    const subject = encodeURIComponent(`Catering Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nEvent Date: ${formState.date}\nGuest Count: ${formState.guests}\nEvent Type: ${formState.eventType}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 100%)" }}
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 60%, #F4A300, transparent 45%), radial-gradient(circle at 75% 40%, #651F12, transparent 45%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                Events & Catering
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold text-cream-100 mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Catering for
              <br />
              <span style={{
                background: "linear-gradient(135deg, #F4A300, #E8B84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Every Occasion
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
              From boardroom to banquet hall — we bring the authentic Clay Pot experience
              directly to your event with full-service, professional catering.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#inquiry"
                className="px-8 py-4 rounded-full font-bold text-charcoal transition-all hover:-translate-y-1 hover:shadow-glow-lg"
                style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}>
                🎉 Get a Free Quote
              </a>
              <a href={`tel:${SITE.phoneRaw}`}
                className="px-8 py-4 rounded-full font-semibold text-cream-100 border-2 border-white/20
                  transition-all hover:border-saffron hover:text-saffron hover:-translate-y-0.5">
                📞 Call {SITE.phone}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Event Types */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}>
                We Cater For
              </h2>
              <p className="text-charcoal/60 text-lg max-w-lg mx-auto">
                No event is too small or too grand. We bring the same care to every occasion.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVENT_TYPES.map((et, i) => (
              <AnimatedSection key={et.title} delay={i * 0.08} direction="up">
                <motion.div
                  className="bg-white rounded-2xl p-6 relative overflow-hidden"
                  style={{
                    border: "1px solid rgba(244,163,0,0.1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)",
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 12px 36px rgba(0,0,0,0.1), 0 0 0 1px rgba(244,163,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  {et.tag && (
                    <span className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1 rounded-full text-charcoal"
                      style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}>
                      {et.tag}
                    </span>
                  )}
                  <span className="text-4xl mb-4 block">{et.icon}</span>
                  <h3 className="font-bold text-charcoal text-xl mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    {et.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{et.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Clay Pot */}
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-cream-100 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}>
                Why Choose
                <span style={{
                  background: "linear-gradient(135deg, #F4A300, #E8B84C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}> Clay Pot?</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_US.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.07} direction="up">
                <div className="flex gap-4 p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="text-cream-100 font-semibold text-base mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}>
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="section-padding bg-cream">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}>
                Request a Quote
              </h2>
              <p className="text-charcoal/60 text-lg">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {submitted ? (
              <div className="text-center py-16">
                <span className="text-6xl block mb-4">🎉</span>
                <h3 className="text-2xl font-bold text-charcoal mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}>
                  Inquiry Sent!
                </h3>
                <p className="text-charcoal/60">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 md:p-10"
                style={{
                  border: "1px solid rgba(244,163,0,0.15)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                }}
              >
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-charcoal/70 text-sm font-medium mb-2" htmlFor="catering-name">
                      Full Name *
                    </label>
                    <input
                      id="catering-name"
                      required
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-charcoal placeholder:text-charcoal/30
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                      style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal/70 text-sm font-medium mb-2" htmlFor="catering-email">
                      Email Address *
                    </label>
                    <input
                      id="catering-email"
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-charcoal placeholder:text-charcoal/30
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                      style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal/70 text-sm font-medium mb-2" htmlFor="catering-phone">
                      Phone Number
                    </label>
                    <input
                      id="catering-phone"
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-charcoal placeholder:text-charcoal/30
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                      style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                      placeholder="(703) 555-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal/70 text-sm font-medium mb-2" htmlFor="catering-date">
                      Event Date
                    </label>
                    <input
                      id="catering-date"
                      type="date"
                      value={formState.date}
                      onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-charcoal
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                      style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal/70 text-sm font-medium mb-2" htmlFor="catering-guests">
                      Number of Guests
                    </label>
                    <input
                      id="catering-guests"
                      type="number"
                      min="10"
                      value={formState.guests}
                      onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-charcoal placeholder:text-charcoal/30
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                      style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                      placeholder="e.g. 50"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal/70 text-sm font-medium mb-2" htmlFor="catering-type">
                      Event Type
                    </label>
                    <select
                      id="catering-type"
                      value={formState.eventType}
                      onChange={(e) => setFormState({ ...formState, eventType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-charcoal
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                      style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                    >
                      <option value="">Select event type</option>
                      <option>Office Lunch</option>
                      <option>Corporate Event</option>
                      <option>Birthday Party</option>
                      <option>Wedding / Reception</option>
                      <option>Family Gathering</option>
                      <option>Graduation Party</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-charcoal/70 text-sm font-medium mb-2" htmlFor="catering-message">
                    Additional Details
                  </label>
                  <textarea
                    id="catering-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-charcoal placeholder:text-charcoal/30
                      focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all resize-none"
                    style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                    placeholder="Tell us about your event, dietary requirements, favorite dishes, or any questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-bold text-charcoal text-base tracking-wide
                    transition-all hover:-translate-y-1 hover:shadow-glow-lg focus:outline-none focus:ring-2 focus:ring-saffron"
                  style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
                >
                  🎉 Send Catering Inquiry
                </button>

                <p className="text-center text-charcoal/40 text-xs mt-4">
                  Or call us directly at{" "}
                  <a href={`tel:${SITE.phoneRaw}`} className="text-saffron hover:underline">
                    {SITE.phone}
                  </a>
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

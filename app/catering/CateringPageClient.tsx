"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/data/site";

// ─── Catering Menu Data (no prices) ──────────────────────────────────────────

const CATERING_MENU = [
  {
    id: "appetizers",
    icon: "🥗",
    label: "Appetizers",
    veg: ["Veg Pakora", "Gobi 65", "Paneer 65"],
    nonVeg: ["Chicken 65", "Chilli Chicken", "Bang Bang Shrimp", "Baby Goat Sukka"],
  },
  {
    id: "curries",
    icon: "🍲",
    label: "Curries",
    veg: ["Paneer Butter Masala", "Kadai Paneer", "Dal Tadka", "Veg Kurma"],
    nonVeg: ["Butter Chicken", "Chicken Tikka Masala", "Chettinad Chicken", "Gongura Chicken"],
  },
  {
    id: "biryanis",
    icon: "🍚",
    label: "Biryanis",
    veg: ["Veg Dum Biryani", "Paneer Biryani"],
    nonVeg: ["Chicken Dum Biryani", "Boneless Chicken Biryani", "Goat Dum Biryani", "Gongura Chicken Biryani", "Shrimp Biryani"],
  },
  {
    id: "breads",
    icon: "🫓",
    label: "Breads",
    veg: ["Butter Naan", "Garlic Naan", "Tandoori Roti", "Parota"],
    nonVeg: [],
  },
  {
    id: "sides",
    icon: "🥣",
    label: "Sides",
    veg: ["White Rice", "Biryani Rice", "Raita", "Salad"],
    nonVeg: [],
  },
  {
    id: "desserts",
    icon: "🍮",
    label: "Desserts",
    veg: ["Gulab Jamun", "Rasmalai", "Double Ka Meetha", "Apricot Delight"],
    nonVeg: [],
  },
];

const HIGHLIGHTS = [
  { icon: "✏️", title: "Customizable Menu", desc: "Tailor every dish to your event's needs and preferences" },
  { icon: "🌿", title: "Veg & Non-Veg Options", desc: "Extensive vegetarian and non-vegetarian selections for every guest" },
  { icon: "👥", title: "Large Group Friendly", desc: "We comfortably serve groups from 20 to 500+" },
  { icon: "🔥", title: "Fresh Preparation", desc: "Every dish cooked fresh on the day of your event" },
  { icon: "🚚", title: "Pickup or Delivery", desc: "Flexible service options to fit your venue and budget" },
  { icon: "⏰", title: "On-Time Guarantee", desc: "Reliable delivery and professional setup every time" },
];

// ─── Component ────────────────────────────────────────────────────────────────

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Catering Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nEvent Date: ${formState.date}\nGuest Count: ${formState.guests}\nEvent Type: ${formState.eventType}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 60%, #F4A300, transparent 45%), radial-gradient(circle at 75% 40%, #651F12, transparent 45%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                Catering Menu
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-cream mb-5 font-playfair"
            >
              Catering Menu
            </h1>
            <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Authentic Indian catering for every occasion — from intimate family gatherings
              to grand corporate events and weddings.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#inquiry"
                className="px-8 py-4 rounded-full font-bold text-charcoal transition-all hover:-translate-y-1"
                style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
              >
                Get a Free Quote
              </a>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="px-8 py-4 rounded-full font-semibold text-cream border-2 border-white/20
                  transition-all hover:border-saffron hover:text-saffron"
              >
                Call {SITE.phone}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="inline-block text-saffron text-xs font-black tracking-[0.25em] uppercase mb-4">
              Why Clay Pot Catering
            </span>
            <p className="text-maroon/70 text-lg md:text-xl font-medium leading-relaxed">
              At Clay Pot, we bring the same bold, authentic Indian flavors from our kitchen
              directly to your event. Whether you need a lavish biryani spread for a wedding
              or a quick office lunch, our team crafts every dish fresh — on time, every time.
              Choose from our curated catering menu below or ask us to customize it just for you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Catering Menu Categories ──────────────────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-maroon font-playfair mb-4">
                Catering Menu
              </h2>
              <p className="text-maroon/50 text-base max-w-xl mx-auto mb-8">
                All menus are fully customizable. We serve in small, medium, and large trays to fit any group size.
              </p>

              {/* Tray Sizes */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
                {[
                  { size: "Small Tray", guests: "10–20 guests", icon: "🥘" },
                  { size: "Medium Tray", guests: "25–40 guests", icon: "🍲" },
                  { size: "Large Tray", guests: "50–80 guests", icon: "🫕" },
                ].map((tray) => (
                  <div
                    key={tray.size}
                    className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl bg-maroon/5 border border-maroon/10"
                  >
                    <span className="text-2xl">{tray.icon}</span>
                    <div className="text-left">
                      <p className="text-maroon font-black text-sm uppercase tracking-wide">{tray.size}</p>
                      <p className="text-maroon/50 text-xs font-medium">{tray.guests}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CATERING_MENU.map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.07} direction="up">
                <motion.div
                  className="bg-cream rounded-2xl p-7 h-full"
                  style={{
                    border: "1px solid rgba(101, 31, 18, 0.1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)",
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 16px 40px rgba(101,31,18,0.12), 0 0 0 1px rgba(244,163,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  {/* Category heading */}
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-maroon/10">
                    <span className="text-4xl">{cat.icon}</span>
                    <h3 className="text-2xl font-extrabold text-maroon font-playfair">
                      {cat.label}
                    </h3>
                  </div>

                  {/* Veg items */}
                  {cat.veg.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="p-0.5 border-2 border-green-600/30 rounded-sm">
                          <div className="w-2 h-2 rounded-full bg-green-600" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-700/70">
                          Vegetarian
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {cat.veg.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-maroon/80 font-medium text-[15px]">
                            <span className="w-1 h-1 rounded-full bg-saffron shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Non-veg items */}
                  {cat.nonVeg.length > 0 && (
                    <div className={cat.veg.length > 0 ? "pt-4 border-t border-maroon/8" : ""}>
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="p-0.5 border-2 border-red-600/30 rounded-sm">
                          <div className="w-2 h-2 rounded-full bg-red-600" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700/70">
                          Non-Vegetarian
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {cat.nonVeg.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-maroon/80 font-medium text-[15px]">
                            <span className="w-1 h-1 rounded-full bg-saffron shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <p className="text-center text-maroon/40 text-sm mt-10 italic">
              * Menu items may vary by season and availability. Custom requests are always welcome.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Highlights ───────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 md:px-8"
        style={{ background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold text-cream mb-4 font-playfair"
              >
                Why Choose{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #F4A300, #E8B84C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Clay Pot?
                </span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HIGHLIGHTS.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.07} direction="up">
                <div
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="text-cream font-semibold text-base mb-1 font-playfair">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-maroon font-playfair mb-5">
              Let us cater your{" "}
              <span className="text-saffron">next event</span>
            </h2>
            <p className="text-maroon/60 text-lg mb-8 leading-relaxed">
              Fill out the inquiry form below and our catering team will get back to you
              within 24 hours with a custom quote and menu recommendations.
            </p>
            <a
              href="#inquiry"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-charcoal text-sm uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
            >
              Request a Quote →
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Inquiry Form ─────────────────────────────────────────────────────── */}
      <section id="inquiry" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-maroon font-playfair mb-4">
                Catering Inquiry
              </h2>
              <p className="text-maroon/60 text-lg">
                Share your event details and we&apos;ll craft the perfect menu for you.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {submitted ? (
              <div className="text-center py-16">
                <span className="text-6xl block mb-4">🎉</span>
                <h3 className="text-2xl font-bold text-maroon mb-2 font-playfair">
                  Inquiry Sent!
                </h3>
                <p className="text-maroon/60">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-cream rounded-3xl p-8 md:p-10"
                style={{
                  border: "1px solid rgba(244,163,0,0.15)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
                }}
              >
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {/* Name */}
                  <div>
                    <label className="block text-maroon/70 text-sm font-semibold mb-2" htmlFor="catering-name">
                      Full Name *
                    </label>
                    <input
                      id="catering-name"
                      required
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-maroon placeholder:text-maroon/30
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all bg-white"
                      style={{ borderColor: "rgba(101,31,18,0.15)" }}
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-maroon/70 text-sm font-semibold mb-2" htmlFor="catering-email">
                      Email Address *
                    </label>
                    <input
                      id="catering-email"
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-maroon placeholder:text-maroon/30
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all bg-white"
                      style={{ borderColor: "rgba(101,31,18,0.15)" }}
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-maroon/70 text-sm font-semibold mb-2" htmlFor="catering-phone">
                      Phone Number
                    </label>
                    <input
                      id="catering-phone"
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-maroon placeholder:text-maroon/30
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all bg-white"
                      style={{ borderColor: "rgba(101,31,18,0.15)" }}
                      placeholder="(703) 555-0000"
                    />
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className="block text-maroon/70 text-sm font-semibold mb-2" htmlFor="catering-date">
                      Event Date
                    </label>
                    <input
                      id="catering-date"
                      type="date"
                      value={formState.date}
                      onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-maroon
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all bg-white"
                      style={{ borderColor: "rgba(101,31,18,0.15)" }}
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-maroon/70 text-sm font-semibold mb-2" htmlFor="catering-type">
                      Event Type
                    </label>
                    <select
                      id="catering-type"
                      value={formState.eventType}
                      onChange={(e) => setFormState({ ...formState, eventType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-maroon
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all bg-white"
                      style={{ borderColor: "rgba(101,31,18,0.15)" }}
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

                  {/* Guest Count */}
                  <div>
                    <label className="block text-maroon/70 text-sm font-semibold mb-2" htmlFor="catering-guests">
                      Guest Count
                    </label>
                    <input
                      id="catering-guests"
                      type="number"
                      min="10"
                      value={formState.guests}
                      onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-maroon placeholder:text-maroon/30
                        focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all bg-white"
                      style={{ borderColor: "rgba(101,31,18,0.15)" }}
                      placeholder="e.g. 50"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-maroon/70 text-sm font-semibold mb-2" htmlFor="catering-message">
                    Message
                  </label>
                  <textarea
                    id="catering-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-maroon placeholder:text-maroon/30
                      focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all resize-none bg-white"
                    style={{ borderColor: "rgba(101,31,18,0.15)" }}
                    placeholder="Tell us about your event, dietary requirements, favorite dishes, or any questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-bold text-charcoal text-base tracking-wide
                    transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-saffron"
                  style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
                >
                  Send Catering Inquiry
                </button>

                <p className="text-center text-maroon/40 text-xs mt-4">
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

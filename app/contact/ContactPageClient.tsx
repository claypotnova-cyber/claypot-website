"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/data/site";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

export default function ContactPageClient() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = encodeURIComponent(formState.subject || `Message from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${sub}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 100%)" }}
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, #F4A300, transparent 45%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                Get In Touch
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-cream-100 mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Contact Us
            </h1>
            <p className="text-white/60 text-lg max-w-lg mx-auto">
              Have a question, need a reservation, or want to talk catering? We&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick actions row */}
      <section className="py-8 border-b border-saffron/10" style={{ background: "#FFF8F1" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "📞",
                title: "Call Us",
                value: SITE.phone,
                href: `tel:${SITE.phoneRaw}`,
                label: "Call Now",
              },
              {
                icon: "✉️",
                title: "Email Us",
                value: SITE.email,
                href: `mailto:${SITE.email}`,
                label: "Send Email",
              },
              {
                icon: "📍",
                title: "Visit Us",
                value: SITE.addressShort,
                href: SITE.googleMapsUrl,
                label: "Get Directions",
              },
            ].map((item) => (
              <AnimatedSection key={item.title} direction="up">
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white group transition-all hover:-translate-y-1"
                  style={{
                    border: "1px solid rgba(244,163,0,0.12)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-charcoal/50 text-xs font-medium mb-0.5">{item.title}</p>
                    <p className="text-charcoal font-semibold text-sm mb-1 truncate">{item.value}</p>
                    <span className="text-saffron text-xs font-semibold group-hover:underline">{item.label} →</span>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="section-padding" style={{ background: "#FFF8F1" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Left info */}
            <AnimatedSection direction="left">
              <div className="flex flex-col gap-6">
                {/* Hours */}
                <div className="bg-white rounded-2xl p-7"
                  style={{
                    border: "1px solid rgba(244,163,0,0.12)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)",
                  }}>
                  <h2 className="font-bold text-xl text-charcoal mb-5 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    🕐 Hours
                  </h2>
                  <ul className="flex flex-col gap-2.5">
                    {SITE.hours.map(({ day, hours }) => (
                      <li key={day} className="flex justify-between text-sm">
                        <span className="text-charcoal/50 w-28">{day}</span>
                        <span className="text-charcoal font-medium">{hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)", border: "1px solid rgba(244,163,0,0.12)" }}>
                  <iframe
                    title="Clay Pot location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.9!2d-77.4363!3d38.8481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64df07fe7b5c5%3A0x0!2sClay+Pot+Indian+Bar+%26+Restaurant!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="280"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Social */}
                <div className="bg-white rounded-2xl p-6"
                  style={{
                    border: "1px solid rgba(244,163,0,0.12)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}>
                  <h3 className="font-bold text-charcoal text-base mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {[
                      { label: "Instagram", icon: "📸", href: SITE.socialLinks.instagram },
                      { label: "Facebook", icon: "👍", href: SITE.socialLinks.facebook },
                      { label: "Yelp", icon: "⭐", href: SITE.socialLinks.yelp },
                      { label: "Google", icon: "🔍", href: SITE.socialLinks.google },
                    ].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl text-sm font-medium text-charcoal/70
                          border border-charcoal/10 hover:border-saffron/40 hover:text-saffron transition-all">
                        {s.icon}
                        <span className="hidden lg:inline">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right — Contact Form */}
            <AnimatedSection direction="right" delay={0.1}>
              {submitted ? (
                <div className="bg-white rounded-2xl p-10 text-center"
                  style={{
                    border: "1px solid rgba(244,163,0,0.15)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                  }}>
                  <span className="text-5xl mb-4 block">✉️</span>
                  <h3 className="text-2xl font-bold text-charcoal mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    Message Sent!
                  </h3>
                  <p className="text-charcoal/55 mb-6">We&apos;ll get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)}
                    className="text-saffron font-semibold hover:underline text-sm">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8"
                  style={{
                    border: "1px solid rgba(244,163,0,0.15)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                  }}>
                  <h2 className="text-2xl font-bold text-charcoal mb-6"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    Send a Message
                  </h2>

                  <div className="flex flex-col gap-4 mb-5">
                    {[
                      { id: "contact-name", label: "Your Name", type: "text", key: "name", placeholder: "Your name", required: true },
                      { id: "contact-email", label: "Email", type: "email", key: "email", placeholder: "your@email.com", required: true },
                      { id: "contact-subject", label: "Subject", type: "text", key: "subject", placeholder: "How can we help?", required: false },
                    ].map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.id}
                          className="block text-charcoal/70 text-sm font-medium mb-1.5">
                          {field.label} {field.required && "*"}
                        </label>
                        <input
                          id={field.id}
                          required={field.required}
                          type={field.type}
                          value={(formState as Record<string, string>)[field.key]}
                          onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border text-charcoal placeholder:text-charcoal/30
                            focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                          style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="contact-message"
                        className="block text-charcoal/70 text-sm font-medium mb-1.5">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border text-charcoal placeholder:text-charcoal/30
                          focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all resize-none"
                        style={{ borderColor: "rgba(244,163,0,0.2)", background: "#FEFAF5" }}
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full py-4 rounded-full font-bold text-charcoal text-sm tracking-wide
                      transition-all hover:-translate-y-1 hover:shadow-glow"
                    style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}>
                    ✉️ Send Message
                  </button>

                  <p className="text-center text-charcoal/40 text-xs mt-4">
                    Or call directly at{" "}
                    <a href={`tel:${SITE.phoneRaw}`} className="text-saffron hover:underline">
                      {SITE.phone}
                    </a>
                  </p>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-12 text-center"
        style={{ background: "linear-gradient(135deg, #1A0801, #2D0E05)" }}>
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Ready to Order?
          </h2>
          <a href={ORDER_ONLINE_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-charcoal
              transition-all hover:-translate-y-1 hover:shadow-glow-lg"
            style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}>
            🍽️ Order Online Now
          </a>
        </AnimatedSection>
      </section>
    </>
  );
}

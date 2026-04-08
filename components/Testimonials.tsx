"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { TESTIMONIALS } from "@/lib/data/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i < rating ? "#F4A300" : "rgba(244,163,0,0.2)"}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #FFF2E4 0%, #FFF8F1 100%)" }}
      aria-label="Customer reviews"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                What People Say
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-charcoal mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Loved by Our Guests
            </h2>
            <p className="text-charcoal/60 text-lg max-w-lg mx-auto">
              Don&apos;t take our word for it — here&apos;s what our community says about Clay Pot.
            </p>
          </div>
        </AnimatedSection>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((review, i) => (
            <AnimatedSection key={review.id} delay={i * 0.08} direction="up">
              <motion.div
                className="rounded-2xl p-6 h-full flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(244,163,0,0.1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 36px rgba(0,0,0,0.1), 0 0 0 1px rgba(244,163,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                {/* Quote icon */}
                <span
                  className="text-4xl leading-none mb-4 block"
                  style={{ color: "rgba(244,163,0,0.3)" }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Stars */}
                <StarRating rating={review.rating} />

                {/* Quote */}
                <blockquote className="text-charcoal/70 text-sm leading-relaxed mt-4 mb-5 flex-1">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center justify-between pt-4 border-t border-charcoal/8">
                  <div>
                    <p className="text-charcoal font-semibold text-sm">{review.name}</p>
                    <p className="text-charcoal/45 text-xs">{review.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(244,163,0,0.12)",
                        color: "#C9962B",
                      }}
                    >
                      {review.source}
                    </span>
                    <span className="text-charcoal/35 text-[11px]">{review.date}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom social proof bar */}
        <AnimatedSection delay={0.3}>
          <div
            className="mt-10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
            style={{
              background: "linear-gradient(135deg, #1A0801, #2D0E05)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {[
              { value: "4.8★", label: "Google Rating" },
              { value: "500+", label: "Reviews" },
              { value: "98%", label: "Would Recommend" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    background: "linear-gradient(135deg, #F4A300, #E8B84C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-white/50 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

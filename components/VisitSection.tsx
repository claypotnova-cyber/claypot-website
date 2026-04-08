import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/data/site";

export default function VisitSection() {
  return (
    <section
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #FFF8F1 0%, #FFF2E4 100%)" }}
      aria-label="Visit us at Clay Pot"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                Find Us
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-charcoal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Come Visit Us
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Info */}
          <AnimatedSection direction="left">
            <div className="flex flex-col gap-6">
              {/* Hours */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "white",
                  border: "1px solid rgba(244,163,0,0.12)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  className="font-bold text-lg text-charcoal mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  🕐 Hours of Operation
                </h3>
                <ul className="flex flex-col gap-2">
                  {SITE.hours.map(({ day, hours }) => (
                    <li key={day} className="flex justify-between text-sm">
                      <span className="text-charcoal/55 w-28">{day}</span>
                      <span className="text-charcoal font-medium">{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact + Address */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "white",
                  border: "1px solid rgba(244,163,0,0.12)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  className="font-bold text-lg text-charcoal mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  📍 Location & Contact
                </h3>
                <address className="not-italic flex flex-col gap-3">
                  <div>
                    <p className="text-charcoal text-sm leading-relaxed">
                      {SITE.addressShort}
                      <br />
                      {SITE.city}
                    </p>
                  </div>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="text-saffron font-semibold text-sm hover:text-gold-dark transition-colors"
                  >
                    {SITE.phone}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-charcoal/55 text-sm hover:text-saffron transition-colors"
                  >
                    {SITE.email}
                  </a>
                </address>

                {/* Action buttons */}
                <div className="flex gap-3 mt-5">
                  <a
                    href={SITE.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #651F12, #8B2A18)" }}
                  >
                    📍 Directions
                  </a>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="flex-1 text-center py-3 rounded-full text-sm font-semibold text-maroon
                      border-2 border-maroon transition-all hover:bg-maroon hover:text-white hover:-translate-y-0.5"
                  >
                    📞 Call Us
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Map */}
          <AnimatedSection direction="right" delay={0.1}>
            <div
              className="h-full min-h-80 rounded-2xl overflow-hidden relative"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(244,163,0,0.12)",
              }}
            >
              {/* Map embed */}
              <iframe
                title="Clay Pot Indian Bar & Restaurant location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.9!2d-77.4363!3d38.8481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64df07fe7b5c5%3A0x0!2sClay+Pot+Indian+Bar+%26+Restaurant!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Info card overlay at bottom */}
              <div
                className="absolute bottom-4 left-4 right-4 rounded-xl p-4"
                style={{
                  background: "rgba(20,4,1,0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(244,163,0,0.2)",
                }}
              >
                <p
                  className="text-cream-100 font-bold text-sm leading-tight mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Clay Pot Indian Bar & Restaurant
                </p>
                <p className="text-cream-100/55 text-xs">{SITE.address}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

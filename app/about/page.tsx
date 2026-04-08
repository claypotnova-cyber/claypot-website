import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/data/site";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind Clay Pot Indian Bar & Restaurant — our philosophy, our food, and our commitment to authentic Indian dining in Centreville, VA.",
};

const VALUES = [
  {
    icon: "🍲",
    title: "Authentic Flavors",
    desc: "Every dish is crafted from recipes that honor centuries of Indian culinary tradition — no shortcuts, no shortcuts.",
  },
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    desc: "We source fresh, high-quality produce and hand-pick our spice blends to ensure every bite is vibrant and alive.",
  },
  {
    icon: "🥃",
    title: "Vibrant Lounge",
    desc: "Beyond the kitchen — our bar elevates the experience with handcrafted cocktails inspired by Indian flavors.",
  },
  {
    icon: "🎊",
    title: "Warm Hospitality",
    desc: "Every guest is welcomed like family. Our team brings genuine warmth and care to every interaction.",
  },
];

const TIMELINE = [
  {
    year: "The Beginning",
    title: "A Vision is Born",
    desc: "Clay Pot was envisioned by a team of culinary enthusiasts who wanted to bring the vibrant, warming flavors of authentic Indian cuisine to Centreville's dining scene.",
  },
  {
    year: "The Restaurant Opens",
    title: "Doors in Centreville",
    desc: "We opened our doors at 3065 Centreville Rd, Suite G — and the neighborhood quickly embraced us. The aromas, the warmth, the community.",
  },
  {
    year: "The Bar & Lounge",
    title: "Elevated Experience",
    desc: "We expanded our vision with a full lounge bar, creating a complete dining and cocktail experience worthy of a premium Indian restaurant.",
  },
  {
    year: "Today",
    title: "Community Love",
    desc: "With 500+ reviews and a devoted local following, Clay Pot has become a cornerstone of Northern Virginia's culinary landscape.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 100%)" }}
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 60%, #F4A300, transparent 45%), radial-gradient(circle at 80% 40%, #651F12, transparent 45%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs font-semibold tracking-[0.2em] uppercase">
                Our Story
              </span>
              <span className="h-px w-8 bg-saffron" />
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold text-cream-100 mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              About Clay Pot
            </h1>
            <p className="text-white/60 text-xl max-w-xl mx-auto">
              A labor of love, tradition, and the belief that great food has the power to bring people together.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="relative h-80 md:h-[460px] rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(244,163,0,0.1)" }}>
                  <Image
                    src="/images/restaurant-interior.png"
                    alt="Clay Pot elegant interior dining room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute -bottom-5 -right-5 rounded-xl px-5 py-4 z-10"
                  style={{
                    background: "linear-gradient(135deg, #F4A300, #C9962B)",
                    boxShadow: "0 12px 36px rgba(244,163,0,0.35)",
                  }}
                >
                  <p className="text-charcoal/70 text-[11px] font-medium mb-0.5">Northern Virginia&apos;s</p>
                  <p className="text-charcoal font-bold text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
                    Finest Indian Cuisine
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6"
                  style={{ fontFamily: "var(--font-playfair)" }}>
                  Where Heritage Meets the Modern Table
                </h2>
                <p className="text-charcoal/65 text-base leading-relaxed mb-5">
                  Clay Pot was born from a simple but powerful idea: that Indian cuisine deserves a stage as beautiful
                  as the flavors themselves. We believe that every meal should be an experience — rich in aroma, warmth,
                  and connection.
                </p>
                <p className="text-charcoal/55 text-base leading-relaxed mb-5">
                  Our kitchen is guided by the most important ingredient of all: authenticity. We use time-honored
                  recipes, hand-ground spice blends, and cooking techniques passed down through generations — served
                  in an atmosphere that feels both elegant and genuinely welcoming.
                </p>
                <p className="text-charcoal/55 text-base leading-relaxed mb-8">
                  From our clay pot curries to our lounge cocktails to our catering for hundreds of guests —
                  we pour our hearts into every plate we serve.
                </p>
                <a href={ORDER_ONLINE_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-charcoal
                    transition-all hover:-translate-y-1 hover:shadow-glow"
                  style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}>
                  🍽️ Experience It Now
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding"
        style={{ background: "linear-gradient(180deg, #FFF2E4 0%, #FFF8F1 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal"
                style={{ fontFamily: "var(--font-playfair)" }}>
                What We Stand For
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((val, i) => (
              <AnimatedSection key={val.title} delay={i * 0.08} direction="up">
                <div className="bg-white rounded-2xl p-6 h-full text-center"
                  style={{
                    border: "1px solid rgba(244,163,0,0.1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)",
                  }}>
                  <span className="text-4xl mb-4 block">{val.icon}</span>
                  <h3 className="font-bold text-charcoal text-lg mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    {val.title}
                  </h3>
                  <p className="text-charcoal/55 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding"
        style={{ background: "linear-gradient(135deg, #1A0801 0%, #2D0E05 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-cream-100"
                style={{ fontFamily: "var(--font-playfair)" }}>
                Our Journey
              </h2>
            </div>
          </AnimatedSection>
          <div className="relative pl-6 md:pl-0">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
              style={{ background: "rgba(244,163,0,0.2)" }} />

            <div className="flex flex-col gap-10">
              {TIMELINE.map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`flex items-start gap-6 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse md:text-right"
                  }`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                      <span className="text-saffron text-sm font-bold tracking-widest uppercase mb-1 block">
                        {item.year}
                      </span>
                      <h3 className="text-white font-bold text-xl mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}>
                        {item.title}
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    {/* Center dot */}
                    <div className="hidden md:flex w-6 h-6 rounded-full border-2 border-saffron flex-shrink-0 mt-1 items-center justify-center"
                      style={{ background: "#1A0801" }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: "#F4A300" }} />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery moments */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-charcoal"
                style={{ fontFamily: "var(--font-playfair)" }}>
                A Glimpse Inside
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/images/restaurant-interior.png", alt: "Elegant dining room" },
              { src: "/images/dish-butter-chicken.png", alt: "Butter Chicken" },
              { src: "/images/dish-biryani.png", alt: "Dum Biryani" },
              { src: "/images/dish-tandoori.png", alt: "Tandoori Chicken" },
              { src: "/images/dish-palak-paneer.png", alt: "Palak Paneer" },
              { src: "/images/dish-mango-lassi.png", alt: "Mango Lassi" },
            ].map((img, i) => (
              <AnimatedSection key={img.src} delay={i * 0.06} direction="up">
                <div className="relative h-48 md:h-60 rounded-xl overflow-hidden group"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                  <Image src={img.src} alt={img.alt} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 33vw" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center"
        style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Come Experience Clay Pot
          </h2>
          <p className="text-charcoal/70 mb-8 text-lg">
            Reserve a table, order online, or inquire about catering.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={ORDER_ONLINE_URL} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold text-white transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ background: "#1A0801" }}>
              🍽️ Order Online
            </a>
            <Link href="/contact"
              className="px-8 py-4 rounded-full font-semibold text-charcoal bg-white/80
                transition-all hover:bg-white hover:-translate-y-0.5">
              📞 Contact Us
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}

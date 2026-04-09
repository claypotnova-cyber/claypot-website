"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const PROCESS_STEPS = [
  {
    step: "STEP 01",
    title: "Request a Quote",
    description: "Tell us about your event size, date, and preferences using our quick inquiry form below.",
    icon: "📝"
  },
  {
    step: "STEP 02",
    title: "Custom Menu",
    description: "We'll work directly with you to design a tailored menu, ensuring every detail fits your vision perfectly.",
    icon: "🤝"
  },
  {
    step: "STEP 03",
    title: "Flawless Execution",
    description: "We deliver, setup professional chafing equipment, and ensure a generous, memorable feast.",
    icon: "✨"
  }
];

const PERKS = [
  {
    title: "Authentic Recipes",
    description: "Slow-cooked Dum Biryanis and traditional Mandis prepared by seasoned chefs.",
    icon: "🥘"
  },
  {
    title: "White-Glove Setup",
    description: "Premium chafing dishes and elegant presentation that impress your guests.",
    icon: "🍽️"
  },
  {
    title: "Live Action Stations",
    description: "Engage your guests with interactive Dosa, Chaat, and Tandoor catering setups.",
    icon: "🔥"
  },
  {
    title: "Punctual Delivery",
    description: "Guaranteed on-time arrival and setup so you can focus entirely on your event.",
    icon: "⏱️"
  }
];

export default function CateringPerks() {
  return (
    <section className="py-24 px-4 md:px-8 bg-cream relative overflow-hidden" aria-label="Why Clay Pot Catering">
      <div className="max-w-6xl mx-auto">
        
        {/* Step-by-Step Timeline */}
        <AnimatedSection>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-maroon font-playfair mb-4">
              How It Works
            </h2>
            <p className="text-maroon/60 text-lg max-w-xl mx-auto">
              A frictionless catering experience from inquiry to the final bite.
            </p>
          </div>
        </AnimatedSection>

        <div className="relative mb-24">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-maroon/10" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10 pt-16 md:pt-0">
            {PROCESS_STEPS.map((step, idx) => (
              <AnimatedSection key={step.step} delay={idx * 0.15}>
                <div className="relative bg-white rounded-[2rem] p-8 pt-14 text-center group transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(244,163,0,0.2)] border border-maroon/5 h-full">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full border border-maroon/10 flex items-center justify-center flex-col shadow-lg shadow-maroon/5 group-hover:-translate-y-2 transition-transform duration-300">
                    <span className="text-2xl mt-1">{step.icon}</span>
                  </div>
                  
                  <span className="block text-xs font-black text-saffron tracking-[0.2em] uppercase mb-4 mt-2">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-maroon font-playfair mb-4">
                    {step.title}
                  </h3>
                  <p className="text-maroon/70 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* The Clay Pot Difference (Perks Grid) */}
        <AnimatedSection delay={0.2}>
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_60px_-15px_rgba(101,31,18,0.05)] border border-maroon/5 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[150%] bg-saffron/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="text-center mb-14 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-maroon font-playfair mb-4">
                The Clay Pot Difference
              </h2>
              <div className="w-16 h-1 bg-saffron mx-auto rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
              {PERKS.map((perk, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-cream flex items-center justify-center text-3xl group-hover:bg-saffron/20 group-hover:scale-105 transition-all duration-300 shadow-sm border border-maroon/5">
                    {perk.icon}
                  </div>
                  <div className="pt-1">
                    <h4 className="text-lg font-bold text-maroon mb-2">{perk.title}</h4>
                    <p className="text-maroon/70 text-sm leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center relative z-10">
              <a
                href="#inquiry"
                className="inline-block px-10 py-5 rounded-xl font-bold text-charcoal text-sm uppercase tracking-widest transition-all hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, #F4A300, #C9962B)",
                  boxShadow: "0 8px 24px rgba(244,163,0,0.25)"
                }}
              >
                Inquire Now
              </a>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}

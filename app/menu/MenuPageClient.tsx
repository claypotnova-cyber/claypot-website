"use client";

import { useState, useEffect, useRef } from "react";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/lib/data/menu";
import { SITE } from "@/lib/data/site";
import Image from "next/image";

const ORDER_ONLINE_URL = SITE.toastOrderUrl;


export default function MenuPageClient() {
  const [activeSection, setActiveSection] = useState<string>(MENU_CATEGORIES[0].id);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: [0, 0.5, 1], rootMargin: "-15% 0% -60% 0%" });

    MENU_CATEGORIES.forEach((category) => {
      const el = document.getElementById(category.id);
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 180;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-saffron/30 selection:text-maroon">
      {/* Premium Hero Section */}
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-maroon/80 via-transparent to-cream" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black text-cream font-playfair tracking-tighter mb-4">
            <span className="text-saffron">Menu</span>
          </h1>
          <p className="text-cream/80 text-lg md:text-xl font-medium tracking-[0.2em] uppercase">
            Clay Pot Indian Bar & Restaurant
          </p>
        </div>
      </section>

      {/* Sticky Premium Navigation */}
      <nav className="sticky top-[80px] md:top-[90px] z-[50] bg-cream/98 backdrop-blur-xl border-b border-maroon/10 py-5 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeSection === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300
                  ${isActive
                    ? "bg-maroon text-white shadow-xl shadow-maroon/20 translate-y-[-2px]"
                    : "text-maroon/50 hover:text-maroon hover:bg-maroon/5"}`}
              >
                {cat.icon.startsWith("/") ? (
                  <div className="relative w-4 h-4 shrink-0">
                    <Image src={cat.icon} alt={cat.label} fill className="object-contain drop-shadow" />
                  </div>
                ) : (
                  <span className="text-sm">{cat.icon}</span>
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-20 md:py-32 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-40 left-0 w-80 h-80 bg-saffron/10 rounded-full blur-[100px] pointer-events-none opacity-40" />
        <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-maroon/5 rounded-full blur-[120px] pointer-events-none opacity-30" />

        <div className="relative z-10 space-y-24 md:space-y-40">
          {MENU_CATEGORIES.map((category) => {
            const items = MENU_ITEMS.filter(item => item.category === category.id);
            if (items.length === 0) return null;

            return (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-56 transition-all duration-500"
              >
                {/* Category Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b-2 border-maroon/5 pb-10 gap-8">
                  <div className="flex items-center gap-8">
                    {category.icon.startsWith("/") ? (
                      <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 drop-shadow-md">
                        <Image src={category.icon} alt={category.label} fill className="object-cover" />
                      </div>
                    ) : (
                      <span className="text-5xl md:text-6xl drop-shadow-md">{category.icon}</span>
                    )}
                    <div>
                      <h2 className="text-4xl md:text-6xl font-extrabold text-maroon font-playfair tracking-tight leading-tight">
                        {category.label}
                      </h2>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="h-[2px] w-12 bg-saffron/40" />
                        <p className="text-maroon/50 text-[11px] font-black uppercase tracking-[0.3em]">
                          {items.length} Curated Selections
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={ORDER_ONLINE_URL}
                    target="_blank"
                    className="hidden md:flex items-center gap-3 px-8 py-4 rounded-xl border border-saffron/20 text-[11px] font-black uppercase tracking-widest text-maroon hover:bg-saffron hover:text-charcoal transition-all duration-300 shadow-sm"
                  >
                    Order Online <span className="text-xl">→</span>
                  </a>
                </div>

                {/* Items Grid — 2 columns on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-start justify-between gap-6 py-4 border-b border-maroon/8 hover:bg-white/40 hover:shadow-sm transition-all duration-300 px-4 -mx-4 rounded-xl"
                    >
                      {/* Item Name + Dietary + Description */}
                      <div className="flex-1 pr-6 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5 mb-1">
                          <h3 className="text-lg md:text-xl font-extrabold text-maroon group-hover:text-saffron transition-colors duration-300 leading-snug">
                            {item.name}
                          </h3>
                          <div className="flex gap-1.5 shrink-0 items-center">
                            {item.dietary.includes("veg") && (
                              <div className="p-0.5 border-2 border-green-600/30 rounded-md" title="Vegetarian">
                                <div className="w-2 h-2 rounded-full bg-green-600" />
                              </div>
                            )}
                            {item.dietary.includes("non-veg") && (
                              <div className="p-0.5 border-2 border-red-600/30 rounded-md" title="Non-Vegetarian">
                                <div className="w-2 h-2 rounded-full bg-red-600" />
                              </div>
                            )}
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-sm text-maroon/45 font-medium leading-relaxed italic line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Price — fixed-width, always right-aligned */}
                      <div className="shrink-0 min-w-[80px] text-right pt-0.5">
                        <span className="text-maroon/80 font-bold text-lg tabular-nums tracking-tight">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Order CTA */}
                <div className="mt-12 flex justify-center lg:hidden px-4">
                  <a
                    href={ORDER_ONLINE_URL}
                    target="_blank"
                    className="w-full text-center py-5 rounded-2xl bg-saffron text-charcoal font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-saffron/20 active:scale-95 transition-transform"
                  >
                    Order Online →
                  </a>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Sticky Bottom for Mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] flex items-center gap-3 w-[min(90vw,400px)]">
         <a
           href={`tel:${SITE.phoneRaw}`}
           className="flex-1 bg-charcoal text-cream px-6 py-4 rounded-3xl font-black text-xs uppercase tracking-widest text-center shadow-2xl border border-white/10 active:scale-95 transition-transform"
         >
           Call
         </a>
         <a
           href={ORDER_ONLINE_URL}
           target="_blank"
           className="flex-[2] bg-gradient-to-br from-saffron to-[#E8B84C] text-charcoal px-6 py-4 rounded-3xl font-black text-xs uppercase tracking-widest text-center shadow-2xl active:scale-95 transition-transform shadow-saffron/20"
         >
           Order Online
         </a>
      </div>
    </div>
  );
}

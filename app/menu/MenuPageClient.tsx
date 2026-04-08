"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/lib/data/menu";
import { useMenuStore } from "@/lib/store/useMenuStore";
import MenuHero from "@/components/menu/MenuHero";
import MenuTabs from "@/components/menu/MenuTabs";
import MenuGrid from "@/components/menu/MenuGrid";
import MenuPromo from "@/components/menu/MenuPromo";
import StickyOrderButton from "@/components/menu/StickyOrderButton";
import MenuSearch from "@/components/menu/MenuSearch";
import ItemModal from "@/components/menu/ItemModal";
import { SITE } from "@/lib/data/site";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

export default function MenuPageClient() {
  const { searchQuery, activeCategory, dietaryFilter } = useMenuStore();

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = item.category === activeCategory;
      const matchesDietary = dietaryFilter === 'all' || item.dietary.includes(dietaryFilter as any);
      
      return matchesSearch && matchesCategory && matchesDietary;
    });
  }, [searchQuery, activeCategory, dietaryFilter]);

  const activeCategoryData = useMemo(() => {
    return MENU_CATEGORIES.find((cat) => cat.id === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-cream selection:bg-maroon selection:text-cream pb-20">
      {/* 3D Cinematic Hero */}
      <MenuHero />

      {/* Trust & Direct Order Strip */}
      <MenuPromo />

      {/* Search & Filters */}
      <MenuSearch />

      {/* Sticky Premium Navigation */}
      <MenuTabs />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-40 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-0 w-96 h-96 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-elevated flex items-center justify-center text-2xl border border-maroon/5">
                  {activeCategoryData?.icon}
                </div>
                <div>
                  <h2 
                    className="text-4xl md:text-5xl font-extrabold text-maroon"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {activeCategoryData?.label}
                  </h2>
                  <p className="text-maroon/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
                    {filteredItems.length} Handcrafted Selections
                  </p>
                </div>
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-saffron to-transparent rounded-full" />
            </div>

            {/* Quick Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
               <a href={`tel:${SITE.phoneRaw}`} className="px-6 py-3 rounded-xl border-2 border-maroon/5 text-maroon font-black text-xs uppercase tracking-widest hover:bg-maroon hover:text-white transition-all duration-300">
                  Call Now
               </a>
               <a href={ORDER_ONLINE_URL} target="_blank" className="px-6 py-3 rounded-xl bg-saffron text-charcoal font-black text-xs uppercase tracking-widest hover:shadow-glow-saffron transition-all duration-300">
                  Order on Toast
               </a>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}-${dietaryFilter}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {/* Items Grid */}
              {filteredItems.length > 0 ? (
                <MenuGrid items={filteredItems} />
              ) : (
                <div className="py-40 text-center">
                  <div className="text-6xl mb-6 opacity-20">🔍</div>
                  <h3 className="text-2xl font-bold text-maroon mb-2">No dishes found</h3>
                  <p className="text-maroon/40 text-lg italic max-w-sm mx-auto">
                    Try adjusting your search or filters to find what you&apos;re looking for.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Multi-action Sticky Bottom for Mobile */}
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

      <ItemModal />
    </div>
  );
}

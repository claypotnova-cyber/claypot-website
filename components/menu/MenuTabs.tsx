"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MENU_CATEGORIES, MenuCategory } from "@/lib/data/menu";
import { useMenuStore } from "@/lib/store/useMenuStore";

export default function MenuTabs() {
  const { activeCategory, setActiveCategory } = useMenuStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into view on mobile
  useEffect(() => {
    const activeTab = scrollRef.current?.querySelector(`[data-active="true"]`);
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-[140px] md:top-[180px] z-[15] bg-cream/80 backdrop-blur-md border-b border-maroon/5 py-4 shadow-sm overflow-hidden translate-y-[-1px]">
      <div 
        ref={scrollRef}
        className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {MENU_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              data-active={isActive}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300
                ${
                  isActive
                    ? "text-white shadow-lg shadow-maroon/20"
                    : "text-maroon/40 hover:text-maroon hover:bg-maroon/5"
                }`}
              style={isActive ? { background: "linear-gradient(135deg, #651F12, #8E2B1A)" } : {}}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.label}</span>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="menu-active-tab-bg"
                  className="absolute inset-0 rounded-2xl z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

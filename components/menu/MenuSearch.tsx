"use client";

import { motion } from "framer-motion";
import { useMenuStore } from "@/lib/store/useMenuStore";

export default function MenuSearch() {
  const { searchQuery, setSearchQuery, dietaryFilter, setDietaryFilter } = useMenuStore();

  return (
    <div className="sticky top-[80px] md:top-[100px] z-20 bg-cream/80 backdrop-blur-md py-4 md:py-6 border-b border-maroon/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full md:flex-1 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon/40 group-focus-within:text-saffron transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            type="text"
            placeholder="Search our delicious dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-maroon/5 focus:border-saffron/30 focus:outline-none focus:ring-4 focus:ring-saffron/5 transition-all text-maroon font-medium placeholder:text-maroon/20"
          />
        </div>

        {/* Dietary Toggle */}
        <div className="flex bg-maroon/5 p-1 rounded-2xl w-full md:w-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'veg', label: 'Veg' },
            { id: 'non-veg', label: 'Non-Veg' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setDietaryFilter(option.id as any)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 relative
                ${dietaryFilter === option.id ? 'text-white' : 'text-maroon/40 hover:text-maroon/60'}`}
            >
              {dietaryFilter === option.id && (
                <motion.div
                  layoutId="dietary-active"
                  className="absolute inset-0 bg-maroon rounded-xl z-0 shadow-lg shadow-maroon/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

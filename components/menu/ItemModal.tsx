"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/lib/store/useMenuStore";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

export default function ItemModal() {
  const { selectedItem, setSelectedItem } = useMenuStore();

  if (!selectedItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
          className="absolute inset-0 bg-charcoal/60 backdrop-blur-xl"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20, rotateX: 10 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-cream/95 overflow-hidden rounded-[2.5rem] shadow-glow-lg border border-white/20 p-8 md:p-12"
          style={{ perspective: "1000px" }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-maroon/5 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: Metadata & Pricing */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {selectedItem.dietary.includes("veg") ? (
                   <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-200">Vegetarian</span>
                ) : (
                   <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-red-200">Non-Vegetarian</span>
                )}
                {selectedItem.bestseller && <span className="px-3 py-1 bg-saffron/10 text-saffron text-[10px] font-black uppercase tracking-widest rounded-lg border border-saffron/20">Bestseller</span>}
                {selectedItem.outOfStock && <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-lg">Out of Stock</span>}
              </div>

              <h2 
                className="text-4xl md:text-5xl font-bold text-maroon mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {selectedItem.name}
              </h2>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl font-black text-saffron">{selectedItem.price}</span>
                <div className="h-px w-8 bg-maroon/10 mx-2" />
                <span className="text-maroon/40 text-xs font-bold uppercase tracking-widest">Pricing Subject to Toast</span>
              </div>
              
              <p className="text-maroon/60 text-lg leading-relaxed mb-8 italic">
                {selectedItem.description}
              </p>

              {/* Order Button */}
              <a
                href={ORDER_ONLINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-5 rounded-[1.25rem] font-black text-sm uppercase tracking-widest text-center transition-all duration-500 transform active:scale-95 shadow-xl inline-block
                  ${selectedItem.outOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none' : 'bg-gradient-to-br from-maroon to-[#8E2B1A] text-white hover:shadow-glow-maroon'}`}
              >
                {selectedItem.outOfStock ? "OUT OF STOCK" : "ORDER ON TOASTTAB"}
              </a>
            </div>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-saffron/5 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

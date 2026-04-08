"use client";

import { motion } from "framer-motion";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

export default function MenuPromo() {
  return (
    <div className="bg-charcoal text-cream py-6 overflow-hidden border-y border-white/5 relative">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-[20%] w-64 h-full bg-saffron/10 skew-x-12 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-saffron/10 flex items-center justify-center shrink-0 border border-saffron/20 rotate-3 group-hover:rotate-0 transition-transform">
             <span className="text-2xl">🔥</span>
          </div>
          <div>
            <p className="font-black text-sm uppercase tracking-[0.2em] text-saffron mb-1">Authentic. Fresh. Direct.</p>
            <p className="text-sm text-cream/40 font-medium">Ordering via Toast supports local business and guarantees the best prices.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <a 
             href={ORDER_ONLINE_URL}
             target="_blank"
             rel="noopener noreferrer"
             className="group flex items-center gap-3 bg-cream text-maroon px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-saffron hover:text-charcoal transition-all duration-500 transform hover:scale-105 shadow-xl shadow-black/20"
           >
             ORDER DIRECTLY
             <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
           </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { MenuItem } from "@/lib/data/menu";
import { useMenuStore } from "@/lib/store/useMenuStore";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  const { setSelectedItem } = useMenuStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.6, 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }}
      whileHover={{ y: -8, rotateX: 2, scale: 1.02 }}
      onClick={() => setSelectedItem(item)}
      className="group relative h-full flex flex-col rounded-[2rem] overflow-hidden bg-white shadow-elevated border-2 border-maroon/5 transition-all duration-500 hover:shadow-glow-maroon cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-maroon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 border-2 rounded-sm p-0.5 flex items-center justify-center shrink-0
                   ${item.dietary.includes('veg') ? 'border-green-600' : 'border-red-600'}`}>
                   <div className={`w-1.5 h-1.5 rounded-full ${item.dietary.includes('veg') ? 'bg-green-600' : 'bg-red-600'}`} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-maroon/40 leading-none">
                  {item.category.replace(/-/g, ' ')}
                </span>
             </div>
             <h3 className="text-2xl font-bold text-maroon leading-tight group-hover:text-saffron transition-colors duration-300">
               {item.name}
             </h3>
          </div>
          <div className="text-right">
             <span className="text-xl font-black text-saffron">{item.price}</span>
          </div>
        </div>

        <p className="text-charcoal/60 text-sm leading-relaxed mb-8 flex-1 italic line-clamp-3">
          {item.description}
        </p>

        {/* Badges & Spice */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-maroon/5">
           <div className="flex gap-2">
              {item.bestseller && (
                <span className="bg-saffron text-charcoal text-[9px] font-black uppercase px-2 py-0.5 rounded-lg shadow-sm tracking-widest">
                  Popular
                </span>
              )}
              {item.outOfStock && (
                <span className="bg-charcoal text-cream text-[9px] font-black uppercase px-2 py-0.5 rounded-lg shadow-sm tracking-widest opacity-60">
                  Sold Out
                </span>
              )}
           </div>
           
           {item.spice && (
             <div className="flex items-center gap-0.5">
               {Array.from({ length: item.spice === "mild" ? 1 : item.spice === "medium" ? 2 : item.spice === "spicy" ? 3 : 4 }).map((_, i) => (
                 <span key={i} className="text-sm">🌶️</span>
               ))}
             </div>
           )}
        </div>
      </div>

      {/* Overlay Button Hint */}
      <div className="absolute inset-x-0 bottom-0 py-2 bg-maroon/5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <span className="text-[9px] font-black uppercase tracking-[0.2em] text-maroon">Click to view details</span>
      </div>
    </motion.div>
  );
}

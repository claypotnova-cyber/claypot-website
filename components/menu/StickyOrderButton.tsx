"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

export default function StickyOrderButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="lg:hidden fixed bottom-6 right-6 z-[60]"
        >
          <a
            href={ORDER_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-maroon text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="font-bold text-sm uppercase tracking-widest pr-2">Order Online</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

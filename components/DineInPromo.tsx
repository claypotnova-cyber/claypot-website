"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ORDER_ONLINE_URL } from "@/lib/data/navigation";

export default function DineInPromo() {
  return (
    <section className="py-24 px-4 md:px-8 bg-white relative overflow-hidden" aria-label="Dine-in Experience">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-saffron/5 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-maroon/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Image Collage */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]">
          <AnimatedSection direction="right">
            <div className="absolute inset-0 grid grid-cols-2 gap-4 h-full">
              <div className="flex flex-col gap-4 pt-12">
                <div className="relative flex-grow rounded-3xl overflow-hidden shadow-2xl shadow-maroon/10">
                  <Image 
                    src="/images/restaurant-interior.png" 
                    alt="Clay Pot Dining Room" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-maroon/10 mix-blend-overlay" />
                </div>
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-2xl shadow-maroon/10">
                  <Image 
                    src="/images/dish-biryani.png" 
                    alt="Mandi Platter" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 pb-12">
                <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl shadow-maroon/10">
                  <Image 
                    src="/images/dish-butter-chicken.png" 
                    alt="Signature Curry" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="relative flex-grow rounded-3xl overflow-hidden shadow-2xl shadow-maroon/10">
                  <Image 
                    src="/images/dish-tandoori.png" 
                    alt="Family Dining" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-saffron/20 max-w-xs text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <span className="text-4xl block mb-2">🍽️</span>
              <p className="font-playfair font-black text-maroon text-xl leading-tight">
                Authentic Flavors, Shared Together
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2">
          <AnimatedSection direction="left">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-sm font-black tracking-[0.2em] uppercase">
                Dine at Clay Pot
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-maroon font-playfair mb-6 leading-tight">
              Perfect for <span className="text-saffron">Family Dinners</span> & Group Meals
            </h2>
            
            <p className="text-maroon/70 text-lg md:text-xl font-medium leading-relaxed mb-8">
              Come for the Mandi, stay for the feast. Our signature Mandi platters are designed for sharing, making Clay Pot the ultimate destination in Herndon for family gatherings, celebrations, and unforgettable dining experiences.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Massive signature Mandi platters perfect for groups",
                "Warm, elegant, and family-friendly atmosphere",
                "Authentic Indian flavors crafted with care",
                "A beloved local favorite for celebrations in Centreville & Herndon"
              ].map((item, idx) => (
                 <li key={idx} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-saffron/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-saffron" />
                    </span>
                    <span className="text-maroon/80 font-medium text-lg">{item}</span>
                 </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={ORDER_ONLINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm text-charcoal bg-saffron text-center shadow-lg hover:bg-[#E8B84C] hover:-translate-y-1 transition-all"
              >
                Order for Pickup
              </a>
              <Link
                href="/menu"
                className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm text-maroon text-center border-2 border-maroon/20 hover:border-maroon hover:bg-maroon/5 transition-all"
              >
                View Dine-in Menu
              </Link>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}

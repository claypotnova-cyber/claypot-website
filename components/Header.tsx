"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, ORDER_ONLINE_URL } from "@/lib/data/navigation";
import { SITE } from "@/lib/data/site";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-dark shadow-elevated py-2"
            : "bg-transparent py-4"
        }`}
        style={{ marginTop: "40px" }} /* offset for promobar */
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Clay Pot Home">
            <Logo 
              size={scrolled ? "sm" : "md"} 
              variant={scrolled ? "default" : "light"}
              className="transition-all duration-500"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-md
                    ${isActive
                      ? "text-saffron"
                      : "text-cream-100/80 hover:text-cream-100"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: "#F4A300" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="header-order-online"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm tracking-wide
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-saffron"
              style={{
                background: "linear-gradient(135deg, #F4A300, #C9962B)",
                color: "#1F1F1F",
              }}
            >
              <span className="text-base">🍽️</span>
              Order Online
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg
                transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-saffron"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-cream-100 rounded-full transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-cream-100 rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-cream-100 rounded-full transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-charcoal/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col pt-24 pb-8 px-6"
              style={{ background: "linear-gradient(180deg, #1A0801 0%, #2D0E05 100%)" }}
              aria-label="Mobile navigation"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-cream-100/60
                  hover:text-cream-100 hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                ✕
              </button>

              <div className="flex flex-col gap-1 mb-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200
                        ${pathname === link.href
                          ? "text-saffron bg-saffron/10"
                          : "text-cream-100/80 hover:text-cream-100 hover:bg-white/5"
                        }`}
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <a
                  href={ORDER_ONLINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3.5 rounded-full font-semibold text-charcoal tracking-wide"
                  style={{ background: "linear-gradient(135deg, #F4A300, #C9962B)" }}
                >
                  🍽️ Order Online
                </a>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="text-center py-3.5 rounded-full font-medium text-cream-100 border border-white/20 hover:border-saffron/50"
                >
                  📞 {SITE.phone}
                </a>
              </div>

              {/* Hours quick-glimpse */}
              <p className="text-cream-100/40 text-xs text-center mt-6">
                Mon–Thu 11:30AM–10PM<br />
                Fri 11:30AM–11PM · Sat–Sun 12PM–10PM
              </p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

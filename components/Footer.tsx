import Link from "next/link";
import { NAV_LINKS, ORDER_ONLINE_URL } from "@/lib/data/navigation";
import { SITE } from "@/lib/data/site";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A0801 0%, #0D0400 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #F4A300, transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="md" variant="light" className="mb-4" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Authentic Indian cuisine and handcrafted cocktails in a warm, elevated dining experience. Centreville, Virginia.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { label: "Instagram", href: SITE.socialLinks.instagram, icon: "📸" },
                { label: "Facebook", href: SITE.socialLinks.facebook, icon: "👍" },
                { label: "Yelp", href: SITE.socialLinks.yelp, icon: "⭐" },
                { label: "Google", href: SITE.socialLinks.google, icon: "🔍" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-sm
                    transition-all duration-300 hover:border-saffron/50 hover:bg-saffron/10 hover:-translate-y-0.5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-cream-100 font-semibold text-sm tracking-widest uppercase mb-5"
              style={{ color: "#F4A300" }}
            >
              Navigate
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 text-sm transition-colors hover:text-saffron"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={ORDER_ONLINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-saffron text-sm font-semibold transition-colors hover:text-gold-light"
                >
                  Order Online →
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm tracking-widest uppercase mb-5 font-semibold"
              style={{ color: "#F4A300" }}
            >
              Visit Us
            </h3>
            <address className="not-italic flex flex-col gap-3">
              <div>
                <p className="text-white/55 text-sm leading-relaxed">
                  {SITE.addressShort}
                  <br />
                  {SITE.city}
                </p>
              </div>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="text-white/55 text-sm hover:text-saffron transition-colors"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="text-white/55 text-sm hover:text-saffron transition-colors"
              >
                {SITE.email}
              </a>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h3
              className="text-sm tracking-widest uppercase mb-5 font-semibold"
              style={{ color: "#F4A300" }}
            >
              Hours
            </h3>
            <ul className="flex flex-col gap-2">
              {SITE.hours.map(({ day, hours }) => (
                <li key={day} className="flex justify-between gap-4 text-sm">
                  <span className="text-white/40 w-24 flex-shrink-0">{day}</span>
                  <span className="text-white/65 text-right">{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center md:text-left">
            &copy; {currentYear} {SITE.fullName}. All rights reserved.
          </p>
          <a
            href={ORDER_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide
              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
            style={{
              background: "linear-gradient(135deg, #F4A300, #C9962B)",
              color: "#1F1F1F",
            }}
          >
            🍽️ Order Online
          </a>
        </div>
      </div>
    </footer>
  );
}

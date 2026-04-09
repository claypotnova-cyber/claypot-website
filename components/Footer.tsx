import Link from "next/link";
import { NAV_LINKS, ORDER_ONLINE_URL } from "@/lib/data/navigation";
import { SITE } from "@/lib/data/site";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = 2024;

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
                {
                  label: "Instagram",
                  href: SITE.socialLinks.instagram,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  href: SITE.socialLinks.facebook,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ),
                },
                {
                  label: "TikTok",
                  href: SITE.socialLinks.tiktok,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  ),
                },
                {
                  label: "Snapchat",
                  href: SITE.socialLinks.snapchat,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.289 4.916l-.016.253c-.009.112.085.247.184.247.218.009.553-.076.907-.185.1-.03.196-.057.283-.076a1.637 1.637 0 0 1 .375-.043c.325 0 .65.097.907.284.297.218.442.542.442.909 0 .662-.475 1.139-1.182 1.312-.082.019-.165.039-.253.06-.619.153-1.473.363-1.685 1.009-.1.311.052.65.208.951l.016.033c.461.908 1.35 2.631 3.317 3.07.245.055.414.275.414.523 0 .246-.187.453-.435.498-.918.166-1.83.319-2.321 1.04-.065.098-.099.183-.099.256 0 .167.125.316.314.399.133.061.284.12.44.18.535.208 1.198.467 1.198 1.138 0 .573-.508.943-1.296.943-.408 0-.832-.093-1.286-.284a1.81 1.81 0 0 0-.698-.151c-.2 0-.384.034-.58.11-.693.264-1.259.397-1.684.397-.305 0-.585-.05-.832-.149-1.078-.432-1.96-1.287-3.056-1.287-1.095 0-1.977.855-3.055 1.287-.247.099-.527.149-.832.149-.425 0-.991-.133-1.684-.397a1.9 1.9 0 0 0-.58-.11 1.81 1.81 0 0 0-.698.151c-.454.191-.878.284-1.286.284-.788 0-1.296-.37-1.296-.943 0-.671.663-.93 1.198-1.138.156-.06.307-.119.44-.18.189-.083.314-.232.314-.399 0-.073-.034-.158-.099-.256-.491-.721-1.403-.874-2.321-1.04-.248-.045-.435-.252-.435-.498 0-.248.169-.468.414-.523 1.967-.439 2.856-2.162 3.317-3.07l.016-.033c.156-.301.308-.64.208-.951-.212-.646-1.066-.856-1.685-1.009-.088-.021-.171-.041-.253-.06C3.989 10.863 3.514 10.386 3.514 9.724c0-.367.145-.691.442-.909.257-.187.582-.284.907-.284.125 0 .25.014.375.043.087.019.183.046.283.076.354.109.689.194.907.185.099 0 .193-.135.184-.247l-.016-.253c-.114-1.697-.24-3.723.289-4.916C8.423 1.069 11.78.793 12.206.793z"/>
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50
                    transition-all duration-300 hover:border-saffron/50 hover:bg-saffron/10 hover:text-saffron hover:-translate-y-0.5"
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

import { SITE } from "./site";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const ORDER_ONLINE_URL = SITE.toastOrderUrl;

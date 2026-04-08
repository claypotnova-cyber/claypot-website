import type { Metadata } from "next";
import { SITE } from "@/lib/data/site";
import MenuPageClient from "./MenuPageClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore Clay Pot's full Indian menu — tandoor specialties, biryanis, curries, breads, desserts, handcrafted cocktails and more. Order online via Toast.",
  openGraph: {
    title: `Menu | ${SITE.fullName}`,
    description:
      "Authentic Indian cuisine with bold flavors. Browse our menu and order online.",
    images: [{ url: "/images/dish-butter-chicken.png", width: 1200, height: 630 }],
  },
};

export default function MenuPage() {
  return <MenuPageClient />;
}

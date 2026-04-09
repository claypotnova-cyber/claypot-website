import type { Metadata } from "next";
import { SITE } from "@/lib/data/site";
import Hero from "@/components/Hero";
import PromotionsSection from "@/components/PromotionsSection";
import SignatureMandi from "@/components/SignatureMandi";
import DineInPromo from "@/components/DineInPromo";
import FeaturedDishes from "@/components/FeaturedDishes";
import CateringCTA from "@/components/CateringCTA";
import ComboBuilder from "@/components/ComboBuilder";
import Testimonials from "@/components/Testimonials";
import GalleryStrip from "@/components/GalleryStrip";
import VisitSection from "@/components/VisitSection";
import SpinWheel from "@/components/SpinWheel";

export const metadata: Metadata = {
  title: `${SITE.fullName} | Authentic Indian Dining in Centreville, VA`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.fullName} | Authentic Indian Dining`,
    description: SITE.description,
    images: [{ url: "/images/real-interior.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Signature Mandi Specials */}
      <SignatureMandi />

      {/* 3. Promotions (dine-in & pickup only) */}
      <PromotionsSection />

      {/* 4. Dine-in Experience Promo */}
      <DineInPromo />

      {/* 5. Combo Builder (meal discovery) */}
      <ComboBuilder />

      {/* 6. Catering CTA */}
      <CateringCTA />

      {/* 7. Featured Dishes */}
      <FeaturedDishes />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Gallery */}
      <GalleryStrip />

      {/* 10. Visit Us */}
      <VisitSection />

      {/* Floating spin wheel (dine-in & pickup rewards only) */}
      <SpinWheel />
    </>
  );
}

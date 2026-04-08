import type { Metadata } from "next";
import { SITE } from "@/lib/data/site";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import PromotionsSection from "@/components/PromotionsSection";
import SignatureMandi from "@/components/SignatureMandi";
import DineInPromo from "@/components/DineInPromo";
import FeaturedDishes from "@/components/FeaturedDishes";
import CateringCTA from "@/components/CateringCTA";
import Testimonials from "@/components/Testimonials";
import GalleryStrip from "@/components/GalleryStrip";
import VisitSection from "@/components/VisitSection";

export const metadata: Metadata = {
  title: `${SITE.fullName} | Authentic Indian Dining in Centreville, VA`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.fullName} | Authentic Indian Dining`,
    description: SITE.description,
    images: [{ url: "/images/restaurant-interior.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Signature Mandi Specials */}
      <SignatureMandi />

      {/* 3. Trust Strip (floats between sections) */}
      <TrustStrip />
      
      {/* 4. Promotions */}
      <PromotionsSection />

      {/* 5. Dine-in Experience Promo */}
      <DineInPromo />

      {/* 6. Catering CTA */}
      <CateringCTA />

      {/* 7. Featured Dishes (General Menu Extracted) */}
      <FeaturedDishes />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Gallery */}
      <GalleryStrip />

      {/* 10. Visit Us */}
      <VisitSection />
    </>
  );
}

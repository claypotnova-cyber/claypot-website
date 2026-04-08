import type { Metadata } from "next";
import { SITE } from "@/lib/data/site";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import PromotionsSection from "@/components/PromotionsSection";
import FeaturedDishes from "@/components/FeaturedDishes";
import AboutPreview from "@/components/AboutPreview";
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

      {/* 2. Trust Strip (floats over hero) */}
      <TrustStrip />

      {/* 3. Promotions */}
      <PromotionsSection />

      {/* 4. Featured Dishes */}
      <FeaturedDishes />

      {/* 5. About Preview */}
      <AboutPreview />

      {/* 6. Catering CTA */}
      <CateringCTA />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Gallery */}
      <GalleryStrip />

      {/* 9. Visit Us */}
      <VisitSection />
    </>
  );
}

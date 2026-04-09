import type { Metadata } from "next";
import { SITE } from "@/lib/data/site";
import CateringPageClient from "./CateringPageClient";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Full-service Indian catering for office lunches, corporate events, weddings, birthday parties, and family gatherings in Centreville, VA and Northern Virginia.",
  openGraph: {
    title: `Catering | ${SITE.fullName}`,
    description:
      "Premium Indian catering for your next event. Contact Clay Pot for a custom quote.",
    images: [{ url: "/images/real-interior.jpg", width: 1200, height: 630 }],
  },
};

export default function CateringPage() {
  return <CateringPageClient />;
}

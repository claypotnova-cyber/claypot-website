import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Clay Pot Indian Bar & Restaurant in Centreville, VA. Call us, find our location, view hours, or send a message.`,
};

export default function ContactPage() {
  return <ContactPageClient />;
}

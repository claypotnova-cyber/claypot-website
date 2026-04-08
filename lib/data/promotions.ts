export interface Promotion {
  id: string;
  title: string;
  description: string;
  badge?: string;
  ctaLabel: string;
  ctaHref: string;
  color: "saffron" | "maroon" | "gold";
  icon: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: "lunch-specials",
    title: "Lunch Specials",
    description:
      "Enjoy a curated 2-course lunch experience with our chef's daily selections — available every weekday for a limited time.",
    badge: "Mon–Fri · 11:30AM–3PM",
    ctaLabel: "Order Lunch",
    ctaHref: "https://order.toasttab.com/online/clay-pot-3065-centerville-rd-ste-g",
    color: "saffron",
    icon: "🌞",
  },
  {
    id: "happy-hour",
    title: "Happy Hour",
    description:
      "Handcrafted cocktails, shareable bites, and vibrant conversation. Unwind in our lounge with daily happy hour deals.",
    badge: "Daily · 4PM–7PM",
    ctaLabel: "Reserve a Table",
    ctaHref: "/contact",
    color: "maroon",
    icon: "🍹",
  },
  {
    id: "catering-offer",
    title: "Catering for Events",
    description:
      "From office lunches to grand celebrations — our full-service catering brings the Clay Pot experience to your venue.",
    badge: "Inquire Today",
    ctaLabel: "Get Catering Quote",
    ctaHref: "/catering",
    color: "gold",
    icon: "🎉",
  },
];

export const PROMO_BAR_MESSAGES = [
  "🌟 Lunch Specials Available Mon–Fri · 11:30AM–3PM",
  "🎉 Full-Service Catering for Events & Office Lunches",
  "🍹 Happy Hour Daily · 4PM–7PM · Lounge Bar",
  "📍 Now Open in Centreville, VA · Dine-In & Online Ordering",
  "✨ Weekend Specials Live Now — Reserve Your Table Today",
];

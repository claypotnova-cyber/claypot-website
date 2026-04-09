export type PromotionType = "dine-in" | "pickup" | "catering";

export type PromotionPlacement =
  | "homepage"
  | "catering-banner"
  | "catering-cards"
  | "catering-highlight"
  | "spin-wheel";

export interface Promotion {
  id: string;
  title: string;
  description: string;
  badge?: string;
  ctaLabel: string;
  ctaHref: string;
  color: "saffron" | "maroon" | "gold";
  icon: string;
  promotionType: PromotionType;
  applicability: string;
  disclaimer: string;
  placement: PromotionPlacement[];
  active: boolean;
  inquiryCTA?: boolean;
  startDate?: string;
  endDate?: string;
}

// ── Dine-in & Pickup Promotions ───────────────────────────────────────────────

export const PROMOTIONS: Promotion[] = [
  {
    id: "lunch-specials",
    title: "Lunch Specials",
    description:
      "Enjoy a curated 2-course lunch experience with our chef's daily selections — available every weekday for a limited time.",
    badge: "Mon–Fri · 11:30AM–3PM",
    ctaLabel: "Visit or Order Pickup",
    ctaHref: "/contact",
    color: "saffron",
    icon: "🌞",
    promotionType: "dine-in",
    applicability: "Valid for dine-in and in-store pickup only",
    disclaimer: "Not valid on delivery or third-party orders. Offer availability may vary.",
    placement: ["homepage"],
    active: true,
  },
  {
    id: "happy-hour",
    title: "Happy Hour",
    description:
      "Handcrafted cocktails, shareable bites, and vibrant conversation. Unwind in our lounge with exclusive dine-in happy hour specials.",
    badge: "Daily · 4PM–7PM",
    ctaLabel: "Reserve a Table",
    ctaHref: "/contact",
    color: "maroon",
    icon: "🍹",
    promotionType: "dine-in",
    applicability: "Valid for dine-in only",
    disclaimer: "Not valid on delivery or online orders. In-restaurant only.",
    placement: ["homepage"],
    active: true,
  },
  {
    id: "weekend-special",
    title: "Weekend Special",
    description:
      "Start your weekend right with our chef's exclusive weekend tasting menu — bold flavors, elevated presentations, available in-house.",
    badge: "Sat & Sun",
    ctaLabel: "Book a Table",
    ctaHref: "/contact",
    color: "gold",
    icon: "✨",
    promotionType: "dine-in",
    applicability: "Valid for dine-in only",
    disclaimer: "Not valid on delivery or third-party orders. Availability may vary.",
    placement: ["homepage"],
    active: true,
  },
];

// ── Catering Promotions ───────────────────────────────────────────────────────

export const CATERING_PROMOTIONS: Promotion[] = [
  {
    id: "corporate-catering",
    title: "Corporate Catering Made Easy",
    description:
      "Elevate your office lunch, team meeting, or business event with authentic Indian flavors that leave a lasting impression. Fully customizable menus with prompt, professional delivery.",
    badge: "Office & Business",
    ctaLabel: "Request Catering",
    ctaHref: "/catering#inquiry",
    color: "maroon",
    icon: "🏢",
    promotionType: "catering",
    applicability: "Catering inquiry only",
    disclaimer: "Contact us to discuss menu options, quantities, and logistics.",
    placement: ["catering-cards"],
    active: true,
    inquiryCTA: true,
  },
  {
    id: "party-event-catering",
    title: "Celebrate with Clay Pot Catering",
    description:
      "Birthdays, family gatherings, and private celebrations deserve extraordinary food. Our signature Mandi platters and aromatic biryanis are made to impress your guests.",
    badge: "Private Events",
    ctaLabel: "Plan Your Event",
    ctaHref: "/catering#inquiry",
    color: "saffron",
    icon: "🎂",
    promotionType: "catering",
    applicability: "Catering inquiry only",
    disclaimer: "Menu customization available for all dietary needs.",
    placement: ["catering-cards"],
    active: true,
    inquiryCTA: true,
  },
  {
    id: "large-event-catering",
    title: "Planning a Large Event?",
    description:
      "From intimate gatherings of 20 to grand occasions of 500+, our catering team delivers fresh, authentic Indian cuisine with seamless coordination and on-time service.",
    badge: "500+ Guests",
    ctaLabel: "Get Catering Details",
    ctaHref: "/catering#inquiry",
    color: "gold",
    icon: "🎪",
    promotionType: "catering",
    applicability: "Catering inquiry only",
    disclaimer: "Custom quotes available for all group sizes.",
    placement: ["catering-highlight", "catering-banner"],
    active: true,
    inquiryCTA: true,
  },
  {
    id: "festival-catering",
    title: "Special Event Catering",
    description:
      "Curated Indian catering selections for festive gatherings, cultural celebrations, and special occasions. Authentic flavors that honor every tradition.",
    badge: "Festive & Seasonal",
    ctaLabel: "Inquire Now",
    ctaHref: "/catering#inquiry",
    color: "saffron",
    icon: "🪔",
    promotionType: "catering",
    applicability: "Catering inquiry only",
    disclaimer: "Seasonal menus available. Early booking recommended.",
    placement: ["catering-cards"],
    active: true,
    inquiryCTA: true,
  },
];

// ── Spin Wheel Rewards (dine-in / pickup only) ────────────────────────────────

export interface SpinReward {
  id: string;
  label: string;
  sublabel: string;
  emoji: string;
  bgColor: string;
  textColor: string;
  applicability: string;
  disclaimer: string;
  isWin: boolean;
}

export const SPIN_REWARDS: SpinReward[] = [
  {
    id: "free-naan",
    label: "Free Garlic Naan",
    sublabel: "with any dine-in entrée",
    emoji: "🫓",
    bgColor: "#F4A300",
    textColor: "#1A0801",
    applicability: "Valid for dine-in only",
    disclaimer: "Ask your server to redeem. One per table.",
    isWin: true,
  },
  {
    id: "10-off-pickup",
    label: "10% Off Pickup",
    sublabel: "on your next in-store order",
    emoji: "🏷️",
    bgColor: "#651F12",
    textColor: "#FFF8F1",
    applicability: "Valid for in-store pickup only",
    disclaimer: "Show this screen at the counter. Not valid on delivery.",
    isWin: true,
  },
  {
    id: "free-dessert",
    label: "Free Dessert",
    sublabel: "with a dine-in entrée",
    emoji: "🍮",
    bgColor: "#C9962B",
    textColor: "#1A0801",
    applicability: "Valid for dine-in only",
    disclaimer: "Ask your server. One per table per visit.",
    isWin: true,
  },
  {
    id: "free-drink",
    label: "Free Mango Lassi",
    sublabel: "on in-store pickup orders",
    emoji: "🥭",
    bgColor: "#3D1209",
    textColor: "#FFD56B",
    applicability: "Valid for in-store pickup only",
    disclaimer: "Show this screen at the counter. Not valid on delivery.",
    isWin: true,
  },
  {
    id: "bogo-appetizer",
    label: "Buy 1 Get 1 Half Off",
    sublabel: "appetizers — dine-in only",
    emoji: "🥗",
    bgColor: "#7A5B1A",
    textColor: "#FFF8F1",
    applicability: "Valid for dine-in only",
    disclaimer: "Lower-priced item at 50% off. Ask your server.",
    isWin: true,
  },
  {
    id: "try-again",
    label: "Try Again!",
    sublabel: "Visit us for another spin",
    emoji: "🔄",
    bgColor: "#F4E4C1",
    textColor: "#651F12",
    applicability: "",
    disclaimer: "",
    isWin: false,
  },
  {
    id: "free-lassi-dine",
    label: "Free Lassi",
    sublabel: "with dine-in lunch special",
    emoji: "🥤",
    bgColor: "#F4A300",
    textColor: "#1A0801",
    applicability: "Valid for dine-in only · Mon–Fri 11:30AM–3PM",
    disclaimer: "Valid during lunch hours only. Ask your server.",
    isWin: true,
  },
  {
    id: "5-off-pickup",
    label: "$5 Off Pickup",
    sublabel: "on orders of $30 or more",
    emoji: "💰",
    bgColor: "#651F12",
    textColor: "#FFF8F1",
    applicability: "Valid for in-store pickup only",
    disclaimer: "Show this screen at the counter. Not valid on delivery.",
    isWin: true,
  },
];

// ── Combo Builder Presets ─────────────────────────────────────────────────────

export interface ComboPreset {
  id: string;
  label: string;
  emoji: string;
  description: string;
  ctaType: "pickup" | "dine-in" | "party";
  serves: string;
  categories: {
    label: string;
    suggestions: string[];
  }[];
}

export const COMBO_PRESETS: ComboPreset[] = [
  {
    id: "pickup-combo",
    label: "Quick Pickup Combo",
    emoji: "🥡",
    description: "A satisfying meal built for easy in-store pickup. Ready when you are.",
    ctaType: "pickup",
    serves: "1–2 people",
    categories: [
      { label: "Main", suggestions: ["Chicken Dum Biryani", "Butter Chicken", "Chettinad Chicken Curry"] },
      { label: "Bread", suggestions: ["Garlic Naan", "Butter Naan"] },
      { label: "Side", suggestions: ["Raita", "Salad"] },
    ],
  },
  {
    id: "family-dine-in",
    label: "Family Dine-In",
    emoji: "👨‍👩‍👧‍👦",
    description: "A shared spread perfect for the whole family. Best enjoyed at our table.",
    ctaType: "dine-in",
    serves: "4–6 people",
    categories: [
      { label: "Mandi / Biryani", suggestions: ["Signature Mandi Platter", "Goat Dum Biryani", "Chicken Dum Biryani"] },
      { label: "Curry", suggestions: ["Butter Chicken", "Paneer Butter Masala", "Dal Tadka"] },
      { label: "Bread", suggestions: ["Garlic Naan", "Tandoori Roti", "Parota"] },
      { label: "Dessert", suggestions: ["Gulab Jamun", "Rasmalai"] },
    ],
  },
  {
    id: "party-meal",
    label: "Party Meal Suggestion",
    emoji: "🎉",
    description: "Impress your guests with a curated spread of Clay Pot's finest. Ask us to customize.",
    ctaType: "party",
    serves: "10–20 people",
    categories: [
      { label: "Showstopper", suggestions: ["Signature Mandi Platter", "Goat Mandi", "Chicken Mandi"] },
      { label: "Appetizers", suggestions: ["Chicken 65", "Veg Pakora", "Bang Bang Shrimp"] },
      { label: "Biryani", suggestions: ["Goat Dum Biryani", "Boneless Chicken Biryani"] },
      { label: "Curry", suggestions: ["Butter Chicken", "Kadai Paneer"] },
      { label: "Bread", suggestions: ["Garlic Naan", "Parota"] },
      { label: "Dessert", suggestions: ["Double Ka Meetha", "Gulab Jamun"] },
    ],
  },
];

// ── Promo Bar Messages ────────────────────────────────────────────────────────

export const PROMO_BAR_MESSAGES = [
  "🌞 Lunch Specials Mon–Fri · Dine-In & Pickup · 11:30AM–3PM",
  "🎉 Full-Service Catering — Corporate, Weddings & Private Events",
  "🍹 Happy Hour Daily 4–7PM · Dine-In Lounge Specials",
  "📍 Now Open in Centreville, VA · Dine-In, Pickup & Catering",
  "✨ Weekend Chef's Special — Reserve Your Table Today",
];

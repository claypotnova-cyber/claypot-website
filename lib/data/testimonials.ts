export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  date: string;
  source: "Google" | "Yelp" | "TripAdvisor";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    location: "Centreville, VA",
    rating: 5,
    quote:
      "Hands down the best Indian restaurant in Northern Virginia. The Butter Chicken is transcendent — rich, velvety, perfectly balanced. The ambiance feels like a luxury escape. We come every week!",
    date: "March 2025",
    source: "Google",
  },
  {
    id: "t2",
    name: "Raj P.",
    location: "Fairfax, VA",
    rating: 5,
    quote:
      "Clay Pot elevates Indian cuisine to a whole new level. The Lamb Dum Biryani is out of this world — authentic, aromatic, and served with such care. The cocktail menu surprised us pleasantly too.",
    date: "February 2025",
    source: "Google",
  },
  {
    id: "t3",
    name: "Jennifer K.",
    location: "Chantilly, VA",
    rating: 5,
    quote:
      "We booked Clay Pot for our office holiday party catering and they exceeded every expectation. Professional, delicious, and such warm service. Will absolutely use them again for our next event.",
    date: "January 2025",
    source: "Yelp",
  },
  {
    id: "t4",
    name: "David L.",
    location: "Reston, VA",
    rating: 5,
    quote:
      "The Spice Trail cocktail + Chicken Tikka combo is absolutely phenomenal. This is not your average Indian takeout — it's a full experience. The interior design is stunning too.",
    date: "March 2025",
    source: "Google",
  },
  {
    id: "t5",
    name: "Priya N.",
    location: "Herndon, VA",
    rating: 5,
    quote:
      "As someone who grew up eating authentic Indian food at home, I can say Clay Pot gets it right. The Palak Paneer is just like mom used to make — but presented beautifully. Rare find!",
    date: "February 2025",
    source: "Google",
  },
  {
    id: "t6",
    name: "Marcus T.",
    location: "McLean, VA",
    rating: 5,
    quote:
      "Incredible happy hour! The atmosphere at the lounge bar is sophisticated and the bites are shareable and delicious. Makes for a perfect Friday evening spot. Already planning my next visit.",
    date: "March 2025",
    source: "Yelp",
  },
];

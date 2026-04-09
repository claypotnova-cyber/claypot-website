export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  source: "Google" | "Yelp" | "TripAdvisor";
  category: "dining" | "catering";
  date?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    location: "Centreville, VA",
    rating: 5,
    quote:
      "Hands down the best Indian restaurant in Northern Virginia. The Butter Chicken is transcendent — rich, velvety, perfectly balanced. The ambiance feels like a luxury escape. We come every week!",
    source: "Google",
    category: "dining",
  },
  {
    id: "t2",
    name: "Raj P.",
    location: "Fairfax, VA",
    rating: 5,
    quote:
      "Clay Pot elevates Indian cuisine to a whole new level. The Lamb Dum Biryani is out of this world — authentic, aromatic, and served with such care. The cocktail menu surprised us pleasantly too.",
    source: "Google",
    category: "dining",
  },
  {
    id: "t3",
    name: "Jennifer K.",
    location: "Chantilly, VA",
    rating: 5,
    quote:
      "We booked Clay Pot for our office holiday party catering and they exceeded every expectation. Professional, delicious, and such warm service. Will absolutely use them again for our next event.",
    source: "Yelp",
    category: "catering",
  },
  {
    id: "t4",
    name: "David L.",
    location: "Reston, VA",
    rating: 5,
    quote:
      "The Spice Trail cocktail + Chicken Tikka combo is absolutely phenomenal. This is not your average Indian takeout — it's a full experience. The interior design is stunning too.",
    source: "Google",
    category: "dining",
  },
  {
    id: "t5",
    name: "Priya N.",
    location: "Herndon, VA",
    rating: 5,
    quote:
      "As someone who grew up eating authentic Indian food at home, I can say Clay Pot gets it right. The Palak Paneer is just like mom used to make — but presented beautifully. Rare find!",
    source: "Google",
    category: "dining",
  },
  {
    id: "t6",
    name: "Marcus T.",
    location: "McLean, VA",
    rating: 5,
    quote:
      "Incredible happy hour! The atmosphere at the lounge bar is sophisticated and the bites are shareable and delicious. Makes for a perfect Friday evening spot. Already planning my next visit.",
    source: "Yelp",
    category: "dining",
  },
  {
    id: "t7",
    name: "Anita R.",
    location: "Ashburn, VA",
    rating: 5,
    quote:
      "Clay Pot catered our daughter's wedding reception and it was absolutely flawless. Every dish was served fresh and piping hot. The Paneer Makhani and Rogan Josh were the stars — guests couldn't stop raving!",
    source: "Google",
    category: "catering",
  },
  {
    id: "t8",
    name: "Michael B.",
    location: "Vienna, VA",
    rating: 5,
    quote:
      "We hired Clay Pot for a corporate team lunch of 80 people. The setup was seamless, the staff was incredibly professional, and the food was outstanding. Way better than any catering we've had before.",
    source: "Google",
    category: "catering",
  },
  {
    id: "t9",
    name: "Sunita K.",
    location: "Sterling, VA",
    rating: 5,
    quote:
      "From the tasting session to the final event, Clay Pot's catering team was exceptional. They customized the menu for dietary needs without compromising on flavor. Our guests are still talking about the Biryani bar!",
    date: "January 2025",
    source: "Yelp",
    category: "catering",
  },
];

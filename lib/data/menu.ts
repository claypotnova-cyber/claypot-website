export type DietaryBadge = "veg" | "non-veg" | "vegan" | "gluten-free";
export type SpiceBadge = "mild" | "medium" | "spicy" | "very-spicy";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  category: MenuCategory;
  image?: string;
  dietary: DietaryBadge[];
  spice?: SpiceBadge;
  featured?: boolean;
  bestseller?: boolean;
  chefsPick?: boolean;
  outOfStock?: boolean;
}

export type MenuCategory =
  | "featured"
  | "refreshers"
  | "snacks-chaat"
  | "indo-chinese"
  | "veg-appetizers"
  | "non-veg-appetizers"
  | "veg-curries"
  | "non-veg-curries"
  | "biryanis"
  | "breads"
  | "sides"
  | "desserts";

export const MENU_CATEGORIES: { id: MenuCategory; label: string; icon: string }[] = [
  { id: "featured", label: "Featured Items", icon: "✨" },
  { id: "refreshers", label: "Refreshers", icon: "🥤" },
  { id: "snacks-chaat", label: "Snacks & Chaat", icon: "🥗" },
  { id: "indo-chinese", label: "Indo-Chinese", icon: "🥢" },
  { id: "veg-appetizers", label: "Veg Appetizers", icon: "🥦" },
  { id: "non-veg-appetizers", label: "Non-Veg Appetizers", icon: "🍗" },
  { id: "veg-curries", label: "Veg Curries", icon: "🍲" },
  { id: "non-veg-curries", label: "Non-Veg Curries", icon: "🍖" },
  { id: "biryanis", label: "Biryanis", icon: "🥘" },
  { id: "breads", label: "Breads", icon: "🫓" },
  { id: "sides", label: "Sides", icon: "🥣" },
  { id: "desserts", label: "Desserts", icon: "🍮" },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- FEATURED ITEMS ---
  {
    id: "f-chicken-mandi",
    name: "Chicken Mandi",
    price: "$16.99",
    category: "featured",
    dietary: ["non-veg"],
    featured: true,
    image: "/images/dish-chicken-mandi.jpg",
  },
  {
    id: "f-bang-bang-gobi",
    name: "Bang Bang Gobi",
    price: "$13.99",
    category: "featured",
    dietary: ["veg"],
    featured: true,
    image: "/images/dish-bang-bang-gobi.jpg",
  },
  {
    id: "f-haleem",
    name: "Haleem",
    price: "$18.99",
    category: "featured",
    dietary: ["non-veg"],
    featured: true,
    image: "/images/dish-haleem.jpg",
  },

  // --- REFRESHERS ---
  { id: "refresh-chikoo", name: "Chikoo Shake", price: "$4.99", category: "refreshers", dietary: ["veg"] },
  { id: "refresh-mango", name: "Mango Lassi", price: "$4.99", category: "refreshers", dietary: ["veg"] },
  { id: "refresh-limca", name: "Limca", price: "$2.99", category: "refreshers", dietary: ["veg"] },
  { id: "refresh-thumbs", name: "Thums Up", price: "$2.99", category: "refreshers", dietary: ["veg"] },
  { id: "refresh-water", name: "Water Bottle", price: "$0.99", category: "refreshers", dietary: ["veg"] },

  // --- SNACKS & CHAAT ---
  { id: "snack-peanut", name: "Masala Peanut", price: "$5.99", category: "snacks-chaat", dietary: ["veg"] },
  { id: "snack-onion-pakora", name: "Onion Pakora", price: "$7.99", category: "snacks-chaat", dietary: ["veg"] },
  { id: "snack-onion-samosa", name: "Onion Samosa (5 Pieces)", price: "$6.25", category: "snacks-chaat", dietary: ["veg"] },
  { id: "snack-samosa-2", name: "Samosa (2 Pieces)", price: "$5.00", category: "snacks-chaat", dietary: ["veg"] },
  { id: "snack-cut-mirchi", name: "Cut Mirchi", price: "$9.99", category: "snacks-chaat", dietary: ["veg"] },
  { id: "snack-mirchi-bajji", name: "Michi Bajji (5 Pieces)", price: "$9.99", category: "snacks-chaat", dietary: ["veg"] },
  { id: "snack-boiled-eggs", name: "Boiled Eggs", price: "$8.99", category: "snacks-chaat", dietary: ["non-veg"] },
  { id: "snack-egg-bonda", name: "Egg Bonda", price: "$9.99", category: "snacks-chaat", dietary: ["non-veg"] },
  { id: "snack-omlet", name: "Omlet", price: "$8.99", category: "snacks-chaat", dietary: ["non-veg"] },
  { id: "snack-masala-papad", name: "Masala Papad", price: "$5.99", category: "snacks-chaat", dietary: ["veg"] },
  { id: "snack-allam-chai", name: "Allam Chai", price: "$2.00", category: "snacks-chaat", dietary: ["veg"] },
  { id: "chaat-samosa", name: "Samosa Chaat", price: "$8.99", category: "snacks-chaat", dietary: ["veg"] },
  { id: "chaat-ragada", name: "Ragada Chaat", price: "$8.99", category: "snacks-chaat", dietary: ["veg"] },
  { id: "chaat-bhel", name: "Bhel Puri", price: "$6.99", category: "snacks-chaat", dietary: ["veg"] },

  // --- INDO-CHINESE ---
  { id: "chinese-chicken-fried-rice", name: "Chicken Fried Rice", price: "$14.99", category: "indo-chinese", dietary: ["non-veg"] },
  { id: "chinese-chicken-noodles", name: "Chicken Noodles", price: "$14.99", category: "indo-chinese", dietary: ["non-veg"] },
  { id: "chinese-egg-fried-rice", name: "Egg Fried Rice", price: "$13.99", category: "indo-chinese", dietary: ["non-veg"] },
  { id: "chinese-egg-noodles", name: "Egg Noodles", price: "$13.99", category: "indo-chinese", dietary: ["non-veg"] },
  { id: "chinese-paneer-fried-rice", name: "Paneer Fried Rice", price: "$14.99", category: "indo-chinese", dietary: ["veg"] },
  { id: "chinese-paneer-noodles", name: "Paneer Noodles", price: "$14.99", category: "indo-chinese", dietary: ["veg"] },
  { id: "chinese-veg-fried-rice", name: "Veg Fried Rice", price: "$12.99", category: "indo-chinese", dietary: ["veg"] },
  { id: "chinese-veg-noodles", name: "Veg Noodles", price: "$12.99", category: "indo-chinese", dietary: ["veg"] },

  // --- VEG APPETIZERS ---
  { id: "veg-app-bang-bang-gobi", name: "Bang Bang Gobi", price: "$13.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-bang-bang-paneer", name: "Bang Bang Paneer", price: "$14.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-cilantro-gobi", name: "Cilantro Gobi", price: "$13.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-cilantro-paneer", name: "Cilantro Paneer", price: "$14.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-gobi-65", name: "Gobi 65", price: "$13.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-gobi-manchuria", name: "Gobi Manchuria", price: "$13.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-karampodi-gobi", name: "Karampodi Gobi", price: "$13.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-mix-pakora", name: "Mix Veg Pakora", price: "$8.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-onion-pakora", name: "Onion Pakora", price: "$7.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-paneer-65", name: "Paneer 65", price: "$14.99", category: "veg-appetizers", dietary: ["veg"] },
  { id: "veg-app-paneer-manchuria", name: "Paneer Manchurria", price: "$14.99", category: "veg-appetizers", dietary: ["veg"] },

  // --- NON-VEG APPETIZERS ---
  { id: "nv-app-goat-ghee", name: "Baby Goat Ghee Roast", price: "$19.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-goat-kali", name: "Baby Goat Kalimirchi", price: "$19.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-goat-sukka", name: "Baby Goat Sukka", price: "$19.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-fish-bang", name: "Bang Bang Fish", price: "$18.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-shrimp-bang", name: "Bang Bang Shrimp", price: "$20.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-chicken-65", name: "Chicken 65", price: "$14.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-chicken-ghee", name: "Chicken Ghee Roast", price: "$15.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-chicken-majestic", name: "Chicken Majestic", price: "$14.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-chicken-pakodi", name: "Chicken Pakodi", price: "$14.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-chicken-sukka", name: "Chicken Sukka", price: "$15.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-chilly-chicken", name: "Chilly Chicken", price: "$14.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-karampodi-chicken", name: "Karampodi Chicken", price: "$14.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-kothimeera-kodi", name: "Kothimeera Kodi", price: "$14.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-pepper-chicken", name: "Pepper Chicken", price: "$14.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-haleem", name: "Haleem", price: "$18.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-paya", name: "Paya", price: "$10.99", category: "non-veg-appetizers", dietary: ["non-veg"] },
  { id: "nv-app-paya-bread", name: "Paya + Bread", price: "$13.99", category: "non-veg-appetizers", dietary: ["non-veg"] },

  // --- VEG CURRIES ---
  { id: "veg-curry-aloo-gobi", name: "Aloo Gobi Masala", price: "$14.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-aloo-mutter", name: "Aloo Mutter", price: "$13.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-bendi", name: "Bendi Masala", price: "$13.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-egg-masala", name: "Boild Egg Masala", price: "$14.99", category: "veg-curries", dietary: ["non-veg"] },
  { id: "veg-curry-capsicum", name: "Capsicum Tomato Masala", price: "$13.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-chana", name: "Chana Masala", price: "$11.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-dal", name: "Dal Tadka", price: "$11.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-egg-burji", name: "Egg Burji", price: "$14.99", category: "veg-curries", dietary: ["non-veg"] },
  { id: "veg-curry-gongura-paneer", name: "Gongura Paneer", price: "$17.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-guthi", name: "Guthi Vankaya", price: "$13.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-kadai-paneer", name: "Kadai Paneer", price: "$15.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-paneer-butter", name: "Paneer Butter Masala", price: "$15.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-paneer-tikka", name: "Paneer Tikka Masala", price: "$15.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-saag-aloo", name: "Saag Aloo", price: "$13.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-saag-paneer", name: "Saag Paneer", price: "$15.99", category: "veg-curries", dietary: ["veg"] },
  { id: "veg-curry-kurma", name: "Veg Kurma", price: "$13.99", category: "veg-curries", dietary: ["veg"] },

  // --- NON-VEG CURRIES ---
  { id: "nv-curry-goat", name: "Baby Goat Curry", price: "$19.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-butter-chicken", name: "Butter Chicken", price: "$15.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-chettinad-goat", name: "Chettinad Baby Goat Curry", price: "$19.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-chettinad-chicken", name: "Chettinad Chicken Curry", price: "$15.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-chicken-dhalcha", name: "Chicken Dhalcha", price: "$15.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-tikka", name: "Chicken Tikka Masala", price: "$15.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-gongura-chicken", name: "Gongura Chicken Curry", price: "$17.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-gongura-mutton", name: "Gongura Mutton Curry", price: "$21.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-hyderabadi", name: "Hyderabad Chicken Curry", price: "$15.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-mutton-dhalcha", name: "Mutton Dhalcha", price: "$19.99", category: "non-veg-curries", dietary: ["non-veg"] },
  { id: "nv-curry-saag-chicken", name: "Saag Chicken", price: "$15.99", category: "non-veg-curries", dietary: ["non-veg"] },

  // --- BIRYANIS ---
  { id: "biryani-anda", name: "Anda Biryani", price: "$14.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-goat-dum", name: "Baby Goat Dum Biryani", price: "$19.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-boneless", name: "Boneless Chicken Biryani", price: "$17.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-c65", name: "Chicken 65 Biryani", price: "$17.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-c65-mandi", name: "Chicken 65 Mandi", price: "$17.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-chicken-dum", name: "Chicken Dum Biryani", price: "$16.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-fry-mandi", name: "Chicken Fry Mandi", price: "$16.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-chicken-ghee-mandi", name: "Chicken Gheeroast Mandi", price: "$17.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-goat-ghee-mandi", name: "Goat Ghee Roast Mandi", price: "$25.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-goat-sukka-mandi", name: "Goat Sukka Mandi", price: "$25.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-gongura-chicken", name: "Gongura Chicken Biryani", price: "$17.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-gongura-mutton", name: "Gongura Mutton Biryani", price: "$22.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-gongura-paneer", name: "Gongura Panner Biryani", price: "$15.99", category: "biryanis", dietary: ["veg"] },
  { id: "biryani-jackfruit", name: "Jackfruit Biryani", price: "$14.99", category: "biryanis", dietary: ["veg"] },
  { id: "biryani-karampodi-mandi", name: "Karampodi Chicken Mandi", price: "$17.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-kheema", name: "Mutton Kheema Biryani", price: "$22.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-p65", name: "Paneer 65 Biryani", price: "$15.99", category: "biryanis", dietary: ["veg"] },
  { id: "biryani-shrimp", name: "Shrimp Biryani", price: "$22.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-ulava-chicken", name: "Ulavachaaru Chicken Biryani", price: "$17.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-ulava-mutton", name: "Ulavacharu Mutton Biryani", price: "$22.99", category: "biryanis", dietary: ["non-veg"] },
  { id: "biryani-veg-dum", name: "Veg Dum Biryani", price: "$12.99", category: "biryanis", dietary: ["veg"] },

  // --- BREADS ---
  { id: "bread-naan", name: "Butter Naan", price: "$2.99", category: "breads", dietary: ["veg"] },
  { id: "bread-garlic-naan", name: "Garlic Naan", price: "$3.99", category: "breads", dietary: ["veg"] },

  // --- SIDES ---
  { id: "side-poori", name: "Poori (3 Pieces)", price: "$5.99", category: "sides", dietary: ["veg"] },
  { id: "side-pulka", name: "pulka (3 Pieces)", price: "$5.99", category: "sides", dietary: ["veg"] },
  { id: "side-chapati", name: "chapati (3 Pieces)", price: "$5.99", category: "sides", dietary: ["veg"] },
  { id: "side-parota-chicken", name: "Parota chicken", price: "$15.99", category: "sides", dietary: ["non-veg"] },
  { id: "side-curd-rice", name: "Curd rice", price: "$12.99", category: "sides", dietary: ["veg"] },
  { id: "side-raita-4", name: "Raita 4 oz", price: "$1.00", category: "sides", dietary: ["veg"] },
  { id: "side-raita-8", name: "Raita 8 oz", price: "$1.99", category: "sides", dietary: ["veg"] },
  { id: "side-spicy-mayo-4", name: "Spicy mayo 4 oz", price: "$1.99", category: "sides", dietary: ["veg"] },
  { id: "side-spicy-mayo-8", name: "Spicy maya 8 oz", price: "$3.99", category: "sides", dietary: ["veg"] },
  { id: "side-raita-16", name: "Raita 16 oz", price: "$6.99", category: "sides", dietary: ["veg"] },
  { id: "side-white-rice", name: "White Rice", price: "$1.99", category: "sides", dietary: ["veg"] },
  { id: "side-mandi-rice", name: "Mandi Rice", price: "$9.99", category: "sides", dietary: ["veg"] },
  { id: "side-biryani-rice-32", name: "Biryani Rice 32 oz", price: "$8.99", category: "sides", dietary: ["veg"] },
  { id: "side-biryani-rice-16", name: "Biryani Rice 16 oz", price: "$5.99", category: "sides", dietary: ["veg"] },

  // --- DESSERTS ---
  { id: "dessert-apricot", name: "Apricot Delight", price: "$7.99", category: "desserts", dietary: ["veg"] },
  { id: "dessert-jamun", name: "Gulab Jamun (3 Pieces)", price: "$4.99", category: "desserts", dietary: ["veg"] },
  { id: "dessert-rasmalai", name: "Rasmalai (2 Pieces)", price: "$4.99", category: "desserts", dietary: ["veg"] },
  { id: "dessert-paan", name: "Sweet Paan", price: "$3.00", category: "desserts", dietary: ["veg"] },
  { id: "dessert-double-meetha", name: "Double Ka Meetha", price: "$4.99", category: "desserts", dietary: ["veg"] },
];

export const FEATURED_DISHES = MENU_ITEMS.filter((item) => item.category === "featured");

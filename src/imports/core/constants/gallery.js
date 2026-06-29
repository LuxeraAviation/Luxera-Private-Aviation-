const POOL = [
  "/image/av/cabin-portrait.webp",
  "/image/av/jet-gold-tarmac.jpg",
  "/image/av/cabin-lounge.webp",
  "/image/av/jet-clouds.jpg",
  "/image/av/cabin-dining.webp",
  "/image/av/jet-reflection.jpg",
  "/image/av/jet-sunset.webp",
  "/image/av/jet-front-runway.jpg",
  "/image/av/cabin-wide.webp",
  "/image/av/jet-night.webp",
  "/image/av/jet-flying.webp",
  "/image/av/jet-stairs.webp",
];

export const GALLERY_HOME = [
  { label: "Cabin Interior", image: "/image/av/cabin-portrait.webp" },
  { label: "On the Tarmac", image: "/image/av/jet-sunset.webp" },
  { label: "VIP Lounge", image: "/image/av/cabin-lounge.webp" },
  { label: "Wheels Up", image: "/image/av/jet-flying.webp" },
];

const LABELS = [
  "Cabin Interior",
  "On the Tarmac",
  "VIP Lounge",
  "Wheels Up",
  "Fine Dining Aloft",
  "Boarding",
  "Window Seat",
  "Night Departure",
  "Flight Deck",
  "Private Suite",
  "Sunset Charter",
  "Arrival",
];

export const GALLERY_ITEMS = LABELS.map((label, i) => ({
  label,
  image: POOL[i % POOL.length],
}));

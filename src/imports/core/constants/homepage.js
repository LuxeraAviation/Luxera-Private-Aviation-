import WorldIcon from "@/imports/core/assets/WorldIcon";
import MoneyIcon from "@/imports/core/assets/MoneyIcon";
import BriefcaseIcon from "@/imports/core/assets/BriefcaseIcon";
import NoteIcon from "@/imports/core/assets/NoteIcon";
import JobAnnouncementIcon from "@/imports/core/assets/JobAnnouncementIcon";
import CoolestJobIcon from "@/imports/core/assets/CoolestJobIcon";

export const FROM_OPTIONS = [
  { value: "dhaka", label: "Dhaka" },
  { value: "london", label: "London" },
];

export const TO_OPTIONS = [
  { value: "london", label: "London" },
  { value: "dhaka", label: "Dhaka" },
];

export const DATE_OPTIONS = [
  { value: "25/12/2021", label: "25/12/2021" },
  { value: "30/12/2021", label: "30/12/2021" },
];

export const FEATURES = [
  {
    icon: WorldIcon,
    title: "Luxury & Comfort Travel",
    text: "As well as getting to fly to many different destinations as part of their job, airplane pilots get big discounts on money",
  },
  {
    icon: MoneyIcon,
    title: "Smart Costing Flight",
    text: "Flying should be a pleasure and we’ll make your charter experience as luxurious and more comfortable as soon as possible.",
  },
  {
    icon: BriefcaseIcon,
    title: "Career progression",
    text: "The first small jet-powered civil aircraft was the Morane-Saulnier MS.760 Paris, developed privately since 1940s",
  },
  {
    icon: NoteIcon,
    title: "Flexible Schedule",
    text: "Our technology consistently delivers the best pricing for charters – and the unique ability to buy individual seats all over the world.",
  },
  {
    icon: JobAnnouncementIcon,
    title: "Excellent advantages",
    text: "Search the world with ease and transparency.As the only tech-forward private aviation company, XO is able to bring you",
  },
  {
    icon: CoolestJobIcon,
    title: "Coolest Environment",
    text: "Charter an entire jet, or offer the seats you don’t need through our app a need for full or even fractional jet ownership",
  },
];

export const PACKAGES = [
  {
    img: "/image/demo/package.webp",
    title: "Island of the Goods",
    price: "$115.00",
    date: "Thursday, Nov 4, 2024",
    person: "2 Adults",
  },
  {
    img: "/image/demo/package.webp",
    title: "City of the Goods",
    price: "$110.00",
    date: "Friday, Dec 7, 2024",
    person: "3 Adults",
  },
  {
    img: "/image/demo/package.webp",
    title: "Desert of the Goods",
    price: "$120.00",
    date: "Sunday, Sep 3, 2024",
    person: "4 Adults",
  },
  {
    img: "/image/demo/package.webp",
    title: "Desert of the Goods",
    price: "$120.00",
    date: "Sunday, Sep 3, 2024",
    person: "4 Adults",
  },
  {
    img: "/image/demo/package.webp",
    title: "Desert of the Goods",
    price: "$120.00",
    date: "Sunday, Sep 3, 2024",
    person: "4 Adults",
  },
];

export const SOCIAL_LINKS = [
  { iconClass: "fab fa-facebook-f", url: "#0", active: false },
  { iconClass: "fab fa-twitter", url: "#0", active: false },
  { iconClass: "fab fa-youtube", url: "#0", active: false },
  { iconClass: "fab fa-instagram", url: "#0", active: false },
];

export const BANNER_BUTTONS = [
  {
    text: "Make Your Trip",
    url: "#0",
    iconClass: "fas fa-chevron-right",
    iconPosition: "left",
    active: false,
  },
  {
    text: "Request Quote",
    url: "#0",
    iconClass: "fas fa-arrow-right",
    iconPosition: "right",
    active: true,
  },
];

export const BLOGS = [
  {
    img: "/image/demo/blog.webp",
    date: "20 March 2024",
    comment: "3 Comment",
    title: "Charter flight of the Death Penalty in America",
    text: "With a vast array of popular private planes to choose from, travelling by private jet charter is the most efficient.",
  },
  {
    img: "/image/demo/blog.webp",
    date: "23 February 2024",
    comment: "4 Comment",
    title: "Our technology consistently deliver",
    text: "Private jet hire for leisure purposes allows yourself, your family and friends to travel in luxury and privacy.",
  },
  {
    img: "/image/demo/blog.webp",
    date: "18 June 2024",
    comment: "6 Comment",
    title: "Search the world with ease and transparency",
    text: "It’s fast gaining in popularity as leisure time becomes increasingly precious and we value the experience.",
  },
];

export const STATS = [
  { to: 95, label: "Professional Pilots" },
  { to: 68, label: "Jet Airplanes" },
  { to: 290, label: "World Airports" },
  { to: 195, label: "Directions" },
];

export const Home_Luxery_deals_cards = [
  {
    img: "/image/demo/charter.webp",
    title: "Private Jet Charter",
    sub: "Legacy 600",
  },
  {
    img: "/image/demo/charter.webp",
    title: "Business Jet Charter",
    sub: "Beech BE300 Super King",
  },
  {
    img: "/image/demo/charter.webp",
    title: "Private Helicopter",
    sub: "Charter a A500",
  },
  {
    img: "/image/demo/charter.webp",
    title: "Air Ambulance",
    sub: "Beech BE300 Super King",
  },
];

export const Home_Luxery_deals_section = {
  subtitle: "Luxury Charters",
  title: "Luxury Deals For You",
  items: Home_Luxery_deals_cards,
  perView: 4,
  resolvePerView: (w) => (w > 1200 ? 4 : w >= 992 ? 3 : w >= 768 ? 2 : 1),
  seats: "8 - 14 Seats",
  price: "Price: $9,000/ hr",
  ctaLabel: "Book Now",
};

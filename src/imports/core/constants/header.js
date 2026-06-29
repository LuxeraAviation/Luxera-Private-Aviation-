export const NAV_ITEMS = [
  { label: "Home", url: "/" },
  { label: "About Us", url: "/" },
  {
    label: "Fleet",
    url: "/",
    submenu: [
      { text: "Our Fleet", url: "/" },
      { text: "Aircraft Details", url: "/" },
    ],
  },
  { label: "Services", url: "/" },
  { label: "Gallery", url: "/" },
  { label: "Crew", url: "/" },
  {
    label: "Journal",
    url: "/",
    submenu: [
      { text: "Journal", url: "/" },
      { text: "Article", url: "/" },
    ],
  },
  { label: "FAQ", url: "/" },
  { label: "Contact", url: "/" },
];

export const RESERVATION = { label: "Book a Jet", url: "/" };

export const BRAND = {
  name: "Luxera",
  logoLight: "/image/luxera-logo-light.svg",
  logoDark: "/image/luxera-logo-dark.svg",
};

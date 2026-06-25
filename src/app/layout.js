import StyledComponentsRegistry from "@/lib/Registry";
import { Mulish, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { ScrollToTop } from "@/styles/Theme";
import Preloader from "@/imports/core/components/Preloader";
import Header from "@/imports/core/components/Header";
import Footer from "@/imports/core/components/Footer";
import CallWidget from "@/imports/core/components/CallWidget";
import GlobalStyles from "@/styles/GlobalStyles";
import LockdownGate from "@/imports/core/components/LockdownGate";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish",
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
});
const nasalization = localFont({
  src: "../../public/fonts/nasalization.otf",
  variable: "--font-nasalization",
  display: "swap",
});

export const metadata = {
  title: "FlyNext — Book a Private Jet Instantly",
  description:
    "FlyNext private airline & charter services — luxury and corporate private jet charter, instant booking.",
  icons: { icon: "/image/fav.png" },
};

export default function RootLayout({ children }) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html
      lang="en"
      className={`${mulish.variable} ${playfairDisplay.variable} ${nasalization.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          referrerPolicy="no-referrer"
        />
        <link rel="stylesheet" href="/css/icomoon.css" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <LockdownGate isProd={isProd}>
            <Preloader />
            <Header />
            {children}
            <Footer />
            <CallWidget />
            <ScrollToTop />
          </LockdownGate>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

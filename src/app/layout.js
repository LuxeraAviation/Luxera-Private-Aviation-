import StyledComponentsRegistry from "@/lib/Registry";
import localFont from "next/font/local";
import { ScrollToTop } from "@/styles/Theme";
import Preloader from "@/imports/core/components/Preloader";
import Header from "@/imports/core/components/Header";
import Footer from "@/imports/core/components/Footer";
import CallWidget from "@/imports/core/components/CallWidget";
import GlobalStyles from "@/styles/GlobalStyles";
import { ChromeProvider, Chrome } from "@/imports/core/components/ChromeGate";

// Merriweather replaces the old body & heading fonts everywhere. It's exposed
// under the existing CSS variable names so every component picks it up unchanged.
// (The LUXERA title uses --font-nasalization and is intentionally left alone.)
const mulish = localFont({
  src: [
    { path: "../../public/fonts/merriweather/Merriweather-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/merriweather/Merriweather-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/merriweather/Merriweather-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/merriweather/Merriweather-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/merriweather/Merriweather-BoldIt.ttf", weight: "700", style: "italic" },
    { path: "../../public/fonts/merriweather/Merriweather-UltraBold.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-mulish",
  display: "swap",
});
const playfairDisplay = localFont({
  src: [
    { path: "../../public/fonts/merriweather/Merriweather-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/merriweather/Merriweather-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/merriweather/Merriweather-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/merriweather/Merriweather-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/merriweather/Merriweather-BoldIt.ttf", weight: "700", style: "italic" },
    { path: "../../public/fonts/merriweather/Merriweather-UltraBold.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-playfair-display",
  display: "swap",
});
const nasalization = localFont({
  src: "../../public/fonts/nasalization.otf",
  variable: "--font-nasalization",
  display: "swap",
});

export const metadata = {
  title: "Luxera — Book a Private Jet Instantly",
  description:
    "Luxera private airline & charter services — luxury and corporate private jet charter, instant booking.",
  icons: { icon: "/image/luxera-icon.svg" },
};

export default function RootLayout({ children }) {

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
          <ChromeProvider>
            <Preloader />
            <Chrome>
              <Header />
            </Chrome>
            {children}
            <Chrome>
              <Footer />
              <CallWidget />
            </Chrome>
            <ScrollToTop />
          </ChromeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

import StyledComponentsRegistry from "@/lib/Registry";
import localFont from "next/font/local";
import { Poppins, Libre_Caslon_Display } from "next/font/google";
import Preloader from "@/imports/core/components/Preloader";
import Header from "@/imports/core/components/Header";
import Footer from "@/imports/core/components/Footer";
import GlobalStyles from "@/styles/GlobalStyles";
import { ChromeProvider, Chrome } from "@/imports/core/components/ChromeGate";
import { ThemeModeProvider } from "@/imports/core/components/ThemeMode";

const mulish = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mulish",
  display: "swap",
});
const playfairDisplay = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair-display",
  display: "swap",
});
const nasalization = localFont({
  src: "../../public/fonts/nasalization.otf",
  variable: "--font-nasalization",
  display: "swap",
});

export const metadata = {
  title: "Luxera — Luxury Private Jet Charter",
  description:
    "Luxera private aviation — on-demand private jet charter, empty-leg deals, aircraft management, and 24/7 VIP concierge worldwide.",
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
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeModeProvider>
            <GlobalStyles />
            <ChromeProvider>
              <Preloader />
              <Chrome>
                <Header />
              </Chrome>
              {children}
              <Chrome>
                <Footer />
              </Chrome>
            </ChromeProvider>
          </ThemeModeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

"use client";

import Banner from "@/imports/HomePage/ui/components/Banner";
import Overview from "@/imports/HomePage/ui/components/Overview";
import About from "@/imports/HomePage/ui/components/About";
import Feature from "@/imports/HomePage/ui/components/Feature";
import Statistics from "@/imports/HomePage/ui/components/Statistics";
import Charter from "@/imports/core/components/Charter";
import BookFlight from "@/imports/HomePage/ui/components/BookFlight";
import Packages from "@/imports/HomePage/ui/components/Packages";
import Clients from "@/imports/HomePage/ui/components/Clients";
import Brands from "@/imports/HomePage/ui/components/Brands";
import Blog from "@/imports/HomePage/ui/components/Blog";
import { Home_Luxery_deals_section } from "@/imports/core/constants/homepage";

export default function HomePage() {
  return (
    <main>
      <Banner />
      <Overview />
      <About />
      <Feature />
      <Statistics />
      <Charter {...Home_Luxery_deals_section} />
      <BookFlight />
      <Packages />
      <Clients />
      <Brands />
      <Blog />
    </main>
  );
}

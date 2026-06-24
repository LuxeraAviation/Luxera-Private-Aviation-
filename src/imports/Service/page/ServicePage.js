"use client";

import Banner from "@/imports/core/components/Banner";
import { SERVICE_BANNER } from "@/imports/core/constants/banner";
import Feature from "@/imports/HomePage/ui/components/Feature";
import Statistics from "@/imports/HomePage/ui/components/Statistics";
import Charter from "@/imports/core/components/Charter";
import BookFlight from "@/imports/HomePage/ui/components/BookFlight";
import Brands from "@/imports/HomePage/ui/components/Brands";
import { Home_Luxery_deals_section } from "@/imports/core/constants/homepage";

export default function ServicePage() {
  return (
    <main>
      <Banner {...SERVICE_BANNER} />
      <Feature
        subTitle="Our Services"
        sectionTitle="Find the Best Service For You"
      />
      <Statistics />
      <BookFlight />
      <Charter {...Home_Luxery_deals_section} noPaddingTop hasPaddingBottom />
      <Brands />
    </main>
  );
}

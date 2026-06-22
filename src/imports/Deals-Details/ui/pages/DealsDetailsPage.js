"use client";

import Banner from "@/imports/core/components/Banner";
import { DEALS_DETAILS_BANNER } from "@/imports/core/constants/banner";
import Specification from "@/imports/Deals-Details/ui/components/Specification";
import SpecsStatistics from "@/imports/Deals-Details/ui/components/SpecsStatistics";
import Gallery from "@/imports/core/components/Gallery";
import { DEALS_GALLERY } from "@/imports/core/constants/gallery";
import SpecsSafety from "@/imports/Deals-Details/ui/components/SpecsSafety";
import SpecsInterior from "@/imports/Deals-Details/ui/components/SpecsInterior";
import BookFlight from "@/imports/HomePage/ui/components/BookFlight";
import Brands from "@/imports/HomePage/ui/components/Brands";

export default function DealsDetailsPage() {
  return (
    <main>
      <Banner {...DEALS_DETAILS_BANNER} />
      <Specification />
      <SpecsStatistics />
      <Gallery {...DEALS_GALLERY} />
      <SpecsSafety />
      <SpecsInterior />
      <BookFlight />
      <Brands />
    </main>
  );
}

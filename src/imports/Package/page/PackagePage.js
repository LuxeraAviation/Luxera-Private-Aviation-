"use client";

import Banner from "@/imports/core/components/Banner";
import { PACKAGE_BANNER } from "@/imports/core/constants/banner";
import Feature from "@/imports/HomePage/ui/components/Feature";
import Statistics from "@/imports/HomePage/ui/components/Statistics";
import Packages from "@/imports/HomePage/ui/components/Packages";

export default function PackagePage() {
  return (
    <main>
      <Banner {...PACKAGE_BANNER} />
      <Feature subTitle="Tour Packages" sectionTitle="Why tour with us" />
      <Statistics />
      <Packages />
    </main>
  );
}

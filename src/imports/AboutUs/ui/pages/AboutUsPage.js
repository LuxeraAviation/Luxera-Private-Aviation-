"use client";

import Banner from "@/imports/core/components/Banner";
import { ABOUT_BANNER } from "@/imports/core/constants/banner";
import AboutUsDetail from "@/imports/AboutUs/ui/components/AboutUsDetail";
import WhyChoose from "@/imports/AboutUs/ui/components/WhyChoose";
import Statistics from "@/imports/HomePage/ui/components/Statistics";
import HistoryTimeline from "@/imports/AboutUs/ui/components/HistoryTimeline";
import TeamSlider from "@/imports/AboutUs/ui/components/TeamSlider";
import Testimonials from "@/imports/AboutUs/ui/components/Testimonials";
import FaqSection from "@/imports/AboutUs/ui/components/FaqSection";
import Brands from "@/imports/HomePage/ui/components/Brands";

export default function AboutUsPage() {
  return (
    <main>
      <Banner {...ABOUT_BANNER} />
      <AboutUsDetail />
      <WhyChoose />
      <Statistics />
      <HistoryTimeline />
      <TeamSlider />
      <Testimonials />
      <FaqSection />
      <Brands />
    </main>
  );
}

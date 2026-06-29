import PageHeading from "@/imports/core/components/PageHeading";
import AboutIntro from "@/imports/About/ui/components/AboutIntro";
import ServicesIntro from "@/imports/HomePage/ui/components/ServicesIntro";
import Features from "@/imports/HomePage/ui/components/Features";
import Testimonials from "@/imports/HomePage/ui/components/Testimonials";
import VideoBlock from "@/imports/HomePage/ui/components/VideoBlock";
import Newsletter from "@/imports/HomePage/ui/components/Newsletter";

export default function AboutPage() {
  return (
    <main>
      <PageHeading title="About Us" bg="/image/luxera/new.png" />
      <AboutIntro />
      <ServicesIntro />
      <Features />
      <VideoBlock />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

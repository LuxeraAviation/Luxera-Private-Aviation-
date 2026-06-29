import PageHeading from "@/imports/core/components/PageHeading";
import ServicesGrid from "@/imports/Services/ui/components/ServicesGrid";
import ServicesIntro from "@/imports/HomePage/ui/components/ServicesIntro";
import Features from "@/imports/HomePage/ui/components/Features";
import VideoBlock from "@/imports/HomePage/ui/components/VideoBlock";
import Newsletter from "@/imports/HomePage/ui/components/Newsletter";

export default function ServicesPage() {
  return (
    <main>
      <PageHeading title="Services" bg="/image/luxera/new.png" />
      <ServicesIntro />
      <ServicesGrid />
      <Features />
      <VideoBlock />
      <Newsletter />
    </main>
  );
}

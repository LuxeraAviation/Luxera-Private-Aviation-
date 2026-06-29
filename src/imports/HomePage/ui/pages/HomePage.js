import Hero from "@/imports/HomePage/ui/components/Hero";
import About from "@/imports/HomePage/ui/components/About";
import Fleet from "@/imports/HomePage/ui/components/Fleet";
import VideoBlock from "@/imports/HomePage/ui/components/VideoBlock";
import Features from "@/imports/HomePage/ui/components/Features";
import Testimonials from "@/imports/HomePage/ui/components/Testimonials";
import ServicesIntro from "@/imports/HomePage/ui/components/ServicesIntro";
import GalleryPreview from "@/imports/HomePage/ui/components/GalleryPreview";
import JournalPreview from "@/imports/HomePage/ui/components/JournalPreview";
import Newsletter from "@/imports/HomePage/ui/components/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Fleet />
      <VideoBlock />
      <Features />
      <Testimonials />
      <ServicesIntro />
      <GalleryPreview />
      <JournalPreview />
      <Newsletter />
    </main>
  );
}

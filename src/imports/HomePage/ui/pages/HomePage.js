import Hero from "@/imports/HomePage/ui/components/Hero";
import About from "@/imports/HomePage/ui/components/About";
import VideoBlock from "@/imports/HomePage/ui/components/VideoBlock";
import Offerings from "@/imports/HomePage/ui/components/Offerings";
import Testimonials from "@/imports/HomePage/ui/components/Testimonials";
import ServicesIntro from "@/imports/HomePage/ui/components/ServicesIntro";
import Newsletter from "@/imports/HomePage/ui/components/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <VideoBlock />
      <Offerings />
      <Testimonials />
      <ServicesIntro />
      <Newsletter />
    </main>
  );
}

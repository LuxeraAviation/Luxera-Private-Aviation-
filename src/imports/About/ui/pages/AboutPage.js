import PageHeading from "@/imports/core/components/PageHeading";
import AboutIntro from "@/imports/About/ui/components/AboutIntro";
import Philosophy from "@/imports/About/ui/components/Philosophy";
import Founder from "@/imports/About/ui/components/Founder";
import BespokeSolutions from "@/imports/About/ui/components/BespokeSolutions";
import WhyLuxera from "@/imports/About/ui/components/WhyLuxera";
import Newsletter from "@/imports/HomePage/ui/components/Newsletter";

export default function AboutPage() {
  return (
    <main>
      <PageHeading title="About Us" bg="/image/luxera/new.png" />
      <AboutIntro />
      <Philosophy />
      <Founder />
      <BespokeSolutions />
      <WhyLuxera />
      <Newsletter />
    </main>
  );
}

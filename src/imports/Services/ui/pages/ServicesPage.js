import PageHeading from "@/imports/core/components/PageHeading";
import ServicePrinciples from "@/imports/Services/ui/components/ServicePrinciples";
import ServicesGrid from "@/imports/Services/ui/components/ServicesGrid";
import Newsletter from "@/imports/HomePage/ui/components/Newsletter";

export default function ServicesPage() {
  return (
    <main>
      <PageHeading title="Our Services" bg="/image/luxera/new.png" />
      <ServicePrinciples />
      <ServicesGrid />
      <Newsletter />
    </main>
  );
}

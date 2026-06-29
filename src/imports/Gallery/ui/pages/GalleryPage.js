import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import GalleryGrid from "@/imports/core/components/GalleryGrid";
import { GALLERY_ITEMS } from "@/imports/core/constants/gallery";

export default function GalleryPage() {
  return (
    <main>
      <PageHeading title="Gallery" bg="/image/luxera/new.png" />
      <Section $top="140px" $bottom="140px">
        <GalleryGrid items={GALLERY_ITEMS} columns={4} />
      </Section>
    </main>
  );
}

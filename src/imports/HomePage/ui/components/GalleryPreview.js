"use client";

import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import GalleryGrid from "@/imports/core/components/GalleryGrid";
import { GALLERY_HOME } from "@/imports/core/constants/gallery";
import { HOME_SECTIONS } from "@/imports/core/constants/homepage";

export default function GalleryPreview() {
  return (
    <Section $top="140px" $bottom="0">
      <Container>
        <SectionHeading
          center
          subtitle={HOME_SECTIONS.gallery.subtitle}
          title={HOME_SECTIONS.gallery.title}
        />
      </Container>
      <div style={{ marginTop: 60 }}>
        <GalleryGrid items={GALLERY_HOME} columns={4} />
      </div>
    </Section>
  );
}

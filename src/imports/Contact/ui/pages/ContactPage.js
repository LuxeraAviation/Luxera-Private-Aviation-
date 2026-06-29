"use client";

import Image from "next/image";
import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import ContactForm from "@/imports/Contact/ui/components/ContactForm";
import { FOOTER_MAP } from "@/imports/core/constants/footer";

export default function ContactPage() {
  return (
    <main>
      <PageHeading title="Contact Us" bg="/image/luxera/new.png" />
      <Section $top="150px" $bottom="150px">
        <Container>
          <Grid>
            <div>
              <SectionHeading
                subtitle="GET IN TOUCH"
                title="Plan Your Next Private Flight"
              />
              <Lead>
                Reach our charter desk by phone, email, or the form below — we
                respond within minutes, 24/7. Tell us your route and dates and
                we&apos;ll send tailored aircraft options and an all-in quote.
              </Lead>
              <ContactForm />
            </div>
            <ImgCol as={Reveal} variant="fade-left">
              <Image
                src="/image/av/cabin-portrait.webp"
                alt="Contact Luxera"
                width={600}
                height={720}
              />
            </ImgCol>
          </Grid>
        </Container>
      </Section>
      <Map>
        <iframe src={FOOTER_MAP} title="Luxera location" allowFullScreen loading="lazy" />
      </Map>
    </main>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Lead = styled.p`
  margin: 18px 0 37px;
`;

const ImgCol = styled.div`
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
`;

const Map = styled.div`
  iframe {
    width: 100%;
    height: 500px;
    border: 0;
    display: block;
    filter: grayscale(100%);
  }
`;

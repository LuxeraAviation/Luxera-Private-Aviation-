"use client";

import Image from "next/image";
import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import ArrowButton from "@/imports/core/components/ArrowButton";
import { Reveal } from "@/styles/Theme";
import FaqAccordion from "@/imports/FAQ/ui/components/FaqAccordion";
import { FAQS } from "@/imports/core/constants/faq";

export default function FAQPage() {
  return (
    <main>
      <PageHeading title="FAQ" bg="/image/luxera/new.png" />
      <Section $top="140px" $bottom="140px">
        <Container>
          <Grid>
            <ImgCol as={Reveal} variant="fade-right">
              <Image
                src="/image/av/cabin-portrait.webp"
                alt="Frequently asked questions"
                width={560}
                height={640}
              />
            </ImgCol>
            <div>
              <SectionHeading
                subtitle="FREQUENTLY ASKED QUESTIONS"
                title="Everything You Need to Know Before You Fly"
              />
              <Spacer />
              <FaqAccordion items={FAQS} />
              <Spacer />
              <ArrowButton href="/contact">Contact Us</ArrowButton>
            </div>
          </Grid>
        </Container>
      </Section>
    </main>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const ImgCol = styled.div`
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    border-radius: 6px;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const Spacer = styled.div`
  height: 30px;
`;

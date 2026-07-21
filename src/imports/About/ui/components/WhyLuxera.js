"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import ArrowButton from "@/imports/core/components/ArrowButton";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { fs28 } from "@/styles/typography";
import { ABOUT_WHY } from "@/imports/core/constants/about";

export default function WhyLuxera() {
  return (
    <Section $top="150px" $bottom="150px">
      <Container>
        <Grid>
          <ImageCol as={Reveal} variant="fade-right">
            <Image
              src={ABOUT_WHY.image}
              alt="Luxera private jet experience"
              width={560}
              height={640}
            />
          </ImageCol>
          <TextCol>
            <SectionHeading
              subtitle={ABOUT_WHY.subtitle}
              title={ABOUT_WHY.title}
            />
            <Body as={Reveal} variant="fade-up" delay={150}>
              {ABOUT_WHY.body}
            </Body>
            <Highlight as={Reveal} variant="fade-up" delay={200}>
              {ABOUT_WHY.highlight}
            </Highlight>
            <Closing as={Reveal} variant="fade-up" delay={250}>
              {ABOUT_WHY.closing}
            </Closing>
            <Reveal delay={300}>
              <ArrowButton
                href={ABOUT_WHY.cta.href}
                onClick={(e) => {
                  const element = document.getElementById("booking-zone");
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                  } else {
                    sessionStorage.setItem("scrollToBooking", "true");
                  }
                }}
              >
                {ABOUT_WHY.cta.label}
              </ArrowButton>
            </Reveal>
          </TextCol>
        </Grid>
      </Container>
    </Section>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  align-items: stretch;
  gap: 60px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageCol = styled.div`
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    min-height: 480px;
    object-fit: cover;
    border-radius: 6px;
    display: block;
  }

  @media (max-width: 991px) {
    height: auto;

    img {
      height: auto;
      min-height: 0;
    }
  }
`;

const TextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Body = styled.p`
  margin: 30px 0 0;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  line-height: 1.75em;
`;

const Highlight = styled.p`
  ${fs28}
  font-style: italic;
  color: ${({ theme }) => theme.heading};
  margin: 26px 0;
`;

const Closing = styled.p`
  margin: 0 0 40px;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  line-height: 1.7em;
`;

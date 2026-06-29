"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal, Odometer } from "@/styles/Theme";
import { fs38 } from "@/styles/typography";

const STATS = [
  { value: "12000", suffix: "+", label: "Flights Operated" },
  { value: "3000", suffix: "+", label: "Aircraft Worldwide" },
  { value: "98", suffix: "%", label: "Client Satisfaction" },
];

export default function AboutIntro() {
  return (
    <Section $gray $top="140px" $bottom="150px">
      <Container>
        <SectionHeading
          center
          subtitle="ABOUT US"
          title="Built around your itinerary, our charter service pairs an elite global fleet with vetted crews and white-glove concierge for travel without compromise"
          maxWidth="1000px"
        />
        <ImageWrap as={Reveal} variant="zoom-in">
          <Image
            src="/image/av/jet-flying.webp"
            alt="Luxera private aviation"
            width={1170}
            height={560}
          />
        </ImageWrap>
        <Stats>
          {STATS.map((s) => (
            <li key={s.label}>
              <Value>
                <Odometer to={s.value} />
                {s.suffix}
              </Value>
              <Label>{s.label}</Label>
            </li>
          ))}
        </Stats>
      </Container>
    </Section>
  );
}

const ImageWrap = styled.div`
  margin: 60px 0;
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
`;

const Stats = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  text-align: center;

  li {
    padding: 0 10px;
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const Value = styled.h3`
  ${fs38}
  color: ${({ theme }) => theme.base};
  margin: 0 0 9px;
`;

const Label = styled.h3`
  ${fs38}
  margin: 0;
`;

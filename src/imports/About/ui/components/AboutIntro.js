"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal, Odometer } from "@/styles/Theme";
import { fs38 } from "@/styles/typography";
import { ABOUT_INTRO, ABOUT_STATS } from "@/imports/core/constants/about";

export default function AboutIntro() {
  return (
    <Section $gray $top="140px" $bottom="150px">
      <Container>
        <SectionHeading
          center
          title={ABOUT_INTRO.title}
          maxWidth="1000px"
        />
        <Body as={Reveal} variant="fade-up" delay={150}>
          {ABOUT_INTRO.body.before}
          <Brand>{ABOUT_INTRO.body.brand}</Brand>
          {ABOUT_INTRO.body.after}
        </Body>
        <Stats>
          {ABOUT_STATS.map((s) => (
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

const Body = styled.p`
  max-width: 900px;
  margin: 26px auto 60px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 19px;
  line-height: 1.7em;

  @media (max-width: 991px) {
    font-size: 17px;
  }
`;

const Brand = styled.span`
  color: ${({ theme }) => theme.base};
  font-weight: 600;
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

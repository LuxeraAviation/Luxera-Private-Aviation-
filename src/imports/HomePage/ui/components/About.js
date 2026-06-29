"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import ArrowButton from "@/imports/core/components/ArrowButton";
import { Reveal } from "@/styles/Theme";
import { fs67, sectionSubtitle } from "@/styles/typography";
import { HOME_ABOUT } from "@/imports/core/constants/homepage";

export default function About() {
  return (
    <Section $gray $top="140px" $bottom="150px">
      <Container>
        <Inner>
          <Subtitle as={Reveal}>{HOME_ABOUT.subtitle}</Subtitle>
          <Title as={Reveal} delay={100}>
            {HOME_ABOUT.title}
          </Title>
          <Reveal delay={200}>
            <ArrowButton href={HOME_ABOUT.href}>Learn More</ArrowButton>
          </Reveal>
        </Inner>
      </Container>
    </Section>
  );
}

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const Subtitle = styled.p`
  ${sectionSubtitle}
`;

const Title = styled.h2`
  ${fs67}
  margin: 0 0 45px;
`;

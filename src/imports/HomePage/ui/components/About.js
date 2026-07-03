"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import ArrowButton from "@/imports/core/components/ArrowButton";
import { Reveal } from "@/styles/Theme";
import { fs50, sectionSubtitle } from "@/styles/typography";
import { HOME_ABOUT } from "@/imports/core/constants/homepage";

export default function About() {
  return (
    <AboutSection $gray $top="110px" $bottom="150px">
      <Container>
        <Inner>
          <Subtitle as={Reveal}>{HOME_ABOUT.subtitle}</Subtitle>
          <Title as={Reveal} delay={100}>
            {HOME_ABOUT.title}
          </Title>
          <Body as={Reveal} delay={150}>
            {HOME_ABOUT.body}
          </Body>
          <Reveal delay={200}>
            <ArrowButton href={HOME_ABOUT.href}>Learn More</ArrowButton>
          </Reveal>
        </Inner>
      </Container>
    </AboutSection>
  );
}

const AboutSection = styled(Section)`
  @media (max-width: 991px) {
    padding-top: 68px;
  }
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const Subtitle = styled.p`
  ${sectionSubtitle}
`;

const Title = styled.h2`
  ${fs50}
  color: ${({ theme }) => theme.heading};
  margin: 0 0 24px;
`;

const Body = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 19px;
  line-height: 1.7em;
  margin: 0 0 45px;

  @media (max-width: 991px) {
    font-size: 17px;
  }
`;

"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { ABOUT_SOLUTIONS } from "@/imports/core/constants/about";

export default function BespokeSolutions() {
  return (
    <Section $gray $top="140px" $bottom="150px">
      <Container>
        <SectionHeading
          center
          subtitle={ABOUT_SOLUTIONS.subtitle}
          title={ABOUT_SOLUTIONS.title}
          maxWidth="820px"
        />
        <Intro as={Reveal} variant="fade-up" delay={150}>
          {ABOUT_SOLUTIONS.intro}
        </Intro>
        <Grid>
          {ABOUT_SOLUTIONS.items.map((item, i) => (
            <Card key={item.title} as={Reveal} delay={i * 80}>
              <Num>0{i + 1}</Num>
              <Icon>
                <Image src={item.icon} alt="" width={40} height={40} />
              </Icon>
              <h3>{item.title}</h3>
              <Rule />
              <p>{item.desc}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

const Intro = styled.p`
  max-width: 760px;
  margin: 24px auto 0;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  line-height: 1.7em;
`;

const Grid = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  padding: 46px 38px 48px;
  transition: transform 0.35s ease, border-color 0.35s ease,
    box-shadow 0.35s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.base};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 24px;
    font-weight: 500;
    margin: 0 0 18px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.text};
    line-height: 1.75em;
  }

  &:hover {
    border-color: ${({ theme }) => theme.base};
    transform: translateY(-8px);
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.08);
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const Num = styled.span`
  position: absolute;
  top: 26px;
  right: 34px;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 46px;
  font-weight: 600;
  line-height: 1;
  color: ${({ theme }) => theme.base};
  opacity: 0.14;
  user-select: none;
  pointer-events: none;
`;

const Rule = styled.span`
  display: block;
  width: 46px;
  height: 2px;
  margin: 0 0 20px;
  background: ${({ theme }) => theme.base};
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.soft};
  margin-bottom: 28px;

  img {
    filter: ${({ theme }) =>
      theme.mode === "dark" ? "brightness(0) invert(1)" : "none"};
  }
`;

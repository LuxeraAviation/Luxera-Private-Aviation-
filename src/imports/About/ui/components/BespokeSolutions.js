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
              <Icon>
                <Image src={item.icon} alt="" width={40} height={40} />
              </Icon>
              <h3>{item.title}</h3>
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
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 40px 34px;
  transition: all 0.3s ease;

  h3 {
    font-size: 24px;
    margin: 0 0 14px;
  }

  p {
    margin: 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.base};
    transform: translateY(-6px);
  }
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.soft};
  margin-bottom: 26px;

  img {
    filter: ${({ theme }) =>
      theme.mode === "dark" ? "brightness(0) invert(1)" : "none"};
  }
`;

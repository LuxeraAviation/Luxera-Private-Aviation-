"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import { Reveal } from "@/styles/Theme";
import { fs50 } from "@/styles/typography";
import { SERVICE_INTRO, SERVICE_LIST } from "@/imports/core/constants/services";

export default function ServicesIntro() {
  return (
    <Intro $top="120px" $bottom="0">
      <Container>
        <Head>
          <Eyebrow as={Reveal} variant="fade-up">
            {SERVICE_INTRO.subtitle}
          </Eyebrow>
          <Title as={Reveal} variant="fade-up" delay={100}>
            {SERVICE_INTRO.title}
          </Title>
        </Head>

        <Grid>
          <ImageCol as={Reveal} variant="fade-right">
            <Image
              src={SERVICE_INTRO.image1}
              alt="Luxera private aviation"
              fill
              sizes="(max-width: 991px) 100vw, 50vw"
            />
          </ImageCol>

          <Points>
            {SERVICE_LIST.map((item, i) => (
              <Point key={item.title} as={Reveal} variant="fade-up" delay={i * 80}>
                <Icon>
                  <i className={item.icon} />
                </Icon>
                <h3>{item.title}</h3>
              </Point>
            ))}
          </Points>
        </Grid>
      </Container>
    </Intro>
  );
}

const Intro = styled(Section)`
  @media (max-width: 991px) {
    padding-bottom: 0;
  }
`;

const Head = styled.div`
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
`;

const Eyebrow = styled.p`
  color: ${({ theme }) => (theme.mode === "dark" ? theme.base : theme.text)};
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin: 0 0 22px;

  @media (max-width: 767px) {
    font-size: 19px;
    letter-spacing: 3px;
  }
`;

const Title = styled.h2`
  ${fs50}
  color: ${({ theme }) => theme.heading};
  margin: 0;
`;

const Grid = styled.div`
  margin-top: 56px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: stretch;
  gap: 60px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageCol = styled.div`
  position: relative;
  min-height: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.12);

  img {
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 991px) {
    min-height: 0;
    aspect-ratio: 16 / 11;
  }
`;

const Points = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  margin: 20px 0;

  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Point = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  h3 {
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.heading};
    margin: 0;
  }
`;

const Icon = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(170, 132, 83, 0.16)" : "rgba(170, 132, 83, 0.1)"};
  color: ${({ theme }) => theme.base};
  font-size: 19px;
`;

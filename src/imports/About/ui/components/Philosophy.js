"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { ABOUT_PHILOSOPHY } from "@/imports/core/constants/about";

export default function Philosophy() {
  return (
    <Section $top="150px" $bottom="150px">
      <Container>
        <Grid>
          <TextCol>
            <SectionHeading
              subtitle={ABOUT_PHILOSOPHY.subtitle}
              title={ABOUT_PHILOSOPHY.title}
            />
            <Body as={Reveal} variant="fade-up" delay={150}>
              {ABOUT_PHILOSOPHY.body}
            </Body>
          </TextCol>
          <ImageCol as={Reveal} variant="fade-left">
            <Image
              src={ABOUT_PHILOSOPHY.image}
              alt="Inside a Luxera private cabin"
              width={560}
              height={620}
            />
          </ImageCol>
        </Grid>
      </Container>
    </Section>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 6fr 6fr;
  align-items: stretch;
  gap: 60px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
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

const ImageCol = styled.div`
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    min-height: 420px;
    object-fit: cover;
    border-radius: 6px;
    display: block;
  }

  @media (max-width: 991px) {
    order: -1;
    height: auto;

    img {
      height: auto;
      min-height: 0;
    }
  }
`;

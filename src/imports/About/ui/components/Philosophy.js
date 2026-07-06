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
  align-items: center;
  gap: 60px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TextCol = styled.div``;

const Body = styled.p`
  margin: 30px 0 0;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  line-height: 1.75em;
`;

const ImageCol = styled.div`
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    border-radius: 6px;
  }

  @media (max-width: 991px) {
    order: -1;
  }
`;

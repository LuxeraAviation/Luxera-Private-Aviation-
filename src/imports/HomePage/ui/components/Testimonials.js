"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import Slider from "@/imports/core/components/Slider";
import SliderArrows from "@/imports/core/components/SliderArrows";
import Image from "next/image";
import { fs50, fs28 } from "@/styles/typography";
import { TESTIMONIALS } from "@/imports/core/constants/testimonials";

function Stars({ rating = 5 }) {
  return (
    <Rating>
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={i < rating ? "fa-solid fa-star" : "fa-regular fa-star"}
        />
      ))}
    </Rating>
  );
}

export default function Testimonials() {
  return (
    <Section $gray $top="150px" $bottom="150px">
      <Container>
        <Quote>“</Quote>
        <Slider
          items={TESTIMONIALS}
          perView={1}
          loop
          controls={SliderArrows}
          renderItem={(t) => (
            <Item>
              <Avatar>
                <Image src={t.avatar} alt={t.name} width={80} height={80} />
              </Avatar>
              <Name>{t.name}</Name>
              <Role>{t.role}</Role>
              <Blockquote>{t.quote}</Blockquote>
              <Stars rating={t.rating} />
            </Item>
          )}
        />
      </Container>
    </Section>
  );
}

const Quote = styled.div`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 180px;
  line-height: 0.5;
  color: ${({ theme }) => theme.base};
  opacity: 0.25;
  margin-bottom: 20px;
  height: 80px;
`;

const Item = styled.div`
  text-align: center;
  max-width: 880px;
  margin: 0 auto;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  img {
    border-radius: 50%;
  }
`;

const Name = styled.h3`
  ${fs28}
  margin: 0;
`;

const Role = styled.p`
  margin: 0 0 40px;
`;

const Blockquote = styled.blockquote`
  font-family: ${({ theme }) => theme.fonts.playfair};
  ${fs50}
  color: ${({ theme }) => theme.heading};
  margin: 0 0 40px;
  font-style: normal;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  color: ${({ theme }) => theme.base};
  font-size: 16px;
`;

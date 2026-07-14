"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { ABOUT_FOUNDER } from "@/imports/core/constants/about";

const pillarImages = [
  "/image/av/cabin-portrait.webp",
  "/image/luxera/cabin-seat.jpg",
  "/image/av/jet-cabin-interior.png",
];

export default function Founder() {
  const {
    subtitle,
    title,
    bio,
    quote,
    image,
    pillarsTitle,
    pillars,
  } = ABOUT_FOUNDER;

  const [activeSlide, setActiveSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % pillars.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlide, pillars.length]);

  return (
    <>
      <Section $gray $top="150px" $bottom="150px">
        <Container>
          <ProfileGrid>
            <ImageCol as={Reveal} variant="fade-right">
              <ImageWrapper>
                <Image
                  src={image}
                  alt="Claudia, CEO & Founder of Luxera"
                  width={560}
                  height={680}
                  priority
                />
              </ImageWrapper>
            </ImageCol>
            <TextCol>
              <SectionHeading subtitle={subtitle} title={title} />
              <BioBox as={Reveal} variant="fade-up" delay={150}>
                {bio.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </BioBox>
              <QuoteBox as={Reveal} variant="fade-up" delay={250}>
                <QuoteIcon>“</QuoteIcon>
                <p>{quote}</p>
              </QuoteBox>
            </TextCol>
          </ProfileGrid>
        </Container>
      </Section>

      <Section $top="150px" $bottom="150px">
        <Container>
          <PillarsGrid>
            <PillarsTextCol>
              <SectionHeading
                subtitle="PHILOSOPHY IN ACTION"
                title={pillarsTitle}
              />
              <PillarDisplay className={fade ? "fade-in" : "fade-out"}>
                <PillarNum>0{activeSlide + 1}</PillarNum>
                <PillarContent>
                  <h4>{pillars[activeSlide].title}</h4>
                  <p>{pillars[activeSlide].desc}</p>
                </PillarContent>
              </PillarDisplay>

              <TabList>
                {pillars.map((pillar, idx) => (
                  <TabItem
                    key={pillar.title}
                    $active={activeSlide === idx}
                    onClick={() => {
                      setFade(false);
                      setTimeout(() => {
                        setActiveSlide(idx);
                        setFade(true);
                      }, 300);
                    }}
                  >
                    0{idx + 1}
                  </TabItem>
                ))}
              </TabList>
            </PillarsTextCol>

            <PillarsImageCol as={Reveal} variant="fade-left">
              <PillarsImageWrapper>
                {pillarImages.map((img, idx) => (
                  <SlideImage
                    key={img}
                    src={img}
                    alt={pillars[idx].title}
                    fill
                    sizes="(max-width: 991px) 100vw, 560px"
                    $active={activeSlide === idx}
                    priority={idx === 0}
                  />
                ))}
              </PillarsImageWrapper>
            </PillarsImageCol>
          </PillarsGrid>
        </Container>
      </Section>
    </>
  );
}

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  align-items: center;
  gap: 80px;

  @media (max-width: 1199px) {
    gap: 50px;
  }

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageCol = styled.div`
  @media (max-width: 991px) {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid ${({ theme }) => theme.border};

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;

const TextCol = styled.div``;

const BioBox = styled.div`
  margin-top: 30px;
  
  p {
    color: ${({ theme }) => theme.text};
    font-size: 17px;
    line-height: 1.8em;
    margin: 0 0 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const QuoteBox = styled.blockquote`
  position: relative;
  margin: 40px 0 0;
  padding: 30px 40px;
  background: ${({ theme }) => theme.bg};
  border-left: 3px solid ${({ theme }) => theme.base};
  border-radius: 0 6px 6px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);

  p {
    position: relative;
    z-index: 2;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 20px;
    font-style: italic;
    line-height: 1.6em;
    color: ${({ theme }) => theme.heading};
  }

  @media (max-width: 575px) {
    padding: 24px 28px;
    p {
      font-size: 17px;
    }
  }
`;

const QuoteIcon = styled.span`
  position: absolute;
  top: 10px;
  left: 20px;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 100px;
  color: ${({ theme }) => theme.base};
  opacity: 0.08;
  line-height: 1;
  user-select: none;
  pointer-events: none;
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  align-items: center;
  gap: 80px;

  @media (max-width: 1199px) {
    gap: 50px;
  }

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const PillarsTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 380px;
`;

const PillarDisplay = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 40px;
  transition: opacity 0.3s ease-in-out;

  &.fade-in {
    opacity: 1;
  }

  &.fade-out {
    opacity: 0;
  }
`;

const TabList = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;
`;

const TabItem = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.base : theme.border)};
  background: ${({ theme, $active }) => ($active ? theme.base : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.white : theme.text)};
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.base};
    color: ${({ theme, $active }) => ($active ? theme.white : theme.base)};
  }
`;

const PillarNum = styled.span`
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.base};
  line-height: 1.2;
`;

const PillarContent = styled.div`
  h4 {
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 21px;
    margin: 0 0 10px;
    color: ${({ theme }) => theme.heading};
    font-weight: 500;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    line-height: 1.7em;
  }
`;

const PillarsImageCol = styled.div`
  @media (max-width: 991px) {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    order: -1;
  }
`;

const PillarsImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 580px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 991px) {
    height: 400px;
  }
`;

const SlideImage = styled(Image)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: scale(${({ $active }) => ($active ? 1 : 1.05)});
  transition: opacity 0.8s ease, transform 0.8s ease;
  z-index: ${({ $active }) => ($active ? 2 : 1)};
`;

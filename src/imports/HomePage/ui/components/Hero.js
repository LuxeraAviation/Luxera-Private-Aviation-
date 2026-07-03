"use client";

import styled from "styled-components";
import Image from "next/image";
import Slider from "@/imports/core/components/Slider";
import Container from "@/imports/core/atom/Container";
import BookingForm from "@/imports/core/components/BookingForm";
import SliderArrowIcon from "@/imports/core/assets/SliderArrowIcon";
import { useThemeMode } from "@/imports/core/components/ThemeMode";
import { fs89 } from "@/styles/typography";
import { HERO_SLIDES } from "@/imports/core/constants/homepage";

function HeroArrows({ prev, next }) {
  return (
    <>
      <EdgeArrow
        $side="left"
        onClick={prev}
        aria-label="Previous slide"
        type="button"
      >
        <SliderArrowIcon direction="left" />
      </EdgeArrow>
      <EdgeArrow
        $side="right"
        onClick={next}
        aria-label="Next slide"
        type="button"
      >
        <SliderArrowIcon direction="right" />
      </EdgeArrow>
    </>
  );
}

export default function Hero() {
  const { mode, toggle } = useThemeMode();

  return (
    <Wrap>
      <SliderShell>
        <Slider
          items={HERO_SLIDES}
          perView={1}
          loop={HERO_SLIDES.length > 1}
          autoplay={HERO_SLIDES.length > 1}
          autoplayInterval={5000}
          controls={HERO_SLIDES.length > 1 ? HeroArrows : undefined}
          renderItem={(slide) => (
            <Slide>
              <Bg>
                <Image src={slide.bg} alt="" fill priority sizes="100vw" />
              </Bg>
              <Overlay />
              <Container>
                <Text>
                  <Subtitle>{slide.subtitle}</Subtitle>
                  <Title>
                    {slide.titleLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Title>
                  {slide.tagline && <Tagline>{slide.tagline}</Tagline>}
                </Text>
              </Container>
            </Slide>
          )}
        />
      </SliderShell>

      <FormZone id="booking-zone">
        <WideContainer>
          <BookingForm />
        </WideContainer>
      </FormZone>

      <HeroThemeToggle
        onClick={toggle}
        aria-label="Toggle dark mode"
        type="button"
      >
        <i className={mode === "dark" ? "fas fa-sun" : "fas fa-moon"} />
      </HeroThemeToggle>
    </Wrap>
  );
}

const WideContainer = styled(Container)`
  @media (min-width: 1200px) {
    max-width: 1240px;
  }
  @media (min-width: 1400px) {
    max-width: 1380px;
  }
`;

const Wrap = styled.section`
  position: relative;
  background: ${({ theme }) => theme.soft};
`;

const SliderShell = styled.div`
  position: relative;

  .slider-item {
    padding: 0;
  }
`;

const Slide = styled.div`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 767px) {
    height: 90vh;
    min-height: 560px;
  }
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  img {
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(27, 27, 27, 0.4);
`;

const Text = styled.div`
  position: relative;
  z-index: 3;
  transform: translateY(-60px);

  @media (max-width: 767px) {
    transform: translateY(-40px);
  }
`;

const Subtitle = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  letter-spacing: 3.2px;
  margin: 0 0 25px;
  font-size: 16px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.white};
  margin: 0;
  ${fs89}
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.white};
  margin: 24px 0 0;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-style: italic;
  font-size: 24px;
  letter-spacing: 0.5px;
  opacity: 0.95;

  @media (max-width: 767px) {
    font-size: 18px;
    margin-top: 18px;
  }
`;

const EdgeArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === "left" ? "left: 40px;" : "right: 40px;")}
  z-index: 4;
  width: 56px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  opacity: 0.85;
  transition: all 0.3s ease;

  svg {
    width: 56px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.base};
    opacity: 1;
  }

  @media (max-width: 991px) {
    ${({ $side }) => ($side === "left" ? "left: 12px;" : "right: 12px;")}
    svg {
      width: 40px;
    }
  }
`;

const FormZone = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(50%);
  z-index: 10;

  @media (max-width: 991px) {
    position: relative;
    bottom: auto;
    transform: none;
    margin-top: -40px;
  }
`;

const HeroThemeToggle = styled.button`
  display: none;

  @media (min-width: 992px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 28px;
    bottom: 28px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: ${({ theme }) => theme.base};
    color: ${({ theme }) => theme.white};
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
    transition: all 0.3s ease;
    z-index: 900;

    &:hover {
      background: ${({ theme }) => theme.baseDark};
      transform: translateY(-2px);
    }
  }
`;

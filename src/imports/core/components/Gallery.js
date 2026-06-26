"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/styles/Theme";

export default function Gallery(props) {
  const {
    subTitle = "Gallery",
    title = "Private Jet Photo Gallery",
    images = [
      "/image/gallery/gallery-1.png",
      "/image/gallery/gallery-1.png",
      "/image/gallery/gallery-1.png",
    ],
  } = props || {};

  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayPlugin = useMemo(
    () => [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    autoplayPlugin,
  );

  const n = images.length;

  const onSelect = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const prev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const next = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const goTo = useCallback(
    (index) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <GallerySection>
      <HeaderContainer>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        {title && <SectionTitle>{title}</SectionTitle>}
      </HeaderContainer>

      <SliderContainer>
        <SliderViewport ref={emblaRef}>
          <SliderTrack>
            {images.map((imgSrc, i) => {
              const isActive = i === selectedIndex;
              return (
                <SliderItem key={i}>
                  <GalleryItem $active={isActive}>
                    <Image
                      src={imgSrc}
                      alt="Gallery Image"
                      width={720}
                      height={412}
                      priority={i === 0}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </GalleryItem>
                </SliderItem>
              );
            })}
          </SliderTrack>
        </SliderViewport>

        <SliderPrevBtn onClick={prev} aria-label="Previous image">
          <Icon className="fas fa-chevron-left" />
        </SliderPrevBtn>
        <SliderNextBtn onClick={next} aria-label="Next image">
          <Icon className="fas fa-chevron-right" />
        </SliderNextBtn>
      </SliderContainer>

      <PaginationContainer>
        {Array.from({ length: n }).map((_, idx) => (
          <PaginationDot
            key={idx}
            $active={selectedIndex === idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </PaginationContainer>
    </GallerySection>
  );
}

const GallerySection = styled.section`
  padding: 120px 0;
  background-color: ${theme.soft};
  overflow: hidden;
  position: relative;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  color: ${theme.base};
  margin-bottom: 20px;
  font-family: ${theme.fonts.mulish};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.playfair};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3em;
  color: ${theme.dark};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;

  --slide-width: 50vw;

  @media (max-width: 575px) {
    --slide-width: 100vw;
  }
`;

const SliderViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const SliderTrack = styled.div`
  display: flex;
  align-items: stretch;
  backface-visibility: hidden;
  touch-action: pan-y pinch-zoom;
  will-change: transform;
`;

const SliderItem = styled.div`
  flex: 0 0 var(--slide-width);
  max-width: var(--slide-width);
  min-width: 0;
  box-sizing: border-box;
  position: relative;
`;

const GalleryItem = styled.div`
  position: relative;
  transition: all 0.5s ease;
  width: 100%;
  aspect-ratio: 1140 / 670;
  overflow: hidden;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.dark};
    opacity: ${({ $active }) => ($active ? 0 : 0.6)};
    transition: all 0.5s ease;
    z-index: 1;
    pointer-events: none;
  }
`;

const SliderArrow = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const SliderPrevBtn = styled(SliderArrow)`
  left: calc(50% - var(--slide-width) / 2 + 40px);
`;

const SliderNextBtn = styled(SliderArrow)`
  right: calc(50% - var(--slide-width) / 2 + 40px);
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;

const PaginationDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${theme.base};
  background-color: ${({ $active }) => ($active ? theme.base : "transparent")};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.base};
  }
`;

const Icon = styled.i``;

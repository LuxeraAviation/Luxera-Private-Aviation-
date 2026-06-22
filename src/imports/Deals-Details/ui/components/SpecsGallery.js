"use client";

import styled from "styled-components";
import { theme } from "@/styles/Theme";
import Slider from "@/imports/core/components/Slider";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";
import { DEAL_DETAIL } from "@/imports/core/constants/deals-details";

export default function SpecsGallery() {
  const { gallery } = DEAL_DETAIL;

  return (
    <GallerySection>
      <StyledContainer>
        <Slider
          items={gallery.images}
          perView={3}
          renderItem={(img, idx) => (
            <GalleryItem key={idx}>
              <Image
                src={img}
                alt="gallery item"
                width={370}
                height={280}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </GalleryItem>
          )}
          controls={({ prev, next }) => (
            <SectionHeaderWrapper>
              <SectionHeader>
                <SubTitle>{gallery.subTitle}</SubTitle>
                <SectionTitle>{gallery.title}</SectionTitle>
              </SectionHeader>
              <SliderNavArea>
                <SliderBtn onClick={prev} aria-label="Previous slide">
                  <Icon className="fas fa-chevron-left" />
                </SliderBtn>
                <SliderBtn onClick={next} aria-label="Next slide">
                  <Icon className="fas fa-chevron-right" />
                </SliderBtn>
              </SliderNavArea>
            </SectionHeaderWrapper>
          )}
          bottomControls={({ currentIndex, totalItems, goTo }) => (
            <PaginationDots>
              {Array.from({ length: totalItems }).map((_, i) => (
                <PaginationDot
                  key={i}
                  className={i === currentIndex ? "active" : ""}
                  onClick={() => goTo(i)}
                />
              ))}
            </PaginationDots>
          )}
        />
      </StyledContainer>
    </GallerySection>
  );
}

const GallerySection = styled.section`
  padding: 120px 0;
  position: relative;
  background-color: #f5f3f1;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 70px 0;
  }

  .slider-viewport {
    position: relative;
    margin-right: -30px;
    width: calc(100% + 30px);
  }

  .slider-item {
    padding: 0 30px 0 0;
  }
`;

const StyledContainer = styled(Container)`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const SectionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 50px;
  flex-wrap: wrap;
  gap: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 800;
  font-size: 20px;
  color: ${theme.base};
  font-family: ${theme.fonts.mulish};
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: ${theme.dark};
  font-family: ${theme.fonts.playfair};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SliderNavArea = styled.div`
  display: flex;
  gap: 15px;
`;

const SliderBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${theme.base};
  background: white;
  color: ${theme.base};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.base};
    color: ${theme.white};
  }
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 60px;
  gap: 8px;
`;

const PaginationDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid ${theme.dark};
  background-color: transparent;
  display: inline-block;
  cursor: pointer;

  &.active {
    border: none;
    background-color: ${theme.base};
    position: relative;

    &::before {
      position: absolute;
      content: "";
      top: -3px;
      left: -3px;
      bottom: -3px;
      right: -3px;
      border: 1px solid ${theme.base};
      border-radius: 50%;
    }
  }
`;

const GalleryItem = styled.div`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  img {
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Icon = styled.i``;

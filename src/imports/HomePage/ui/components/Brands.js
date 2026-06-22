"use client";

import styled from "styled-components";
import Slider from "@/imports/core/components/Slider";
import Container from "@/imports/core/atom/Container";
import Image from "next/image";

export default function Brands() {
  return (
    <BrandSection>
      <StyledContainer>
        <Slider
          items={BRANDS}
          perView={5}
          autoplay
          renderItem={(b) => (
            <div className="brand-item">
              <Image
                src={b}
                alt="brand"
                width={150}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        />
      </StyledContainer>
    </BrandSection>
  );
}

const StyledContainer = styled(Container)`
  max-width: 1140px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
`;

const Section = styled.section`
  padding: 120px 0;
  position: relative;
  background-color: #fcfcfc;
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const BRANDS = [
  "/image/brand/brand-1.png",
  "/image/brand/brand-2.png",
  "/image/brand/brand-3.png",
  "/image/brand/brand-4.png",
  "/image/brand/brand-5.png",
];

const BrandSection = styled(Section)`
  .brand-item {
    width: 100%;
    height: 150px;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s;
    position: relative;

    img {
      position: relative;
      max-height: 120px !important;
      max-width: 150px !important;
      width: 100% !important;
      height: auto !important;
      filter: grayscale(1);
      transition: all 0.4s ease;
    }

    &:hover img {
      filter: none;
      opacity: 1;
    }

    &:hover {
      filter: invert(0) sepia(1) hue-rotate(4deg);
    }
  }
`;

"use client";

import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Slider from "@/imports/core/components/Slider";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";

import { TESTIMONIALS } from "@/imports/core/constants/aboutus";

export default function Testimonials() {
  return (
    <TestimonialSection>
      <ContainerWrapper>
        <SectionHeader>
          <SubTitle>Testimonial</SubTitle>
          <SectionTitle>Our Customer Feedback</SectionTitle>
        </SectionHeader>

        <Slider
          items={TESTIMONIALS}
          perView={3}
          renderItem={(t) => (
            <ClientItem>
              <ClientQuote>
                <Icon className="fas fa-quote-left" />
              </ClientQuote>
              <ClientContent>
                <ClientText>{t.text}</ClientText>
              </ClientContent>
              <ClientFooter>
                <ClientPostMeta>
                  <UserThumb>
                    <Image src={t.img} alt={t.name} width={50} height={50} />
                  </UserThumb>
                  <ClientName>{t.name}</ClientName>
                </ClientPostMeta>
                <ClientRatings>
                  {[...Array(t.stars)].map((_, i) => (
                    <Icon key={i} className="fas fa-star" />
                  ))}
                </ClientRatings>
              </ClientFooter>
            </ClientItem>
          )}
          bottomControls={({ currentIndex, totalItems, goTo }) => {
            const dots = totalItems;
            const activeDot = currentIndex;
            return (
              <PaginationDots>
                {Array.from({ length: dots }).map((_, i) => (
                  <PaginationDot
                    key={i}
                    className={i === activeDot ? "active" : ""}
                    onClick={() => goTo(i)}
                  />
                ))}
              </PaginationDots>
            );
          }}
        />
      </ContainerWrapper>
    </TestimonialSection>
  );
}

const ContainerWrapper = styled(Container)`
  position: relative;
  z-index: 2;
  overflow: visible;
  max-width: none;
  width: 100%;
`;

const Section = styled.section`
  padding: 120px 0;
  position: relative;
  @media (max-width: 768px) {
    padding: 70px 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-bottom: 50px;
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

const TestimonialSection = styled(Section)`
  background-image:
    linear-gradient(rgba(245, 243, 241, 0), rgba(245, 243, 241, 0)),
    url("/image/bg/bg-5.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  .slider-viewport {
    @media (min-width: 1200px) {
      max-width: 1435px;
      margin: 0 auto;
      overflow: visible;
    }
  }
`;

const ClientQuote = styled.div`
  color: #e8e9ea;
  font-size: 40px;
  line-height: 40px;
  margin-bottom: 20px;
`;

const ClientContent = styled.div`
  flex-grow: 1;
  padding: 0;
`;

const ClientText = styled.p`
  color: #3d3d3d;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;

  .dark & {
    color: #dfdfdf;
  }
`;

const ClientFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 0;
  border-top: 1px dashed #e5e5e5;
  padding-top: 10px;
  margin-top: 10px;
  transition: all 0.5s;
`;

const ClientPostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const UserThumb = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ClientName = styled.span`
  padding-left: 15px;
  color: #19232d;
  font-weight: 700;
  font-size: 14px;
  font-family: ${theme.fonts.mulish};

  .dark & {
    color: white;
  }
`;

const ClientRatings = styled.span`
  color: #dcbb87;
  font-size: 12px;
  display: flex;
  gap: 2px;
`;

const Icon = styled.i`
  color: #dcbb87;
  font-size: 12px;
`;

const ClientItem = styled.div`
  background-color: white;
  border: none;
  border-radius: 10px;
  padding: 15px 20px 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 10px rgba(50, 73, 179, 0.08);

  .dark & {
    background-color: #1f2e3c;
    box-shadow: none;
  }

  @media (min-width: 1200px) {
    max-width: 448.35px;
    margin: 0 auto;
  }
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
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

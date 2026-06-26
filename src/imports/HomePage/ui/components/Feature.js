"use client";

import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import { FEATURES } from "@/imports/core/constants/homepage";
import Container from "@/imports/core/atom/Container";
import Flex from "@/imports/core/atom/Flex";

export default function Feature({ subTitle, sectionTitle }) {
  return (
    <FeatureSection>
      <FeatureContainer>
        <SectionHeader>
          <SubTitle>
            {subTitle || (
              <>
                Discover <span>Luxera</span> Benefits
              </>
            )}
          </SubTitle>
          <SectionTitle>
            {sectionTitle || "Discover Private Jet Benefits"}
          </SectionTitle>
        </SectionHeader>
        <FeatureGrid>
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              variant="fade-up"
              duration={900}
              delay={i * 100}
            >
              <FeatureItem>
                <FeatureIcon className="feature-icon">
                  <f.icon />
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{f.title}</FeatureTitle>
                  <FeatureText>{f.text}</FeatureText>
                </FeatureContent>
              </FeatureItem>
            </Reveal>
          ))}
        </FeatureGrid>
      </FeatureContainer>
    </FeatureSection>
  );
}

const FeatureSection = styled.section`
  padding: 120px 0;

  position: relative;
  overflow: hidden;
  background-color: #fff;

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${theme.base};
  margin-bottom: 20px;
  font-family: ${theme?.fonts?.mulish};

  span {
    color: ${theme.dark};
  }

  @media (max-width: 768px) {
    font-size: 13px;
    letter-spacing: 3px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme?.fonts?.playfair};
  font-size: 42px;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: ${theme?.dark || "#19232d"};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const FeatureItem = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  padding: 40px;
  transition: all 0.2s;
  position: relative;
  border: 1px solid #f5f3f1;
  z-index: 2;
  height: 100%;
  text-align: left;

  @media (min-width: 1200px) {
    width: 370px !important;
    height: 333px !important;
  }

  @media (max-width: 991px) {
    padding: 20px;
    border: 1px solid #f5f3f1 !important;
  }

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid ${theme.soft};
    background-color: white;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 40px rgba(119, 4, 4, 0.1);
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  &:hover {
    background-color: transparent;
    border: 1px solid transparent;
    z-index: 3;

    &::after,
    &::before {
      opacity: 1;
      visibility: visible;
    }

    .feature-icon {
      color: ${theme?.base};
    }
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 370px) !important;
    justify-content: center !important;
  }

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }

  & > div {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  & > div:hover {
    z-index: 10;
  }

  @media (min-width: 992px) {
    & > div:nth-child(6n + 1) ${FeatureItem} {
      border-left: none;
      border-top: none;
    }
    & > div:nth-child(6n + 2) ${FeatureItem} {
      border-top: none;
    }
    & > div:nth-child(6n + 3) ${FeatureItem} {
      border-right: none;
      border-top: none;
    }
    & > div:nth-child(6n + 4) ${FeatureItem} {
      border-left: none;
      border-bottom: none;
    }
    & > div:nth-child(6n + 5) ${FeatureItem} {
      border-bottom: none;
    }
    & > div:nth-child(6n + 6) ${FeatureItem} {
      border-right: none;
      border-bottom: none;
    }
  }
`;

const FeatureIcon = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
  font-size: 80px;
  line-height: 80px;
  color: ${theme?.dark};
  margin-bottom: 30px;
  transition: all 0.5s;

  @media (max-width: 991px) {
    font-size: 50px;
    margin-bottom: 30px;
  }
`;

const FeatureTitle = styled.h3`
  font-family: ${theme?.fonts?.playfair ||
  "var(--font-playfair-display), serif"};
  font-size: 24px;
  font-weight: 500;
  color: ${theme?.dark};
  margin: 0 0 10px;
  transition: all 0.5s;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const FeatureText = styled.p`
  font-family: ${theme?.fonts?.mulish};
  font-size: 15px;
  line-height: 1.8;
  font-weight: 400;
  color: #3d3d3d;
  margin: 0;
  transition: all 0.5s;

  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

const FeatureContent = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
`;

const FeatureContainer = styled(Container)`
  overflow: hidden !important;
  width: 100% !important;
  margin: 0 auto !important;
  padding: 0 15px !important;

  @media (min-width: 1200px) {
    max-width: 1140px !important;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    max-width: 960px !important;
  }

  @media (max-width: 991px) {
    max-width: 95% !important;
  }
`;

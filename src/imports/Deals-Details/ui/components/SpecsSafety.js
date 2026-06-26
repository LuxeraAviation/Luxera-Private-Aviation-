"use client";

import styled, { keyframes } from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";
import { DEAL_DETAIL } from "@/imports/core/constants/deals-details";

export default function SpecsSafety() {
  const { safety } = DEAL_DETAIL;

  return (
    <SafetySection>
      <ElementOne>
        <Image src={safety.elements[0]} alt="" width={241} height={367} />
      </ElementOne>
      <ElementTwo>
        <Image src={safety.elements[1]} alt="" width={185} height={227} />
      </ElementTwo>

      <StyledContainer>
        <SectionHeader>
          <SubTitle>{safety.subTitle}</SubTitle>
          <SectionTitle>{safety.title}</SectionTitle>
        </SectionHeader>

        <SafetyGrid>
          <SafetyColumn>
            <Reveal variant="fade-right" duration={1200}>
              <ItemsWrapper>
                {safety.items.slice(0, 2).map((item) => (
                  <SafetyItem key={item.num}>
                    <NumSpan>{item.num}</NumSpan>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemText>{item.text}</ItemText>
                  </SafetyItem>
                ))}
              </ItemsWrapper>
            </Reveal>
          </SafetyColumn>

          <PlaneColumn>
            <Reveal variant="zoom-in" duration={1200}>
              <PlaneWrapper>
                <Image
                  src={safety.planeImg}
                  alt="plane"
                  width={438}
                  height={442}
                  style={{ width: "97%", height: "auto" }}
                />
              </PlaneWrapper>
            </Reveal>
          </PlaneColumn>

          <SafetyColumn>
            <Reveal variant="fade-left" duration={1200}>
              <ItemsWrapper>
                {safety.items.slice(2, 4).map((item) => (
                  <SafetyItem key={item.num}>
                    <NumSpan>{item.num}</NumSpan>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemText>{item.text}</ItemText>
                  </SafetyItem>
                ))}
              </ItemsWrapper>
            </Reveal>
          </SafetyColumn>
        </SafetyGrid>
      </StyledContainer>
    </SafetySection>
  );
}

const SafetySection = styled.section`
  padding: 120px 0;
  position: relative;
  background-color: ${theme.white};
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1140px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
`;

const scrollDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ElementOne = styled.div`
  position: absolute;
  top: 15%;
  right: 5%;
  z-index: 1;
  opacity: 0.2;
  animation: ${scrollDown} 2s cubic-bezier(0.4, 0, 1, 1) infinite;
  width: 241px;

  img {
    width: 100% !important;
    height: auto !important;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const ElementTwo = styled.div`
  position: absolute;
  top: 60%;
  left: 5%;
  z-index: 1;
  opacity: 0.2;
  animation: ${scrollDown} 2s cubic-bezier(0.4, 0, 1, 1) infinite;
  width: 185px;

  img {
    width: 100% !important;
    height: auto !important;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 800;
  font-size: 20px;
  color: ${theme.base};
  font-family: ${theme.fonts.mulish};
  margin-bottom: 10px;
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

const SafetyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 30px;
  position: relative;
  z-index: 2;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const SafetyColumn = styled.div``;

const PlaneColumn = styled.div`
  text-align: center;
`;

const innerRipple = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
`;

const outerRipple = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
`;

const PlaneWrapper = styled.div`
  position: relative;
  width: 450px;
  height: 450px;
  background-color: rgba(220, 187, 135, 0.1);
  border-radius: 50%;
  z-index: 10;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;

  &::before,
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
    background-color: rgba(220, 187, 135, 0.15);
    z-index: -10;
  }

  &::before {
    animation: ${innerRipple} 2000ms cubic-bezier(0.4, 0, 1, 1) infinite;
  }

  &::after {
    animation: ${outerRipple} 2000ms cubic-bezier(0.4, 0, 1, 1) infinite;
  }

  @media (max-width: 575px) {
    width: 100%;
    max-width: 290px;
    height: auto;
    aspect-ratio: 1;
  }

  img {
    display: block;
    position: relative;
    z-index: 1;
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (max-width: 991px) {
    gap: 30px;
  }
`;

const SafetyItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NumSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.base};
  color: ${theme.dark};
  font-family: ${theme.fonts.playfair};
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1;
  padding-bottom: 10px;
`;

const ItemTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.dark};
  margin: 0;
  font-family: ${theme.fonts.playfair};
`;

const ItemText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${theme.text};
  margin: 0;
`;

"use client";

import styled from "styled-components";
import { theme } from "@/styles/Theme";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";
import { DEAL_DETAIL } from "@/imports/core/constants/deals-details";

import CabinComfortIcon from "@/imports/core/assets/CabinComfortIcon";
import WifiIcon from "@/imports/core/assets/WifiIcon";

const iconMap = {
  CabinComfort: CabinComfortIcon,
  Wifi: WifiIcon,
};

export default function SpecsInterior() {
  const { interior } = DEAL_DETAIL;

  return (
    <InteriorSection>
      <BgOverlay $bg={interior.bgImg} />
      <StyledContainer>
        <SectionHeader>
          <SubTitle>
            <span>{interior.subTitle}</span>
          </SubTitle>
          <SectionTitle>{interior.title}</SectionTitle>
          <HeaderDesc>{interior.description}</HeaderDesc>
        </SectionHeader>

        <InteriorWrapper>
          {interior.items.map((item, idx) => {
            const IconComp = iconMap[item.icon];
            const isReversed = idx % 2 !== 0;

            const iconProps =
              item.icon === "Wifi"
                ? { width: "124", height: "100" }
                : { width: "105", height: "100" };

            return (
              <InteriorArea key={idx} $reversed={isReversed}>
                <InteriorContent>
                  <IconWrapper>
                    {IconComp && <IconComp {...iconProps} />}
                  </IconWrapper>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemText>{item.text}</ItemText>
                </InteriorContent>
                <InteriorThumb>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={570}
                    height={380}
                    style={{ width: "100%", height: "auto" }}
                  />
                </InteriorThumb>
              </InteriorArea>
            );
          })}
        </InteriorWrapper>
      </StyledContainer>
    </InteriorSection>
  );
}

const InteriorSection = styled.section`
  padding-top: 120px;
  position: relative;
  z-index: 2;
  overflow: hidden;
`;

const BgOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 700px;
  z-index: 1;
  background-image: url(${(props) => props.$bg});
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;

  &::after {
    content: "";
    position: absolute;
    background-color: ${theme.dark};
    opacity: 0.9;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 2;
  max-width: 1140px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  max-width: 475px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 991px) {
    margin-bottom: 30px;
    max-width: 100%;
  }
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
  font-family: ${theme.fonts.mulish};
  margin-top: -4px;
  color: ${theme.base};

  span {
    color: ${theme.base};
  }

  @media (max-width: 991px) {
    font-size: 13px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  position: relative;
  font-weight: 700;
  font-size: 40px;
  line-height: 1.3;
  color: ${theme.white};
  font-family: ${theme.fonts.playfair};

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 575px) {
    font-size: 22px;
  }
`;

const HeaderDesc = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.7em;
  color: ${theme.white};
  margin-bottom: 0;

  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

const InteriorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InteriorArea = styled.div`
  background-color: #f5f3f1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${(props) => (props.$reversed ? "row-reverse" : "row")};
`;

const InteriorContent = styled.div`
  width: 50%;
  padding: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1199px) {
    padding: 60px;
  }

  @media (max-width: 991px) {
    width: 100%;
    padding: 30px;
  }
`;

const IconWrapper = styled.div`
  color: #19232d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  svg {
    @media (max-width: 991px) {
      width: 50px !important;
      height: auto !important;
    }
  }
`;

const ItemTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
  color: #19232d;
  margin: 0 0 25px 0;
  font-family: ${theme.fonts.playfair};

  @media (max-width: 991px) {
    font-size: 22px;
  }
`;

const ItemText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #19232d;
  margin: 0;
`;

const InteriorThumb = styled.div`
  width: calc(100% - 50%);

  img {
    width: 100% !important;
    height: auto !important;
    display: block;
  }

  @media (max-width: 991px) {
    width: 100%;
  }
`;

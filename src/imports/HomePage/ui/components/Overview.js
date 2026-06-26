"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/styles/Theme";
import Link from "next/link";

export default function Overview() {
  const [active, setActive] = useState("business-jet");

  return (
    <OverviewSection>
      <ContainerFluid>
        <OverviewArea>
          <OverviewElement>
            <ElementImage
              src="/image/element/element-6.png"
              alt="element"
              width={964}
              height={508}
            />
          </OverviewElement>
          <OverviewTab>
            <OverviewTabThumb>
              <TabThumbImage
                src="/image/demo/1.webp"
                alt="overview"
                fill
                priority
              />
              <NavTabArea>
                <NavTabHeader>
                  <SubTitle>
                    <span>#1</span> Private Jet Charter
                  </SubTitle>
                  <NavTabTitle>Find the Best Service For You</NavTabTitle>
                </NavTabHeader>
                <NavTabs role="tablist">
                  {OVERVIEW_TABS.map((t, i) => (
                    <NavLink
                      key={t.id}
                      $active={active === t.id}
                      type="button"
                      role="tab"
                      onClick={() => setActive(t.id)}
                    >
                      {active === t.id ? (
                        <>
                          <Icon className="fas fa-arrow-left" /> {t.label}
                        </>
                      ) : (
                        <>
                          <span>{String(i + 1).padStart(2, "0")}</span>{" "}
                          {t.label}
                        </>
                      )}
                    </NavLink>
                  ))}
                </NavTabs>
              </NavTabArea>
            </OverviewTabThumb>

            <TabContent id="nav-tabContent">
              {OVERVIEW_TABS.map((t) => (
                <TabPane key={t.id} $active={active === t.id} role="tabpanel">
                  <OverviewItem>
                    <OverviewThumb>
                      <OverviewThumbImage
                        src="/image/demo/2.webp"
                        alt="overview"
                        fill
                      />
                      <OverviewThumbContent>
                        <OverviewTitle>{t.label}</OverviewTitle>
                        <OverviewText>
                          Trade crowded airports and wasted time for the ease,
                          comfort, and convenience of travel by private jet.
                        </OverviewText>
                        <OverviewBtn>
                          <BookNowBtn href="#0">
                            <BtnIcon
                              src="/image/fav.png"
                              alt=""
                              width={18}
                              height={18}
                            />
                            <BtnText>Book Now</BtnText>
                          </BookNowBtn>
                        </OverviewBtn>
                      </OverviewThumbContent>
                    </OverviewThumb>
                  </OverviewItem>
                </TabPane>
              ))}
            </TabContent>
          </OverviewTab>
        </OverviewArea>
      </ContainerFluid>
    </OverviewSection>
  );
}

const OVERVIEW_TABS = [
  { id: "private-jet", label: "Private Jet Charter" },
  { id: "business-jet", label: "Business Jet Charter" },
  { id: "private-helicopter", label: "Private Helicopter" },
  { id: "air-ambulance", label: "Air Ambulance" },
];

const OverviewSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  z-index: 10;
  background-color: #fff;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const OverviewArea = styled.div`
  position: relative;
  padding: 0 200px;

  @media (min-width: 1920px) {
    padding: 0 150px;
  }

  @media (max-width: 1440px) {
    padding: 0 142px;
  }

  @media only screen and (max-width: 1399px) {
    padding: 0 100px;
  }
  @media only screen and (max-width: 1199px) {
    padding: 0;
  }
`;

const ContainerFluid = styled.div`
  width: 100%;
  max-width: 1920px;
  padding: 0 60px;
  margin: 0 auto;

  @media (max-width: 1199px) {
    padding: 0 12px;
  }

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const OverviewElement = styled.div`
  position: absolute;
  left: 8%;
  bottom: -10%;
  z-index: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ElementImage = styled(Image)`
  width: 964px;
  height: 508px;
  object-fit: contain;
`;

const OverviewTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;

  @media (max-width: 1199px) {
    gap: 20px;
  }

  @media (max-width: 991px) {
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const OverviewTabThumb = styled.div`
  width: 696px;
  max-width: 100%;
  aspect-ratio: 696 / 538;
  height: auto;
  position: relative;
  z-index: 2;
  border-radius: 10px;
  overflow: hidden;
  order: 2;
  flex: 1;

  @media (max-width: 991px) {
    flex: 1;
    aspect-ratio: auto !important;
    height: 370px !important;
  }

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    flex: none !important;
    aspect-ratio: auto !important;
    height: 370px !important;
  }

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(11, 27, 42, 0.79);
    z-index: 1;
  }
`;

const TabThumbImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const NavTabArea = styled.div`
  position: absolute;
  z-index: 9;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;

  @media (max-width: 1919px) {
    padding: 20px 30px;
  }

  @media (max-width: 991px) {
    padding: 20px;
  }
`;

const NavTabHeader = styled.div`
  margin-bottom: 30px;

  @media (max-width: 1919px) {
    margin-bottom: 15px;
  }

  @media (max-width: 991px) {
    margin-bottom: 20px;
  }
`;

const SubTitle = styled.span`
  color: #fff;
  margin-bottom: 15px;
  font-family: ${theme?.fonts?.mulish || "var(--font-mulish), sans-serif"};
  font-size: 20px;
  font-weight: 700;
  display: block;

  @media (max-width: 1919px) {
    font-size: 14px;
    margin-bottom: 8px;
  }

  span {
    color: ${theme?.base};
  }
`;

const NavTabTitle = styled.h2`
  color: #fff;
  font-family: ${theme?.fonts?.playfair ||
  "var(--font-playfair-display), serif"};
  font-size: 40px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 1919px) {
    font-size: 24px;
  }

  @media (max-width: 1440px) {
    font-size: 18px;
  }

  @media (max-width: 575px) {
    font-size: 20px;
  }
`;

const NavTabs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NavLink = styled.button`
  background-color: transparent;
  border: none;
  border-top: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 0;
  color: ${(props) => (props.$active ? theme.base : theme.white)};
  font-family: ${theme?.fonts?.playfair ||
  "var(--font-playfair-display), serif"};
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  text-align: left;
  padding: 28px 0;
  padding-left: ${(props) => (props.$active ? "40px" : "0")};
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
  }

  span {
    font-family: ${theme?.fonts?.mulish || "var(--font-mulish), sans-serif"};
    margin-right: 15px;
    font-weight: 800;
    color: #fff;
  }

  @media (max-width: 1919px) {
    font-size: 16px;
    padding: 12px 0;
  }

  @media (max-width: 991px) {
    padding-left: ${(props) => (props.$active ? "20px" : "0")};
  }
`;

const TabContent = styled.div`
  width: 696px;
  max-width: 100%;
  aspect-ratio: 696 / 538;
  height: auto;
  order: 1;
  flex: 1;

  @media (max-width: 991px) {
    flex: 1.5;
  }

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
    flex: none !important;
    aspect-ratio: 696 / 538 !important;
    height: auto !important;
  }
`;

const TabPane = styled.div`
  display: ${(props) => (props.$active ? "block" : "none")};
  animation: ${(props) => (props.$active ? "fadeInLeft 1s ease" : "none")};
  height: 100%;

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-50%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const OverviewItem = styled.div`
  width: 100%;
  height: 100%;
`;

const OverviewThumb = styled.div`
  position: relative;
  z-index: 2;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    height: 100%;
  }

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      360deg,
      rgba(25, 35, 45, 0.85) 3%,
      transparent 100%
    );
    z-index: 1;
  }
`;

const OverviewThumbImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const OverviewThumbContent = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  z-index: 2;
  color: #fff;

  @media (max-width: 991px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
  }

  @media (max-width: 575px) {
    bottom: 50%;
    transform: translate(-50%, 50%);
  }
`;

const OverviewText = styled.p`
  color: #fff;
  font-family: ${theme?.fonts?.mulish};
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px;

  @media (max-width: 1919px) {
    font-size: 14px;
  }
`;

const OverviewTitle = styled.h3`
  color: #fff;
  font-family: ${theme?.fonts?.playfair};
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 15px;

  @media (max-width: 1440px) {
    font-size: 24px;
  }
`;

const OverviewBtn = styled.div`
  display: block;
`;

const BookNowBtn = styled(Link)`
  color: ${theme?.base};
  font-weight: 800;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-family: ${theme?.fonts?.mulish};
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    span {
      transform: translateX(4px);
    }
  }
`;

const BtnIcon = styled(Image)`
  && {
    width: 18px;
    height: auto;
    object-fit: contain;
  }
`;

const BtnText = styled.span`
  transition: transform 0.3s ease;
  font-size: 16px;
`;

const Icon = styled.i`
  color: ${theme?.base};
  margin-right: 15px;
  font-size: 18px;
`;

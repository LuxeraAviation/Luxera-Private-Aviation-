"use client";

import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Container from "@/imports/core/atom/Container";
import Section from "@/imports/core/atom/Section";
import PageHeading from "@/imports/core/components/PageHeading";
import { FLEET_CATEGORIES, FLEET_PLANES } from "@/imports/core/constants/fleet";
import { Reveal } from "@/styles/Theme";
import { fs28, fs38, fs50, fs67 } from "@/styles/typography";

export default function FleetPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPlane, setSelectedPlane] = useState(null);

  const filteredPlanes =
    activeCategory === "All"
      ? FLEET_PLANES
      : FLEET_PLANES.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedPlane(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Main>
      <PageHeading title="Our Elite Fleet" bg="/image/av/jet-reflection.jpg" />

      <Section $gray>
        <Container>
          <TabsWrapper as={Reveal} variant="fade-up">
            <TabsScroll>
              {FLEET_CATEGORIES.map((cat) => (
                <TabButton
                  key={cat}
                  $active={cat === activeCategory}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </TabButton>
              ))}
            </TabsScroll>
          </TabsWrapper>

          <Grid>
            {filteredPlanes.map((plane, index) => (
              <Card
                key={`${plane.id}-${activeCategory}`}
                as={Reveal}
                variant="fade-up"
                delay={index * 100}
                onClick={() => setSelectedPlane(plane)}
              >
                <ImageWrap>
                  <PlaneImg src={plane.image} alt={plane.name} />
                  <CategoryTag>{plane.category}</CategoryTag>
                </ImageWrap>

                <CardContent>
                  <PlaneName>{plane.name}</PlaneName>
                  <PlaneDesc>{plane.overview}</PlaneDesc>

                  <QuickSpecs>
                    <SpecItem>
                      <i className="fa-solid fa-users" />
                      <span>{plane.specs.passengers} Pax</span>
                    </SpecItem>
                    <SpecItem>
                      <i className="fa-solid fa-route" />
                      <span>{plane.specs.range.toLocaleString()} nm</span>
                    </SpecItem>
                    <SpecItem>
                      <i className="fa-solid fa-gauge" />
                      <span>{plane.specs.speed} ktas</span>
                    </SpecItem>
                  </QuickSpecs>

                  <ExploreBtn onClick={() => setSelectedPlane(plane)}>
                    Explore Specifications{" "}
                    <i className="fa-solid fa-arrow-right" />
                  </ExploreBtn>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {selectedPlane && (
        <ModalBackdrop onClick={() => setSelectedPlane(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseBtn
              onClick={() => setSelectedPlane(null)}
              aria-label="Close details"
            >
              <i className="fa-solid fa-times" />
            </CloseBtn>

            <ModalGrid>
              <ModalLeft>
                <ModalImgContainer>
                  <ModalImg
                    src={selectedPlane.image}
                    alt={selectedPlane.name}
                  />
                  <ModalCategory>{selectedPlane.category}</ModalCategory>
                </ModalImgContainer>

                <ModalPlaneName>{selectedPlane.name}</ModalPlaneName>
                <ModalOverview>{selectedPlane.overview}</ModalOverview>

                <HighlightsSection>
                  <HighlightsTitle>Aircraft Highlights</HighlightsTitle>
                  <HighlightsList>
                    {selectedPlane.features.map((feat, idx) => (
                      <HighlightItem key={idx}>
                        <i className="fa-solid fa-diamond" />
                        <span>{feat}</span>
                      </HighlightItem>
                    ))}
                  </HighlightsList>
                </HighlightsSection>
              </ModalLeft>

              <ModalRight>
                <SpecsTitle>Performance & Specifications</SpecsTitle>

                <SpecsTable>
                  <SpecsRow>
                    <SpecLabel>
                      <i className="fa-solid fa-users" /> Passenger Capacity
                    </SpecLabel>
                    <SpecValue>{selectedPlane.specs.passengers} Pax</SpecValue>
                  </SpecsRow>

                  <SpecsRow>
                    <SpecLabel>
                      <i className="fa-solid fa-route" /> Flight Range
                    </SpecLabel>
                    <SpecValue>
                      {selectedPlane.specs.range.toLocaleString()} nm
                    </SpecValue>
                  </SpecsRow>

                  <SpecsRow>
                    <SpecLabel>
                      <i className="fa-solid fa-gauge" /> Cruise Speed
                    </SpecLabel>
                    <SpecValue>{selectedPlane.specs.speed} ktas</SpecValue>
                  </SpecsRow>

                  <SpecsRow>
                    <SpecLabel>
                      <i className="fa-solid fa-suitcase" /> Baggage Volume
                    </SpecLabel>
                    <SpecValue>{selectedPlane.specs.luggage} cu ft</SpecValue>
                  </SpecsRow>

                  <SpecsDivider>Cabin Dimensions</SpecsDivider>

                  <SpecsRow>
                    <SpecLabel>Cabin Height</SpecLabel>
                    <SpecValue>{selectedPlane.specs.cabinHeight}</SpecValue>
                  </SpecsRow>

                  <SpecsRow>
                    <SpecLabel>Cabin Width</SpecLabel>
                    <SpecValue>{selectedPlane.specs.cabinWidth}</SpecValue>
                  </SpecsRow>

                  <SpecsRow>
                    <SpecLabel>Cabin Length</SpecLabel>
                    <SpecValue>{selectedPlane.specs.cabinLength}</SpecValue>
                  </SpecsRow>
                </SpecsTable>

                <BookBtn
                  href={`/?category=${encodeURIComponent(selectedPlane.category)}#booking-zone`}
                  onClick={() => setSelectedPlane(null)}
                >
                  Request Flight Quotation
                </BookBtn>
              </ModalRight>
            </ModalGrid>
          </ModalContent>
        </ModalBackdrop>
      )}
    </Main>
  );
}

const Main = styled.main`
  background: ${({ theme }) => theme.bg};
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const TabsScroll = styled.div`
  display: flex;
  gap: 80px;
  overflow-x: auto;
  margin-bottom: -1px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 991px) {
    gap: 40px;
    max-width: 100%;
    justify-content: flex-start;
  }
`;

const TabButton = styled.button`
  background: transparent;
  color: ${({ $active, theme }) => ($active ? theme.base : theme.text)};
  border: none;
  padding: 16px 0;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? "600" : "500")};
  letter-spacing: ${({ $active }) => ($active ? "3px" : "2px")};
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  transition:
    color 0.3s ease,
    letter-spacing 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.base};
    letter-spacing: 3px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $active }) => ($active ? "80px" : "0")};
    height: 3px;
    background: ${({ theme }) => theme.base};
    box-shadow: 0 1px 4px rgba(170, 132, 83, 0.4);
    opacity: ${({ $active }) => ($active ? "1" : "0")};
    transition:
      width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
      opacity 0.3s ease;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Card = styled.div`
  background: ${({ theme }) =>
    theme.mode === "dark" ? theme.soft : theme.white};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition:
    transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    border-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(170, 132, 83, 0.08);
    border-color: ${({ theme }) => theme.base};
  }
`;

const ImageWrap = styled.div`
  position: relative;
  height: 230px;
  overflow: hidden;
`;

const PlaneImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(4px);
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.base};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 6px 12px;
  border-radius: 0px;
  z-index: 2;
`;

const CardContent = styled.div`
  padding: 24px;
`;

const PlaneName = styled.h3`
  margin: 0 0 12px;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 22px;
  color: ${({ theme }) => theme.heading};
  font-weight: normal;
`;

const PlaneDesc = styled.p`
  margin: 0 0 20px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  line-height: 1.6em;
  height: 67px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const QuickSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  border-top: 1px solid rgba(170, 132, 83, 0.1);
  padding: 16px 0;
  margin-bottom: 12px;
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;

  i {
    font-size: 13px;
    color: ${({ theme }) => theme.base};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.mulish};
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.heading};
  }
`;

const ExploreBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.heading};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 16px 0 0;
  margin-top: 16px;
  cursor: pointer;
  transition: color 0.3s ease;

  i {
    color: ${({ theme }) => theme.base};
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  ${Card}:hover & {
    color: ${({ theme }) => theme.base};

    i {
      transform: translate3d(6px, 0, 0);
    }
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-20px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.4s ease forwards;
`;

const ModalContent = styled.div`
  position: relative;
  background: ${({ theme }) => (theme.mode === "dark" ? "#121212" : "#fbf9f6")};
  border: 1px solid rgba(170, 132, 83, 0.2);
  border-radius: 5px;
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.base} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.base};
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.heading};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.4s ease,
    color 0.3s ease;
  z-index: 10;

  &:hover {
    transform: rotate(90deg);
    color: ${({ theme }) => theme.base};
  }
`;

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  padding: 48px;
  border-radius: 5px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 24px;
  }
`;

const ModalLeft = styled.div``;

const ModalImgContainer = styled.div`
  position: relative;
  height: 280px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 24px;
  border: 1px solid rgba(170, 132, 83, 0.1);
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalCategory = styled(CategoryTag)`
  top: 20px;
  left: 20px;
  border-radius: 0px;
`;

const ModalPlaneName = styled.h2`
  margin: 0 0 14px;
  font-family: ${({ theme }) => theme.fonts.playfair};
  ${fs38}
  color: ${({ theme }) => theme.heading};
  font-weight: normal;
`;

const ModalOverview = styled.p`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  line-height: 1.7em;
  margin: 0 0 30px;
`;

const HighlightsSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 24px;
`;

const HighlightsTitle = styled.h4`
  margin: 0 0 16px;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 18px;
  color: ${({ theme }) => theme.heading};
  font-weight: normal;
  letter-spacing: 0.5px;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: ${fadeInLeft} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.4s;
  }
  &:nth-child(5) {
    animation-delay: 0.5s;
  }

  i {
    color: ${({ theme }) => theme.base};
    font-size: 8px;
    margin-top: 6px;
  }

  span {
    font-family: ${({ theme }) => theme.fonts.mulish};
    font-size: 14px;
    color: ${({ theme }) => theme.heading};
    font-weight: 500;
  }
`;

const ModalRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid rgba(170, 132, 83, 0.15);
  padding-left: 40px;

  @media (max-width: 767px) {
    border-left: none;
    padding-left: 0;
    gap: 30px;
  }
`;

const SpecsTitle = styled.h3`
  margin: 0 0 24px;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 20px;
  color: ${({ theme }) => theme.heading};
  font-weight: normal;
  letter-spacing: 0.5px;
`;

const SpecsTable = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 30px;
`;

const SpecsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  animation: ${fadeInRight} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition: all 0.3s ease;

  &:hover {
    padding-left: 8px;
    border-bottom-color: ${({ theme }) => theme.base};
  }

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.15s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.25s;
  }
  &:nth-child(6) {
    animation-delay: 0.35s;
  }
  &:nth-child(7) {
    animation-delay: 0.4s;
  }
  &:nth-child(8) {
    animation-delay: 0.45s;
  }
`;

const SpecLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;

  i {
    color: ${({ theme }) => theme.base};
    font-size: 13px;
    width: 16px;
    text-align: center;
  }
`;

const SpecValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  color: ${({ theme }) => theme.heading};
  font-weight: 600;
`;

const SpecsDivider = styled.div`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.base};
  letter-spacing: 1.5px;
  margin-top: 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  animation: ${fadeInRight} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.3s;
`;

const BookBtn = styled.a`
  display: block;
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.base};
  border: 1px solid ${({ theme }) => theme.base};
  border-radius: 5px;
  padding: 16px 20px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: color 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${({ theme }) => theme.base};
    z-index: -1;
    transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  &:hover {
    color: ${({ theme }) => theme.white};

    &::before {
      width: 100%;
    }
  }
`;

"use client";

import styled from "styled-components";
import { theme, Reveal, Odometer } from "@/styles/Theme";
import Container from "@/imports/core/atom/Container";
import { STATS } from "@/imports/core/constants/homepage";

export default function Statistics() {
  return (
    <StatsSection>
      <Container>
        <StatsGrid>
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              variant="zoom-in"
              duration={1000}
              delay={i * 120}
              className="reveal-wrapper"
            >
              <StatisticsItem>
                <StatisticsContent>
                  <OdoArea>
                    <OdoTitle>
                      <Odometer to={s.to} />
                    </OdoTitle>
                  </OdoArea>
                  <StatisticsText>{s.label}</StatisticsText>
                </StatisticsContent>
              </StatisticsItem>
            </Reveal>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
}

const StatsSection = styled.section`
  padding: 120px 0;
  position: relative;
  background:
    linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
    url("/image/bg/bg-2.png") center/cover no-repeat fixed;
  color: #fff;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const StatisticsItem = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;

  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-right: 1px dashed rgba(220, 187, 135, 0.5);
    pointer-events: none;
  }

  @media (max-width: 991px) {
    &::after {
      border-right: none !important;
      border-bottom: 1px dotted rgba(220, 187, 135, 0.5) !important;
      bottom: -15px !important;
      height: 100% !important;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }

  .reveal-wrapper {
    width: 100%;
    height: 100%;
  }

  & > *:nth-child(4n + 4) ${StatisticsItem}::after {
    display: none;
  }
`;

const StatisticsContent = styled.div`
  position: relative;
  width: 100%;
`;

const OdoArea = styled.div`
  display: inline-block;
`;

const OdoTitle = styled.h3`
  display: inline-block;
  color: white;
  font-family: ${theme?.fonts?.playfair};
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 0;
  margin-top: -10px;
  line-height: 1.2;

  @media (max-width: 991px) {
    font-size: 28px;
  }

  .odometer-digit {
    padding: 1px;
  }
`;

const StatisticsText = styled.p`
  font-family: ${theme?.fonts?.mulish};
  font-size: 18px;
  color: white;
  margin-top: 10px;
  margin-bottom: 0;
`;

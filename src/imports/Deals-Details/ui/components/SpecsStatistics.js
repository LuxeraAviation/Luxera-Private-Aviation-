"use client";

import { useState } from "react";
import styled from "styled-components";
import { theme, Odometer } from "@/styles/Theme";
import Container from "@/imports/core/atom/Container";
import { DEAL_DETAIL } from "@/imports/core/constants/deals-details";

import TakeOffDistanceIcon from "@/imports/core/assets/TakeOffDistanceIcon";
import MAXRANGEIcon from "@/imports/core/assets/MAXRANGEIcon";
import AircraftSpeedIcon from "@/imports/core/assets/AircraftSpeedIcon";
import MaxPassengerIcon from "@/imports/core/assets/MaxPassengerIcon";

const iconMap = {
  TakeOffDistance: TakeOffDistanceIcon,
  MaxRange: MAXRANGEIcon,
  Speed: AircraftSpeedIcon,
  Passenger: MaxPassengerIcon,
};

export default function SpecsStatistics() {
  const { statistics } = DEAL_DETAIL;
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <StatsSection>
      <StyledContainer>
        <StatsArea>
          <StatsGrid>
            {statistics.map((stat, idx) => {
              const IconComp = iconMap[stat.icon];
              const isActive = activeIndex === idx;
              return (
                <StatItem
                  key={idx}
                  className={isActive ? "active" : ""}
                  onClick={() => setActiveIndex(isActive ? null : idx)}
                >
                  <IconWrapper>
                    {IconComp && <IconComp width="50" height="50" />}
                  </IconWrapper>
                  <StatContent>
                    <OdoArea>
                      <OdoTitle>
                        <Odometer to={stat.value} duration={2000} />
                      </OdoTitle>
                      {stat.unit && <UnitText>{stat.unit}</UnitText>}
                    </OdoArea>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatContent>
                </StatItem>
              );
            })}
          </StatsGrid>
        </StatsArea>
      </StyledContainer>
    </StatsSection>
  );
}

const StatsSection = styled.section`
  padding: 120px 0;
  position: relative;
  background-color: ${theme.white};

  @media (max-width: 991px) {
    padding: 40px 0 80px 0;
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

const StatsArea = styled.div`
  width: 100%;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const IconWrapper = styled.div`
  color: ${theme.base};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.soft};
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease-in-out;

  @media (max-width: 575px) {
    width: 70px;
    height: 70px;

    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 2;
`;

const OdoArea = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
`;

const OdoTitle = styled.h3`
  font-size: 45px;
  font-weight: 800;
  color: ${theme.dark};
  margin: 0;
  font-family: ${theme.fonts.mulish};
  transition: color 0.3s ease-in-out;

  @media (max-width: 575px) {
    font-size: 30px;
  }
`;

const UnitText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${theme.dark};
  transition: color 0.3s ease-in-out;
  margin-top: 6px;
  padding-left: 15px;
`;

const StatLabel = styled.p`
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${theme.text};
  margin: 0;
  transition: color 0.3s ease-in-out;
`;

const StatItem = styled.div`
  position: relative;
  padding: 40px 30px;
  border-radius: 5px;
  border: 2px solid ${theme.soft};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  width: 255px;
  cursor: pointer;

  @media (max-width: 575px) {
    width: 100%;
    padding: 40px;
  }
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background-color: ${theme.base};
    border-radius: 2px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }

  &.active {
    border-color: ${theme.base};

    &::after {
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 5px;
    }
  }

  &:not(.active):hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

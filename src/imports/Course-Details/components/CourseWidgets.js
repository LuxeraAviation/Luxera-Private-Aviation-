"use client";

import styled from "styled-components";
import { theme } from "@/styles/Theme";

export default function CourseWidgets({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <WidgetsContainer>
      {stats.map((stat, index) => (
        <WidgetCard key={index}>
          <IconContainer>
            <StatIcon $icon={stat.icon} />
          </IconContainer>
          <WidgetContent>
            <WidgetTitle>{stat.title}</WidgetTitle>
            <WidgetValue>{stat.value}</WidgetValue>
          </WidgetContent>
        </WidgetCard>
      ))}
    </WidgetsContainer>
  );
}

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 60px;
  position: relative;
  z-index: 10;
  padding: 0;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 30px;
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const StatIcon = styled.i.attrs((props) => ({
  className: props.$icon,
}))`
  font-size: 24px;
  color: ${theme.base};
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f5f3f1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  transition: background-color 0.5s ease;
`;

const WidgetCard = styled.div`
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.5s ease;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 25px;
    background-color: ${theme.base};
    border-radius: 5px;
    z-index: -1;
    transition: all 0.5s ease;
  }

  &:hover {
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  }

  &:hover::before {
    width: 100%;
    height: 100%;
  }

  &:hover ${IconContainer} {
    background-color: #ffffff;
  }
`;

const WidgetContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

const WidgetTitle = styled.h4`
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  font-weight: 800;
  color: ${theme.dark};
  margin: 0 0 5px 0;
`;

const WidgetValue = styled.span`
  font-family: ${theme.fonts.mulish};
  font-size: 14px;
  font-weight: 600;
  color: ${theme.dark};
`;

"use client";

import styled from "styled-components";
import { theme, useInView, Odometer } from "@/styles/Theme";

const SIZE = 130;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function SkillCircle({
  value = 0,
  label = "",
  duration = 1800,
}) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * value) / 100;

  return (
    <SkillItem ref={ref}>
      <Progress>
        <Ring width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <Track cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} strokeWidth={STROKE} />
          <Bar
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE}
            $circumference={CIRCUMFERENCE}
            $offset={inView ? offset : CIRCUMFERENCE}
            $duration={duration}
          />
        </Ring>
        <Value>
          {inView ? <Odometer to={value} duration={duration} /> : 0}
          <Percent>%</Percent>
        </Value>
      </Progress>
      <SkName>{label}</SkName>
    </SkillItem>
  );
}

const SkillItem = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 40px 10px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  text-align: center;
  transition: all 0.5s;

  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background-color: ${theme.base};
    transition: all 0.5s;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
  }
`;

const Progress = styled.div`
  position: relative;
  width: ${SIZE}px;
  height: ${SIZE}px;
  margin: 0 auto;
`;

const Ring = styled.svg`
  transform: rotate(-90deg);
`;

const Track = styled.circle`
  fill: none;
  stroke: #e5e5e5;
`;

const Bar = styled.circle`
  fill: none;
  stroke: ${theme.base};
  stroke-linecap: round;
  stroke-dasharray: ${({ $circumference }) => $circumference};
  stroke-dashoffset: ${({ $offset }) => $offset};
  transition: stroke-dashoffset ${({ $duration }) => $duration}ms ease;
`;

const Value = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.playfair};
  font-size: 36px;
  font-weight: 600;
  color: ${theme.dark};
`;

const Percent = styled.span`
  font-family: ${theme.fonts.playfair};
  font-weight: 600;
`;

const SkName = styled.span`
  margin-top: 25px;
  display: inline-block;
  text-transform: uppercase;
  color: ${theme.dark};
  font-weight: 800;
  font-size: 16px;
`;

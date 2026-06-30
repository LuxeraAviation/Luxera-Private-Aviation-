"use client";

import styled from "styled-components";
import SliderArrowIcon from "@/imports/core/assets/SliderArrowIcon";


export default function SliderArrows({ prev, next, light = false }) {
  return (
    <>
      <Arrow $side="left" $light={light} onClick={prev} aria-label="Previous" type="button">
        <SliderArrowIcon direction="left" />
      </Arrow>
      <Arrow $side="right" $light={light} onClick={next} aria-label="Next" type="button">
        <SliderArrowIcon direction="right" />
      </Arrow>
    </>
  );
}
const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ theme, $light }) => ($light ? theme.white : theme.heading)};
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    width: 56px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.base};
  }

  @media (min-width: 992px) {
    ${({ $side }) =>
      $side === "left"
        ? "left: calc((960px - 100vw) / 4 - 28px);"
        : "right: calc((960px - 100vw) / 4 - 28px);"}
  }
  @media (min-width: 1200px) {
    ${({ $side }) =>
      $side === "left"
        ? "left: calc((1140px - 100vw) / 4 - 28px);"
        : "right: calc((1140px - 100vw) / 4 - 28px);"}
  }
  @media (min-width: 1400px) {
    ${({ $side }) =>
      $side === "left"
        ? "left: calc((1320px - 100vw) / 4 - 28px);"
        : "right: calc((1320px - 100vw) / 4 - 28px);"}
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

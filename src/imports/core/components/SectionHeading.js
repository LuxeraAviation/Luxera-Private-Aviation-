"use client";

import styled, { css } from "styled-components";
import { Reveal } from "@/styles/Theme";
import { fs67, sectionSubtitle } from "@/styles/typography";

export default function SectionHeading({
  subtitle,
  title,
  center = false,
  light = false,
  maxWidth,
  className,
}) {
  return (
    <Wrap $center={center} $light={light} $maxWidth={maxWidth} className={className}>
      {subtitle && (
        <Subtitle as={Reveal} variant="fade-up">
          {subtitle}
        </Subtitle>
      )}
      {title && (
        <Title as={Reveal} variant="fade-up" delay={100}>
          {title}
        </Title>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  ${({ $center }) =>
    $center &&
    css`
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    `}
  ${({ $maxWidth }) =>
    $maxWidth &&
    css`
      max-width: ${$maxWidth};
    `}
`;

const Subtitle = styled.p`
  ${sectionSubtitle}
`;

const Title = styled.h2`
  margin: 0;
  ${fs67}
  color: ${({ theme, $light }) => ($light ? theme.white : theme.heading)};
`;

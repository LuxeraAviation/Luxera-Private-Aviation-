"use client";

import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <PreloaderWrap $hidden={hidden} aria-hidden>
      <AmbientGlow />
      <Sparkle $duration={3} $delay={0} $top="45%" $left="48%" />
      <Sparkle $duration={2.5} $delay={0.4} $top="52%" $left="53%" />
      <Sparkle $duration={3.5} $delay={0.8} $top="40%" $left="52%" />
      <Sparkle $duration={2.8} $delay={1.2} $top="55%" $left="46%" />

      <ContentWrap>
        <Spinner>
          <span>L</span>
        </Spinner>
        <BrandName>
          {"LUXERA".split("").map((char, i) => (
            <Letter key={i} $delay={i * 0.08}>
              {char}
            </Letter>
          ))}
        </BrandName>
      </ContentWrap>
    </PreloaderWrap>
  );
}

const spinClockwise = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinCounterClockwise = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.03;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.06;
  }
`;

const letterEntrance = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

const floatSpark = keyframes`
  0% {
    transform: translateY(20px) scale(0.8);
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-40px) scale(1.2);
    opacity: 0;
  }
`;

const PreloaderWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
  transition:
    opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    visibility 0.6s cubic-bezier(0.25, 1, 0.5, 1);

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`;

const AmbientGlow = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: ${({ theme }) => theme.base};
  opacity: 0.04;
  filter: blur(75px);
  pointer-events: none;
  z-index: 0;
  animation: ${glowPulse} 4s ease-in-out infinite;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: ${({ theme }) => theme.base};
  border-radius: 50%;
  box-shadow: 0 0 6px ${({ theme }) => theme.base};
  animation: ${floatSpark} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  pointer-events: none;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1;
`;

const BrandName = styled.div`
  display: flex;
  gap: 10px;
`;

const Letter = styled.span`
  font-family: ${({ theme }) => theme.fonts.nasalization};
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.base};
  letter-spacing: 2px;
  opacity: 0;
  animation: ${letterEntrance} 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Spinner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  z-index: 1;

  span {
    display: inline-block;
    font-family: ${({ theme }) => theme.fonts.nasalization};
    font-size: 78px;
    color: ${({ theme }) => theme.base};
    letter-spacing: 1px;
    animation: ${pulse} 2s ease-in-out infinite;
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.border};
    border-top-color: ${({ theme }) => theme.base};
    border-bottom-color: ${({ theme }) => theme.base};
    box-shadow: 0 0 8px rgba(170, 132, 83, 0.08);
    animation: ${spinClockwise} 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    z-index: 1;
  }

`;

"use client";

import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const LEFT = "/image/luxera/left.png";
const RIGHT = "/image/luxera/right.png";

export default function ComingSoonPage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev.html;
      body.style.overflow = prev.body;
    };
  }, []);

  return (
    <Screen>
      <LeftWing src={LEFT} alt="LUXERA private jet left" />
      <RightWing src={RIGHT} alt="LUXERA private jet right" />

      <Brand>
        <WordmarkFrame>
          <Rule />
          <Wordmark>LUXERA</Wordmark>
          <Rule />
        </WordmarkFrame>
        <Tagline><span>—</span> PRIVATE AVIATION <span>—</span></Tagline>
        <Coming>COMING SOON</Coming>
        <Emblem>
          <svg viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 28 L2 4 L14 10 L30 2 L46 10 L58 4 Z" fill="url(#gold)" />
            <defs>
              <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f6e6c4" />
                <stop offset="55%" stopColor="#cda968" />
                <stop offset="100%" stopColor="#9a7434" />
              </linearGradient>
            </defs>
          </svg>
        </Emblem>
      </Brand>
    </Screen>
  );
}

const slideFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-110%);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
`;

const slideFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(110%);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spreadRule = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const Screen = styled.main`
  position: fixed;
  inset: 0;
  z-index: 1000001;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaneBase = styled.img`
  position: absolute;
  top: 50%;
  height: auto;
  max-height: 90vh;
  z-index: 1;
  pointer-events: none;
  user-select: none;
`;

const LeftWing = styled(PlaneBase)`
  left: 0;
  width: clamp(260px, 48vw, 780px);
  animation: ${slideFromLeft} 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (min-width: 1100px) and (max-width: 1600px) {
    width: clamp(300px, 30vw, 460px);
  }

  @media (max-width: 1099px) {
    width: clamp(380px, 75vw, 680px);
    top: 22%;
    left: 0;
  }

  @media (max-width: 480px) {
    width: clamp(420px, 100vw, 480px);
    top: 18%;
    left: calc(40vw - 210px);
  }
`;

const RightWing = styled(PlaneBase)`
  right: 0;
  width: clamp(260px, 48vw, 780px);
  animation: ${slideFromRight} 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (min-width: 1100px) and (max-width: 1600px) {
    width: clamp(300px, 30vw, 460px);
  }

  @media (max-width: 1099px) {
    width: clamp(380px, 75vw, 680px);
    top: 75%;
    right: 0;
  }

  @media (max-width: 480px) {
    width: clamp(420px, 100vw, 480px);
    top: 78%;
    right: auto;
    left: calc(60vw - 210px);
  }
`;

const Brand = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 1.5s ease both;
  animation-delay: 0s;
  opacity: 0;
  animation-fill-mode: forwards;
  padding: 0 clamp(12px, 4vw, 32px);
  gap: 0;
`;

const WordmarkFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 6px;
`;

const Rule = styled.div`
  width: clamp(160px, 30vw, 320px);
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #b8995a 30%, #e8d4a0 50%, #b8995a 70%, transparent 100%);
  transform-origin: center;
  transform: scaleX(0);
  will-change: transform;
  backface-visibility: hidden;
  animation: ${spreadRule} 1.1s ease-out forwards;
  animation-delay: 1s;
`;

const Wordmark = styled.h1`
  margin: 0;
  font-family: var(--font-nasalization), var(--font-mulish), sans-serif;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
  line-height: 1.2;
  font-size: clamp(32px, 5vw, 60px);
  letter-spacing: clamp(10px, 2.5vw, 36px);
`;

const Tagline = styled.p`
  margin: clamp(8px, 1.2vw, 16px) 0 0;
  font-family: var(--font-mulish), sans-serif;
  font-weight: 400;
  color: #d7d0c5;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: clamp(6px, 1vw, 12px);

  font-size: clamp(9px, 1.1vw, 13px);
  letter-spacing: clamp(3px, 0.8vw, 8px);

  span {
    color: #b8995a;
    font-size: 0.85em;
    letter-spacing: 0;
  }
`;

const Coming = styled.p`
  margin: clamp(10px, 1.8vw, 22px) 0 0;
  font-family: var(--font-playfair-display), serif;
  font-weight: 600;
  font-style: italic;
  white-space: nowrap;
  background: linear-gradient(180deg, #f6e6c4 0%, #cda968 55%, #9a7434 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #cda968;

  font-size: clamp(14px, 2.2vw, 32px);
  letter-spacing: clamp(4px, 0.8vw, 10px);
  text-indent: clamp(4px, 0.8vw, 10px);
`;

const Emblem = styled.div`
  margin-top: clamp(10px, 1.5vw, 18px);
  width: clamp(36px, 5vw, 56px);
  opacity: 0.9;

  svg {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 0 6px rgba(205, 169, 104, 0.4));
  }
`;

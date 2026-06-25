"use client";

import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const PHOTO = "/image/luxera/new.png";

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
      <Glint aria-hidden="true" />
      <Vignette aria-hidden="true" />
      <Photo aria-hidden="true" />

      <Brand>
        <Wordmark>LUXERA</Wordmark>
        <Tagline>
          <span>—</span> PRIVATE AVIATION <span>—</span>
        </Tagline>
        <Coming>COMING SOON</Coming>
      </Brand>
    </Screen>
  );
}

const glintSweep = keyframes`
  0%, 3%   { -webkit-mask-position: -40% 0; mask-position: -40% 0; opacity: 0; }
  12%      { opacity: 1; }
  44%      { opacity: 1; }
  56%      { -webkit-mask-position: 140% 0; mask-position: 140% 0; opacity: 0; }
  100%     { -webkit-mask-position: 140% 0; mask-position: 140% 0; opacity: 0; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Screen = styled.main`
  position: fixed;
  inset: 0;
  z-index: 1000001;
  overflow: hidden;
  background-color: #000;
  background-image: url(${PHOTO});
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: calc(max(34.25vw, 72.87vh) + clamp(8px, 1.5vw, 28px));
  @media (max-width: 1199px) {
    background-size: max(80vw, 170.21vh) auto;
    padding-left: calc(max(27.4vw, 58.3vh) + clamp(8px, 1.5vw, 28px));
  }

  @media (orientation: portrait) {
    background-size: contain;
    background-position: center 22%;
    justify-content: center;
    align-items: flex-end;
    padding-left: 0;
  }

  @media (orientation: portrait) and (max-width: 799px) {
    background-image: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(28px, 6vh, 64px);
    padding: 0 ;
  }
`;

const Glint = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;

  background-image: url(${PHOTO});
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  filter: brightness(2.5) saturate(1.45) contrast(1.05);

  --band: linear-gradient(
    100deg,
    transparent 30%,
    rgba(0, 0, 0, 0.35) 42%,
    rgba(0, 0, 0, 0.85) 48%,
    #000 50%,
    rgba(0, 0, 0, 0.85) 52%,
    rgba(0, 0, 0, 0.35) 58%,
    transparent 70%
  );
  -webkit-mask-image: var(--band);
  mask-image: var(--band);
  -webkit-mask-size: 250% 100%;
  mask-size: 250% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: -40% 0;
  mask-position: -40% 0;

  opacity: 0;
  will-change: mask-position, opacity;
  animation: ${glintSweep} 6.5s cubic-bezier(0.45, 0, 0.3, 1) 1.2s infinite;

  @media (max-width: 1199px) {
    background-size: max(80vw, 170.21vh) auto;
  }

  @media (orientation: portrait) {
    background-size: contain;
    background-position: center 22%;
  }

  @media (orientation: portrait) and (max-width: 799px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: radial-gradient(
    130% 100% at 70% 50%,
    transparent 40%,
    rgba(0, 0, 0, 0.55) 100%
  );
`;

const Photo = styled.div`
  display: none;

  @media (orientation: portrait) and (max-width: 799px) {
    display: block;
    position: relative;
    z-index: 2;
    overflow: hidden;
    width: 100%;
    height: clamp(220px, 40vh, 380px);
    background-image: url(${PHOTO});
    background-size: cover;
    background-position: left center;
    background-repeat: no-repeat;

    --band: linear-gradient(
      100deg,
      transparent 30%,
      rgba(0, 0, 0, 0.35) 42%,
      rgba(0, 0, 0, 0.85) 48%,
      #000 50%,
      rgba(0, 0, 0, 0.85) 52%,
      rgba(0, 0, 0, 0.35) 58%,
      transparent 70%
    );

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: url(${PHOTO});
      background-size: cover;
      background-position: left center;
      background-repeat: no-repeat;
      filter: brightness(2.5) saturate(1.45) contrast(1.05);
      -webkit-mask-image: var(--band);
      mask-image: var(--band);
      -webkit-mask-size: 250% 100%;
      mask-size: 250% 100%;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: -40% 0;
      mask-position: -40% 0;
      opacity: 0;
      will-change: mask-position, opacity;
      animation: ${glintSweep} 6.5s cubic-bezier(0.45, 0, 0.3, 1) 1.2s infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      &::after {
        animation: none;
      }
    }
  }
`;

const Brand = styled.div`
  position: relative;
  z-index: 4;
  flex: 1 1 0;
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 clamp(20px, 4vw, 60px);

  @media (orientation: portrait) {
    flex: 0 0 auto;
    width: 100%;
    margin-right: 0;
    margin-bottom: clamp(48px, 16vh, 180px);
  }

  @media (orientation: portrait) and (max-width: 799px) {
    margin-bottom: 0;
  }
`;

const Wordmark = styled.h1`
  margin: 0;
  font-family: var(--font-nasalization), var(--font-mulish), sans-serif;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
  line-height: 1.2;
  font-size: clamp(34px, 5vw, 62px);
  letter-spacing: clamp(10px, 2.5vw, 34px);
  text-indent: clamp(10px, 2.5vw, 34px);
  text-shadow: 0 0 18px rgba(246, 230, 196, 0.18);

  opacity: 0;
  animation: ${fadeUp} 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;

  @media (max-width: 1199px) {
    font-size: 50px;
    letter-spacing: 15px;
    text-indent: 15px;
  }

  @media (orientation: portrait) {
    font-size: clamp(34px, 11vw, 58px);
    letter-spacing: clamp(8px, 3.5vw, 26px);
    text-indent: clamp(8px, 3.5vw, 26px);
  }
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
  font-size: clamp(11px, 1.1vw, 13px);
  letter-spacing: clamp(3px, 0.8vw, 7px);
  text-indent: clamp(3px, 0.8vw, 7px);

  opacity: 0;
  animation: ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) 0.55s forwards;

  span {
    color: #b8995a;
    font-size: 0.85em;
    letter-spacing: 0;
    text-indent: 0;
  }

  @media (max-width: 1199px) {
    font-size: 12px;
    letter-spacing: 2px;
    text-indent: 2px;
  }

  @media (orientation: portrait) {
    font-size: clamp(10px, 2.2vw, 14px);
    letter-spacing: clamp(3px, 1vw, 7px);
    text-indent: clamp(3px, 1vw, 7px);
  }
`;

const Coming = styled.p`
  margin: clamp(12px, 2vw, 26px) 0 0;
  font-family: var(--font-playfair-display), serif;
  font-weight: 600;
  font-style: italic;
  white-space: nowrap;
  background: linear-gradient(180deg, #f6e6c4 0%, #cda968 55%, #9a7434 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #cda968;
  font-size: clamp(18px, 2.4vw, 34px);
  letter-spacing: clamp(4px, 0.9vw, 11px);
  text-indent: clamp(4px, 0.9vw, 11px);

  opacity: 0;
  animation: ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) 0.9s forwards;

  @media (max-width: 1199px) {
    font-size: 21px;
    letter-spacing: 6px;
    text-indent: 6px;
  }

  @media (orientation: portrait) {
    font-size: clamp(16px, 4.6vw, 28px);
    letter-spacing: clamp(4px, 1.4vw, 11px);
    text-indent: clamp(4px, 1.4vw, 11px);
  }
`;

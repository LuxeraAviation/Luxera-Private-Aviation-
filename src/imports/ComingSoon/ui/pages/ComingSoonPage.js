"use client";

import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const HERO = "/image/luxera/gold_plane_tight.webp";
const HERO_WIDE = "/image/luxera/gold_plane.webp";

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
      <PlaneWide>
        <WideImg src={HERO_WIDE} alt="LUXERA private jet" />
      </PlaneWide>

      <PlaneStacked>
        <StackedImg src={HERO} alt="LUXERA private jet" />
      </PlaneStacked>

      <Brand>
        <Wordmark>LUXERA</Wordmark>
        <Tagline>PRIVATE AVIATION</Tagline>
        <Coming>COMING SOON</Coming>
      </Brand>
    </Screen>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Screen = styled.main`
  position: fixed;
  inset: 0;
  z-index: 1000001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
  background: #000;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 560px) {
    padding: 16px 0;
  }

  @media (min-width: 1100px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 48px 64px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.55) 100%
    );

    @media (min-width: 1100px) {
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.25) 38%,
        rgba(0, 0, 0, 0) 62%
      );
    }
  }
`;

const PlaneWide = styled.div`
  display: none;
  @media (min-width: 1100px) {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 0;
  }
`;

const WideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
`;

const PlaneStacked = styled.div`
  display: block;
  position: absolute;
  inset: 0;
  z-index: 0;
  @media (min-width: 1100px) {
    display: none;
  }
`;

const StackedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
`;

const Brand = styled.div`
  position: absolute;
  bottom: 18vh;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 100%;
  animation: ${fadeIn} 1.2s ease both;

  @media (max-width: 560px) {
    bottom: 24vh;
  }

  @media (min-width: 1100px) {
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    align-items: flex-start;
    text-align: left;
    margin-top: 0;
  }
`;

const Wordmark = styled.h1`
  margin: 0;
  max-width: 100%;
  font-family: var(--font-nasalization), var(--font-mulish), sans-serif;
  font-weight: 400;
  color: #fff;
  font-size: 65px;
  letter-spacing: 30px;
  line-height: 1;
  white-space: nowrap;

  @media (max-width: 900px) {
    font-size: 50px;
    letter-spacing: 20px;
  }
`;

const Tagline = styled.p`
  margin: clamp(8px, 1.4vw, 15px) 0 0;
  max-width: 100%;
  font-family: var(--font-mulish), sans-serif;
  font-weight: 400;
  color: #d7d0c5;
  font-size: 12px;
  letter-spacing: 5px;
  text-indent: 5px;
  white-space: nowrap;
`;

const Coming = styled.p`
  margin: clamp(16px, 2.9vw, 25px) 0 0;
  max-width: 100%;
  font-family: var(--font-playfair-display), serif;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: clamp(4px, 0.65vw, 7px);
  text-indent: clamp(4px, 0.65vw, 7px);
  white-space: nowrap;
  background: linear-gradient(180deg, #f6e6c4 0%, #cda968 55%, #9a7434 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #cda968;


`;

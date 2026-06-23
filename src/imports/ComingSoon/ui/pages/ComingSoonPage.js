"use client";

import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const HERO = "/image/luxera/final.webp";

export default function ComingSoonPage() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <Screen>
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
  background-color: #000;
  background-image: url(${HERO});
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding-left: clamp(32px, 12vw, 230px);

  @media (max-width: 860px) {
    background-position: center center;
    justify-content: center;
    align-items: flex-end;
    padding: 0 24px clamp(56px, 14vh, 120px);
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 40%,
        rgba(0, 0, 0, 0.78) 100%
      );
      pointer-events: none;
    }
  }
`;

const Brand = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 1.2s ease both;
`;

const Wordmark = styled.h1`
  margin: 0;
  font-family: var(--font-mulish), sans-serif;
  font-weight: 500;
  color: #f3f1ee;
  font-size: clamp(2.6rem, 7vw, 5.4rem);
  letter-spacing: clamp(0.5rem, 1.6vw, 1.1rem);
  text-indent: clamp(0.5rem, 1.6vw, 1.1rem);
  line-height: 1;
  text-shadow: 0 2px 34px rgba(0, 0, 0, 0.6);
`;

const Tagline = styled.p`
  margin: clamp(10px, 1.4vw, 16px) 0 0;
  font-family: var(--font-mulish), sans-serif;
  font-weight: 400;
  color: #d7d0c5;
  font-size: clamp(0.7rem, 1.6vw, 1.15rem);
  letter-spacing: clamp(0.32rem, 1.1vw, 0.78rem);
  text-indent: clamp(0.32rem, 1.1vw, 0.78rem);
`;

const Coming = styled.p`
  margin: clamp(26px, 3.6vw, 48px) 0 0;
  font-family: var(--font-playfair-display), serif;
  font-weight: 600;
  font-size: clamp(1.3rem, 3.4vw, 2.5rem);
  letter-spacing: clamp(0.18rem, 0.9vw, 0.5rem);
  text-indent: clamp(0.18rem, 0.9vw, 0.5rem);
  background: linear-gradient(180deg, #f6e6c4 0%, #cda968 55%, #9a7434 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #cda968;
`;

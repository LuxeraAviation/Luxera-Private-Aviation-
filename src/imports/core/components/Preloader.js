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
      <Spinner>
        <span>Luxera</span>
      </Spinner>
    </PreloaderWrap>
  );
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const PreloaderWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
  transition: opacity 0.6s ease, visibility 0.6s ease;

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`;

const Spinner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;

  span {
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 18px;
    color: ${({ theme }) => theme.heading};
    letter-spacing: 1px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.border};
    border-top-color: ${({ theme }) => theme.base};
    animation: ${spin} 1s linear infinite;
  }
`;

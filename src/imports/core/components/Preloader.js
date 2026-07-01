"use client";

import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import styled, { css } from "styled-components";
import animationData from "@/imports/core/components/loaderAnimation.json";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    const t = setTimeout(() => setHidden(true), 1200);
    return () => {
      clearTimeout(t);
      anim.destroy();
    };
  }, []);

  return (
    <PreloaderWrap $hidden={hidden} aria-hidden>
      <LottieBox ref={containerRef} />
    </PreloaderWrap>
  );
}

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

const LottieBox = styled.div`
  width: 200px;
  height: 200px;

  @media (max-width: 767px) {
    width: 160px;
    height: 160px;
  }
`;

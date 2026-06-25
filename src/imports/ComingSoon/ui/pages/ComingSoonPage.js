"use client";

import { useEffect } from "react";
import styled from "styled-components";
const VIDEO = "/image/luxera/coming_soon.mp4";

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
      <Video src={VIDEO} autoPlay muted loop playsInline preload="auto" />
    </Screen>
  );
}

const Screen = styled.main`
  position: fixed;
  inset: 0;
  z-index: 1000001;
  overflow: hidden;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video`
  /* Always full width (never cropped left/right); height follows the video's
     aspect ratio, so black fills the top/bottom on taller viewports. */
  width: 100%;
  height: auto;
  display: block;
  background-color: #000;
`;

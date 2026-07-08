"use client";

import styled from "styled-components";
import { fs150 } from "@/styles/typography";
import { VIDEO_BLOCK } from "@/imports/core/constants/homepage";

export default function VideoBlock() {
  return (
    <Block>
      <Bg>
        <BgVideo
          src={VIDEO_BLOCK.videoUrl}
          poster={VIDEO_BLOCK.bg}
          autoPlay
          muted
          loop
          playsInline
        />
      </Bg>
      <Overlay />
      <Title>
        {VIDEO_BLOCK.title.split("").map((char, index) => (
          <Letter key={index} $delay={index * 0.1}>
            {char}
          </Letter>
        ))}
      </Title>
    </Block>
  );
}

const Block = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 250px 0 300px;
  background: ${({ theme }) => theme.heading};
  overflow: hidden;

  @media (max-width: 1199px) {
    padding: 210px 0 250px;
  }

  @media (max-width: 991px) {
    padding: 170px 0 200px;
  }

  @media (max-width: 767px) {
    padding: 130px 0 150px;
  }

  @media (max-width: 480px) {
    padding: 100px 0 120px;
  }
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.5;
  img {
    object-fit: cover;
    object-position: left center;
  }
`;

const BgVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(27, 27, 27, 0.05);
`;

const Title = styled.h2`
  position: relative;
  z-index: 3;
  color: ${({ theme }) => theme.white};
  margin: 0;
  letter-spacing: 4px;
  text-align: center;
  ${fs150}

  @media (max-width: 1199px) {
    font-size: 96px;
  }

  @media (max-width: 991px) {
    font-size: 64px;
    letter-spacing: 3px;
  }

  @media (max-width: 767px) {
    font-size: 52px;
    letter-spacing: 2px;
  }

  @media (max-width: 480px) {
    font-size: 42px;
    letter-spacing: 1px;
  }
`;

const Letter = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  animation: revealLetter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${({ $delay }) => $delay}s;

  @keyframes revealLetter {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
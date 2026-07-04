"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { fs150 } from "@/styles/typography";
import { VIDEO_BLOCK } from "@/imports/core/constants/homepage";

export default function VideoBlock() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block onClick={() => setOpen(true)} aria-label="Play video">
        <Bg>
          <Image src={VIDEO_BLOCK.bg} alt="" fill sizes="100vw" />
        </Bg>
        <Overlay />
        <Title>{VIDEO_BLOCK.title}</Title>
        <Play>
          <i className="fa-solid fa-play" />
        </Play>
      </Block>

      {open && (
        <Modal onClick={() => setOpen(false)}>
          <ModalInner onClick={(e) => e.stopPropagation()}>
            <Close onClick={() => setOpen(false)} aria-label="Close">
              <i className="fa-solid fa-xmark" />
            </Close>
            <video
              src={VIDEO_BLOCK.videoUrl}
              title="Video"
              autoPlay
              controls
              playsInline
            />
          </ModalInner>
        </Modal>
      )}
    </>
  );
}

const Block = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 250px 0 300px 20%;
  background: ${({ theme }) => theme.heading};
  overflow: hidden;

  @media (max-width: 1199px) {
    padding: 210px 0 250px 22%;
  }

  @media (max-width: 991px) {
    padding: 170px 0 200px 30%;
  }

  @media (max-width: 767px) {
    padding: 130px 0 150px 40%;
  }

  @media (max-width: 480px) {
    padding: 100px 0 120px 44%;
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

const Play = styled.span`
  position: absolute;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.white};
  font-size: 26px;

  @media (max-width: 991px) {
    width: 64px;
    height: 64px;
    font-size: 20px;
  }

  @media (max-width: 767px) {
    width: 54px;
    height: 54px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalInner = styled.div`
  position: relative;
  width: min(900px, 100%);
  aspect-ratio: 16 / 9;

  iframe,
  video {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 6px;
    background: #000;
    object-fit: contain;
  }
`;

const Close = styled.button`
  position: absolute;
  top: -46px;
  right: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.dark};
  font-size: 18px;
  cursor: pointer;
`;

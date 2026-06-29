"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

export default function GalleryGrid({ items = [], columns = 4 }) {
  const [index, setIndex] = useState(-1);
  const open = index >= 0;

  const close = useCallback(() => setIndex(-1), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  return (
    <>
      <Grid $columns={columns}>
        {items.map((item, i) => (
          <Item key={item.image + i} onClick={() => setIndex(i)}>
            <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 50vw, 25vw" />
            <Hover>
              <span>{item.label}</span>
            </Hover>
          </Item>
        ))}
      </Grid>

      {open && (
        <Lightbox onClick={close}>
          <Nav onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" style={{ left: 20 }}>
            <i className="fa-solid fa-chevron-left" />
          </Nav>
          <Frame onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[index].image}
              alt={items[index].label}
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto" }}
            />
          </Frame>
          <Nav onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" style={{ right: 20 }}>
            <i className="fa-solid fa-chevron-right" />
          </Nav>
          <CloseBtn onClick={close} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </CloseBtn>
        </Lightbox>
      )}
    </>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: 4px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.button`
  position: relative;
  border: none;
  padding: 0;
  cursor: pointer;
  aspect-ratio: 3 / 4;
  overflow: hidden;

  img {
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

const Hover = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.overlay};
  opacity: 0;
  transition: opacity 0.4s ease;

  span {
    color: ${({ theme }) => theme.white};
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 32px;
    transform: translateY(10px);
    transition: transform 0.4s ease;
  }

  ${Item}:hover & {
    opacity: 1;
    span {
      transform: translateY(0);
    }
  }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const Frame = styled.div`
  max-width: 900px;
  width: 100%;
`;

const Nav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);  
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.base};
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.white};
  color: #000;
  font-size: 20px;
  cursor: pointer;
`;

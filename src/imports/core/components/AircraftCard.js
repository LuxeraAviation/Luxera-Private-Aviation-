"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { fs50 } from "@/styles/typography";

export default function AircraftCard({ room }) {
  // const href = `/aircraft?aircraft=${room.slug}`;
  const href = "#";
  return (
    <Card>
      <Thumb href={href}>
        <Image src={room.image} alt={room.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
      </Thumb>
      <Info>
        <Title>
          <Link href={href}>{room.title}</Link>
        </Title>
        <Price>
          <span className="from">From</span>
          <span className="amount">{room.price}</span>
        </Price>
        <Features>
          {room.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </Features>
        <GoBtn href={href} aria-label={`View ${room.title}`}>
          <i className="fa-solid fa-chevron-right" />
        </GoBtn>
      </Info>
    </Card>
  );
}

const Card = styled.div`
  height: 100%;
`;

const Thumb = styled(Link)`
  position: relative;
  display: block;
  border-radius: 5px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.heading};

  img {
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

const Info = styled.div`
  position: relative;
  padding-top: 26px;
`;

const Title = styled.h2`
  ${fs50}
  margin: 0 0 4px;

  a:hover {
    color: ${({ theme }) => theme.base};
  }
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 17px;

  .from {
    color: ${({ theme }) => theme.heading};
  }

  .amount {
    color: ${({ theme }) => theme.base};
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 30px;
  }
`;

const Features = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;

  li {
    position: relative;
    padding-left: 18px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${({ theme }) => theme.base};
    }
  }
`;

const GoBtn = styled(Link)`
  position: absolute;
  right: 0;
  top: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.heading};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.base};
    border-color: ${({ theme }) => theme.base};
    color: ${({ theme }) => theme.white};
  }
`;

"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import ArrowButton from "@/imports/core/components/ArrowButton";
import { fs38 } from "@/styles/typography";

export default function OfferingCard({
  image,
  title,
  desc,
  href = "#",
  meta,
  cta = "Learn More",
}) {
  return (
    <Card>
      <Thumb href={href}>
        <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" />
        <HoverIcon>
          <i className="fa-solid fa-arrow-up-right-from-square" />
        </HoverIcon>
      </Thumb>
      <Info>
        {meta && (
          <Meta>
            {meta.author && <span>By {meta.author}</span>}
            {meta.author && meta.date && <Sep />}
            {meta.date && <span>{meta.date}</span>}
          </Meta>
        )}
        <Title>
          <Link href={href}>{title}</Link>
        </Title>
        {desc && <Desc>{desc}</Desc>}
        <ArrowButton href={href}>{cta}</ArrowButton>
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
  aspect-ratio: 585 / 450;
  margin-bottom: 29px;

  img {
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

const HoverIcon = styled.span`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.base};
  opacity: 0;
  transform: scale(0.6);
  transition: all 0.4s ease;
  z-index: 2;

  ${Thumb}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`;

const Info = styled.div``;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Sep = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.base};
`;

const Title = styled.h2`
  ${fs38}
  margin: 0 0 19px;

  a:hover {
    color: ${({ theme }) => theme.base};
  }
`;

const Desc = styled.p`
  margin: 0 0 36px;
`;

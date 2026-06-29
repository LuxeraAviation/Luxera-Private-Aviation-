"use client";

import Image from "next/image";
import styled from "styled-components";
import { SOCIALS } from "@/imports/core/constants/crew";

export default function CrewCard({ member }) {
  return (
    <Card>
      <ImgWrap>
        <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
        <Social>
          {SOCIALS.map((s) => (
            <a key={s.icon} href={s.url} aria-label="social">
              <i className={s.icon} />
            </a>
          ))}
        </Social>
      </ImgWrap>
      <Name>{member.name}</Name>
      <Role>{member.role}</Role>
    </Card>
  );
}

const Card = styled.div`
  text-align: center;
`;

const Social = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 18px;
  display: flex;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.4s ease;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.heading};
    transition: all 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.base};
      color: ${({ theme }) => theme.white};
    }
  }
`;

const ImgWrap = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  aspect-ratio: 3 / 3.5;
  margin-bottom: 29px;

  img {
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover ${Social} {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Name = styled.h3`
  font-size: 28px;
  margin: 0 0 7px;
`;

const Role = styled.p`
  margin: 0;
`;

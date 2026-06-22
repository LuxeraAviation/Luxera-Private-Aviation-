"use client";

import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/styles/Theme";
import Link from "next/link";

export default function TeamCard({
  image,
  name,
  designation,
  href = "#0",
  socials = [],
}) {
  return (
    <TeamItem>
      <TeamThumb>
        <Image
          src={image}
          alt={name}
          width={370}
          height={360}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </TeamThumb>

      <TeamContent>
        <Title>
          <TitleLink href={href}>{name}</TitleLink>
        </Title>
        <SubTitle>{designation}</SubTitle>
      </TeamContent>

      {socials.length > 0 && (
        <TeamSocialArea>
          <TeamSocial>
            {socials.map((s, i) => (
              <SocialItem key={i}>
                <SocialLink
                  href={s.href || "#0"}
                  $active={s.active}
                  aria-label={`${name} social link`}
                >
                  <SocialIcon className={s.icon} />
                </SocialLink>
              </SocialItem>
            ))}
          </TeamSocial>
        </TeamSocialArea>
      )}
    </TeamItem>
  );
}

const TeamSocialArea = styled.div`
  position: absolute;
  top: 0;
  right: -100%;
  background-color: ${theme.soft};
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
`;

const TeamItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 5px;

  &:hover ${TeamSocialArea} {
    right: 0;
  }
`;

const TeamThumb = styled.div`
  background-color: #dde6ef;
  text-align: center;
  aspect-ratio: 370 / 360;
  overflow: hidden;
`;

const TeamContent = styled.div`
  background-color: ${theme.soft};
  padding: 20px;
  text-align: center;
`;

const Title = styled.h3`
  font-family: ${theme.fonts.mulish};
  font-weight: 800;
  font-size: 22px;
  margin: 0 0 6px;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const TitleLink = styled(Link)`
  color: ${theme.dark};
  text-decoration: none;
  transition: all 0.5s;

  &:hover {
    color: ${theme.base};
  }
`;

const SubTitle = styled.span`
  display: block;
  color: ${theme.dark};
  font-style: italic;
  font-weight: 700;
`;

const TeamSocial = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SocialItem = styled.li`
  display: block;

  & + & {
    margin-top: 8px;
  }
`;

const SocialIcon = styled.i``;

const SocialLink = styled.a`
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid rgba(220, 187, 135, 0.5);
  font-size: 12px;
  text-decoration: none;
  transition: all 0.3s;
  background: ${({ $active }) => ($active ? theme.base : "transparent")};
  color: ${({ $active }) => ($active ? theme.white : theme.base)};

  &:hover {
    color: ${theme.white};
    background-color: ${theme.base};
  }
`;

"use client";

import Image from "next/image";
import styled from "styled-components";
import { theme, Reveal, waves, floatY } from "@/styles/Theme";
import Link from "next/link";

export default function About() {
  return (
    <AboutSection>
      <Container>
        <AboutRow>
          <Reveal variant="fade-right" duration={1200}>
            <SubTitle>
              <SubTitleText>About</SubTitleText> Luxera
            </SubTitle>
            <Title>
              Private Jet Charters save your time and give more comfort
            </Title>
            <Description>
              Luxera is the only way to fully travel on your terms. Whether
              it&apos;s accessing a remote destination or taking back control of
              productivity and flight scheduling.
            </Description>
            <BookArea>
              <BookLeft>
                <CallTitle>Call for book an order</CallTitle>
                <Call>
                  <CallLink href="tel:8-800-10-500">8-800-10-500</CallLink>
                </Call>
              </BookLeft>
              <BtnBase href="#0">
                <BtnIcon src="/image/fav.png" alt="" width={39} height={32} />{" "}
                Book Now
              </BtnBase>
            </BookArea>
          </Reveal>
          <ElementImg
            src="/image/element/element-8.png"
            alt=""
            width={243}
            height={315}
          />

          <ThumbVideo variant="zoom-in" duration={1200}>
            <VideoMain>
              <Wave />
              <Wave $delay={1} />
              <Wave $delay={2} />
              <VideoIcon href="">
                <PlayIconEl className="fas fa-play" />
              </VideoIcon>
            </VideoMain>
          </ThumbVideo>
        </AboutRow>
      </Container>
    </AboutSection>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
  @media (max-width: 1200px) {
    max-width: 960px;
  }
  @media (max-width: 991px) {
    max-width: 720px;
  }
  @media (max-width: 767px) {
    max-width: 560px;
  }
`;

const Section = styled.section`
  padding: 120px 0;
  position: relative;
  @media (max-width: 767px) {
    padding: 70px 0;
  }
`;

const BtnBase = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${theme.base};
  border: 1px solid ${theme.base};
  color: ${theme.dark};
  padding: 12px 25px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background: transparent;
    color: ${theme.base};
    border-color: ${theme.base};
  }
`;

const BtnIcon = styled(Image)`
  width: 18px;
  height: auto;
  filter: brightness(0);
`;

const VideoMain = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
`;

const Wave = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  margin-left: -35px;
  margin-top: -35px;
  border-radius: 50%;
  background: rgba(220, 187, 135, 0.2);
  border: 1px solid ${theme.base};
  animation: ${waves} 3s ease-out infinite;
  animation-delay: ${({ $delay }) => $delay || 0}s;
`;

const VideoIcon = styled.a`
  position: relative;
  z-index: 2;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  text-decoration: none;
  background: ${theme.base}33;
  color: ${theme.base};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

const AboutSection = styled(Section)`
  background:
    linear-gradient(
      90deg,
      rgba(20, 30, 40, 0.98) 0%,
      rgba(20, 30, 40, 0.92) 25%,
      rgba(20, 30, 40, 0.55) 55%,
      rgba(20, 30, 40, 0.25) 80%,
      rgba(20, 30, 40, 0.15) 100%
    ),
    url("/image/demo/plane.webp") center/cover no-repeat;
  color: #fff;
`;

const AboutRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: center;
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const SubTitle = styled.span`
  color: ${theme.base};
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  span {
    color: #fff;
  }
  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-family: ${theme.fonts.playfair};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;

  margin: 20px 0;
  @media (max-width: 991px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255);
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 15;
  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

const BookArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #fff url("/image/element/element-7.png") center/cover no-repeat;
  border-radius: 5px;
  margin-top: 60px;
  padding: 30px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  width: 80%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 5px;
    background: ${theme.base};
  }

  @media (max-width: 1200px) {
    padding: 22px;
    width: 100%;
  }
`;

const BookLeft = styled.div``;

const CallTitle = styled.h3`
  color: ${theme.dark};
  font-family: ${theme.fonts.playfair};
  font-weight: 800;
  font-size: 22px;
  margin: 0 0 15px 0;
`;

const Call = styled.span`
  display: inline-block;
`;

const CallLink = styled.a`
  color: ${theme.dark};
  font-weight: 800;
  font-size: 22px;
  text-decoration: none;

  &:hover {
    color: ${theme.base};
  }
`;

const ThumbVideo = styled(Reveal)`
  position: relative;
  display: flex;
  justify-content: center;
  top: 25%;
`;

const ElementImg = styled(Image)`
  position: absolute;
  right: 0;
  top: 25%;
  transform: translateY(-50%);
  max-width: 100%;
  height: auto;
  z-index: 1;
  animation: ${floatY} 3s ease-in-out infinite;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const SubTitleText = styled.span`
  color: #fff;
`;

const PlayIconEl = styled.i``;

"use client";

import { useState } from "react";
import styled from "styled-components";
import { theme, Reveal, waves } from "@/styles/Theme";
import Image from "next/image";
import Link from "next/link";
import Container from "@/imports/core/atom/Container";
import { ABOUT_DETAIL } from "@/imports/core/constants/aboutus";
import PlayIcon from "@/imports/core/assets/PlayIcon";
import CheckIcon from "@/imports/core/assets/CheckIcon";
import ArrowRightIcon from "@/imports/core/assets/ArrowRightIcon";

export default function AboutUsDetail() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <DetailSection>
      <StyledContainer>
        <AboutGrid>
          <AboutColumn>
            <Reveal variant="fade-right" duration={1200}>
              <AboutThumb>
                <Image
                  src="/image/about-two.png"
                  alt="about us"
                  width={653}
                  height={607}
                  priority
                  style={{ width: "100%", height: "auto" }}
                />
                <AboutElementTwo>
                  <Image
                    src="/image/element/element-15.png"
                    alt="element decorative"
                    width={500}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                  />
                </AboutElementTwo>
                <AboutVideoWrapper>
                  <VideoMain>
                    <Wave $delay="0s" />
                    <Wave $delay="1s" />
                    <Wave $delay="2s" />
                    <PlayButton
                      onClick={() => setShowVideo(true)}
                      aria-label="Play video"
                    >
                      <PlayIcon />
                    </PlayButton>
                  </VideoMain>
                </AboutVideoWrapper>
              </AboutThumb>
            </Reveal>
          </AboutColumn>

          <AboutColumn>
            <Reveal variant="fade-left" duration={1200}>
              <AboutContent>
                <SubTitle>{ABOUT_DETAIL.subTitle}</SubTitle>
                <Title>{ABOUT_DETAIL.title}</Title>
                <Description>{ABOUT_DETAIL.description}</Description>

                <AboutBookArea>
                  <AboutBookElement>
                    <Image
                      src="/image/element/element-7.png"
                      alt=""
                      fill
                      sizes="100vw"
                      priority
                    />
                  </AboutBookElement>
                  <AboutBookLeft>
                    <CallTitle>{ABOUT_DETAIL.bookArea.title}</CallTitle>
                    <CallNumber>
                      <PhoneLink href={ABOUT_DETAIL.bookArea.phoneHref}>
                        {ABOUT_DETAIL.bookArea.phone}
                      </PhoneLink>
                    </CallNumber>
                  </AboutBookLeft>
                  <AboutBookRight>
                    <BookBtn href={ABOUT_DETAIL.bookArea.btnHref}>
                      <Image
                        src="/image/fav.png"
                        alt="Book Icon"
                        width={19}
                        height={19}
                      />{" "}
                      {ABOUT_DETAIL.bookArea.btnText}
                    </BookBtn>
                  </AboutBookRight>
                </AboutBookArea>

                <AboutListArea>
                  <AboutList>
                    {ABOUT_DETAIL.list.map((item) => (
                      <AboutListItem key={item}>
                        <CheckIcon /> {item}
                      </AboutListItem>
                    ))}
                  </AboutList>
                </AboutListArea>

                <SubDescription>{ABOUT_DETAIL.subDescription}</SubDescription>

                <AboutFooterBtn>
                  <InfoBtn href={ABOUT_DETAIL.footerBtn.href}>
                    {ABOUT_DETAIL.footerBtn.text} <ArrowRightIcon />
                  </InfoBtn>
                </AboutFooterBtn>
              </AboutContent>
            </Reveal>
          </AboutColumn>
        </AboutGrid>
      </StyledContainer>

      {showVideo && (
        <VideoModal onClick={() => setShowVideo(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setShowVideo(false)}>
              <CloseMark>&#x00D7;</CloseMark>
            </CloseBtn>
            <StyledIframe
              src="#"
              title="FlyNext Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </ModalContent>
        </VideoModal>
      )}
    </DetailSection>
  );
}

const DetailSection = styled.section`
  padding: 120px 0;
  position: relative;
  background: #ffffff;
  color: ${theme.text};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 70px 0;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1140px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: -30px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const AboutColumn = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  position: relative;
`;

const AboutThumb = styled.div`
  position: relative;
  overflow: visible;
  z-index: 2;

  & > img {
    width: 100%;
    height: auto;
    border-radius: 0px;
    display: block;
  }
`;

const AboutElementTwo = styled.div`
  position: absolute;
  left: -10%;
  bottom: -10%;
  width: 90%;
  z-index: -1;

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const AboutVideoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const VideoMain = styled.div`
  position: relative;
  display: inline-block;
`;

const Wave = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border: 1px solid ${theme.base};
  opacity: 0;
  border-radius: 50%;
  right: -50px;
  bottom: -50px;
  z-index: -1;
  animation: ${waves} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || "0s"};
`;

const PlayButton = styled.button`
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ffffff;
  color: ${theme.base};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${theme.base};
    color: ${theme.dark};
  }

  svg {
    width: 1em;
    height: 1em;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.span`
  display: inline-block;
  color: ${theme.base};
  font-weight: 800;
  font-size: 20px;
  line-height: 1.2;
  margin-bottom: 15px;
  font-family: ${theme.fonts.mulish};
`;

const Title = styled.h2`
  color: ${theme.dark};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 10px;
  max-width: 480px;
  font-family: ${theme.fonts.playfair};

  @media (max-width: 768px) {
    font-size: 28px;
    max-width: 100%;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7em;
  margin-bottom: 0;
  font-family: ${theme.fonts.mulish};
  font-weight: 500;
  color: ${theme.text};
  width: 100%;
`;

const AboutBookArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(220, 187, 135, 0.5);
  width: 100%;
  padding: 20px 30px;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  z-index: 2;

  &::before {
    position: absolute;
    content: "";
    top: 50%;
    transform: translateY(-50%);
    left: -5px;
    width: 12px;
    height: 80px;
    background-color: ${theme.base};
    border-radius: 60px;
  }
`;

const AboutBookElement = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;

  img {
    object-fit: cover;
  }
`;

const AboutBookLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const CallTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  font-family: ${theme.fonts.playfair}, sans-serif;
  margin: 0;
  color: ${theme.dark};
  margin-bottom: 15px;
`;

const CallNumber = styled.span`
  @media only screen and (max-width: 991px) {
    margin-bottom: 20px;
    display: inline-block;
  }
`;

const PhoneLink = styled.a`
  font-weight: 700;
  color: ${theme.dark};
  font-size: 24px;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: ${theme.base};
  }

  @media only screen and (max-width: 991px) {
    font-size: 18px;
  }
`;

const AboutBookRight = styled.div``;

const BookBtn = styled(Link)`
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
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s ease;

  img {
    width: auto;
    height: 16px;
    transition: transform 0.5s;
    filter: brightness(0);
  }

  &:hover {
    background: transparent;
    color: ${theme.dark};
    border-color: ${theme.base};

    img {
      transform: scale(1.1);
    }
  }
`;

const AboutListArea = styled.div`
  margin-bottom: 20px;
`;

const AboutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1199px) {
    gap: 10px;
  }

  @media (max-width: 420px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const AboutListItem = styled.li`
  color: ${theme.dark};
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;

  svg {
    color: ${theme.base};
    margin-right: 5px;
    font-size: 16px;

    @media only screen and (max-width: 1199px) {
      margin-right: 2px;
    }
  }

  @media only screen and (max-width: 1199px) {
    font-size: 13px;
  }
`;

const SubDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 0;
  color: ${theme.text};
`;

const AboutFooterBtn = styled.div`
  margin-top: 30px;
`;

const InfoBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.dark};
  background: transparent;
  border: 1px solid ${theme.dark};
  padding: 12px 25px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.5s ease;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.base};
    border-radius: 999px;
    transform-origin: 100px 100px;
    transform: translate(-10px, -70px) scale(0.1);
    opacity: 0;
    z-index: -1;
    transition:
      transform 0.5s,
      opacity 0.5s,
      background-color 0.5s;
  }

  svg {
    font-size: 12px;
    color: ${theme.base};
    transition: all 0.5s ease;
  }

  &:hover {
    border-color: ${theme.base};
    color: ${theme.dark};

    &::after {
      opacity: 1;
      transform: translate(0, 0) scale(1);
      border-radius: 999px;
    }

    svg {
      color: ${theme.dark};
      transform: translateX(4px);
    }
  }
`;

const VideoModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: #fff;
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
  transition: color 0.3s;

  &:hover {
    color: ${theme.base};
  }
`;

const CloseMark = styled.span``;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

"use client";

import styled from "styled-components";
import Image from "next/image";
import {
  theme,
  Reveal,
  floatY,
  floatX,
  spinSlow,
  scale,
  imgAnimate,
} from "@/styles/Theme";
import elementOneImg from "@public/image/element/element-1.png";
import elementTwoImg from "@public/image/element/element-3.png";
import elementThreeImg from "@public/image/element/element-4.png";
import elementFourImg from "@public/image/element/element-5.png";
import thumbImg from "@public/image/element/element-2.png";

import {
  SOCIAL_LINKS,
  BANNER_BUTTONS,
} from "@/imports/core/constants/homepage";

export default function Banner() {
  return (
    <BannerSection>
      <ElementOne>
        <Image src={elementOneImg} alt="" />
      </ElementOne>
      <ElementTwo>
        <Image src={elementTwoImg} alt="" />
      </ElementTwo>
      <ElementThree>
        <Image src={elementThreeImg} alt="" />
      </ElementThree>
      <ElementFour>
        <Image src={elementFourImg} alt="" />
      </ElementFour>

      <BannerSocial>
        {SOCIAL_LINKS.map((social, idx) => (
          <SocialListItem key={idx}>
            <SocialLink href={social.url} $active={social.active}>
              <i className={social.iconClass} />
            </SocialLink>
          </SocialListItem>
        ))}
      </BannerSocial>

      <Container>
        <BannerRow>
          <BannerContent variant="fade-right" duration={1800}>
            <SubTitle>
              <SubTitleAccent>Fly</SubTitleAccent>next
            </SubTitle>
            <Title>Book a private jet instantly</Title>
            <Description>
              Curly Airline proudly raises the bar and exceeds the standard for
              luxury and corporate private jet charter services. We pride
              ourselves on offering a professional service.
            </Description>
            <BannerBtn>
              {BANNER_BUTTONS.map((btn, idx) => (
                <BtnBase key={idx} href={btn.url} $active={btn.active}>
                  {btn.iconPosition === "left" && (
                    <i className={btn.iconClass} />
                  )}
                  {btn.text}
                  {btn.iconPosition === "right" && (
                    <i className={btn.iconClass} />
                  )}
                </BtnBase>
              ))}
            </BannerBtn>
          </BannerContent>
          <BannerThumbWrapper>
            <BannerThumb>
              <Image src={thumbImg} alt="Private jet" />
            </BannerThumb>
          </BannerThumbWrapper>
        </BannerRow>
      </Container>
    </BannerSection>
  );
}

const BannerSection = styled.section`
  position: relative;
  background: ${theme.dark};
  padding: 295px 200px 235px;
  overflow: hidden;
  z-index: 9;

  @media (max-width: 1318px) {
    padding: 170px 40px 90px;
  }
  @media (max-width: 991px) {
    padding: 150px 30px 80px;
  }
  @media (max-width: 767px) {
    padding: 130px 20px 70px;
  }
  @media (max-width: 575px) {
    padding: 110px 15px 60px;
  }
`;

const BannerElement = styled.div`
  position: absolute;
  pointer-events: none;

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const ElementOne = styled(BannerElement)`
  top: 0;
  right: 0;
  z-index: -1;
`;

const ElementTwo = styled(BannerElement)`
  top: 34%;
  left: 30%;
  animation: ${floatY} 4s ease-in-out infinite;
`;

const ElementThree = styled(BannerElement)`
  top: 50%;
  left: 45%;
  animation: ${spinSlow} 8s linear infinite;
`;

const ElementFour = styled(BannerElement)`
  top: 83%;
  left: 25%;
  animation: ${floatX} 5s ease-in-out infinite;
`;

const BannerSocial = styled.ul`
  list-style: none;
  margin: 0;
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 3;

  &::before,
  &::after {
    content: "";
    width: 1px;
    height: 150px;
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 1599px) {
    left: 45px;
    &::before,
    &::after {
      height: 110px;
    }
  }
  @media (max-width: 1319px) {
    display: none;
  }
`;

const SocialListItem = styled.li`
  display: inline-block;
`;

const SocialLink = styled.a`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? theme.base : "transparent")};
  border: 1px solid
    ${({ $active }) => ($active ? theme.base : "rgba(255, 255, 255, 0.15)")};
  color: ${({ $active }) => ($active ? theme.dark : theme.base)};
  font-size: 12px;
  text-decoration: none;
  transition: all 0.35s ease;
  transform: ${({ $active }) => ($active ? "scale(1.18)" : "none")};

  &:hover {
    color: #fff;
    background: ${theme.base};
    border-color: ${theme.base};
    transform: scale(1.18);
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;

  @media (max-width: 991px) {
    padding: 0 10px;
  }
`;

const BannerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 1199px) {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 40px;
  }
  @media (max-width: 575px) {
    gap: 25px;
  }
`;

const BannerContent = styled(Reveal)`
  flex: 1 1 45%;
  min-width: 0;
`;

const BannerThumbWrapper = styled.div`
  flex: 1 1 55%;
  position: relative;
  min-width: 0;

  @media (max-width: 1199px) {
    flex: none;
    width: 100%;
  }
`;

const BannerThumb = styled.div`
  position: absolute;
  left: -90px;
  bottom: -300px;
  width: 125%;
  animation: ${scale} 4s linear;
  z-index: 9;

  img {
    width: 100%;
    height: auto;
    animation: ${imgAnimate} 3s infinite cubic-bezier(0.4, 0, 1, 1) 0.2s;
  }

  @media (max-width: 1319px) {
    left: -70px;
    bottom: -250px;
    width: 110%;
  }

  @media (max-width: 1199px) {
    position: static;
    animation: none;
    width: 60%;
    margin: 0 auto;

    img {
      animation: ${floatY} 5s ease-in-out infinite;
    }
  }
  @media (max-width: 991px) {
    width: 90%;
  }
`;

const SubTitle = styled.span`
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 30px;
  font-weight: 600;
  color: ${theme.base};
  font-family: ${theme.fonts.mulish};
  margin-bottom: 25px;

  @media (max-width: 1199px) {
    font-size: 24px;
    margin-bottom: 18px;
  }
  @media (max-width: 767px) {
    font-size: 20px;
    margin-bottom: 14px;
  }
`;

const SubTitleAccent = styled.span`
  color: #fff;
`;

const Title = styled.h1`
  margin-top: 0px;
  font-size: 65px;
  line-height: 1.3;
  font-weight: 700;
  color: #fff;
  font-family: ${theme.fonts.playfair};
  margin-bottom: 25px;

  @media (max-width: 1599px) {
    font-size: 56px;
  }
  @media (max-width: 1399px) {
    font-size: 50px;
  }
  @media (max-width: 1199px) {
    font-size: 48px;
    line-height: 1.2;
  }
  @media (max-width: 767px) {
    font-size: 36px;
  }
  @media (max-width: 575px) {
    font-size: 30px;
  }
  @media (max-width: 479px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 1);
  font-family: ${theme.fonts.mulish};
  width: 80%;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 15px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const BannerBtn = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 65px;

  @media (max-width: 1199px) {
    margin-top: 35px;
  }
  @media (max-width: 575px) {
    gap: 10px;
    margin-top: 25px;
  }
`;

const BtnBase = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-decoration: none;
  gap: 8px;
  padding: 12px 25px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? "transparent" : theme.base)};

  color: ${({ $active }) => ($active ? "#fff" : theme.base)};
  font-size: 16px;
  font-weight: 800;
  font-family: ${theme.fonts.mulish};
  cursor: pointer;
  z-index: 0;

  i {
    transition: transform 0.35s ease;
  }

  &:hover i:last-child {
    transform: translateX(5px);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $active }) => ($active ? "transparent" : theme.base)};
    border-radius: inherit;
    transform: scale(0);
    transform-origin: center;
    transition: transform 0.5s ease;
    z-index: -1;
  }

  &:hover::before {
    transform: scale(1);
  }

  &:hover {
    color: ${({ $active }) => ($active ? theme.base : theme.dark)};
  }

  @media (max-width: 767px) {
    padding: 10px 18px;
    font-size: 13px;
  }

  @media (max-width: 575px) {
    padding: 9px 16px;
    font-size: 12px;
  }
`;

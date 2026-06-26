"use client";

import styled from "styled-components";
import { theme } from "@/styles/Theme";
import Link from "next/link";

export default function Banner(props) {
  const bannerData = props?.banner || props || {};
  const {
    title,
    activePage,
    image = "/image/bg/inner-bg.png",
    homeLabel = "Home",
    homeHref = "/",
  } = bannerData;
  return (
    <BannerSection $image={image}>
      <Overlay />
      <Content>
        <Title>{title}</Title>
        <Breadcrumb>
          <BreadcrumbLink href={homeHref}>{homeLabel}</BreadcrumbLink>
          <Separator>&gt;</Separator>
          <ActivePage>{activePage}</ActivePage>
        </Breadcrumb>
      </Content>
    </BannerSection>
  );
}

const BannerSection = styled.section`
  position: relative;
  height: 430px;
  box-sizing: border-box;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 190px;
  margin-top: 0;

  @media (max-width: 991px) {
    height: 300px;
    padding-top: 140px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  background-color: ${theme.dark};
  opacity: 0.9;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.playfair};
  font-size: 65px;
  font-weight: 700;
  color: white;
  margin: 0 0 20px;
  margin-top: -5px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${theme.fonts.mulish};
  font-size: 20px;
  font-weight: 700;
`;

const BreadcrumbLink = styled(Link)`
  color: ${theme.white};
  text-decoration: none;
  font-size: 20px;

  &:hover {
    color: ${theme.base};
  }
`;

const Separator = styled.span`
  color: ${theme.white};
  font-size: 20px;
`;

const ActivePage = styled.span`
  color: ${theme.base};
  font-size: 20px;
  font-weight: 700;
`;

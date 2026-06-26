"use client";

import styled from "styled-components";
import { theme } from "@/styles/Theme";
import Link from "next/link";

export default function BreadcrumbBanner({
  title = "About-Us",
  pageName = "About-Us",
}) {
  return (
    <BannerSection>
      <ContainerFluid>
        <BannerContent>
          <Title>{title}</Title>
          <BreadcrumbNav aria-label="breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem className="active" aria-current="page">
                {pageName}
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbNav>
        </BannerContent>
      </ContainerFluid>
    </BannerSection>
  );
}

const ContainerFluid = styled.div`
  width: 100%;
  padding: 0 15px;
  position: relative;
  z-index: 2;
`;

const BannerSection = styled.section`
  position: relative;
  padding-top: 208px;
  padding-bottom: 113px;
  padding-left: 200px;
  padding-right: 200px;
  background: ${theme.dark} url("/image/bg/inner-bg.png") center/cover no-repeat;
  text-align: center;
  overflow: hidden;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    background-color: ${theme.dark};
    opacity: 0.9;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  @media only screen and (max-width: 1199px) {
    padding-left: 100px;
    padding-right: 100px;
  }

  @media only screen and (max-width: 991px) {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 150px;
    padding-bottom: 80px;
  }

  @media only screen and (max-width: 575px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  color: ${theme.white};
  font-size: 65px;
  font-weight: 700;
  line-height: 1.3;
  margin-top: -20px;
  margin-bottom: 20px;
  font-family: ${theme.fonts.playfair};
  text-transform: capitalize;

  @media only screen and (max-width: 991px) {
    font-size: 36px;
    margin-top: -9px;
  }
`;

const BreadcrumbNav = styled.nav``;

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BreadcrumbItem = styled.li`
  font-family: ${theme.fonts.mulish};
  font-size: 20px;
  font-weight: 700;

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }

  a {
    color: ${theme.white};
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: ${theme.base};
    }
  }

  &.active {
    color: ${theme.base};
    display: flex;
    align-items: center;

    &::before {
      content: ">";
      color:  ${theme.white};
      font-weight: 600;
      margin: 0 10px;
      font-size: 20px;
      position: relative;
      top: -1px;

      @media only screen and (max-width: 991px) {
        font-size: 14px;
      }
    }
  }
`;

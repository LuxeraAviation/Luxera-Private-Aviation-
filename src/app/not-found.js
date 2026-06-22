"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Image from "next/image";
import SearchIcon from "@/imports/core/assets/SearchIcon";

export default function NotFoundPage() {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <PageContainer>
      <BackgroundElementLeft>
        <Image
          src="/image/element/element-17.png"
          alt="element background left"
          width={185}
          height={227}
          priority
        />
      </BackgroundElementLeft>
      <BackgroundElementRight>
        <Image
          src="/image/element/element-16.png"
          alt="element background right"
          width={241}
          height={367}
          priority
        />
      </BackgroundElementRight>

      <ContentWrapper>
        <ThumbContainer>
          <BaseCloudImage
            src="/image/404.png"
            alt="404 Cloud"
            width={664}
            height={511}
            priority
          />
          <FloatingBalloonLeft>
            <Image
              src="/image/element/element-17.png"
              alt="Floating Balloon Left"
              width={185}
              height={227}
              priority
            />
          </FloatingBalloonLeft>
          <FloatingBalloonRight>
            <Image
              src="/image/element/element-16.png"
              alt="Floating Balloon Right"
              width={241}
              height={367}
              priority
            />
          </FloatingBalloonRight>
        </ThumbContainer>

        <ContentSection>
          <Title>Oops! Look like you’re lost</Title>
          <Description>
            Page does not exist or some other error occured. Go to our{" "}
            <HomeLink href="/">Home page</HomeLink>
          </Description>

          <SearchForm onSubmit={handleSearchSubmit}>
            <SearchInput type="text" name="search" placeholder="Search" />
            <SearchButton type="submit">
              <SearchIcon />
            </SearchButton>
          </SearchForm>
        </ContentSection>
      </ContentWrapper>
    </PageContainer>
  );
}

const scrollDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f3f1;
  padding: 80px 24px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  font-family: var(--font-mulish), "Mulish", sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const ThumbContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 664px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const BaseCloudImage = styled(Image)`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

const FloatingBalloonLeft = styled.div`
  position: absolute;
  left: 10%;
  top: 1%;
  width: 27%;
  animation: ${scrollDown} 2s cubic-bezier(0.4, 0, 1, 1) infinite;
  z-index: 2;

  img {
    width: 100% !important;
    height: auto !important;
  }
`;

const FloatingBalloonRight = styled.div`
  position: absolute;
  right: 10%;
  top: 1%;
  width: 36%;
  animation: ${scrollDown} 3s cubic-bezier(0.4, 0, 1, 1) infinite;
  z-index: 2;

  img {
    width: 100% !important;
    height: auto !important;
  }
`;

const BackgroundElementLeft = styled.div`
  position: absolute;
  top: 40%;
  left: 8%;
  opacity: 0.2;
  z-index: 1;
  width: 185px;

  img {
    width: 100% !important;
    height: auto !important;
  }

  @media only screen and (max-width: 1199px) {
    width: 130px;
    left: 5%;
  }

  @media only screen and (max-width: 768px) {
    width: 70px;
    left: 3%;
    opacity: 0.1;
  }
`;

const BackgroundElementRight = styled.div`
  position: absolute;
  top: 25%;
  right: 5%;
  opacity: 0.2;
  z-index: 1;
  width: 241px;

  img {
    width: 100% !important;
    height: auto !important;
  }

  @media only screen and (max-width: 1199px) {
    width: 170px;
    right: 3%;
  }

  @media only screen and (max-width: 768px) {
    width: 90px;
    right: 2%;
    opacity: 0.1;
  }
`;

const ContentSection = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-family: var(--font-playfair-display), "Playfair Display", serif;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #19232d;
  line-height: 1.3;

  @media only screen and (max-width: 991px) {
    font-size: 28px;
  }
  @media only screen and (max-width: 575px) {
    font-size: 22px;
  }
`;

const Description = styled.p`
  font-size: 20px;
  color: #19232d;
  font-weight: 700;
  margin-bottom: 30px;
  line-height: 1.5;

  @media only screen and (max-width: 991px) {
    font-size: 15px;
  }
`;

const HomeLink = styled(Link)`
  color: #dcbb87;
  text-decoration: none;
  transition: color 0.15s ease-in-out;

  &:hover {
    color: #c9a56f;
  }
`;

const SearchForm = styled.form`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  border: 1px solid #e5e5e5;
  background-color: white;
  font-family: var(--font-mulish), "Mulish", sans-serif;
  color: #3d3d3d;
  padding: 10px 45px 10px 15px;
  font-weight: 700;
  height: 45px;
  width: 100%;
  font-size: 15px;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    background-color: white;
    border-color: #dcbb87;
    outline: none;
  }

  &::placeholder {
    color: rgba(61, 61, 61, 0.7);
  }

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  background-color: transparent;
  color: #dcbb87;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.15s ease-in-out;

  &:hover {
    color: #c9a56f;
  }
`;

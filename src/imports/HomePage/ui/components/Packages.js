"use client";

import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/styles/Theme";
import Slider from "@/imports/core/components/Slider";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { PACKAGES } from "@/imports/core/constants/homepage";

export default function Packages() {
  const pathname = usePathname();
  const isPackagePage = pathname === "/package";

  return (
    <PackageSection $isPackagePage={isPackagePage}>
      <BgElementLeft
        src="/image/element/element-24.png"
        alt=""
        width={1152}
        height={887}
        aria-hidden="true"
      />
      <BgElementRight
        src="/image/element/element-1.png"
        alt=""
        width={1152}
        height={1080}
        aria-hidden="true"
      />

      <Container>
        <SectionHeader>
          <SubTitle $isPackagePage={isPackagePage}>
            Flynext <span>Package</span>
          </SubTitle>
          <SectionTitle $isPackagePage={isPackagePage}>
            Flynext Tour Packages
          </SectionTitle>
        </SectionHeader>
        <Slider
          items={PACKAGES}
          perView={3}
          autoplay
          autoplayInterval={3000}
          bottomControls={({ prev, next }) => (
            <SliderControls>
              <ControlBtn onClick={prev} aria-label="Previous">
                <CtrlIcon className="fas fa-chevron-left" />
              </ControlBtn>
              <ControlBtn onClick={next} aria-label="Next">
                <CtrlIcon className="fas fa-chevron-right" />
              </ControlBtn>
            </SliderControls>
          )}
          renderItem={(p) => (
            <PackageItem>
              <PackageThumb>
                <Image src={p.img} alt={p.title} width={310} height={242} />
                <PackagePrize>
                  <PriceLabel>{p.price}</PriceLabel>
                </PackagePrize>
              </PackageThumb>
              <PackageContent>
                <PackageContentHeader>
                  <Title>
                    <TitleLink href="#0">{p.title}</TitleLink>
                  </Title>
                </PackageContentHeader>
                <PackageContentBody>
                  <PackageList>
                    <PackageListItem>Date : {p.date}</PackageListItem>
                    <PackageListItem>Person : {p.person}</PackageListItem>
                  </PackageList>
                  <PackageContentFooter>
                    <PackageBtn>
                      <CustomBtn href="#0">
                        <BtnIcon
                          src="/image/fav.png"
                          alt="plane"
                          width={16}
                          height={16}
                        />
                        Book Now
                      </CustomBtn>
                    </PackageBtn>
                    <PackageVideo>
                      <VideoLink href="#0">
                        <PlayIcon
                          src="/image/icon/icon-17.png"
                          alt="play"
                          width={42}
                          height={42}
                        />
                      </VideoLink>
                    </PackageVideo>
                  </PackageContentFooter>
                </PackageContentBody>
              </PackageContent>
            </PackageItem>
          )}
        />
      </Container>
    </PackageSection>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const PackageSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  background-color: ${({ $isPackagePage }) =>
    $isPackagePage ? "#ffffff" : theme.dark || "#19232d"};

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const BgElementLeft = styled(Image)`
  position: absolute;
  bottom: 0;
  left: -10%;
  pointer-events: none;
  user-select: none;

  @media (max-width: 991px) {
    display: none;
  }
`;

const BgElementRight = styled(Image)`
  position: absolute;
  bottom: 0;
  right: -10%;
  pointer-events: none;
  user-select: none;

  @media (max-width: 991px) {
    display: none;
  }
`;

const SliderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 36px;
`;

const ControlBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #dcbb87;
  background: transparent;
  color: #dcbb87;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.base || "#dcbb87"};
    border-color: ${theme.base || "#dcbb87"};
    color: #19232d;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;

  font-weight: 800;
  font-size: 20px;
  color: ${theme.base || "#dcbb87"};
  margin-bottom: 20px;
  font-family: ${theme.fonts?.mulish || "var(--font-mulish), sans-serif"};

  span {
    color: ${({ $isPackagePage }) => ($isPackagePage ? "#000000" : "#fff")};
  }
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts?.playfair ||
  "var(--font-playfair-display), serif"};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ $isPackagePage }) => ($isPackagePage ? "#000000" : "#fff")};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const PackageThumb = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.5s;
  }
`;

const PackageItem = styled.div`
  background-color: white;
  box-shadow: 0 10px 10px rgba(50, 73, 179, 0.08);
  border-radius: 10px;
  padding: 25px;

  &:hover ${PackageThumb} img {
    transform: scale(1.2);
  }
`;

const PackagePrize = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PriceLabel = styled.span`
  background-color: #dcbb87;
  border-radius: 4px;
  color: #19232d;
  font-weight: 800;
  padding: 6px 15px;
  display: inline-block;
`;

const PackageContent = styled.div`
  padding-top: 15px;
`;

const PackageContentHeader = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 0px;
`;

const TitleLink = styled(Link)`
  color: #19232d;
  text-decoration: none;
  transition: all 0.5s;
  font-size: 24px;
  font-family: ${theme.fonts?.playfair || "serif"};
  &:hover {
    color: ${theme.base || "#dcbb87"};
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const PackageContentBody = styled.div``;

const PackageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PackageListItem = styled.li`
  padding-bottom: 8px;
  color: #19232d;
  font-size: 15px;
  font-weight: 600;
`;

const PackageContentFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #f0ede8;
  margin-top: 10px;
`;

const PackageBtn = styled.div`
  display: inline-block;
`;

const BtnIcon = styled(Image)`
  transition: all 0.5s;
  display: inline-block;
`;

const CustomBtn = styled(Link)`
  color: #19232d !important;
  font-weight: 800;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #dcbb87 !important;

    ${BtnIcon} {
      margin-right: 5px;
    }
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const PackageVideo = styled.div``;

const VideoLink = styled.a`
  transition: all 0.3s;
  display: inline-block;

  &:hover {
    transform: scale(1.2);
  }
`;

const PlayIcon = styled(Image)`
  width: 30px;
  height: auto;
  display: block;
`;

const CtrlIcon = styled.i`
  font-size: 14px;
`;

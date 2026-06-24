"use client";

import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Slider from "@/imports/core/components/Slider";
import Image from "next/image";
import Link from "next/link";
import Container from "@/imports/core/atom/Container";

import { TEAM_MEMBERS } from "@/imports/core/constants/aboutus";

export default function TeamSlider() {
  return (
    <TeamSection>
      <StyledContainer>
        <Slider
          items={TEAM_MEMBERS}
          perView={3}
          autoplay
          renderItem={(m) => (
            <TeamItem>
              <TeamThumb>
                <Image
                  src={m.img}
                  alt={m.name}
                  width={370}
                  height={360}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </TeamThumb>
              <TeamContent>
                <TeamTitle>
                  <Link href="#">{m.name}</Link>
                </TeamTitle>
                <TeamRole>{m.role}</TeamRole>
              </TeamContent>
              <TeamSocialArea>
                <TeamSocialList>
                  {m.socials.map((s, idx) => (
                    <TeamSocialItem key={idx}>
                      <TeamSocialLink href={s.url} aria-label="Social Link">
                        <Icon className={s.icon} />
                      </TeamSocialLink>
                    </TeamSocialItem>
                  ))}
                </TeamSocialList>
              </TeamSocialArea>
            </TeamItem>
          )}
          controls={({ prev, next }) => (
            <SectionHeaderWrapper>
              <SectionHeader>
                <SubTitle>Our team</SubTitle>
                <SectionTitle>Meet Our Team Members</SectionTitle>
              </SectionHeader>
              <SliderNavArea>
                <SliderBtn
                  className="slider-prev"
                  onClick={prev}
                  aria-label="Previous slide"
                >
                  <Icon className="fas fa-chevron-left" />
                </SliderBtn>
                <SliderBtn
                  className="slider-next"
                  onClick={next}
                  aria-label="Next slide"
                >
                  <Icon className="fas fa-chevron-right" />
                </SliderBtn>
              </SliderNavArea>
            </SectionHeaderWrapper>
          )}
          bottomControls={({ currentIndex, totalItems, goTo }) => {
            const dots = totalItems;
            const activeDot = currentIndex;
            return (
              <PaginationDots>
                {Array.from({ length: dots }).map((_, i) => (
                  <PaginationDot
                    key={i}
                    className={i === activeDot ? "active" : ""}
                    onClick={() => goTo(i)}
                  />
                ))}
              </PaginationDots>
            );
          }}
        />
      </StyledContainer>
    </TeamSection>
  );
}

const Section = styled.section`
  padding: 120px 0;
  position: relative;
  @media (max-width: 768px) {
    padding: 70px 0;
  }
`;

const SectionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 50px;
  flex-wrap: wrap;
  gap: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  color: ${theme.base};
  font-family: ${theme.fonts.mulish};
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: ${theme.dark};
  font-family: ${theme.fonts.playfair};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SliderNavArea = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 991px) {
    display: none;
  }
`;

const SliderBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${theme.base};
  background: white;
  color: ${theme.base};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.base};
    color: ${theme.white};
    border-color: ${theme.base};
  }
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 4px;
  gap: 8px;
`;

const PaginationDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid ${theme.dark};
  background-color: transparent;
  display: inline-block;
  cursor: pointer;

  &.active {
    border: none;
    background-color: ${theme.base};
    position: relative;

    &::before {
      position: absolute;
      content: "";
      top: -3px;
      left: -3px;
      bottom: -3px;
      right: -3px;
      border: 1px solid ${theme.base};
      border-radius: 50%;
    }
  }
`;

const TeamSection = styled(Section)`
  background: #ffffff;
  overflow: hidden;

  .slider-viewport {
    position: relative;
    margin-right: -30px;
    width: calc(100% + 30px);
  }

  .slider-item {
    padding: 0 30px 0 0;
  }
`;

const TeamThumb = styled.div`
  background-color: #dde6ef;
  text-align: center;
  aspect-ratio: 370 / 360;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
`;

const TeamContent = styled.div`
  background-color: #f5f3f1;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const TeamTitle = styled.h3`
  font-family: ${theme.fonts.mulish};
  font-weight: 800;
  font-size: 24px;
  line-height: 1.3;
  margin: 0;

  a {
    color: ${theme.dark};
    text-decoration: none;
    transition: all 0.5s;

    &:hover {
      color: ${theme.base};
    }
  }
`;

const TeamRole = styled.span`
  font-family: ${theme.fonts.mulish};
  color: ${theme.dark};
  font-style: italic;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
`;

const TeamSocialArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f5f3f1;
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateX(101%);
  visibility: hidden;
  transition:
    transform 0.5s ease-in-out,
    visibility 0.5s ease-in-out;
`;

const TeamSocialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TeamSocialItem = styled.li``;

const TeamSocialLink = styled.a`
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  background: transparent;
  border: 1px solid rgba(220, 187, 135, 0.5);
  color: ${theme.base};
  font-size: 12px;
  transition: all 0.3s;

  &:hover {
    color: white;
    background-color: ${theme.base};
  }
`;

const TeamItem = styled.div`
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  &:hover {
    ${TeamThumb} img {
      transform: scale(1.05);
    }

    ${TeamSocialArea} {
      transform: translateX(0);
      visibility: visible;
    }
  }
`;

const StyledContainer = styled(Container)`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const Icon = styled.i``;

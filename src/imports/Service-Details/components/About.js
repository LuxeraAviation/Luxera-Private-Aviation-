"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { theme, Reveal } from "@/styles/Theme";
import Container from "@/imports/core/atom/Container";
import CheckIcon from "@/imports/core/assets/CheckIcon";
import BookPlaneIcon from "@/imports/core/assets/BookPlaneIcon";

export default function ServiceDetailsAbout() {
  return (
    <DetailSection>
      <StyledContainer>
        <AboutGrid>
          <AboutColumn>
            <Reveal variant="fade-right" duration={1200}>
              <AboutThumb>
                <Image
                  src="/image/about-four.png"
                  alt="Private Jet Charter"
                  width={558}
                  height={520}
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
              </AboutThumb>
            </Reveal>
          </AboutColumn>

          <AboutColumn>
            <Reveal variant="fade-left" duration={1200}>
              <AboutContent>
                <SubTitle>About Private Jet</SubTitle>
                <Title>Private Jet Charter</Title>
                <Description>
                  The development of center-aisle cabin business jets was
                  accelerated by an August 1956 United States Air Force (USAF)
                  letter of the requirement for two &quot;off-the-shelf&quot;
                  aircraft: the larger UCX (cargo) and smaller UTX (trainer).
                  These requirements differed from standard Air Force.
                </Description>

                <AboutList>
                  <AboutListItem>
                    <CheckWrapper>
                      <CheckIcon />
                    </CheckWrapper>
                    Unmatched technology. Superior performance.
                  </AboutListItem>
                  <AboutListItem>
                    <CheckWrapper>
                      <CheckIcon />
                    </CheckWrapper>
                    Unmatched technology. Superior performance.
                  </AboutListItem>
                  <AboutListItem>
                    <CheckWrapper>
                      <CheckIcon />
                    </CheckWrapper>
                    Iindustry-exclusive upper technology panel and
                    longest-ranged.
                  </AboutListItem>
                  <AboutListItem>
                    <CheckWrapper>
                      <CheckIcon />
                    </CheckWrapper>
                    Exclusive upper technology panel and longest-ranged.
                  </AboutListItem>
                </AboutList>

                <AboutBtn>
                  <BookBtn href="/service-details">
                    <BookPlaneIcon /> Book Now
                  </BookBtn>
                </AboutBtn>
              </AboutContent>
            </Reveal>
          </AboutColumn>
        </AboutGrid>
      </StyledContainer>
    </DetailSection>
  );
}

const DetailSection = styled.section`
  padding: 120px 0;
  position: relative;
  background: #ffffff;
  color: ${theme.text};
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 80px 0;
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
  align-items: center;
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 0px;
  }
`;

const AboutColumn = styled.div`
  position: relative;
`;

const AboutThumb = styled.div`
  position: relative;
  overflow: visible;
  z-index: 2;
  border-radius: 10px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    max-width: 450px;
  }

  @media (max-width: 991px) {
    max-width: 690px;
    margin: 0 auto 40px auto;
  }

  @media (max-width: 768px) {
    max-width: 510px;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
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

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 991px) {
    max-width: 690px;
    margin: 0 auto;
    width: 100%;
    padding: 0 15px;
  }

  @media (max-width: 768px) {
    max-width: 510px;
  }
`;

const SubTitle = styled.span`
  display: inline-block;
  color: ${theme.base};
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2;
  margin-bottom: 15px;
  font-family: ${theme.fonts.mulish};

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }
`;

const Title = styled.h2`
  color: ${theme.dark};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 15px;
  font-family: ${theme.fonts.playfair};

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  color: ${theme.text};
  font-family: ${theme.fonts.mulish};

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }
`;

const AboutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 25px 0 0 0;
`;

const AboutListItem = styled.li`
  display: block;
  font-weight: 700;
  position: relative;
  color: ${theme.text};
  font-size: 16px;
  padding-left: 40px;
  font-family: ${theme.fonts.mulish};

  & + & {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const CheckWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 25px;
  height: 25px;
  background-color: #fff8ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.dark};

  svg {
    width: 12px;
    height: 12px;
  }
`;

const AboutBtn = styled.div`
  margin-top: 40px;
`;

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

  svg {
    font-size: 16px;
    color: ${theme.dark};
    transition: all 0.5s ease;
    transform: rotate(90deg);
  }

  &:hover {
    background: transparent;
    color: ${theme.base};
    border-color: ${theme.base};

    svg {
      color: ${theme.base};
      transform: rotate(90deg);
    }
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

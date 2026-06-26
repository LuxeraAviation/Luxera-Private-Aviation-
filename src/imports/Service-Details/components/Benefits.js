"use client";

import styled from "styled-components";
import Image from "next/image";
import { theme, Reveal, waves } from "@/styles/Theme";
import Container from "@/imports/core/atom/Container";

export default function Benefits() {
  return (
    <FeatureSection>
      <StyledContainer>
        <GridContainer>
          <Reveal variant="fade-right" duration={1200}>
            <ThumbArea>
              <ThumbFirst>
                <ThumbImg
                  src="/image/feature/feature-1.png"
                  alt="feature"
                  width={558}
                  height={340}
                  priority
                />
              </ThumbFirst>
              <ThumbSecond>
                <ThumbImg
                  src="/image/feature/feature-2.png"
                  alt="feature"
                  width={558}
                  height={340}
                />
                <VideoWrapper>
                  <VideoMain>
                    <Wave1 />
                    <Wave2 />
                    <Wave3 />
                    <VideoLink
                      href="https://www.youtube.com/embed/Hw4ctvV25H0"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Play video"
                    >
                      <PlayIcon />
                    </VideoLink>
                  </VideoMain>
                </VideoWrapper>
              </ThumbSecond>
            </ThumbArea>
          </Reveal>

          <Reveal variant="fade-left" duration={1200}>
            <ContentColumn>
              <SectionHeader>
                <SubTitle>Benefits of Service</SubTitle>
                <SectionTitle>Benefits of Private Jet.</SectionTitle>
                <HeaderDescription>
                  By constantly improving on the best. It’s in this spirit that
                  the Phenom 300E received further enhancements, becoming the
                  most successful.
                </HeaderDescription>
              </SectionHeader>

              <FeatureGrid>
                <FeatureItem>
                  <FeatureIcon>
                    <IconImg
                      src="/image/icon/icon-2.png"
                      alt="icon"
                      width={46}
                      height={46}
                    />
                  </FeatureIcon>
                  <FeatureContent>
                    <ItemTitle>Safety Accred Aircraft.</ItemTitle>
                    <ItemDescription>
                      We give you access & service accredited aircraft.
                    </ItemDescription>
                  </FeatureContent>
                </FeatureItem>

                <FeatureItem>
                  <FeatureIcon>
                    <IconImg
                      src="/image/icon/icon-14.png"
                      alt="icon"
                      width={46}
                      height={46}
                    />
                  </FeatureIcon>
                  <FeatureContent>
                    <ItemTitle>Anywhere. Any time.</ItemTitle>
                    <ItemDescription>
                      Search the world with ease and transparency. As the only
                    </ItemDescription>
                  </FeatureContent>
                </FeatureItem>

                <FeatureItem>
                  <FeatureIcon>
                    <IconImg
                      src="/image/icon/icon-15.png"
                      alt="icon"
                      width={46}
                      height={46}
                    />
                  </FeatureIcon>
                  <FeatureContent>
                    <ItemTitle>Flexible private flying.</ItemTitle>
                    <ItemDescription>
                      Charter an entire jet, or offer the seats you don’t need
                    </ItemDescription>
                  </FeatureContent>
                </FeatureItem>

                <FeatureItem>
                  <FeatureIcon>
                    <IconImg
                      src="/image/icon/icon-16.png"
                      alt="icon"
                      width={46}
                      height={46}
                    />
                  </FeatureIcon>
                  <FeatureContent>
                    <ItemTitle>Modern Private Jet</ItemTitle>
                    <ItemDescription>
                      Our technology consistently delivers the best pricing
                    </ItemDescription>
                  </FeatureContent>
                </FeatureItem>
              </FeatureGrid>
            </ContentColumn>
          </Reveal>
        </GridContainer>
      </StyledContainer>
    </FeatureSection>
  );
}

const FeatureSection = styled.section`
  padding: 120px 0;
  background-color: ${theme.white};
  overflow: hidden;
  position: relative;

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
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: center;

  @media (max-width: 1199px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const ThumbArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 558px;
  margin: 0 auto;

  @media (max-width: 1199px) {
    max-width: 930px;
  }
`;

const ThumbFirst = styled.div`
  position: relative;
  width: 100%;

  @media (max-width: 1199px) {
    display: none;
  }
`;

const ThumbSecond = styled.div`
  position: relative;
  width: 100%;
`;

const ThumbImg = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 5px;
  display: block;
`;

const VideoWrapper = styled.div`
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
`;

const VideoMain = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
`;

const Wave1 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  margin-left: -35px;
  margin-top: -35px;
  border-radius: 50%;
  border: 1px solid rgba(220, 187, 135, 0.4);
  animation: ${waves} 3s ease-out infinite;
`;

const Wave2 = styled(Wave1)`
  animation-delay: 1s;
`;

const Wave3 = styled(Wave1)`
  animation-delay: 2s;
`;

const VideoLink = styled.a`
  position: relative;
  z-index: 2;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${theme.white};
  color: ${theme.base};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.base};
    color: ${theme.white};
  }
`;

const PlayIcon = styled.i.attrs({ className: "fas fa-play" })`
  font-size: 22px;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 1199px) {
    max-width: 930px;
    margin: 0 auto;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 30px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 800;
  font-size: 20px;
  color: ${theme.base};
  margin-bottom: 15px;
  font-family: ${theme.fonts.mulish};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.playfair};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: ${theme.dark};
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeaderDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.text};
  font-family: ${theme.fonts.mulish};
  margin: 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background-color: #f5f3f1;
  border: 1px solid #f5f3f1;

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  background-color: ${theme.white};
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  position: relative;
  margin-bottom: 25px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    position: absolute;
    content: "";
    top: -10px;
    left: 10px;
    width: 55px;
    height: 55px;
    background-color: rgba(220, 187, 135, 0.25);
    border-radius: 50%;
    z-index: -1;
    transition: all 0.3s ease;
  }

  ${FeatureItem}:hover &::before {
    background-color: rgba(220, 187, 135, 0.5);
  }
`;

const IconImg = styled(Image)`
  display: block;
  width: 46px;
  height: auto;
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.h4`
  font-family: ${theme.fonts.mulish};
  font-size: 18px;
  font-weight: 700;
  color: ${theme.dark};
  margin: 0 0 10px 0;
`;

const ItemDescription = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.text};
  margin: 0;
  transition: all 0.5s ease;
`;

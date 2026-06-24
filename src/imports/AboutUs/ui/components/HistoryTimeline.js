"use client";

import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";

import { HISTORY_ITEMS } from "@/imports/core/constants/aboutus";

export default function HistoryTimeline() {
  return (
    <HistorySection>
      <StyledContainer>
        <SectionHeader>
          <Reveal variant="fade-up" duration={1200}>
            <SubTitle>Our History</SubTitle>
            <SectionTitle>What Make Us Special</SectionTitle>
          </Reveal>
        </SectionHeader>

        <HistoryArea>
          {HISTORY_ITEMS.map((item, index) => {
            const isEven = index % 2 === 1;
            return (
              <HistoryItem key={item.year} className={isEven ? "even" : ""}>
                <Reveal
                  variant={isEven ? "fade-left" : "fade-right"}
                  duration={1200}
                  className="history-thumb"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={560}
                    height={380}
                    sizes="(max-width: 991px) 100vw, 50vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Reveal>

                <Reveal
                  variant={isEven ? "fade-right" : "fade-left"}
                  duration={1200}
                  className="history-content"
                >
                  <Year>{item.year}</Year>
                  <Title>{item.title}</Title>
                  <Text>{item.text}</Text>
                </Reveal>
              </HistoryItem>
            );
          })}
        </HistoryArea>
      </StyledContainer>
    </HistorySection>
  );
}

const Section = styled.section`
  padding: 120px 0;
  position: relative;
  @media (max-width: 768px) {
    padding: 70px 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  color: ${theme.base};
  font-family: ${theme.fonts.mulish};
  padding-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: ${theme.dark};
  font-family: ${theme.fonts.playfair};
  margin: 0px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HistorySection = styled(Section)`
  background-color: ${theme.soft};
  color: ${theme.text};
  overflow: hidden;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const HistoryArea = styled.div`
  margin-bottom: -30px;
  position: relative;
  z-index: 2;

  &::after {
    position: absolute;
    content: "";
    top: 7%;
    left: 50.7%;
    width: 1px;
    height: calc(100% - 23%);
    background-color: #e5e5e5;
    z-index: -1;

    @media only screen and (max-width: 991px) {
      display: none;
    }
  }
`;

const Year = styled.h2`
  font-family: ${theme.fonts.playfair};
  color: ${theme.base};
  font-weight: 700;
  font-size: 40px;
  margin: 0 0 10px;

  @media only screen and (max-width: 991px) {
    font-size: 36px;
  }
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.dark};
  margin: 0 0 15px;
  font-family: ${theme.fonts.playfair};

  @media only screen and (max-width: 991px) {
    font-size: 20px;
  }
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 0;

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }
`;

const HistoryItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 30px;

  @media only screen and (max-width: 991px) {
    justify-content: center;
  }

  .history-thumb {
    width: 50%;
    padding-right: 40px;

    img {
      width: 100%;
      border-radius: 0px;
      display: block;
    }

    @media only screen and (max-width: 991px) {
      padding-right: 0;
      width: 100%;

      img {
        width: 100%;
      }
    }
  }

  .history-content {
    width: calc(100% - 50%);
    padding-left: 60px;

    @media only screen and (max-width: 991px) {
      width: 100%;
      padding-left: 0;
      padding-top: 20px;
    }
  }

  &::before {
    position: absolute;
    content: "";
    top: 28.2%;
    left: 50%;
    width: 15px;
    height: 15px;
    border: 2px solid ${theme.dark};
    border-radius: 50%;
    z-index: 1;

    @media only screen and (max-width: 991px) {
      display: none;
    }
  }

  &::after {
    position: absolute;
    content: "";
    top: 26.9%;
    left: 49.55%;
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;

    @media only screen and (max-width: 991px) {
      display: none;
    }
  }

  &.even {
    flex-direction: row-reverse;

    .history-thumb {
      padding-right: 0;
      padding-left: 60px;

      @media only screen and (max-width: 991px) {
        padding-left: 0;
      }
    }

    .history-content {
      padding-left: 0;
      text-align: right;
      padding-right: 60px;

      @media only screen and (max-width: 991px) {
        padding-right: 0;
        text-align: left;
      }
    }
  }

  @media only screen and (max-width: 991px) {
    margin-bottom: 50px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

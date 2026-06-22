"use client";

import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";
import { DEAL_DETAIL } from "@/imports/core/constants/deals-details";

export default function Specification() {
  const { specification } = DEAL_DETAIL;

  return (
    <SpecSection>
      <StyledContainer>
        <SpecGrid>
          <SpecColumn>
            <Reveal variant="fade-right" duration={1200}>
              <SpecThumb>
                <Image
                  src={specification.img}
                  alt={specification.title}
                  width={653}
                  height={607}
                  priority
                  style={{ width: "100%", height: "auto" }}
                />
                <SpecElement>
                  <Image
                    src={specification.elementImg}
                    alt=""
                    width={500}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                  />
                </SpecElement>
              </SpecThumb>
            </Reveal>
          </SpecColumn>

          <SpecColumn>
            <Reveal variant="fade-left" duration={1200}>
              <SpecContent>
                <SubTitle>{specification.subTitle}</SubTitle>
                <Title>{specification.title}</Title>
                <Description>{specification.description}</Description>
                <Description>{specification.description2}</Description>
                <SpecListArea>
                  <SpecList>
                    {specification.list.map((item, idx) => (
                      <SpecListItem key={idx}>
                        <CheckIcon /> {item}
                      </SpecListItem>
                    ))}
                  </SpecList>
                </SpecListArea>
              </SpecContent>
            </Reveal>
          </SpecColumn>
        </SpecGrid>
      </StyledContainer>
    </SpecSection>
  );
}

function CheckIcon() {
  return (
    <IconContainer>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </IconContainer>
  );
}

const IconContainer = styled.div`
  position: absolute;
  top: 4px;
  left: 0;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff8ed;
  border-radius: 50%;
  color: #19232d;
  flex-shrink: 0;

  svg {
    color: #19232d;
    width: 16px;
    height: 16px;
  }
`;

const SpecSection = styled.section`
  padding: 120px 0 0;
  position: relative;
  background: #ffffff;
  color: ${theme.text};
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 80px 0 40px 0;
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

const SpecGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: -30px;
`;

const SpecColumn = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  position: relative;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const SpecThumb = styled.div`
  position: relative;

  & > img {
    border-radius: 10px;
  }
`;

const SpecElement = styled.div`
  position: absolute;
  left: -10%;
  bottom: -10%;
  width: 90%;
  z-index: -1;

  @media (max-width: 991px) {
    display: none;
  }
`;

const SpecContent = styled.div`
  display: block;
`;

const SubTitle = styled.span`
  display: block;
  color: ${theme.base};
  font-weight: 700;
  font-size: 20px;
  font-family: ${theme.fonts.mulish};
  margin-bottom: 15px;
`;

const Title = styled.h2`
  color: ${theme.dark};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 15px 0;
  font-family: ${theme.fonts.playfair};

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  margin: 0 0 15px 0;
  color: ${theme.text};

  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

const SpecListArea = styled.div`
  margin-top: 40px;
`;

const SpecList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 -20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SpecListItem = styled.li`
  flex: 0 0 45%;
  color: ${theme.dark};
  font-weight: 600;
  font-size: 16px;
  position: relative;
  padding-left: 40px;
  line-height: 1.8;
  padding-bottom: 20px;

  @media (max-width: 991px) {
    flex: 0 0 100%;
  }

  @media (max-width: 1199px) {
    font-size: 16px;
  }
`;

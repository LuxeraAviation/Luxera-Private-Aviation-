"use client";

import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";

import { CHOOSE_ITEMS } from "@/imports/core/constants/aboutus";

export default function WhyChoose() {
  return (
    <ChooseSection>
      <StyledContainer>
        <SectionHeader>
          <SubTitle>Why Us</SubTitle>
          <SectionTitle>Why Choose Our Luxera?</SectionTitle>
        </SectionHeader>

        <Grid>
          {CHOOSE_ITEMS.map((item, i) => (
            <Reveal
              key={item.num}
              variant="fade-up"
              duration={1000}
              delay={i * 100}
            >
              <ChooseItem>
                <ChooseThumb>
                  <Image
                    src="/image/choose.png"
                    alt="choose background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </ChooseThumb>
                <Num>{item.num}</Num>
                <Title>{item.title}</Title>
                <Description>{item.text}</Description>
              </ChooseItem>
            </Reveal>
          ))}
        </Grid>
      </StyledContainer>
    </ChooseSection>
  );
}

const ChooseSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background-color: ${theme.soft};
  @media (max-width: 768px) {
    padding: 70px 0;
  }
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

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  color: ${theme.base};
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const ChooseThumb = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  z-index: -1;
  transition: all 0.5s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.dark};
    opacity: 0.7;
    z-index: 1;
  }
`;

const Num = styled.span`
  display: block;
  font-size: 65px;
  line-height: 65px;
  color: ${theme.soft};
  font-family: ${theme.fonts.mulish};
  font-weight: 900;
  margin-bottom: 15px;
  transition: all 0.5s ease-in-out;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${theme.dark};
  margin-bottom: 15px;
  font-family: ${theme.fonts.playfair};
  transition: all 0.5s ease-in-out;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${theme.text};
  margin: 0;
  transition: all 0.5s ease-in-out;
`;

const ChooseItem = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px 20px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);

    ${ChooseThumb} {
      opacity: 1;
      visibility: visible;
    }

    ${Num} {
      color: ${theme.base};
    }

    ${Title} {
      color: white;
    }

    ${Description} {
      color: rgba(255, 255, 255, 0.9);
    }
  }
`;

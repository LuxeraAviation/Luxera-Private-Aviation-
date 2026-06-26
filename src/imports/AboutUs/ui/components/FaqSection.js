"use client";

import { useState } from "react";
import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";
import QualityServicesIcon from "@/imports/core/assets/QualityServicesIcon";

import { FAQ_DATA } from "@/imports/core/constants/aboutus";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <FaqWrapperSection>
      <StyledContainer>
        <FaqGrid>
          <Reveal variant="fade-right" duration={1200}>
            <FaqContentWrapper>
              <FaqHeader>
                <SubTitle>{FAQ_DATA.header.subTitle}</SubTitle>
                <SectionTitle>{FAQ_DATA.header.title}</SectionTitle>
                <HeaderDesc>{FAQ_DATA.header.description}</HeaderDesc>
                <FaqServiceList>
                  {FAQ_DATA.header.services.map((service, index) => (
                    <FaqServiceItem key={index}>
                      <QualityServicesIcon /> {service}
                    </FaqServiceItem>
                  ))}
                </FaqServiceList>
              </FaqHeader>
              <FaqWrapper>
                {FAQ_DATA.items.map((item, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <FaqItem key={idx} className={isOpen ? "open" : ""}>
                      <FaqItemTitle onClick={() => toggle(idx)}>
                        <FaqItemText>
                          {item.num}. {item.question}
                        </FaqItemText>
                        <FaqItemIcon />
                      </FaqItemTitle>
                      <FaqItemContent>
                        <FaqItemDesc>{item.answer}</FaqItemDesc>
                      </FaqItemContent>
                    </FaqItem>
                  );
                })}
              </FaqWrapper>
            </FaqContentWrapper>
          </Reveal>

          <Reveal variant="fade-left" duration={1200}>
            <FaqThumb>
              <Image
                src="/image/faq.png"
                alt="faq illustration"
                width={480}
                height={460}
                sizes="(max-width: 991px) 100vw, 40vw"
                style={{ width: "100%", height: "auto" }}
              />
            </FaqThumb>
          </Reveal>
        </FaqGrid>
      </StyledContainer>
    </FaqWrapperSection>
  );
}

const Section = styled.section`
  padding: 120px 0;
  position: relative;
  @media (max-width: 768px) {
    padding: 70px 0;
  }
`;

const FaqWrapperSection = styled(Section)`
  background:  ${theme.white};
  color: ${theme.text};
`;

const StyledContainer = styled(Container)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  align-items: start;

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    row-gap: 30px;
  }
`;

const FaqContentWrapper = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  max-width: 709.45px;
  width: 100%;
  margin-bottom: 30px;
  padding-top: 0;
  margin-top: 0;
`;

const FaqHeader = styled.div`
  margin-bottom: 30px;
`;

const SubTitle = styled.span`
  color: ${theme.base};
  font-family: ${theme.fonts.mulish};
  font-weight: 900;
  font-size: 20px;
  display: block;
  margin-top: 0;
  padding-top: 0;
  line-height: 1.4;
  margin-bottom: 15px;

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 40px;
  color: ${theme.dark};
  font-family: ${theme.fonts.playfair};
  line-height: 1.2;
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeaderDesc = styled.p`
  color: ${theme.dark};
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
`;

const FaqServiceList = styled.ul`
  margin: 20px 0 0 0;
  list-style: none;
  padding: 0;

  @media only screen and (max-width: 440px) {
    display: none;
  }

  @media only screen and (max-width: 575px) {
    margin: -5px;
  }
`;

const FaqServiceItem = styled.li`
  display: inline-block;
  color:  ${theme.gray};
  font-weight: 800;
  font-size: 16px;

  @media only screen and (max-width: 575px) {
    margin: 5px;
    font-size: 14px;
  }

  svg {
    width: 26px;
    height: 26px;
    padding: 7px;
    background-color: ${theme.gray};
    color: white;
    border-radius: 3px;
    margin-right: 5px;
    vertical-align: middle;

    @media only screen and (max-width: 575px) {
      width: 18px;
      height: 18px;
      padding: 5px;
    }
  }

  & + & {
    margin-left: 20px;

    @media only screen and (max-width: 575px) {
      margin-left: 0;
    }
  }
`;

const FaqThumb = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  max-width: 570px;
  width: 100%;
  margin-bottom: 30px;

  img {
    width: 100%;
    height: auto !important;
    display: block;
  }
`;

const FaqWrapper = styled.div`
  margin-bottom: -20px;
`;

const FaqItemText = styled.span`
  width: calc(100% - 40px);
  display: inline-block;
  font-family: ${theme.fonts.mulish};
  font-weight: 700;
  margin-bottom: 0;
`;

const FaqItemIcon = styled.span`
  display: block;
  width: 35px;
  height: 35px;
  position: relative;

  &::after {
    border-bottom: 3px solid ${theme.gray};
    border-right: 3px solid ${theme.gray};
    content: "";
    display: block;
    height: 10px;
    width: 10px;
    pointer-events: none;
    position: absolute;
    margin-top: -7px;
    right: 0;
    top: 50%;
    transform-origin: 50% 50%;
    transform: rotate(45deg);
    transition: all 0.3s;
  }
`;

const FaqItemTitle = styled.div`
  font-size: 16px;
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  margin-bottom: 0;
  user-select: none;
  transition: all 0.3s;

  @media only screen and (max-width: 991px) {
    font-size: 15px;
  }
`;

const FaqItemDesc = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  padding-bottom: 20px;
`;

const FaqItemContent = styled.div`
  max-height: 0;
  padding: 0 20px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  opacity: 0;
`;

const FaqItem = styled.div`
  background-color: white;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.3s;

  &.open {
    ${FaqItemTitle} {
      background-color: ${theme.base};
      color: ${theme.dark};

      ${FaqItemIcon}::after {
        border-top: 3px solid ${theme.dark};
        border-left: 3px solid ${theme.dark};
        border-bottom: none;
        border-right: none;
        margin-top: -3px;
      }
    }

    ${FaqItemContent} {
      max-height: 200px;
      padding-top: 20px;
      opacity: 1;
    }
  }
`;

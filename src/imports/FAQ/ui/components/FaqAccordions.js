"use client";

import { useState } from "react";
import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Container from "@/imports/core/atom/Container";
import { FAQ_SECTIONS } from "@/imports/core/constants/faq";

function FaqColumn({ title, items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <ColumnWrapper>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
      </ColumnHeader>
      <FaqWrapper>
        {items.map((item, idx) => {
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
    </ColumnWrapper>
  );
}

export default function FaqAccordions() {
  return (
    <>
      {FAQ_SECTIONS.map((section, secIdx) => (
        <FaqSectionKey key={secIdx} $isGray={section.isGrayBg}>
          <StyledContainer>
            <GridRow>
              {section.columns.map((col, colIdx) => (
                <StyledReveal
                  key={colIdx}
                  variant={colIdx === 0 ? "fade-right" : "fade-left"}
                  duration={1200}
                >
                  <FaqColumn title={col.title} items={col.items} />
                </StyledReveal>
              ))}
            </GridRow>
          </StyledContainer>
        </FaqSectionKey>
      ))}
    </>
  );
}

const StyledReveal = styled(Reveal)`
  display: flex;
  flex: 0 0 50%;
  max-width: 50%;
  width: 100%;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const FaqSectionKey = styled.section`
  padding: 120px 0;
  position: relative;
  background-color: ${(props) =>
    props.$isGray ? theme.soft : "${theme.white}"};
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const StyledContainer = styled(Container)`
  width: 100%;
  overflow: visible;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const GridRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const ColumnWrapper = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;

const ColumnHeader = styled.div`
  margin-bottom: 30px;
`;

const ColumnTitle = styled.h3`
  font-family: ${theme.fonts.playfair}, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: ${theme.dark};
  margin: 0 0 15px;
  margin-top: 15px;
`;

const FaqWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FaqItemText = styled.span`
  width: calc(100% - 40px);
  display: inline-block;
  font-family: ${theme.fonts.mulish}, sans-serif;
  font-weight: 700;
  margin-bottom: 0;
`;

const FaqItemIcon = styled.span`
  display: block;
  width: 35px;
  height: 35px;
  position: relative;

  &::after {
    border-bottom: 3px solid ${theme.text};
    border-right: 3px solid ${theme.text};
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
  justify-content: space-between;
  padding: 10px 20px;
  margin-bottom: 0;
  user-select: none;
  background-color: ${theme.white};
  color: ${theme.dark};
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
  color: ${theme.text};
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

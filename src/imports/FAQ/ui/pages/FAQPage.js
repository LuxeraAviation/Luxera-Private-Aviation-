"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import ArrowButton from "@/imports/core/components/ArrowButton";
import { Reveal } from "@/styles/Theme";
import { fs50, sectionSubtitle } from "@/styles/typography";
import { FAQ_CATEGORIES } from "@/imports/core/constants/faq";

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setOpenAccordion(0);
  };

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <main>
      <PageHeading title="FAQ" bg="/image/luxera/new.png" />

      <Section $top="120px" $bottom="120px">
        <Container>
          <Intro>
            <Subtitle as={Reveal} variant="fade-up">
              Luxera Private Aviation: The Standard of Excellence
            </Subtitle>
            <Title as={Reveal} variant="fade-up" delay={100}>
              Frequently Asked Questions
            </Title>
          </Intro>

          <TabSection as={Reveal} variant="fade-up" delay={150}>
            <TabList>
              {FAQ_CATEGORIES.map((cat, idx) => (
                <TabButton
                  key={cat.id}
                  $active={activeTab === idx}
                  onClick={() => handleTabChange(idx)}
                >
                  {cat.label}
                </TabButton>
              ))}
            </TabList>
          </TabSection>

          <Grid>
            <ImgCol as={Reveal} variant="fade-right" delay={200}>
              <ImageContainer>
                {FAQ_CATEGORIES.map((cat, idx) => (
                  <ImageWrapper key={cat.id} $active={activeTab === idx}>
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 991px) 100vw, 560px"
                      priority={idx === 0}
                    />
                  </ImageWrapper>
                ))}
              </ImageContainer>
            </ImgCol>

            <ContentCol as={Reveal} variant="fade-up" delay={250}>
              <AccordionList>
                {FAQ_CATEGORIES[activeTab].items.map((item, idx) => {
                  const isOpen = openAccordion === idx;
                  return (
                    <AccordionCard key={idx} $open={isOpen}>
                      <AccordionHeader
                        onClick={() => handleAccordionToggle(idx)}
                        aria-expanded={isOpen}
                        $open={isOpen}
                      >
                        <span>
                          <QuestionNumber>0{idx + 1}</QuestionNumber>
                          {item.q}
                        </span>
                        <IconWrapper $open={isOpen}>
                          <i className="fa-solid fa-chevron-down" />
                        </IconWrapper>
                      </AccordionHeader>
                      <AccordionBody $open={isOpen}>
                        <div className="inner">
                          <p>{item.a}</p>
                        </div>
                      </AccordionBody>
                    </AccordionCard>
                  );
                })}
              </AccordionList>

              <ContactCard>
                <ContactText>
                  <h3>Have specific operational requirements?</h3>
                  <p>Our bespoke private office team is available 24/7 to orchestrate your travel.</p>
                </ContactText>
                <StyledContactButton href="tel:+447469189255">Get in Touch</StyledContactButton>
              </ContactCard>
            </ContentCol>
          </Grid>
        </Container>
      </Section>
    </main>
  );
}

const Intro = styled.div`
  max-width: 800px;
  margin: 0 auto 50px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 35px;
  }
`;

const Subtitle = styled.p`
  ${sectionSubtitle}
  color: ${({ theme }) => theme.base};
  margin-bottom: 12px;
`;

const Title = styled.h2`
  ${fs50}
  color: ${({ theme }) => theme.heading};
  margin: 0;
`;

const TabSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    margin-bottom: 40px;
    border-bottom: none;
  }
`;

const TabList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0;
    border-top: 1px solid ${({ theme }) => theme.border};
  }
`;

const TabButton = styled.button`
  background: transparent;
  border: none;
  padding: 16px 32px;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 19px;
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.base : theme.text)};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.base};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover {
    color: ${({ theme }) => theme.base};
    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 14px 20px;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    width: 100%;
    background: ${({ theme, $active }) =>
    $active
      ? theme.mode === "dark"
        ? "rgba(170, 132, 83, 0.08)"
        : "rgba(170, 132, 83, 0.04)"
      : "transparent"};

    &::after {
      display: none;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 60px;
  align-items: flex-start;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const ImgCol = styled.div`
  position: sticky;
  top: 120px;

  @media (max-width: 991px) {
    position: static;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 991px) {
    height: 400px;
    margin-bottom: 40px;
  }
  @media (max-width: 575px) {
    height: 300px;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: scale(${({ $active }) => ($active ? 1 : 1.03)});
  transition: opacity 0.8s ease, transform 0.8s ease;
  z-index: ${({ $active }) => ($active ? 2 : 1)};

  img {
    object-fit: cover;
  }
`;

const ContentCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AccordionCard = styled.div`
  border: 1px solid ${({ theme, $open }) => ($open ? theme.base : theme.border)};
  background: ${({ theme, $open }) =>
    $open
      ? theme.mode === "dark"
        ? "rgba(170, 132, 83, 0.04)"
        : "rgba(170, 132, 83, 0.02)"
      : theme.bg};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: ${({ $open }) =>
    $open ? "0 15px 35px rgba(170, 132, 83, 0.06)" : "none"};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.base};
    transform: scaleY(${({ $open }) => ($open ? 1 : 0)});
    transform-origin: top;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover {
    border-color: ${({ theme }) => theme.base};
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);

    &::before {
      transform: scaleY(1);
    }
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 20px;

  span {
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 21px;
    font-weight: 500;
    color: ${({ theme, $open }) => ($open ? theme.base : theme.heading)};
    transition: color 0.3s ease;
    line-height: 1.4em;
    display: flex;
    align-items: center;
  }

  @media (max-width: 575px) {
    padding: 18px 20px;
    span {
      font-size: 17px;
    }
  }
`;

const QuestionNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.base};
  letter-spacing: 1px;
  margin-right: 14px;
  opacity: 0.8;
  flex-shrink: 0;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme, $open }) => ($open ? theme.base : theme.border)};
  background: ${({ theme, $open }) => ($open ? theme.base : "transparent")};
  transition: all 0.4s ease;
  flex-shrink: 0;

  i {
    color: ${({ theme, $open }) => ($open ? theme.white : theme.base)} !important;
    font-size: 12px;
    transition: transform 0.4s ease;
    transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  }

  &:hover {
    background: ${({ theme, $open }) => ($open ? theme.baseDark : "rgba(170, 132, 83, 0.1)")};
    border-color: ${({ theme }) => theme.base};
    i {
      color: ${({ theme, $open }) => ($open ? theme.white : theme.base)} !important;
    }
  }
`;

const AccordionBody = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  .inner {
    overflow: hidden;
    padding: 0 30px;
  }

  p {
    margin: 0;
    padding-bottom: 24px;
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    line-height: 1.7em;
  }

  @media (max-width: 575px) {
    .inner {
      padding: 0 20px;
    }
    p {
      font-size: 15px;
      padding-bottom: 18px;
    }
  }
`;

const ContactCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;
  border-radius: 6px;
  background: ${({ theme }) => theme.soft};
  border: 1px dashed ${({ theme }) => theme.border};
  margin-top: 20px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 30px;
    gap: 20px;
  }
`;

const ContactText = styled.div`
  h3 {
    margin: 0 0 8px;
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 20px;
    color: ${({ theme }) => theme.heading};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.text};
    font-size: 15px;
    line-height: 1.5em;
  }

  @media (max-width: 575px) {
    h3 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
`;

const StyledContactButton = styled(ArrowButton)`
  flex-shrink: 0;
  white-space: nowrap;

  && {
    background: ${({ theme }) => theme.base};
    border-color: ${({ theme }) => theme.base};
    color: ${({ theme }) => theme.white};

    .arrow {
      color: ${({ theme }) => theme.white};
      i {
        color: ${({ theme }) => theme.white};
      }
    }

    &:hover {
      background: ${({ theme }) => theme.heading};
      border-color: ${({ theme }) => theme.heading};
      color: ${({ theme }) => theme.white};

      .arrow {
        color: ${({ theme }) => theme.white};
        i {
          color: ${({ theme }) => theme.white};
        }
      }
    }
  }
`;

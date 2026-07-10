"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { SERVICE_PRINCIPLES } from "@/imports/core/constants/services";

export default function ServicePrinciples() {
  const { title, intro, items } = SERVICE_PRINCIPLES;

  return (
    <Section $top="150px" $bottom="150px">
      <Container>
        <IntroWrap>
          <SectionHeading center title={title} maxWidth="720px" />
          <Lead as={Reveal} variant="fade-up" delay={100}>
            {intro}
          </Lead>
        </IntroWrap>

        <Grid>
          {items.map((item, idx) => (
            <Card key={item.title} as={Reveal} variant="fade-up" delay={100 + idx * 90}>
              <Icon>
                <i className={item.icon} />
              </Icon>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

const IntroWrap = styled.div`
  max-width: 820px;
  margin: 0 auto;
`;

const Lead = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  line-height: 1.9em;
  font-size: 18px;
  margin: 26px auto 0;
  max-width: 720px;

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const Grid = styled.div`
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const Card = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 40px 36px;
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;

  h3 {
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 24px;
    color: ${({ theme }) => theme.heading};
    margin: 0 0 12px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.text};
    line-height: 1.8em;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.base};
    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 575px) {
    flex-direction: column;
    gap: 18px;
    padding: 32px 26px;
  }
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(170, 132, 83, 0.14)" : "rgba(170, 132, 83, 0.1)"};
  color: ${({ theme }) => theme.base};
  font-size: 24px;
`;

"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { SERVICES } from "@/imports/core/constants/services";

export default function ServicesGrid() {
  return (
    <Section $gray $top="140px" $bottom="150px">
      <Container>
        <SectionHeading
          center
          subtitle="WHAT WE OFFER"
          title="Exceptional Service, From Tarmac to Touchdown"
        />
        <Grid>
          {SERVICES.map((s, i) => (
            <Card key={s.title} as={Reveal} delay={i * 80}>
              <Icon>
                <Image src={s.icon} alt="" width={40} height={40} />
              </Icon>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

const Grid = styled.div`
  margin-top: 60px;
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

const Card = styled.div`
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 40px 34px;
  transition: all 0.3s ease;

  h3 {
    font-size: 24px;
    margin: 0 0 14px;
  }

  p {
    margin: 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.base};
    transform: translateY(-6px);
  }
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.soft};
  margin-bottom: 26px;

  img {
    filter: ${({ theme }) =>
      theme.mode === "dark" ? "brightness(0) invert(1)" : "none"};
  }
`;

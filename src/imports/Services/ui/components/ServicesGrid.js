"use client";

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
                <i className={s.icon} />
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
  background: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(170, 132, 83, 0.14)" : "rgba(170, 132, 83, 0.1)"};
  color: ${({ theme }) => theme.base};
  font-size: 26px;
  margin-bottom: 26px;
`;

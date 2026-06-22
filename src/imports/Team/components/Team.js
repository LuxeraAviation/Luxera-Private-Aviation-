"use client";

import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import TeamCard from "@/imports/HomePage/ui/components/TeamCard";

export default function Team({ title, members }) {
  return (
    <TeamSection>
      <Container>
        <SectionHeaderWrapper>
          <Reveal variant="fade-right" duration={1200}>
            <SectionTitle>{title}</SectionTitle>
          </Reveal>
        </SectionHeaderWrapper>

        <TeamGrid>
          {members.map((member, i) => (
            <Reveal
              key={member.name}
              variant="zoom-in"
              duration={1200}
              delay={i * 120}
            >
              <TeamCard {...member} />
            </Reveal>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const TeamSection = styled.section`
  padding-top: 120px;
  position: relative;

  @media (max-width: 767px) {
    padding-top: 70px;
  }
`;

const SectionHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 50px;

  &::after {
    position: absolute;
    content: "";
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 50%;
    height: 1px;
    background-color: #e5e5e5;
  }

  @media (max-width: 1199px) {
    &::after {
      display: none;
    }
  }

  @media (max-width: 991px) {
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.playfair};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: ${theme.dark};
  margin: 0;

  @media (max-width: 767px) {
    font-size: 28px;
  }
`;

const TeamGrid = styled.div`
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

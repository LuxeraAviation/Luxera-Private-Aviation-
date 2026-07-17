"use client";

import Link from "next/link";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { SERVICES } from "@/imports/core/constants/services";

export default function ServicesGrid() {
  const jetCard = SERVICES.find((s) => s.jetCard);
  const services = SERVICES.filter((s) => !s.jetCard);

  return (
    <Section $gray $top="140px" $bottom="150px">
      <Container>
        <SectionHeading
          center
          subtitle="WHAT WE OFFER"
          title="Exceptional Service, From Tarmac to Touchdown"
        />
        <Grid>
          {services.map((s, i) => (
            <Card
              key={s.title}
              as={Reveal}
              forwardedAs={s.href ? Link : undefined}
              href={s.href}
              delay={i * 80}
              $link={!!s.href}
            >
              <Icon>
                <i className={s.icon} />
              </Icon>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {s.href && (
                <More>
                  Learn More <i className="fa-solid fa-arrow-right" />
                </More>
              )}
            </Card>
          ))}
        </Grid>
        {jetCard && (
          <JetCard as={Reveal} delay={80}>
            <JetIcon>
              <i className={jetCard.icon} />
            </JetIcon>
            <JetText>
              <h3>{jetCard.title}</h3>
              <p>{jetCard.desc}</p>
            </JetText>
          </JetCard>
        )}
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
  display: block;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 40px 34px;
  transition: all 0.3s ease;
  color: inherit;
  text-decoration: none;
  cursor: ${({ $link }) => ($link ? "pointer" : "default")};

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

const More = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.base};

  i {
    transition: transform 0.3s ease;
  }

  ${Card}:hover & i {
    transform: translateX(4px);
  }
`;

const JetCard = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 34px;
  background: #000;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 46px 44px;
  color: #fff;

  h3 {
    font-size: 26px;
    margin: 0 0 10px;
    color: #fff;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.72);
  }

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
    padding: 36px 28px;
  }
`;

const JetText = styled.div`
  flex: 1;
`;

const JetIcon = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.base};
  color: #fff;
  font-size: 26px;
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

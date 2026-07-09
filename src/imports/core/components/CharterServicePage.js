"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { fs28, fs67, sectionSubtitle } from "@/styles/typography";

export default function CharterServicePage({ data }) {
  const { hero, options, cta } = data;
  const columns = options.items.length;

  return (
    <main>
      <Hero $bg={hero.image}>
        <HeroOverlay />
        <HeroInner>
          <Container>
            <Kicker>{hero.kicker}</Kicker>
            <HeroTitle>{hero.title}</HeroTitle>
            <HeroTagline>{hero.tagline}</HeroTagline>
            <HeroCta href="/contact">
              Enquire Now <i className="fa-solid fa-arrow-right" />
            </HeroCta>
          </Container>
        </HeroInner>
      </Hero>

      <Section $top="120px" $bottom="110px">
        <Container>
          <IntroWrap>
            <SectionHeading
              center
              subtitle={data.subtitle}
              title={data.title}
              maxWidth="720px"
            />
            <IntroLead as={Reveal} variant="fade-up" delay={100}>
              {data.intro}
            </IntroLead>
          </IntroWrap>
        </Container>
      </Section>

      <Section $gray $top="110px" $bottom="110px">
        <Container>
          <SectionHeading
            center
            subtitle={options.subtitle}
            title={options.title}
            maxWidth="640px"
          />
          <CardGrid $columns={columns}>
            {options.items.map((item, idx) => (
              <Card key={item.label} as={Reveal} variant="fade-up" delay={100 + idx * 90}>
                <CardIcon>
                  <i className={item.icon} />
                </CardIcon>
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      <CtaBand $bg={hero.image}>
        <CtaOverlay />
        <Container>
          <CtaInner as={Reveal} variant="fade-up">
            <p>{cta}</p>
            <CtaButton href="/contact">
              Get in Touch <i className="fa-solid fa-arrow-right" />
            </CtaButton>
          </CtaInner>
        </Container>
      </CtaBand>
    </main>
  );
}

const Hero = styled.section`
  position: relative;
  height: 80vh;
  min-height: 560px;
  max-height: 820px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  background-position: center;

  @media (max-width: 767px) {
    height: 78vh;
    min-height: 480px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(15, 15, 15, 0.82) 0%,
    rgba(15, 15, 15, 0.55) 45%,
    rgba(15, 15, 15, 0.25) 100%
  );
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  color: ${({ theme }) => theme.white};
`;

const Kicker = styled.p`
  ${sectionSubtitle}
  && {
    color: ${({ theme }) => theme.base};
    margin-bottom: 20px;
  }
`;

const HeroTitle = styled.h1`
  ${fs67}
  color: ${({ theme }) => theme.white};
  max-width: 820px;
  margin: 0 0 22px;
`;

const HeroTagline = styled.p`
  font-size: 20px;
  line-height: 1.6em;
  color: rgba(255, 255, 255, 0.85);
  max-width: 540px;
  margin: 0 0 40px;

  @media (max-width: 767px) {
    font-size: 17px;
  }
`;

const HeroCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 34px;
  border-radius: 40px;
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  i {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.heading};

    i {
      transform: translateX(4px);
    }
  }
`;

const IntroWrap = styled.div`
  max-width: 820px;
  margin: 0 auto;
`;

const IntroLead = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  line-height: 1.9em;
  font-size: 18px;
  margin: 0 auto;
  max-width: 760px;

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const CardGrid = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: 26px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 18px;
    max-width: 620px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 44px 36px;
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;

  h3 {
    ${fs28}
    font-size: 24px;
    color: ${({ theme }) => theme.heading};
    margin: 0 0 14px;
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

  @media (max-width: 767px) {
    padding: 34px 28px;
  }
`;

const CardIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  height: 66px;
  margin-bottom: 26px;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(170, 132, 83, 0.14)" : "rgba(170, 132, 83, 0.1)"};
  color: ${({ theme }) => theme.base};
  font-size: 24px;
`;

const CtaBand = styled.section`
  position: relative;
  padding: 130px 0;
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 100px 0;
    background-attachment: scroll;
  }
`;

const CtaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 15, 0.62);
`;

const CtaInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;

  p {
    ${fs28}
    font-style: italic;
    color: ${({ theme }) => theme.white};
    margin: 0 0 36px;
    line-height: 1.5em;
  }
`;

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 36px;
  border-radius: 40px;
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  i {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.heading};

    i {
      transform: translateX(4px);
    }
  }
`;

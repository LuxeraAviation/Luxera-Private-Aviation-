"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { fs28, fs67, sectionSubtitle } from "@/styles/typography";
import { EMPTY_LEGS } from "@/imports/core/constants/emptyLegs";

export default function EmptyLegsPage() {
  const { hero, why, stayInformed } = EMPTY_LEGS;

  return (
    <main>
      <Hero data-hero>
        <HeroVideo
          src={hero.video}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
        />
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
        <ScrollCue aria-hidden>
          <i className="fa-solid fa-chevron-down" />
        </ScrollCue>
      </Hero>

      <Section $top="120px" $bottom="120px">
        <Container>
          <IntroGrid>
            <div>
              <SectionHeading subtitle={EMPTY_LEGS.subtitle} title={EMPTY_LEGS.title} />
              <Lead as={Reveal} variant="fade-up" delay={100}>
                {EMPTY_LEGS.intro}
              </Lead>
              <Block as={Reveal} variant="fade-up" delay={150}>
                <BlockTitle>{EMPTY_LEGS.what.title}</BlockTitle>
                <p>{EMPTY_LEGS.what.body}</p>
              </Block>
            </div>

            <Aside as={Reveal} variant="fade-left" delay={200}>
              <ImageWrap>
                <Image
                  src={EMPTY_LEGS.feature}
                  alt="Luxera private jet at sunset"
                  width={560}
                  height={720}
                />
              </ImageWrap>
            </Aside>
          </IntroGrid>
        </Container>
      </Section>

      <Section $gray $top="110px" $bottom="110px">
        <Container>
          <SectionHeading center subtitle="THE LUXERA DIFFERENCE" title={why.title} maxWidth="640px" />
          <CardGrid>
            {why.items.map((item, idx) => (
              <Card key={item.label} as={Reveal} variant="fade-up" delay={100 + idx * 80}>
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

      <Section $top="120px" $bottom="120px">
        <Container>
          <InformWrap>
            <SectionHeading
              center
              subtitle="STAY AHEAD"
              title={stayInformed.title}
              maxWidth="640px"
            />
            <InformLead>{stayInformed.intro}</InformLead>

            {stayInformed.items.map((item) => (
              <SpecialistCard key={item.label} as={Reveal} variant="fade-up" delay={100}>
                <SpecialistIcon>
                  <i className="fa-solid fa-headset" />
                </SpecialistIcon>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.body}</p>
                </div>
              </SpecialistCard>
            ))}

            <NoteBox as={Reveal} variant="fade-up" delay={150}>
              <strong>Note:</strong> {stayInformed.note}
            </NoteBox>
          </InformWrap>
        </Container>
      </Section>

      <CtaBand $bg={EMPTY_LEGS.image}>
        <CtaOverlay />
        <Container>
          <CtaInner as={Reveal} variant="fade-up">
            <p>{stayInformed.closing}</p>
            <CtaButton href="/contact">
              Secure Your Flight <i className="fa-solid fa-arrow-right" />
            </CtaButton>
          </CtaInner>
        </Container>
      </CtaBand>
    </main>
  );
}

const Hero = styled.section`
  position: relative;
  height: 100vh;
  min-height: 620px;
  max-height: 900px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${({ theme }) => theme.heading};

  @media (max-width: 767px) {
    height: 88vh;
    min-height: 520px;
  }
`;

const HeroVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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

const ScrollCue = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.75);
  font-size: 20px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translate(-50%, 0);
    }
    50% {
      transform: translate(-50%, 10px);
    }
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 70px;
  align-items: flex-start;

  p {
    color: ${({ theme }) => theme.text};
    line-height: 1.85em;
    margin: 0 0 16px;
  }

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 44px;
  }
`;

const Lead = styled.p`
  && {
    margin: 24px 0 0;
  }
`;

const Block = styled.div`
  margin-top: 40px;
`;

const BlockTitle = styled.h3`
  ${fs28}
  color: ${({ theme }) => theme.heading};
  margin: 0 0 18px;
`;

const Aside = styled.div`
  position: sticky;
  top: 120px;

  @media (max-width: 991px) {
    position: static;
    order: -1;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22);

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 14px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 4px;
    pointer-events: none;
  }
`;

const CardGrid = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 40px 38px;
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
    padding: 32px 28px;
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

const InformWrap = styled.div`
  max-width: 820px;
  margin: 0 auto;
`;

const InformLead = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  line-height: 1.85em;
  margin: 0 auto 44px;
  max-width: 640px;
`;

const SpecialistCard = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 34px 38px;
  border-radius: 10px;
  background: ${({ theme }) => theme.soft};
  border: 1px solid ${({ theme }) => theme.border};

  h3 {
    margin: 0 0 10px;
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 22px;
    color: ${({ theme }) => theme.heading};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.text};
    line-height: 1.8em;
  }

  @media (max-width: 575px) {
    flex-direction: column;
    gap: 18px;
    padding: 28px 24px;
  }
`;

const SpecialistIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.white};
  font-size: 22px;
`;

const NoteBox = styled.p`
  margin: 26px 0 0;
  padding: 22px 28px;
  border-left: 3px solid ${({ theme }) => theme.base};
  background: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(170, 132, 83, 0.08)" : "rgba(170, 132, 83, 0.05)"};
  border-radius: 0 8px 8px 0;
  color: ${({ theme }) => theme.text};
  line-height: 1.8em;

  strong {
    color: ${({ theme }) => theme.heading};
  }
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

"use client";

import Image from "next/image";
import styled from "styled-components";
import { theme, Reveal, waves } from "@/styles/Theme";
import Slider from "@/imports/core/components/Slider";

const CLIENTS = [
  {
    img: "/image/demo/1111.webp",
    name: "Randall Schwartz",
    role: "Sr. Consultant",
    text: "We teach martial arts because we love it — not because we want to make money on you.",
  },
  {
    img: "/image/demo/1111.webp",
    name: "Andru Smith",
    role: "Marketing Manager",
    text: "We teach martial arts because we love it — not because we want to make money on you.",
  },
];

export default function Clients() {
  return (
    <ClientSection>
      <ClientMap />
      <Container>
        <SectionHeader>
          <SubTitle>
            <span>Luxera</span> Testimonial
          </SubTitle>
          <SectionTitle>Our Customer Feedback</SectionTitle>
        </SectionHeader>
        <ClientArea>
          <Slider
            items={CLIENTS}
            perView={2}
            resolvePerView={(w) => (w >= 992 ? 2 : 1)}
            viewportPadding="55px 5px 35px"
            renderItem={(c) => (
              <ClientItem>
                <ClientHeader>
                  <ClientQuote>
                    <Image
                      src="/image/client/quote.png"
                      alt="quote"
                      width={49}
                      height={36}
                    />
                  </ClientQuote>
                  <ClientThumb>
                    <Image src={c.img} alt={c.name} width={94} height={125} />
                  </ClientThumb>
                </ClientHeader>
                <ClientContent>
                  <ClientText>{c.text}</ClientText>
                </ClientContent>
                <ClientFooter>
                  <div>
                    <ClientName>{c.name}</ClientName>
                    <ClientRole>{c.role}</ClientRole>
                  </div>
                  <ClientRatings>
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} className="fas fa-star" />
                    ))}
                  </ClientRatings>
                </ClientFooter>
              </ClientItem>
            )}
          />
          <VideoReveal variant="fade-left" duration={1200}>
            <ClientRightThumb>
              <Image
                src="/image/demo/plane2.webp"
                alt="client"
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
              />
              <ClientThumbOverlay>
                <VideoMain>
                  <div className="waves wave-1" />
                  <div className="waves wave-2" />
                  <div className="waves wave-3" />
                  <a
                    className="video-icon"
                    href="https://www.youtube.com/embed/Hw4ctvV25H0"
                  >
                    <Icon className="fas fa-play" />
                  </a>
                </VideoMain>
              </ClientThumbOverlay>
            </ClientRightThumb>
          </VideoReveal>
        </ClientArea>
      </Container>
    </ClientSection>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  z-index: 1;
`;

const Section = styled.section`
  padding: 120px 0;
  position: relative;
  @media (max-width: 767px) {
    padding: 70px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 800;
  font-size: 14px;
  color: ${theme.base};
  margin-bottom: 12px;
  font-family: ${theme.fonts.mulish};

  span {
    color: ${theme.dark};
  }
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: ${theme.dark};

  @media (max-width: 767px) {
    font-size: 28px;
  }
`;

const VideoMain = styled.div`
  position: relative;
  width: 70px;
  height: 70px;

  .waves {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70px;
    height: 70px;
    margin-left: -35px;
    margin-top: -35px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    animation: ${waves} 3s ease-out infinite;
  }
  .wave-2 {
    animation-delay: 1s;
  }
  .wave-3 {
    animation-delay: 2s;
  }
  .video-icon {
    position: relative;
    z-index: 2;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #fff;
    color: ${theme.base};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }
`;

const ClientSection = styled(Section)`
  position: relative;
  overflow: hidden;
`;

const ClientMap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1178px;
  aspect-ratio: 1178 / 503;
  background: url("/image/client/map.png") center/contain no-repeat;
  z-index: 0;
`;

const ClientArea = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: stretch;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const ClientItem = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 30px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ClientHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const ClientQuote = styled.div`
  img {
    width: 50px;
    height: auto;
    padding-top: 20px;
  }
`;

const ClientThumb = styled.div`
  margin-top: -60px;
  img {
    width: 100px;
    height: auto;
    object-fit: cover;
  }
`;

const ClientContent = styled.div`
  flex-grow: 1;
`;

const ClientText = styled.p`
  font-size: 16px;
  margin-bottom: 22px;
  line-height: 1.7;
  margin: 0;
`;

const ClientFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
`;

const ClientName = styled.h4`
  font-size: 20px;
  line-height: 1.3;
  margin-bottom: 8px;
`;

const ClientRole = styled.span`
  color: ${theme.base};
  font-weight: 700;
  font-size: 14px;
`;

const ClientRatings = styled.span`
  color: rgb(255, 162, 0);
  font-size: 14px;
  margin-top: auto;
`;

const VideoReveal = styled(Reveal)`
  height: 100%;
  display: flex;

  @media (max-width: 767px) {
    display: block;
    height: auto;
  }
`;

const ClientRightThumb = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1;
  margin: 55px 10px 35px;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  @media (max-width: 767px) {
    flex: none;
    margin: 30px 0 0;
    aspect-ratio: 370 / 329;
  }
`;

const ClientThumbOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.i``;

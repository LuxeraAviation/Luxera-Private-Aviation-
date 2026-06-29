"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import AircraftCard from "@/imports/core/components/AircraftCard";
import { Reveal } from "@/styles/Theme";
import QuoteCard from "@/imports/AircraftDetails/ui/components/QuoteCard";
import { AIRCRAFT } from "@/imports/core/constants/fleet";

const GALLERY = ["/image/av/jet-sunset.webp", "/image/av/cabin-lounge.webp", "/image/av/jet-stairs.webp"];

const FACILITIES = [
  "High-Speed Wi-Fi",
  "Fully Reclining Seats",
  "Climate-Controlled Cabin",
  "Galley & Refreshments",
  "Noise-Cancelling Cabin",
  "Power & USB at Every Seat",
];

const EXTRA = [
  "Dedicated charter manager",
  "Door-to-door ground transfers",
  "Bespoke in-flight catering",
  "Pet & family friendly",
];

export default function AircraftDetailsPage() {
  const params = useSearchParams();
  const slug = params.get("aircraft");
  const room = AIRCRAFT.find((r) => r.slug === slug) || AIRCRAFT[0];
  const related = AIRCRAFT.filter((r) => r.slug !== room.slug).slice(0, 3);
  const [active, setActive] = useState(0);

  return (
    <main>
      <PageHeading title={room.title} bg="/image/luxera/new.png" />

      <Section $top="140px" $bottom="140px">
        <Container>
          <Layout>
            <Content>
              <MainImage>
                <Image src={GALLERY[active]} alt={room.title} fill sizes="(max-width: 991px) 100vw, 65vw" priority />
              </MainImage>
              <Thumbs>
                {GALLERY.map((g, i) => (
                  <Thumb key={g} $active={i === active} onClick={() => setActive(i)}>
                    <Image src={g} alt="" fill sizes="120px" />
                  </Thumb>
                ))}
              </Thumbs>

              <Block>
                <h2>About this Aircraft</h2>
                <p>
                  The {room.title} is ideal for {room.features[1]?.toLowerCase()}
                  , offering {room.features[0]} so you reach your destination
                  directly and in comfort. Charter it from {room.price} with
                  vetted crew and a spotless cabin every time.
                </p>
                <p>
                  Skip the terminals and the layovers — board minutes before
                  departure, work or rest in a private cabin, and let our team
                  handle catering, transfers, and every detail end to end.
                </p>
              </Block>

              <Columns>
                <div>
                  <h3>Cabin Features</h3>
                  <List>
                    {FACILITIES.map((f) => (
                      <li key={f}>
                        <i className="fa-solid fa-check" />
                        {f}
                      </li>
                    ))}
                  </List>
                </div>
                <div>
                  <h3>Onboard Services</h3>
                  <List>
                    {EXTRA.map((f) => (
                      <li key={f}>
                        <i className="fa-solid fa-check" />
                        {f}
                      </li>
                    ))}
                  </List>
                </div>
              </Columns>
            </Content>

            <Side>
              <QuoteCard price={room.price} />
            </Side>
          </Layout>
        </Container>
      </Section>

      <Section $gray $top="130px" $bottom="140px">
        <Container>
          <SectionHeading center subtitle="OUR FLEET" title="Related Aircraft" />
          <Grid>
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 70}>
                <AircraftCard room={r} />
              </Reveal>
            ))}
          </Grid>
        </Container>
      </Section>
    </main>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 50px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div``;

const MainImage = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: 6px;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 14px;
  margin: 14px 0 40px;
`;

const Thumb = styled.button`
  position: relative;
  width: 120px;
  height: 84px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  border: 2px solid
    ${({ theme, $active }) => ($active ? theme.base : "transparent")};

  img {
    object-fit: cover;
  }
`;

const Block = styled.div`
  margin-bottom: 40px;

  h2 {
    font-size: 34px;
    margin: 0 0 18px;
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  h3 {
    font-size: 24px;
    margin: 0 0 18px;
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;

    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${({ theme }) => theme.base};
      color: ${({ theme }) => theme.white};
      font-size: 10px;
      flex-shrink: 0;
    }
  }
`;

const Side = styled.div``;

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

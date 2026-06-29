"use client";

import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import BookingForm from "@/imports/core/components/BookingForm";
import AircraftCard from "@/imports/core/components/AircraftCard";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { AIRCRAFT } from "@/imports/core/constants/fleet";

export default function FleetPage() {
  return (
    <main>
      <PageHeading title="Our Fleet" bg="/image/luxera/new.png" />

      <FormZone>
        <Container>
          <BookingForm />
        </Container>
      </FormZone>

      <Section $top="100px" $bottom="150px">
        <Container>
          <SectionHeading
            center
            subtitle="OUR FLEET"
            title="Choose the Right Aircraft for Your Mission"
          />
          <Grid>
            {AIRCRAFT.map((room, i) => (
              <Reveal key={room.slug} delay={i * 70}>
                <AircraftCard room={room} />
              </Reveal>
            ))}
          </Grid>
        </Container>
      </Section>
    </main>
  );
}

const FormZone = styled.div`
  position: relative;
  margin-top: -75px;
  z-index: 10;

  @media (max-width: 1199px) {
    margin-top: -40px;
  }
`;

const Grid = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

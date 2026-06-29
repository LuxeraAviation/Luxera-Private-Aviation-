"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import Slider from "@/imports/core/components/Slider";
import SliderArrows from "@/imports/core/components/SliderArrows";
import AircraftCard from "@/imports/core/components/AircraftCard";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { AIRCRAFT } from "@/imports/core/constants/fleet";
import { HOME_SECTIONS } from "@/imports/core/constants/homepage";

export default function Fleet() {
  return (
    <Section $top="141px" $bottom="145px">
      <Container>
        <SectionHeading
          center
          subtitle={HOME_SECTIONS.rooms.subtitle}
          title={HOME_SECTIONS.rooms.title}
          maxWidth="760px"
        />
        <SliderArea>
          <Slider
            items={AIRCRAFT}
            perView={3}
            loop
            slideGap={40}
            controls={SliderArrows}
            renderItem={(room) => <AircraftCard room={room} />}
          />
        </SliderArea>
      </Container>
    </Section>
  );
}

const SliderArea = styled.div`
  margin-top: 80px;

  @media (max-width: 991px) {
    margin-top: 50px;
  }
`;

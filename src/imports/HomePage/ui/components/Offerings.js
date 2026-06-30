"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import Slider from "@/imports/core/components/Slider";
import SliderArrows from "@/imports/core/components/SliderArrows";
import OfferingCard from "@/imports/core/components/OfferingCard";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { OFFERINGS } from "@/imports/core/constants/services";
import { HOME_SECTIONS } from "@/imports/core/constants/homepage";

export default function Offerings() {
  return (
    <Section $top="141px" $bottom="150px">
      <Container>
        <SectionHeading
          center
          subtitle={HOME_SECTIONS.offerings.subtitle}
          title={HOME_SECTIONS.offerings.title}
          maxWidth="700px"
        />
        <SliderArea>
          <Slider
            items={OFFERINGS}
            perView={3}
            loop
            slideGap={60}
            controls={SliderArrows}
            renderItem={(o) => (
              <OfferingCard
                image={o.image}
                title={o.title}
                desc={o.desc}
                href={o.href}
              />
            )}
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

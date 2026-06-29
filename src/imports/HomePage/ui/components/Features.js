"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import Slider from "@/imports/core/components/Slider";
import SliderArrows from "@/imports/core/components/SliderArrows";
import PostCard from "@/imports/core/components/PostCard";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { FEATURES } from "@/imports/core/constants/services";
import { HOME_SECTIONS } from "@/imports/core/constants/homepage";

export default function Features() {
  return (
    <Section $top="141px" $bottom="150px">
      <Container>
        <SectionHeading
          center
          subtitle={HOME_SECTIONS.features.subtitle}
          title={HOME_SECTIONS.features.title}
          maxWidth="700px"
        />
        <SliderArea>
          <Slider
            items={FEATURES}
            perView={3}
            loop
            slideGap={60}
            controls={SliderArrows}
            renderItem={(f) => (
              <PostCard
                image={f.image}
                title={f.title}
                desc={f.desc}
                href={f.href}
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

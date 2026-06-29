"use client";

import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import Slider from "@/imports/core/components/Slider";
import SliderArrows from "@/imports/core/components/SliderArrows";
import PostCard from "@/imports/core/components/PostCard";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { POSTS } from "@/imports/core/constants/journal";
import { HOME_SECTIONS } from "@/imports/core/constants/homepage";

export default function JournalPreview() {
  return (
    <Section $gray $top="141px" $bottom="150px">
      <Container>
        <SectionHeading
          center
          subtitle={HOME_SECTIONS.blog.subtitle}
          title={HOME_SECTIONS.blog.title}
        />
        <SliderArea>
          <Slider
            items={POSTS}
            perView={3}
            loop
            slideGap={60}
            controls={SliderArrows}
            renderItem={(p) => (
              <PostCard
                image={p.image}
                title={p.title}
                // href={`/article?article=${p.slug}`}
                href="#"
                meta={{ author: p.author, date: p.date }}
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

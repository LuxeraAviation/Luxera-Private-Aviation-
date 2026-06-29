"use client";

import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import CrewCard from "@/imports/Crew/ui/components/CrewCard";
import AuthorCard from "@/imports/Crew/ui/components/AuthorCard";
import { TEAM } from "@/imports/core/constants/crew";

export default function CrewPage() {
  return (
    <main>
      <PageHeading title="Our Crew" bg="/image/luxera/new.png" />
      <Section $gray $top="140px" $bottom="150px">
        <Container>
          <SectionHeading
            center
            subtitle="OUR CREW"
            title="The People Behind Every Luxera Flight"
          />
          <Grid>
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <CrewCard member={m} />
              </Reveal>
            ))}
          </Grid>
        </Container>
      </Section>
      <AuthorCard />
    </main>
  );
}

const Grid = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

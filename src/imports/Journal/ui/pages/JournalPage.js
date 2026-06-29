"use client";

import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import { Reveal } from "@/styles/Theme";
import ArticleListItem from "@/imports/Journal/ui/components/ArticleListItem";
import JournalSidebar from "@/imports/Journal/ui/components/JournalSidebar";
import { POSTS } from "@/imports/core/constants/journal";

export default function JournalPage() {
  return (
    <main>
      <PageHeading title="Journal" bg="/image/luxera/new.png" />
      <Section $top="140px" $bottom="150px">
        <Container>
          <Layout>
            <Posts>
              {POSTS.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <ArticleListItem post={p} />
                </Reveal>
              ))}
            </Posts>
            <JournalSidebar />
          </Layout>
        </Container>
      </Section>
    </main>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 50px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Posts = styled.div`
  display: grid;
  gap: 60px;
`;

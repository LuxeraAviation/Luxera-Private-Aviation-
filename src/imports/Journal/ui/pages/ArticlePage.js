"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import JournalSidebar from "@/imports/Journal/ui/components/JournalSidebar";
import { POSTS, BLOG_TAGS } from "@/imports/core/constants/journal";

export default function ArticlePage() {
  const params = useSearchParams();
  const slug = params.get("article");
  const post = POSTS.find((p) => p.slug === slug) || POSTS[0];

  return (
    <main>
      <PageHeading title="Journal" bg="/image/luxera/new.png" />
      <Section $top="140px" $bottom="150px">
        <Container>
          <Layout>
            <Article>
              <Hero>
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 991px) 100vw, 60vw" priority />
              </Hero>
              <Meta>
                <span>By {post.author}</span>
                <Sep />
                <span>{post.date}</span>
                <Sep />
                <span>{post.category}</span>
              </Meta>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <p>
                From the moment you book, every detail of your flight is
                handled. Our charter desk works quietly behind the scenes —
                sourcing the right aircraft, arranging ground transfers, and
                tailoring the cabin to exactly how you like to travel.
              </p>
              <Blockquote>
                “Luxury is measured in time. At Luxera, every flight is built to
                give you more of it — privately, and on your schedule.”
              </Blockquote>
              <p>
                Whether you are closing a deal across three cities in a day,
                flying the family somewhere remote, or catching an empty-leg
                deal at short notice, our promise is the same: seamless, private,
                and entirely on your terms.
              </p>
              <Image
                src="/image/av/cabin-wide.webp"
                alt={post.title}
                width={780}
                height={460}
                style={{ width: "100%", height: "auto", borderRadius: 6, margin: "10px 0 24px" }}
              />
              <p>
                Skip the queues, the layovers, and the compromises. With Luxera,
                the journey becomes as effortless as the destination — wheels up
                whenever you are ready.
              </p>
              <Tags>
                <strong>Tags:</strong>
                {BLOG_TAGS.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </Tags>
            </Article>
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

const Article = styled.article`
  h2 {
    font-size: 38px;
    margin: 0 0 18px;
  }

  @media (max-width: 767px) {
    h2 {
      font-size: 28px;
    }
  }
`;

const Hero = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 30px;

  img {
    object-fit: cover;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Sep = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.base};
`;

const Blockquote = styled.blockquote`
  margin: 28px 0;
  padding: 28px 32px;
  border-left: 3px solid ${({ theme }) => theme.base};
  background: ${({ theme }) => theme.soft};
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 24px;
  color: ${({ theme }) => theme.heading};
  border-radius: 0 6px 6px 0;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;

  span {
    padding: 6px 16px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    font-size: 14px;
  }
`;

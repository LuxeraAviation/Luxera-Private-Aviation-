"use client";

import styled from "styled-components";
import Image from "next/image";
import { theme, Reveal } from "@/styles/Theme";
import { BLOGS } from "@/imports/core/constants/homepage";
import Link from "next/link";

export default function Blog() {
  return (
    <BlogSection>
      <Container>
        <SectionHeader>
          <SubTitle>
            Flynext <SubTitleBlog>Blog</SubTitleBlog>
          </SubTitle>
          <SectionTitle>Latest News From Us</SectionTitle>
        </SectionHeader>
        <BlogGrid>
          {BLOGS.map((b, i) => (
            <Reveal
              key={b.title}
              variant="fade-up"
              duration={900}
              delay={i * 120}
            >
              <BlogItem>
                <BlogThumb>
                  <Image
                    src={b.img}
                    alt={b.title}
                    width={310}
                    height={216}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </BlogThumb>
                <BlogContent>
                  <BlogPostMeta>
                    <BlogPostMetaDate>{b.date}</BlogPostMetaDate>
                    <BlogPostMetaComment>{b.comment}</BlogPostMetaComment>
                  </BlogPostMeta>
                  <BlogTitle>
                    <BlogLink href="#0">{b.title}</BlogLink>
                  </BlogTitle>
                  <BlogText>{b.text}</BlogText>
                  <BlogBtn>
                    <BlogBtnLink href="#0">
                      Read More <ArrowIcon className="fas fa-arrow-right" />
                    </BlogBtnLink>
                  </BlogBtn>
                </BlogContent>
              </BlogItem>
            </Reveal>
          ))}
        </BlogGrid>
      </Container>
    </BlogSection>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const BlogSection = styled.section`
  padding: 120px 0;
  position: relative;
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  letter-spacing: 2px;
  font-weight: 800;
  font-size: 20px;
  color: ${theme.base};
  margin-bottom: 20px;
  font-family: ${theme.fonts.mulish};
`;

const SubTitleBlog = styled.span`
  color: ${theme.dark};
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  font-family: ${theme.fonts.playfair};
  line-height: 1.2;
  color: ${theme.dark};
  margin: 0;
  @media (max-width: 767px) {
    font-size: 28px;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }

  & > *:nth-child(3) {
    @media (max-width: 991px) and (min-width: 576px) {
      grid-column: span 2;
      justify-self: center;
      width: 100%;
      max-width: calc(50% - 15px);
    }
  }
`;

const BlogItem = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: all 0.3s;

  .dark & {
    background-color: #1f2e3c;
  }
`;

const BlogThumb = styled.div`
  overflow: hidden;
  border-radius: 10px;
  aspect-ratio: 310 / 216;
`;

const BlogContent = styled.div`
  padding-top: 20px;
`;

const BlogTitle = styled.h3`
  font-size: 24px;
  font-family: ${theme.fonts.playfair};
  font-weight: 600;
  margin-bottom: 15px;
  line-height: 1.5;
  margin-top: 0;

  @media (max-width: 991px) {
    line-height: 1.5;
    font-size: 18px;
  }

  .dark & {
    color: white;
  }
`;

const BlogLink = styled(Link)`
  transition: all 0.5s;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #dcbb87;
  }
`;

const BlogPostMeta = styled.div`
  margin-bottom: 10px;
`;

const BlogPostMetaSpan = styled.span`
  color: #8e8e8e;
  font-size: 14px;

  @media (max-width: 991px) {
    font-size: 12px;
  }

  .dark & {
    color: #dfdfdf;
  }
`;

const BlogPostMetaDate = styled(BlogPostMetaSpan)`
  position: relative;
  padding-right: 20px;
  margin-right: 18px;

  &::before {
    position: absolute;
    content: "";
    top: 7px;
    right: 0;
    width: 1px;
    height: 10px;
    background-color: #dcbb87;
  }
`;

const BlogPostMetaComment = styled(BlogPostMetaSpan)``;

const BlogText = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  color: #777;
  line-height: 1.6;
  margin-bottom: 15px;
  margin-top: 0;

  .dark & {
    color: #dfdfdf;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const BlogBtn = styled.div``;

const ArrowIcon = styled.i`
  font-size: 12px;
  transition: all 0.5s;
  position: relative;
  top: 1px;
`;

const BlogBtnLink = styled(Link)`
  color: #dcbb87;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover ${ArrowIcon} {
    padding-left: 5px;
  }
`;

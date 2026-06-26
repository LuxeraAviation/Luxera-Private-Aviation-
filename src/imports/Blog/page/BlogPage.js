"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/imports/core/components/Banner";
import { BLOG_BANNER } from "@/imports/core/constants/banner";
import Container from "@/imports/core/atom/Container";
import Flex from "@/imports/core/atom/Flex";
import { theme } from "@/styles/Theme";
import { BLOG_DATA } from "@/imports/core/constants/blogData";
import BlogSidebar from "@/imports/Blog/components/BlogSidebar";

export default function BlogPage() {
  const data = BLOG_DATA;
  const [activePage, setActivePage] = useState(1);

  return (
    <main>
      <Banner banner={BLOG_BANNER} />
      <BlogSection>
        <StyledContainer>
          <ContentGrid>
            <MainCol $direction="column">
              <BlogGrid>
                {data.posts.map((post, idx) => (
                  <BlogCardWrapper key={idx}>
                    <BlogItem>
                      <BlogThumb>
                        <Image
                          src={post.img}
                          alt={post.title}
                          width={370}
                          height={245}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                      </BlogThumb>
                      <BlogContent>
                        <BlogPostMeta>
                          <DateSpan>{post.date}</DateSpan>
                          <CommentSpan>{post.comment}</CommentSpan>
                        </BlogPostMeta>
                        <BlogTitle>
                          <Link href={post.url}>{post.title}</Link>
                        </BlogTitle>
                        <BlogParagraph>{post.text}</BlogParagraph>
                        <BlogBtnArea>
                          <Link href={post.url}>
                            Read More <ArrowIcon />
                          </Link>
                        </BlogBtnArea>
                      </BlogContent>
                    </BlogItem>
                  </BlogCardWrapper>
                ))}
              </BlogGrid>

              <PaginationNav>
                <PaginationList>
                  <PageItem className="prev">
                    <PageLink
                      href="#0"
                      onClick={(e) => {
                        e.preventDefault();
                        if (activePage > 1) setActivePage(activePage - 1);
                      }}
                    >
                      PREV
                    </PageLink>
                  </PageItem>
                  {[1, 2, 3, 4, 5].map((pageNum) => (
                    <PageItem
                      key={pageNum}
                      className={activePage === pageNum ? "active" : ""}
                    >
                      <PageLink
                        href="#0"
                        onClick={(e) => {
                          e.preventDefault();
                          setActivePage(pageNum);
                        }}
                      >
                        {String(pageNum).padStart(2, "0")}
                      </PageLink>
                    </PageItem>
                  ))}
                  <PageItem className="next">
                    <PageLink
                      href="#0"
                      onClick={(e) => {
                        e.preventDefault();
                        if (activePage < 5) setActivePage(activePage + 1);
                      }}
                    >
                      NEXT
                    </PageLink>
                  </PageItem>
                </PaginationList>
              </PaginationNav>
            </MainCol>

            <SidebarCol $direction="column">
              <BlogSidebar sidebarData={data.sidebar} />
            </SidebarCol>
          </ContentGrid>
        </StyledContainer>
      </BlogSection>
    </main>
  );
}

const BlogSection = styled.section`
  padding: 120px 0;
  background-color: ${theme.white};
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1140px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const MainCol = styled(Flex)``;

const SidebarCol = styled(Flex)``;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCardWrapper = styled.div``;

const BlogItem = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogThumb = styled.div`
  overflow: hidden;
  border-radius: 10px;

  img {
    transition: transform 0.5s ease;
  }

  ${BlogItem}:hover & img {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding-top: 20px;
`;

const BlogPostMeta = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DateSpan = styled.span`
  color: ${theme.lightgray};
  font-family: ${theme.fonts.mulish};
  font-size: 14px;
  position: relative;
  padding-right: 15px;

  &::before {
    position: absolute;
    content: "";
    top: 4px;
    right: 0;
    width: 1px;
    height: 10px;
    background-color: ${theme.base};
  }

  @media (max-width: 991px) {
    font-size: 12px;
  }
`;

const CommentSpan = styled.span`
  color: ${theme.lightgray};
  font-family: ${theme.fonts.mulish};
  font-size: 14px;

  @media (max-width: 991px) {
    font-size: 12px;
  }
`;

const BlogTitle = styled.h3`
  font-family: ${theme.fonts.mulish};
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;
  line-height: 1.5;

  a {
    color: ${theme.dark};
    text-decoration: none;
    transition: all 0.5s ease;

    &:hover {
      color: ${theme.base};
    }
  }

  @media (max-width: 991px) {
    font-size: 18px;
  }
`;

const BlogParagraph = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 15px;
  color: ${theme.text};
  line-height: 1.6;
  margin: 0 0 15px 0;
`;

const BlogBtnArea = styled.div`
  a {
    color: ${theme.base};
    font-family: ${theme.fonts.mulish};
    font-size: 16px;
    font-weight: 800;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;

    i {
      transition: all 0.5s ease;
    }

    &:hover i {
      transform: translateX(5px);
    }
  }
`;

const ArrowIcon = styled.i.attrs({ className: "icon-Group-2361" })`
  font-size: 12px;
`;

const PaginationNav = styled.nav`
  width: 100%;
`;

const PaginationList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 60px 0 0 0;
  gap: 10px;
`;

const PageItem = styled.li`
  text-align: center;
`;

const PageLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid ${theme.soft};
  color: ${theme.dark};
  font-family: ${theme.fonts.mulish};
  font-weight: 700;
  line-height: 38px;
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
  box-sizing: border-box;

  ${PageItem}.prev & {
    width: auto;
    height: auto;
    border: none;
    line-height: normal;
    padding: 10px 15px;
    border-radius: 0;
  }

  ${PageItem}.next & {
    width: auto;
    height: auto;
    border: none;
    line-height: normal;
    padding: 10px 15px;
    border-radius: 0;
  }

  ${PageItem}:hover &, ${PageItem}.active & {
    background-color: ${theme.base};
    border-color: transparent;
    color: ${theme.dark};
  }

  ${PageItem}.prev:hover &, ${PageItem}.next:hover & {
    background-color: transparent;
    color: ${theme.base};
  }
`;

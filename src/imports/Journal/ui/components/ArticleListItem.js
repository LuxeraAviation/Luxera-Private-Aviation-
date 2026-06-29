"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import ArrowButton from "@/imports/core/components/ArrowButton";

export default function ArticleListItem({ post }) {
  // const href = `/article?article=${post.slug}`;
  const href = "#";
  return (
    <Article>
      <Thumb href={href}>
        <Image src={post.image} alt={post.title} fill sizes="(max-width: 991px) 100vw, 60vw" />
      </Thumb>
      <Body>
        <Meta>
          <span>By {post.author}</span>
          <Sep />
          <span>{post.date}</span>
          <Sep />
          <span>{post.category}</span>
        </Meta>
        <Title>
          <Link href={href}>{post.title}</Link>
        </Title>
        <p>{post.excerpt}</p>
        <ArrowButton href={href}>Read More</ArrowButton>
      </Body>
    </Article>
  );
}

const Article = styled.article``;

const Thumb = styled(Link)`
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 26px;

  img {
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Body = styled.div``;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Sep = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.base};
`;

const Title = styled.h2`
  font-size: 34px;
  margin: 0 0 16px;

  a:hover {
    color: ${({ theme }) => theme.base};
  }

  @media (max-width: 767px) {
    font-size: 26px;
  }
`;

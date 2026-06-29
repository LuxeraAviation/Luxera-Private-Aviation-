"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { POSTS, BLOG_CATEGORIES, BLOG_TAGS } from "@/imports/core/constants/journal";

export default function JournalSidebar() {
  return (
    <Aside>
      <Widget>
        <SearchBar onSubmit={(e) => e.preventDefault()}>
          <input type="search" placeholder="Search here..." aria-label="Search" />
          <button type="submit" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </SearchBar>
      </Widget>

      <Widget>
        <Title>Categories</Title>
        <Categories>
          {BLOG_CATEGORIES.map((c) => (
            <li key={c}>
              <Link href="/">
                {c} <i className="fa-solid fa-chevron-right" />
              </Link>
            </li>
          ))}
        </Categories>
      </Widget>

      <Widget>
        <Title>Latest post</Title>
        <Latest>
          {POSTS.slice(0, 3).map((p) => (
            <li key={p.slug}>
              {/* <Thumb href={`/article?article=${p.slug}`}> */}
              <Thumb href="#">
                <Image src={p.image} alt={p.title} fill sizes="80px" />
              </Thumb>
              <div>
                <span>{p.date}</span>
                {/* <Link href={`/article?article=${p.slug}`}>{p.title}</Link> */}
                <Link href="#">{p.title}</Link>
              </div>
            </li>
          ))}
        </Latest>
      </Widget>

      <Widget>
        <Title>Popular tags</Title>
        <Tags>
          {BLOG_TAGS.map((t) => (
            <Link key={t} href="/">
              {t}
            </Link>
          ))}
        </Tags>
      </Widget>
    </Aside>
  );
}

const Aside = styled.aside`
  display: grid;
  gap: 40px;
`;

const Widget = styled.div``;

const Title = styled.h4`
  font-size: 22px;
  margin: 0 0 22px;
  position: relative;
  padding-bottom: 14px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background: ${({ theme }) => theme.base};
  }
`;

const SearchBar = styled.form`
  display: flex;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  overflow: hidden;

  input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 14px 18px;
    color: ${({ theme }) => theme.heading};
    font-family: inherit;
  }

  button {
    border: none;
    background: ${({ theme }) => theme.base};
    color: ${({ theme }) => theme.white};
    width: 54px;
    cursor: pointer;
  }
`;

const Categories = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};

    i {
      font-size: 11px;
      color: ${({ theme }) => theme.base};
    }

    &:hover {
      color: ${({ theme }) => theme.base};
    }
  }
`;

const Latest = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 20px;

  li {
    display: flex;
    gap: 16px;
  }

  span {
    display: block;
    font-size: 13px;
    color: ${({ theme }) => theme.base};
    margin-bottom: 6px;
  }

  a {
    color: ${({ theme }) => theme.heading};
    font-family: ${({ theme }) => theme.fonts.playfair};
    line-height: 1.4;

    &:hover {
      color: ${({ theme }) => theme.base};
    }
  }
`;

const Thumb = styled(Link)`
  position: relative;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  a {
    padding: 7px 16px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    font-size: 14px;
    color: ${({ theme }) => theme.text};

    &:hover {
      background: ${({ theme }) => theme.base};
      border-color: ${({ theme }) => theme.base};
      color: ${({ theme }) => theme.white};
    }
  }
`;

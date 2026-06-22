"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { theme } from "@/styles/Theme";

export default function BlogSidebar({ sidebarData }) {
  const [search, setSearch] = useState("");
  const { recentPosts = [], categories = [], tags = [] } = sidebarData || {};

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
  };

  return (
    <SidebarContainer>
      <WidgetBox>
        <WidgetTitle>Search</WidgetTitle>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton type="submit">
            <SearchIcon />
          </SearchButton>
        </SearchForm>
      </WidgetBox>

      {recentPosts && recentPosts.length > 0 && (
        <WidgetBox>
          <WidgetTitle>Recent Posts</WidgetTitle>
          <PopularCoursesList>
            {recentPosts.map((post, idx) => (
              <PopularCourseItem key={idx}>
                <CourseThumb>
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={70}
                    height={70}
                  />
                </CourseThumb>
                <PopularCourseContent>
                  <DateSpan>{post.date}</DateSpan>
                  <CourseLink href={post.url}>{post.title}</CourseLink>
                </PopularCourseContent>
              </PopularCourseItem>
            ))}
          </PopularCoursesList>
        </WidgetBox>
      )}

      {categories && categories.length > 0 && (
        <WidgetBox>
          <WidgetTitle>Categories</WidgetTitle>
          <CategoryList>
            {categories.map((cat, idx) => (
              <CategoryItem key={idx}>
                <CategoryLink href="#0">
                  <CategoryChevronIcon /> {cat.name}
                  <CategoryCount>{cat.count}</CategoryCount>
                </CategoryLink>
              </CategoryItem>
            ))}
          </CategoryList>
        </WidgetBox>
      )}

      {tags && tags.length > 0 && (
        <WidgetBox>
          <WidgetTitle>Tags</WidgetTitle>
          <TagList>
            {tags.map((tag, idx) => (
              <TagItem key={idx}>
                <TagLink href="#0">{tag}</TagLink>
              </TagItem>
            ))}
          </TagList>
        </WidgetBox>
      )}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;

  @media (max-width: 991px) {
    align-items: center;
  }
`;

const WidgetBox = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;
  z-index: 2;
  overflow: hidden;

  @media (max-width: 991px) {
    max-width: 410px;
  }
`;

const WidgetTitle = styled.h4`
  font-family: ${theme.fonts.mulish};
  font-size: 20px;
  font-weight: 800;
  color: ${theme.dark};
  margin: 0 0 20px 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -25px;
    top: 2px;
    width: 3px;
    height: 20px;
    background: ${theme.base};
  }
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-family: ${theme.fonts.mulish};
  font-size: 15px;
  color: #3d3d3d;
  outline: none;
  background-color: transparent;
  transition: all 0.3s ease;

  &::placeholder {
    color: #979797;
  }

  &:focus {
    border-color: ${theme.base};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${theme.dark};
  font-size: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.base};
  }
`;

const SearchIcon = styled.i.attrs({ className: "icon-Search" })``;

const PopularCoursesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PopularCourseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CourseThumb = styled.div`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  position: relative;

  img {
    object-fit: cover;
  }
`;

const PopularCourseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DateSpan = styled.span`
  font-family: ${theme.fonts.mulish};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 7px;
  color: #979797;
`;

const CourseLink = styled(Link)`
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  font-weight: 700;
  color: ${theme.dark};
  text-decoration: none;
  line-height: 1.3;
  transition: color 0.5s ease;

  &:hover {
    color: ${theme.base};
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const CategoryItem = styled.li`
  font-size: 15px;
  border-bottom: 1px dashed #e5e5e5;
  padding-bottom: 15px;
  margin-bottom: 15px;
  font-weight: 700;
  font-family: ${theme.fonts.mulish};

  &:last-child {
    border: none;
    padding: 0;
    margin: 0;
  }
`;

const CategoryLink = styled(Link)`
  display: block;
  color: ${theme.dark};
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    color: ${theme.base};
  }
`;

const CategoryCount = styled.span`
  float: right;

  &::before {
    content: "(";
  }
  &::after {
    content: ")";
  }
`;

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: -5px;
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled.li`
  margin: 5px;
`;

const TagLink = styled(Link)`
  display: inline-block;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 700;
  color: ${theme.text};
  text-decoration: none;
  font-family: ${theme.fonts.mulish};
  transition: all 0.5s ease;

  &:hover {
    background-color: ${theme.base};
    border-color: ${theme.base};
    color: white;
  }
`;

const CategoryChevronIcon = styled.i.attrs({
  className: "fas fa-chevron-right",
})`
  color: ${theme.base};
  margin-right: 5px;
`;

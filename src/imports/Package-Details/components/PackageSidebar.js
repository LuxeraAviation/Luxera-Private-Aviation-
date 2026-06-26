"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { theme } from "@/styles/Theme";

export default function PackageSidebar({ sidebarData }) {
  const [booking, setBooking] = useState({ name: "", email: "", phone: "" });
  const { recentPackages = [], categories = [], tags = [] } = sidebarData || {};

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for booking, ${booking.name}! We will contact you soon.`);
    setBooking({ name: "", email: "", phone: "" });
  };

  return (
    <SidebarContainer>
      <BookWidget $bgImage="/image/book.png">
        <Overlay />
        <BookContent>
          <WidgetTitle $white>Book This Tour</WidgetTitle>
          <BookForm onSubmit={handleBookingSubmit}>
            <FormGroup>
              <IconWrapper>
                <UserIcon />
              </IconWrapper>
              <Input
                type="text"
                placeholder="Name"
                value={booking.name}
                onChange={(e) =>
                  setBooking({ ...booking, name: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <IconWrapper>
                <EnvelopeIcon />
              </IconWrapper>
              <Input
                type="email"
                placeholder="Email"
                value={booking.email}
                onChange={(e) =>
                  setBooking({ ...booking, email: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <IconWrapper>
                <PhoneIcon />
              </IconWrapper>
              <Input
                type="tel"
                placeholder="Phone"
                value={booking.phone}
                onChange={(e) =>
                  setBooking({ ...booking, phone: e.target.value })
                }
                required
              />
            </FormGroup>
            <BookSubmitBtn type="submit">
              <PlaneIcon /> Book Now
            </BookSubmitBtn>
          </BookForm>
        </BookContent>
      </BookWidget>

      {recentPackages && recentPackages.length > 0 && (
        <WidgetBox>
          <WidgetTitle>Recent Tour Packages</WidgetTitle>
          <PopularCoursesList>
            {recentPackages.map((pkg, idx) => (
              <PopularCourseItem key={idx}>
                <CourseThumb>
                  <Image src={pkg.img} alt={pkg.title} width={70} height={70} />
                </CourseThumb>
                <PopularCourseContent>
                  <DateSpan>{pkg.date}</DateSpan>
                  <CourseLink href={pkg.url}>{pkg.title}</CourseLink>
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

const BookWidget = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  padding: 25px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  z-index: 2;
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;

  @media (max-width: 991px) {
    max-width: 410px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(25, 35, 45, 0.9);
  z-index: -1;
`;

const BookContent = styled.div`
  position: relative;
  z-index: 2;
`;

const WidgetTitle = styled.h4`
  font-family: ${theme.fonts.mulish};
  font-size: 18px;
  font-weight: 800;
  color: ${(props) => (props.$white ? "${theme.white}" : theme.dark)};
  margin: 0 0 20px 0;
  position: relative;
  padding-left: 0;

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

const BookForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 20px;
  color: ${theme.base};
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 11px 40px 11px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${theme.base};
  border-radius: 4px;
  color: ${theme.white};
  font-family: ${theme.fonts.mulish};
  font-size: 15px;
  font-weight: 500;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #fff;
  }

  &:focus {
    border-color: ${theme.base};
    background: rgba(255, 255, 255, 0.1);
  }
`;

const BookSubmitBtn = styled.button`
  align-self: center;
  background: ${theme.base};
  border: 1px solid ${theme.base};
  color: ${theme.dark};
  padding: 12px 30px;
  border-radius: 999px;
  font-family: ${theme.fonts.mulish};
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.5s ease;
  margin-top: 10px;

  & i {
    transition: all 0.5s ease;
    color: ${theme.dark};
  }

  &:hover {
    background: transparent;
    color: ${theme.base};
  }

  &:hover i {
    transform: rotate(40deg);
    color: ${theme.base};
  }
`;

const WidgetBox = styled.div`
  background: ${theme.white};
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

const PopularCoursesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopularCourseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0 0 30px;
  padding: 0 0 30px;
  border-bottom: 1px dashed #e5e5e5;
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
`;

const DateSpan = styled.span`
  font-family: ${theme.fonts.mulish};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 7px;
  color: #3d3d3d;
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

const UserIcon = styled.i.attrs({ className: "icon-name_icone" })``;

const EnvelopeIcon = styled.i.attrs({ className: "far fa-envelope" })``;

const PhoneIcon = styled.i.attrs({ className: "icon-call_icone" })``;

const PlaneIcon = styled.i.attrs({ className: "icon-btn-icon-v2" })`
  font-size: 14px;
`;

const CategoryChevronIcon = styled.i.attrs({
  className: "fas fa-chevron-right",
})`
  color: ${theme.base};
  margin-right: 5px;
`;

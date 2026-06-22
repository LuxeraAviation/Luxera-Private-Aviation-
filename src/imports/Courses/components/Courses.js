"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { theme, Reveal } from "@/styles/Theme";
import Container from "@/imports/core/atom/Container";
import { COURSES } from "@/imports/core/constants/courses";

export default function Courses() {
  return (
    <CourseSection>
      <StyledContainer>
        <Reveal variant="fade-up" duration={1000}>
          <SectionHeader>
            <SubTitle>Choose Course</SubTitle>
            <SectionTitle>Find The Right Course For You</SectionTitle>
          </SectionHeader>
        </Reveal>

        <CourseGrid>
          {COURSES.map((course, idx) => (
            <Reveal
              key={course.id}
              variant="fade-up"
              duration={1000}
              delay={idx * 100}
            >
              <CourseItem>
                <CourseThumb>
                  <ThumbImg
                    src={course.img}
                    alt={course.title}
                    width={370}
                    height={254}
                  />
                  <PrizeBadge>
                    <PrizeText>{course.price}</PrizeText>
                  </PrizeBadge>
                </CourseThumb>
                <CourseContent>
                  <ContentHeader>
                    <CourseTitle>
                      <Link href="/course-details">{course.title}</Link>
                    </CourseTitle>
                    <TimeInfo>
                      <ClockIcon />
                      <TimeText>{course.hours}</TimeText>
                    </TimeInfo>
                  </ContentHeader>
                  <ContentBody>
                    <CourseDescription>{course.description}</CourseDescription>
                  </ContentBody>
                  <ContentFooter>
                    <EnrollLink href="/course-details">
                      Enroll Now
                      <ArrowIcon />
                    </EnrollLink>
                  </ContentFooter>
                </CourseContent>
              </CourseItem>
            </Reveal>
          ))}
        </CourseGrid>
      </StyledContainer>
    </CourseSection>
  );
}

const CourseSection = styled.section`
  padding: 120px 0;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;

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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 800;
  font-size: 20px;
  color: ${theme.base};
  margin-bottom: 15px;
  font-family: ${theme.fonts.mulish};
  text-transform: uppercase;
  letter-spacing: 1.5px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.playfair};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: ${theme.dark};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const CourseItem = styled.div`
  background-color: #ffffff;
  box-shadow: 0 12px 30px rgba(220, 187, 135, 0.2);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CourseThumb = styled.div`
  position: relative;
  width: 100%;
`;

const ThumbImg = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
`;

const PrizeBadge = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
  background-color: ${theme.base};
  border-radius: 30px;
  padding: 5px 15px;
`;

const PrizeText = styled.span`
  color: ${theme.dark};
  font-weight: 800;
  font-size: 14px;
  font-family: ${theme.fonts.mulish};
`;

const CourseContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ContentHeader = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px dashed #e5e5e5;
  margin-bottom: 15px;
`;

const CourseTitle = styled.h3`
  font-family: ${theme.fonts.playfair};
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 10px 0;

  a {
    color: ${theme.dark};
    text-decoration: none;
    transition: color 0.5s ease;

    &:hover {
      color: ${theme.base};
    }
  }
`;

const TimeInfo = styled.span`
  color: ${theme.dark};
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: ${theme.fonts.mulish};
`;

const ClockIcon = styled.i.attrs({ className: "far fa-clock" })`
  color: ${theme.base};
  font-size: 20px;
`;

const TimeText = styled.span`
  font-size: 14px;
`;

const ContentBody = styled.div`
  flex-grow: 1;
`;

const CourseDescription = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 15px;
  line-height: 1.6;
  color: ${theme.text};
  margin: 0;
`;

const ContentFooter = styled.div`
  padding-top: 15px;
  border-top: 1px dashed #e5e5e5;
  margin-top: 15px;
`;

const EnrollLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-decoration: none;
  gap: 8px;
  padding: 12px 30px;
  border-radius: 999px;
  border: 1px solid ${theme.base};
  color: ${theme.base};
  font-size: 15px;
  font-weight: 800;
  font-family: ${theme.fonts.mulish};
  cursor: pointer;
  z-index: 0;
  transition: color 0.5s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${theme.base};
    border-radius: inherit;
    transform: scale(0);
    transform-origin: center;
    transition: transform 0.5s ease;
    z-index: -1;
  }

  &:hover::before {
    transform: scale(1);
  }

  &:hover {
    color: ${theme.dark};
  }

  &:hover i {
    transform: translateX(5px);
  }
`;

const ArrowIcon = styled.i.attrs({ className: "fas fa-arrow-right" })`
  font-size: 12px;
  transition: transform 0.35s ease;
`;

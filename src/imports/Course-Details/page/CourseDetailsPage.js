"use client";

import styled from "styled-components";
import Image from "next/image";
import Banner from "@/imports/core/components/Banner";
import { COURSE_DETAILS_BANNER } from "@/imports/core/constants/banner";
import Container from "@/imports/core/atom/Container";
import Flex from "@/imports/core/atom/Flex";
import { COURSE_DETAILS_DATA } from "@/imports/core/constants/courseData";
import CourseWidgets from "@/imports/Course-Details/components/CourseWidgets";
import CourseMainContent from "@/imports/Course-Details/components/CourseMainContent";
import CourseSidebar from "@/imports/Course-Details/components/CourseSidebar";
import {theme} from "@/styles/Theme";

export default function CourseDetailsPage() {
  const data = COURSE_DETAILS_DATA;

  return (
    <main>
      <Banner banner={COURSE_DETAILS_BANNER} />
      <DetailsSection>
        <StyledContainer>
          <HeaderWrapper $direction="column">
            <ImageWrapper>
              <Image
                src={data.img}
                alt="Course Details"
                width={1140}
                height={515}
                priority
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </ImageWrapper>
            <CourseWidgets stats={data.stats} />
          </HeaderWrapper>

          <ContentArea>
            <ContentGrid>
              <MainCol $direction="column">
                <CourseMainContent
                  about={data.about}
                  careerOpportunities={data.careerOpportunities}
                  studyOptions={data.studyOptions}
                  professionalExperience={data.professionalExperience}
                  reviews={data.reviews}
                />
              </MainCol>
              <SidebarCol $direction="column">
                <CourseSidebar
                  instructor={data.instructor}
                  moreCourses={data.moreCourses}
                />
              </SidebarCol>
            </ContentGrid>
          </ContentArea>
        </StyledContainer>
      </DetailsSection>
    </main>
  );
}

const DetailsSection = styled.section`
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

const HeaderWrapper = styled(Flex)`
  margin-bottom: 50px;
`;

const ImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  margin-bottom: 0px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const ContentArea = styled.div`
  padding-top: 80px;

  @media (max-width: 991px) {
    padding-top: 40px;
  }
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

"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import ArrowButton from "@/imports/core/components/ArrowButton";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import { SERVICE_INTRO, SERVICE_LIST } from "@/imports/core/constants/services";

export default function ServicesIntro() {
  return (
    <Section $top="150px" $bottom="0">
      <Container>
        <Grid>
          <ImageCol as={Reveal} variant="fade-right">
            <Back>
              <Image
                src={SERVICE_INTRO.image1}
                alt="Service"
                width={520}
                height={620}
              />
            </Back>
            <Front>
              <Image
                src={SERVICE_INTRO.image2}
                alt="Service"
                width={300}
                height={360}
              />
            </Front>
          </ImageCol>

          <TextCol>
            <SectionHeading
              subtitle={SERVICE_INTRO.subtitle}
              title={SERVICE_INTRO.title}
            />
            <List>
              {SERVICE_LIST.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-check" />
                  {item}
                </li>
              ))}
            </List>
            <ArrowButton href="/">Learn More</ArrowButton>
          </TextCol>
        </Grid>
      </Container>
    </Section>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  align-items: center;
  gap: 60px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageCol = styled.div`
  position: relative;
  padding-right: 80px;
  padding-bottom: 60px;

  img {
    border-radius: 5px;
    width: 100%;
    height: auto;
  }
`;

const Back = styled.div``;

const Front = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 55%;
  border: 8px solid ${({ theme }) => theme.bg};
  border-radius: 5px;
  overflow: hidden;
`;

const List = styled.ul`
  list-style: none;
  margin: 35px 0 48px;
  padding: 0;
  display: grid;
  gap: 14px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.heading};
    font-weight: 500;

    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${({ theme }) => theme.base};
      color: ${({ theme }) => theme.white};
      font-size: 10px;
    }
  }
`;

const TextCol = styled.div``;

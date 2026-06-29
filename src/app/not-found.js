"use client";

import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import ArrowButton from "@/imports/core/components/ArrowButton";

export default function NotFound() {
  return (
    <main>
      <PageHeading title="404" bg="/image/luxera/new.png" />
      <Section $top="130px" $bottom="150px">
        <Container>
          <Wrap>
            <Code>404</Code>
            <h2>Oops! Page Not Found!</h2>
            <p>
              Sorry, the page you&apos;re seeking isn&apos;t here. It could have
              been relocated or removed.
            </p>
            <ArrowButton href="/">Return Home</ArrowButton>
          </Wrap>
        </Container>
      </Section>
    </main>
  );
}

const Wrap = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto;

  h2 {
    font-size: 54px;
    margin: 0 0 18px;

    @media (max-width: 767px) {
      font-size: 34px;
    }
  }

  p {
    margin: 0 0 30px;
  }

  a {
    margin: 0 auto;
  }
`;

const Code = styled.h2`
  font-size: 150px;
  line-height: 1;
  color: ${({ theme }) => theme.base};
  margin: 0 0 18px;

  @media (max-width: 767px) {
    font-size: 90px;
  }
`;

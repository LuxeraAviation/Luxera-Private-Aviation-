"use client";

import styled from "styled-components";
import Container from "@/imports/core/atom/Container";
import { fs67 } from "@/styles/typography";

export default function PageHeading({ title, bg = "/image/luxera/new.png" }) {
  return (
    <Section $bg={bg}>
      <Overlay />
      <Container>
        <Title>{title}</Title>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  height: 600px;
  padding: 150px 0 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  background-position: center;

  @media (max-width: 1400px) {
    height: 500px;
  }

  @media (max-width: 991px) {
    height: 400px;
    padding: 120px 0 50px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(27, 27, 27, 0.5);
`;

const Title = styled.h1`
  position: relative;
  z-index: 2;
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.white};
  ${fs67}
`;

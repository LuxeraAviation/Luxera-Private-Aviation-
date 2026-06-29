"use client";

import Image from "next/image";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import { Reveal } from "@/styles/Theme";

export default function AuthorCard() {
  return (
    <Section $top="150px" $bottom="140px">
      <Container>
        <Inner as={Reveal}>
          <Avatar>
            <Image src="/image/author.png" alt="Founder" width={180} height={180} />
          </Avatar>
          <Message>
            Luxera was founded on a simple belief: that time is the ultimate
            luxury. We built a private aviation service that gives it back to
            you — pairing an elite global fleet with vetted crews and seamless
            concierge, so every journey is private, effortless, and entirely
            your own.
          </Message>
          <Image src="/image/signature.png" alt="Signature" width={170} height={60} />
          <Founder>Founder of Luxera</Founder>
        </Inner>
      </Container>
    </Section>
  );
}

const Inner = styled.div`
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
`;

const Avatar = styled.div`
  display: inline-flex;
  padding: 12px;
  border-radius: 50%;
  border: 1px dashed ${({ theme }) => theme.base};
  margin-bottom: 60px;

  img {
    border-radius: 50%;
  }
`;

const Message = styled.h3`
  font-size: 38px;
  line-height: 1.5;
  margin: 0 0 60px;

  @media (max-width: 991px) {
    font-size: 26px;
  }
`;

const Founder = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.base};
`;

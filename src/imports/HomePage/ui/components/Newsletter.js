"use client";

import { useState } from "react";
import styled from "styled-components";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import { Reveal } from "@/styles/Theme";
import { fs50 } from "@/styles/typography";
import { NEWSLETTER } from "@/imports/core/constants/homepage";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <Section $top="150px" $bottom="150px">
      <Container>
        <Inner as={Reveal}>
          <Icon>
            <i className="fa-regular fa-envelope" />
          </Icon>
          <Title>{NEWSLETTER.title}</Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe Now</button>
          </Form>
          {sent && <Note>Thank you for subscribing!</Note>}
        </Inner>
      </Container>
    </Section>
  );
}

const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.white};
  font-size: 26px;
  margin-bottom: 26px;
`;

const Title = styled.h2`
  ${fs50}
  margin: 0 0 36px;
`;

const Form = styled.form`
  display: flex;
  gap: 12px;
  max-width: 560px;
  margin: 0 auto;

  input {
    flex: 1;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.heading};
    border-radius: 5px;
    padding: 14px 18px;
    font-family: ${({ theme }) => theme.fonts.mulish};
  }

  button {
    border: none;
    background: ${({ theme }) => theme.base};
    color: ${({ theme }) => theme.white};
    border-radius: 5px;
    padding: 14px 26px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.heading};
    }
  }

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const Note = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.base};
`;

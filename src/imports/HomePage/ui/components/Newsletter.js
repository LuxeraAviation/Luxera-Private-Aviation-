"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import { Reveal } from "@/styles/Theme";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quote, setQuote] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/claudia@luxeraaviation.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _replyto: email,
          quote: quote,
          message: message,
          _subject: `New Quote Request from ${name}`,
          _captcha: "false",
        }),
      });
      setSent(true);
    } catch (error) {
      console.error("FormSubmit error:", error);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="quote-section" $top="120px" $bottom="120px">
      <Container>
        <SplitLayout as={Reveal}>
          <ImagePane>
            <Image
              src="/image/av/quote-image.jpg"
              alt="Private Jet Charter"
              fill
              sizes="(max-width: 991px) 100vw, 50vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </ImagePane>
          <FormPane>
            <QuoteHeader>
              <Subtitle>Request A Quote</Subtitle>
              <Title>Private Jet Charter</Title>
              <Desc>
                Get a personalized private flight quote from our 24/7 VIP
                aviation concierge team.
              </Desc>
            </QuoteHeader>

            {sent ? (
              <SuccessMessage>
                <SuccessTitle>Request Submitted Successfully</SuccessTitle>
                <SuccessText>
                  Thank you for requesting a quote. Our 24/7 VIP concierge will
                  contact you shortly at <SuccessEmail>{email}</SuccessEmail>.
                </SuccessText>
                <ResetButton
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setName("");
                    setEmail("");
                    setQuote("");
                    setMessage("");
                  }}
                >
                  Send Another Message
                </ResetButton>
              </SuccessMessage>
            ) : (
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <FormInput
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormInput
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <FormInput
                  type="text"
                  placeholder="Quote"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                />
                <FormTextArea
                  placeholder="Message / Special requests"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Request Quote"}
                </SubmitButton>
              </Form>
            )}
          </FormPane>
        </SplitLayout>
      </Container>
    </Section>
  );
}

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  background: ${({ theme }) => theme.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ImagePane = styled.div`
  position: relative;
  width: 100%;
  min-height: 450px;

  @media (max-width: 991px) {
    display: none;
  }
`;

const FormPane = styled.div`
  padding: 50px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1199px) {
    padding: 40px;
  }
  @media (max-width: 575px) {
    padding: 30px 20px;
  }
`;

const QuoteHeader = styled.div`
  margin-bottom: 30px;
`;

const Subtitle = styled.span`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 67px;
  color: ${({ theme }) => theme.heading};
  margin: 0 0 12px;
  font-weight: 400;

  @media (max-width: 575px) {
    font-size: 26px;
  }
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const FormInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.heading};
  border-radius: 5px;
  padding: 14px 18px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.base};
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.heading};
  border-radius: 5px;
  padding: 14px 18px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.base};
  }
`;

const SubmitButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  padding: 16px 26px;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 15px;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.heading};

  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const SuccessMessage = styled.div`
  background: ${({ theme }) => theme.soft};
  border: 1px solid ${({ theme }) => theme.base};
  border-radius: 6px;
  padding: 30px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const SuccessTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 22px;
  color: ${({ theme }) => theme.heading};
  margin: 0;
`;

const SuccessText = styled.p`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 15px;
  margin: 8px 0 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
`;

const SuccessEmail = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.heading};
`;

const ResetButton = styled.button`
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.base};
  border: 1px solid ${({ theme }) => theme.base};
  border-radius: 4px;
  padding: 10px 24px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.base};
    color: #fff;
  }
`;

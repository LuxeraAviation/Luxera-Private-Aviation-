"use client";

import { useState } from "react";
import styled from "styled-components";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/claudia@luxeraaviation.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _replyto: email,
          quote: notes,
          message: notes,
          _subject: `New Quote Request from ${name}`,
          _captcha: "false",
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("FormSubmit error:", error);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessCard>
        <SuccessIconWrapper>
          <i className="fa-solid fa-check" />
        </SuccessIconWrapper>
        <SuccessTitle>Request Submitted Successfully</SuccessTitle>
        <SuccessText>
          Thank you for requesting a quote. Our 24/7 VIP concierge will contact
          you shortly at <EmailHighlight>{email}</EmailHighlight>.
        </SuccessText>
        <ResetButton
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setNotes("");
          }}
        >
          Request Another Quote
        </ResetButton>
      </SuccessCard>
    );
  }

  return (
    <Form
      onSubmit={handleSubmit}
      action="https://formsubmit.co/claudia@luxeraaviation.com"
      method="POST"
    >
      <Input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />

      <Input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
      />

      <Input
        type="text"
        name="message"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Message / Special requests"
      />

      <Submit type="submit" disabled={loading}>
        {loading ? "Sending..." : "Request Quote"}
      </Submit>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr auto;
  align-items: center;
  gap: 14px;
  background: ${({ theme }) => theme.base};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 22px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 500;
  padding: 14px 18px;
  min-height: 48px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.65);
  }

  &:focus {
    border-color: #fff;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 991px) {
    &:nth-of-type(3) {
      grid-column: span 2;
    }
  }
  @media (max-width: 767px) {
    &:nth-of-type(3) {
      grid-column: span 1;
    }
  }
`;

const Submit = styled.button`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.heading};
  border: none;
  border-radius: 6px;
  padding: 14px 28px;
  min-height: 48px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition: all 0.3s ease;

  @media (max-width: 991px) {
    grid-column: span 2;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }

  &:hover {
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.base};
  }
`;

const SuccessCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  background: rgba(27, 27, 27, 0.85);
  border: 1px solid rgba(170, 132, 83, 0.3);
  border-radius: 8px;
  padding: 24px 24px;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(170, 132, 83, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const SuccessIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(170, 132, 83, 0.15);
  border: 2px solid #aa8453;
  margin-bottom: 2px;
  box-shadow: 0 0 15px rgba(170, 132, 83, 0.3);
  animation: pulseGold 2s infinite ease-in-out;

  i {
    font-size: 18px;
    color: #aa8453;
  }

  @keyframes pulseGold {
    0%,
    100% {
      box-shadow:
        0 0 15px rgba(170, 132, 83, 0.3),
        inset 0 0 5px rgba(170, 132, 83, 0.2);
    }
    50% {
      box-shadow:
        0 0 25px rgba(170, 132, 83, 0.6),
        inset 0 0 15px rgba(170, 132, 83, 0.4);
    }
  }
`;

const SuccessTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffffff 40%, #e5c090 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SuccessText = styled.p`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  max-width: 520px;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  letter-spacing: 0.2px;
`;

const EmailHighlight = styled.span`
  color: #e5c090;
  font-weight: 600;
`;

const ResetButton = styled.button`
  margin-top: 10px;
  background: transparent;
  color: #aa8453;
  border: 1px solid #aa8453;
  border-radius: 4px;
  padding: 8px 20px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: #aa8453;
    color: #1b1b1b;
    box-shadow: 0 0 15px rgba(170, 132, 83, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

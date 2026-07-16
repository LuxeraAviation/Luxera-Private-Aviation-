"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";

const INITIAL = {
  name: "",
  surname: "",
  email: "",
  number: "",
  address: "",
  message: "",
};

export default function EnquiryForm({
  subject = "New Enquiry",
  submitLabel = "Send Enquiry",
  successMessage = "We have received your request and our team will get back to you shortly.",
  onSuccess,
}) {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setSent(true);
      setForm(INITIAL);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Contact form error:", err);
      setError(err.message || "Could not send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Success role="status" aria-live="polite">
        <CheckCircle aria-hidden="true">
          <i className="fa-solid fa-check" />
        </CheckCircle>
        <ThankYou>Thank You</ThankYou>
        <SuccessText>{successMessage}</SuccessText>
        <Divider />
        <Regards>
          Best regards,
          <span>Luxera Aviation Team</span>
        </Regards>
      </Success>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Field>
          <Label>Name*</Label>
          <Input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={update("name")}
            disabled={loading}
          />
        </Field>
        <Field>
          <Label>Surname*</Label>
          <Input
            type="text"
            name="surname"
            required
            value={form.surname}
            onChange={update("surname")}
            disabled={loading}
          />
        </Field>
      </Row>

      <Row>
        <Field>
          <Label>Email*</Label>
          <Input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={update("email")}
            disabled={loading}
          />
        </Field>
        <Field>
          <Label>Number*</Label>
          <Input
            type="tel"
            name="number"
            required
            value={form.number}
            onChange={update("number")}
            disabled={loading}
          />
        </Field>
      </Row>

      <Field>
        <Label>Address</Label>
        <Input
          type="text"
          name="address"
          value={form.address}
          onChange={update("address")}
          disabled={loading}
        />
      </Field>

      <Field>
        <Label>Your Message</Label>
        <Textarea
          rows={6}
          name="message"
          placeholder="Tell us your preferred routes, dates, or anything else."
          value={form.message}
          onChange={update("message")}
          disabled={loading}
        />
      </Field>

      <Submit type="submit" disabled={loading}>
        {loading ? "Sending..." : submitLabel}
      </Submit>
      {error && <ErrorNote>{error}</ErrorNote>}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.heading};
  font-weight: 500;
`;

const field = `
  border-radius: 20px;
  padding: 14px 22px;
  font-family: inherit;
`;

const Input = styled.input`
  ${field}
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.heading};
`;

const Textarea = styled.textarea`
  ${field}
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.heading};
  resize: vertical;
`;

const Submit = styled.button`
  align-self: flex-start;
  border: none;
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.white};
  border-radius: 20px;
  padding: 14px 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.heading};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorNote = styled.p`
  margin: 0;
  color: #c0392b;
`;

const popIn = keyframes`
  0% { transform: scale(0.4); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const halo = keyframes`
  0% { transform: scale(0.9); opacity: 0.6; }
  70% { transform: scale(1.7); opacity: 0; }
  100% { transform: scale(1.7); opacity: 0; }
`;

const drawIn = keyframes`
  from { transform: scale(0) rotate(-25deg); opacity: 0; }
  to { transform: scale(1) rotate(0); opacity: 1; }
`;

const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 56px 16px 32px;

  @media (max-width: 575px) {
    padding: 40px 12px 24px;
  }
`;

const CheckCircle = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 34px;
  color: #fff;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.base} 0%,
    #8a6a3d 100%
  );
  box-shadow: 0 16px 34px -8px ${({ theme }) => theme.base}80,
    inset 0 2px 4px rgba(255, 255, 255, 0.28);
  animation: ${popIn} 0.55s cubic-bezier(0.2, 0.8, 0.3, 1.2) both;

  /* pulsing halo */
  &::before {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.base};
    animation: ${halo} 2.4s ease-out infinite;
  }

  i {
    font-size: 38px;
    animation: ${drawIn} 0.5s cubic-bezier(0.2, 0.8, 0.3, 1.2) 0.35s both;
  }

  @media (max-width: 575px) {
    width: 80px;
    height: 80px;
    margin-bottom: 26px;

    i {
      font-size: 31px;
    }
  }
`;

const ThankYou = styled.h3`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.heading};
  font-weight: 600;
  font-size: 44px;
  line-height: 1.1;
  letter-spacing: 0.5px;

  @media (max-width: 575px) {
    font-size: 34px;
  }
`;

const SuccessText = styled.p`
  margin: 0;
  max-width: 460px;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  line-height: 1.6;
`;

const Divider = styled.span`
  display: block;
  width: 230px;
  max-width: 60%;
  height: 1px;
  background: ${({ theme }) => theme.base};
  margin: 44px 0;
`;

const Regards = styled.p`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ theme }) => theme.heading};
  font-size: 17px;

  span {
    color: ${({ theme }) => theme.base};
  }
`;

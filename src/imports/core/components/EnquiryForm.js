"use client";

import { useState } from "react";
import styled from "styled-components";

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
  successMessage = "Thanks — your enquiry is on its way. We'll be in touch shortly.",
}) {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/info@luxeraaviation.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          Name: `${form.name} ${form.surname}`.trim(),
          Email: form.email,
          "Contact Number": form.number,
          Address: form.address,
          Message: form.message,
          _replyto: form.email,
          _subject: subject,
          _captcha: "false",
        }),
      });
      setSent(true);
      setForm(INITIAL);
    } catch (error) {
      console.error("FormSubmit error:", error);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      action="https://formsubmit.co/harshilgohil2703@gmail.com"
      method="POST"
    >
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
      {sent && <Note>{successMessage}</Note>}
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

const Note = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.base};
`;

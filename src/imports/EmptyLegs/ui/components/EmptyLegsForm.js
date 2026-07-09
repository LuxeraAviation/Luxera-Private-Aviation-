"use client";

import { useState } from "react";
import styled from "styled-components";
import { FOOTER_CONTACT } from "@/imports/core/constants/footer";

const INITIAL = {
  name: "",
  surname: "",
  email: "",
  address: "",
  number: "",
  message: "",
};

export default function EmptyLegsForm() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = "Empty Leg Enquiry";
    const body = [
      `Name: ${form.name} ${form.surname}`.trim(),
      `Email: ${form.email}`,
      `Contact Number: ${form.number}`,
      `Address: ${form.address}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    window.location.href = `${FOOTER_CONTACT.email.href}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Field>
          <Label>Name*</Label>
          <Input type="text" required value={form.name} onChange={update("name")} />
        </Field>
        <Field>
          <Label>Surname*</Label>
          <Input
            type="text"
            required
            value={form.surname}
            onChange={update("surname")}
          />
        </Field>
      </Row>

      <Row>
        <Field>
          <Label>Email*</Label>
          <Input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
          />
        </Field>
        <Field>
          <Label>Number*</Label>
          <Input
            type="tel"
            required
            value={form.number}
            onChange={update("number")}
          />
        </Field>
      </Row>

      <Field>
        <Label>Address</Label>
        <Input type="text" value={form.address} onChange={update("address")} />
      </Field>

      <Field>
        <Label>Your Message</Label>
        <Textarea
          rows={6}
          placeholder="Tell us your preferred routes, dates, or anything else."
          value={form.message}
          onChange={update("message")}
        />
      </Field>

      <Submit type="submit">Send Enquiry</Submit>
      {sent && <Note>Thanks — your enquiry is on its way. We&apos;ll be in touch shortly.</Note>}
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
`;

const Note = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.base};
`;

"use client";

import { useState } from "react";
import styled from "styled-components";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Label>Full Name*</Label>
      <Input type="text" required />
      <Label>Email*</Label>
      <Input type="email" required />
      <Label>Write Your Comment*</Label>
      <Textarea rows={6} required />
      <Submit type="submit">Send Message</Submit>
      {sent && <Note>Thanks — we&apos;ll be in touch shortly.</Note>}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.heading};
  font-weight: 500;

  & + input,
  & + textarea {
    margin-bottom: 16px;
  }
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
  margin-bottom: 25px;
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
  margin-top: 16px;
  color: ${({ theme }) => theme.base};
`;

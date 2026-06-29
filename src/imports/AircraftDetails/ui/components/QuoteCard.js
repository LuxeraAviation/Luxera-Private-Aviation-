"use client";

import { useState } from "react";
import styled from "styled-components";

export default function QuoteCard({ price }) {
  const [done, setDone] = useState(false);

  return (
    <Card>
      <Price>
        <span className="amount">{price}</span>
      </Price>
      <h4>Request a Quote</h4>
      <Form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <Field>
          <label>From</label>
          <input type="text" placeholder="Departure airport" />
        </Field>
        <Field>
          <label>To</label>
          <input type="text" placeholder="Destination airport" />
        </Field>
        <Field>
          <label>Departure</label>
          <input type="date" />
        </Field>
        <Field>
          <label>Passengers</label>
          <select defaultValue="2">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 14].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>
        </Field>
        <Submit type="submit">Request Quote</Submit>
        {done && <Note>Request received — our charter desk will reply shortly.</Note>}
      </Form>
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  padding: 34px;
  position: sticky;
  top: 110px;

  h4 {
    font-size: 24px;
    margin: 0 0 22px;
  }
`;

const Price = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  .amount {
    font-family: ${({ theme }) => theme.fonts.playfair};
    font-size: 38px;
    color: ${({ theme }) => theme.base};
  }
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const Field = styled.div`
  display: grid;
  gap: 6px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.heading};
  }

  input,
  select {
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.heading};
    border-radius: 5px;
    padding: 12px 14px;
    font-family: inherit;
  }
`;

const Submit = styled.button`
  margin-top: 6px;
  border: none;
  background: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  padding: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.heading};
  }
`;

const Note = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.base};
`;

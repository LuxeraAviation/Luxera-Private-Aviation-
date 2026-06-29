"use client";

import { useState } from "react";
import styled from "styled-components";

export default function FaqAccordion({ items = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <List>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Item key={item.q} $open={isOpen}>
            <Head
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <i className={`fa-solid ${isOpen ? "fa-minus" : "fa-plus"}`} />
            </Head>
            <Body $open={isOpen}>
              <p>{item.a}</p>
            </Body>
          </Item>
        );
      })}
    </List>
  );
}

const List = styled.div`
  display: grid;
  gap: 20px;
`;

const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 6px 28px;
  background: ${({ theme }) => theme.bg};
  transition: border-color 0.3s ease;

  ${({ $open, theme }) => $open && `border-color: ${theme.base};`}
`;

const Head = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 20px 0;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-size: 22px;
  color: ${({ theme }) => theme.heading};

  i {
    color: ${({ theme }) => theme.base};
    font-size: 14px;
    flex-shrink: 0;
  }

  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.35s ease;

  p {
    overflow: hidden;
    margin: 0;
    padding-bottom: ${({ $open }) => ($open ? "22px" : "0")};
  }
`;

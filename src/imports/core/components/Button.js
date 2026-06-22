import React from "react";
import styled, { css } from "styled-components";
import { theme } from "@/styles/Theme";
import Link from "next/link";

export default function Button({ href, children, className, ...props }) {
  if (href) {
    return (
      <StyledLink href={href} className={className} {...props}>
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton className={className} {...props}>
      {children}
    </StyledButton>
  );
}

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${theme?.base || "#dcbb87"};
  border: 1.5px solid ${theme?.base || "#dcbb87"};
  color: ${theme?.dark || "#19232d"};
  padding: 12px 30px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  text-decoration: none;
  font-family: inherit;

  &:hover {
    background: transparent;
    color: ${theme?.base || "#dcbb87"};
    border-color: ${theme?.base || "#dcbb87"};
  }

  @media (max-width: 767px) {
    padding: 10px 18px;
    font-size: 14px;
  }
`;

const StyledLink = styled(Link)`
  ${buttonStyles}
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

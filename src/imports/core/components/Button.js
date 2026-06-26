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
  background: ${theme?.base};
  border: 1.5px solid ${theme?.base};
  color: ${theme?.dark};
  padding: 14px 32px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  text-decoration: none;
  font-family: inherit;

  &:hover {
    background: transparent;
    color: ${theme?.base};
    border-color: ${theme?.base};
  }

  @media (max-width: 767px) {
    padding: 12px 22px;
    font-size: 13px;
  }
`;

const StyledLink = styled(Link)`
  ${buttonStyles}
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

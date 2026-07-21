"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

export default function ArrowButton({
  href,
  children = "Learn More",
  className,
  light = false,
  ...rest
}) {
  const inner = (
    <>
      {children}
      <Arrow className="arrow" $light={light}>
        <i className="fas fa-arrow-right" />
      </Arrow>
    </>
  );

  if (href) {
    return (
      <StyledLink href={href} className={className} $light={light} {...rest}>
        {inner}
      </StyledLink>
    );
  }
  return (
    <StyledButton className={className} $light={light} {...rest}>
      {inner}
    </StyledButton>
  );
}

const base = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 25px;
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  border: 1px solid
    ${({ theme, $light }) => ($light ? "rgba(255,255,255,0.6)" : theme.heading)};
  color: ${({ theme, $light }) => ($light ? theme.white : theme.heading)};
  transition: all 0.4s ease;

  &:hover {
    background: ${({ theme }) => theme.base};
    border-color: ${({ theme }) => theme.base};
    color: ${({ theme }) => theme.white};

    .arrow i {
      transform: rotate(-45deg) translateX(2px);
    }
  }
`;

const Arrow = styled.span`
  display: inline-flex;
  overflow: hidden;

  i {
    transform: rotate(-45deg);
    transition: transform 0.4s ease;
    font-size: 12px;
  }
`;

const StyledLink = styled(Link)`
  ${base}
`;

const StyledButton = styled.button`
  ${base}
`;

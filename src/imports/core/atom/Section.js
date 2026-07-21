"use client";

import styled, { css } from "styled-components";

const Section = styled.section`
  padding: ${({ $py }) => $py || "140px"} 0;
  background: ${({ theme, $gray }) => ($gray ? theme.soft : "transparent")};

  ${({ $top }) =>
    $top &&
    css`
      padding-top: ${$top};
    `}
  ${({ $bottom }) =>
    $bottom &&
    css`
      padding-bottom: ${$bottom};
    `}

  @media (max-width: 991px) {
    padding: 78px 0;
    ${({ $top }) =>
      $top &&
      css`
        padding-top: 78px;
      `}
    ${({ $bottom }) =>
      $bottom &&
      css`
        padding-bottom: 78px;
      `}
  }
`;

export default Section;

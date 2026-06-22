"use client";

import styled, { css } from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: ${(props) => props.$alignitems || "flex-start"};
  justify-content: ${(props) => props.$justifycontent || "flex-start"};
  flex-wrap: ${(props) => props.$wrap || "nowrap"};
  min-width: 0;
  max-width: 100%;
  ${(props) =>
    props.$fullwidth &&
    css`
      width: 100%;
    `}
`;

export default Flex;

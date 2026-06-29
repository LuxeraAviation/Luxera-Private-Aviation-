import { css } from "styled-components";

const headingFont = css`
  font-family: var(--font-playfair-display), serif;
`;

export const fs150 = css`
  ${headingFont}
  font-size: 150px;
  line-height: 1em;
  @media (max-width: 991px) {
    font-size: 120px;
  }
  @media (max-width: 767px) {
    font-size: 80px;
  }
`;

export const fs89 = css`
  ${headingFont}
  font-size: 89px;
  line-height: 1.124em;
  @media (max-width: 1400px) {
    font-size: 78px;
  }
  @media (max-width: 991px) {
    font-size: 60px;
  }
  @media (max-width: 767px) {
    font-size: 50px;
  }
`;

export const fs67 = css`
  ${headingFont}
  font-size: 67px;
  line-height: 1.12em;
  @media (max-width: 1400px) {
    font-size: 60px;
  }
  @media (max-width: 991px) {
    font-size: 46px;
  }
`;

export const fs50 = css`
  ${headingFont}
  font-size: 50px;
  line-height: 1.3em;
  @media (max-width: 1400px) {
    font-size: 46px;
  }
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

export const fs38 = css`
  ${headingFont}
  font-size: 38px;
  line-height: 1.316em;
  @media (max-width: 1400px) {
    font-size: 34px;
  }
  @media (max-width: 991px) {
    font-size: 30px;
  }
`;

export const fs28 = css`
  ${headingFont}
  font-size: 28px;
  line-height: 1.25em;
`;

export const sectionSubtitle = css`
  color: ${({ theme }) => (theme.mode === "dark" ? theme.base : theme.text)};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 3.2px;
  text-transform: uppercase;
  line-height: 1.6em;
  margin: 0 0 28px;
  @media (max-width: 991px) {
    margin-bottom: 15px;
  }
`;

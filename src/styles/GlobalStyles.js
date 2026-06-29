"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ::selection {
    background: ${({ theme }) => theme.base} !important;
    color: ${({ theme }) => theme.white};
  }

  :root {
    --web-wash: ${({ theme }) => theme.bg};
    --primary: ${({ theme }) => theme.heading};
    --secondary: ${({ theme }) => theme.text};
    --accent: ${({ theme }) => theme.base};
    --border: ${({ theme }) => theme.border};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    outline: none !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
    overflow-y: auto;
    max-width: 100%;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    max-width: 100%;
  }

  body {
    font-family: var(--font-mulish), sans-serif;
    min-height: 100vh;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    line-height: 1.875em;
    font-weight: 400;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-playfair-display), serif;
    color: ${({ theme }) => theme.heading};
    font-weight: 400;
    line-height: 1.2em;
    margin: 0 0 20px;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  p {
    margin: 0 0 15px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.base};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.base};
  }
`;

export default GlobalStyles;

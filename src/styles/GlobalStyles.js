import { createGlobalStyle } from "styled-components";
import { theme } from "@/styles/Theme";

const GlobalStyles = createGlobalStyle`
  ::selection {
    background: #dcbb87 !important;
    color: #fff;
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
    font-family: 'Mulish', var(--font-mulish), sans-serif;
    min-height: 100vh;
    background: #fff;
    font-weight: normal;
    -webkit-tap-highlight-color: transparent;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    background: #dcbb87;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #c9a56f;
  }
`;

export default GlobalStyles;

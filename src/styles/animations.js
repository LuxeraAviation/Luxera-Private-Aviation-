import { keyframes } from "styled-components";

export const dashAnim = keyframes`
  to { stroke-dashoffset: 0; }
`;

export const scale = keyframes`
  0% {
    left: -800px;
    transform: scale(0);
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const planeFloat = keyframes`
  0%   { transform: translate(-2px, 0) rotate(0deg); }
  50%  { transform: translate(2px, -4px) rotate(2deg); }
  100% { transform: translate(-2px, 0) rotate(0deg); }
`;

export const floatY = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-25px); }
  100% { transform: translateY(0); }
`;

export const floatX = keyframes`
  0%   { transform: translateX(0); }
  50%  { transform: translateX(25px); }
  100% { transform: translateX(0); }
`;

export const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const imgAnimate = keyframes`
  0% {
    transform: rotate(0deg) translate(-10px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translate(-10px) rotate(-360deg);
  }
`;

export const waves = keyframes`
  0%   { transform: scale(1);   opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
`;

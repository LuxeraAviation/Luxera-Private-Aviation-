import React from "react";
import PlaneIcon from "@/imports/core/assets/PlaneIcon";

export default function PreloaderThemeSvg({ planeColor, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="300"
      viewBox="0 0 300 300"
      {...props}
    >
      <g className="loader-group">
        <path
          d="M 138 71 A 80 80 0 0 0 102 86"
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeDasharray="0, 22"
          strokeLinecap="round"
          opacity="0.9"
        />
        <g transform="translate(150, 70) scale(1.5) rotate(90) translate(-12, -12)">
          <PlaneIcon fill={planeColor} width="24" height="24" />
        </g>
      </g>
    </svg>
  );
}

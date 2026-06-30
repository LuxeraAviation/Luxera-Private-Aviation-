"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ScrollTopIcon from "@/imports/core/assets/ScrollTopIcon";

const brand = {
  base: "#aa8453", 
  baseDark: "#96703f",
  loaderStroke: "#0099cc",
  fonts: {
    mulish: "var(--font-mulish), sans-serif", 
    playfair: "var(--font-playfair-display), serif", 
    nasalization: "var(--font-nasalization), sans-serif",
  },
  gold: "#d1b745",
};

export const lightTheme = {
  ...brand,
  mode: "light",
  bg: "#fff", 
  heading: "#1b1b1b", 
  text: "#7d7e7c", 
  ternary: "#d8d8d7", 
  soft: "#f7f7f5", 
  border: "#eaeaea",
  white: "#fff",
  dark: "#1b1b1b",
  footerBg: "#1b1b1b",
  cream: "#fff8ee",
  overlay: "rgba(27, 27, 27, 0.5)",
  headerBlur: "rgba(255, 255, 255, 0.6)",
};

export const darkTheme = {
  ...brand,
  mode: "dark",
  bg: "#1b1b1b", 
  heading: "#fff", 
  text: "#d8d8d7",
  ternary: "#3b3b3b", 
  soft: "#181818", 
  border: "#3c3c3c", 
  white: "#fff",
  dark: "#1b1b1b",
  footerBg: "#121212",
  cream: "#181818",
  overlay: "rgba(0, 0, 0, 0.6)",
  headerBlur: "rgba(27, 27, 27, 0.55)",
};

const variants = {
  "fade-up": { x: 0, y: 60 },
  "fade-down": { x: 0, y: -60 },
  "fade-left": { x: 60, y: 0 },
  "fade-right": { x: -60, y: 0 },
  "zoom-in": { x: 0, y: 0, scale: 0.85 },
};

const RevealBox = styled.div`
  opacity: 0;
  transform: ${({ $v }) => {
    const v = variants[$v] || variants["fade-up"];
    return `translate(${v.x}px, ${v.y}px) scale(${v.scale ?? 1})`;
  }};
  transition:
    opacity ${({ $d }) => $d}ms ease,
    transform ${({ $d }) => $d}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: ${({ $delay }) => $delay}ms;
  will-change: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const threshold = options.threshold ?? 0.15;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function Reveal({
  variant = "fade-up",
  duration = 1000,
  delay = 0,
  as,
  className = "",
  children,
  ...rest
}) {
  const [ref, inView] = useInView();
  return (
    <RevealBox
      as={as}
      ref={ref}
      $v={variant}
      $d={duration}
      $delay={delay}
      className={`${className} ${inView ? "is-visible" : ""}`}
      {...rest}
    >
      {children}
    </RevealBox>
  );
}

export function Odometer({ to = 0, duration = 2000 }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  const targetNumber =
    typeof to === "string"
      ? parseFloat(to.replace(/,/g, "")) || 0
      : Number(to) || 0;

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    let raf;
    let startTs = null;
    const step = (ts) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * targetNumber));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, targetNumber, duration]);

  return <span ref={ref}>{value.toLocaleString("en-US")}</span>;
}

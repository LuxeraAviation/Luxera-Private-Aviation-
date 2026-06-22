"use client";

import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import ScrollTopIcon from "@/imports/core/assets/ScrollTopIcon";

export const theme = {
  base: "#dcbb87",
  dark: "#19232d",
  darker: "#000033",
  text: "#3d3d3d",
  soft: "#f5f3f1",
  cream: "#fff8ee",
  white: "#ffffff",
  loaderStroke: "#0099cc",
  fonts: {
    mulish: "var(--font-mulish), sans-serif",
    playfair: "var(--font-playfair-display), serif",
  },
};

export {
  dashAnim,
  scale,
  planeFloat,
  floatY,
  floatX,
  spinSlow,
  imgAnimate,
  waves,
} from "./animations";

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

export function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
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

const ScrollBtn = styled.button`
  position: fixed;
  right: 40px;
  font-size: 12px;
  bottom: 40px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 34px;
  padding: 10px 6px;
  height: 68px;
  background: ${theme.base};
  border: 1px solid ${theme.base};
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  transform: translateY(${({ $show }) => ($show ? "0" : "20px")});
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 2s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }
`;

const ScrollText = styled.span`
  font-family: var(--font-mulish), sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <ScrollBtn
      $show={show}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <IconWrapper>
        <ScrollTopIcon width="16" height="16" />
      </IconWrapper>
      <ScrollText>Top</ScrollText>
    </ScrollBtn>
  );
}

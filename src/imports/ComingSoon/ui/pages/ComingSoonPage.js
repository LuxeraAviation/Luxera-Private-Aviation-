"use client";

import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const LEFT = "/image/luxera/left.png";
const RIGHT = "/image/luxera/right.png";

function ParticleCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "rgba(248,230,180,",
      "rgba(205,169,104,",
      "rgba(246,230,196,",
      "rgba(184,153,90,",
      "rgba(255,245,210,",
    ];

    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () =>
      spawnParticle(canvas),
    );

    function spawnParticle(c) {
      const base = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.8 + 0.3,
        dx: (Math.random() - 0.5) * 0.25,
        dy: -(Math.random() * 0.35 + 0.08),
        alpha: Math.random() * 0.55 + 0.1,
        dAlpha:
          (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
        color: base,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: Math.random() * 400 + 200,
      };
    }

    let frame;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      particles.forEach((p, i) => {
        p.life++;
        if (p.life > p.maxLife) {
          particles[i] = spawnParticle(canvas);
          return;
        }

        const lifeRatio = p.life / p.maxLife;
        const lifeFade =
          lifeRatio < 0.15
            ? lifeRatio / 0.15
            : lifeRatio > 0.75
              ? (1 - lifeRatio) / 0.25
              : 1;

        const twinkle =
          0.7 + 0.3 * Math.sin(t * p.twinkleSpeed + p.twinkleOffset);
        const finalAlpha = p.alpha * twinkle * lifeFade;

        p.x += p.dx;
        p.y += p.dy;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `${p.color}${finalAlpha})`);
        grd.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(finalAlpha * 1.8, 1)})`;
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <Canvas ref={ref} aria-hidden="true" />;
}

function AmbientOrbs() {
  return (
    <OrbLayer aria-hidden="true">
      <Orb
        style={{
          width: 520,
          height: 520,
          top: "10%",
          left: "-12%",
          animationDelay: "0s",
          animationDuration: "12s",
        }}
      />
      <Orb
        style={{
          width: 380,
          height: 380,
          bottom: "8%",
          right: "-10%",
          animationDelay: "4s",
          animationDuration: "15s",
        }}
      />
      <Orb
        style={{
          width: 220,
          height: 220,
          top: "42%",
          left: "45%",
          animationDelay: "2s",
          animationDuration: "9s",
          opacity: 0.07,
        }}
      />
    </OrbLayer>
  );
}

export default function ComingSoonPage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev.html;
      body.style.overflow = prev.body;
    };
  }, []);

  return (
    <Screen>
      <AmbientOrbs />
      <ParticleCanvas />

      <LeftWing src={LEFT} alt="LUXERA private jet left" />
      <RightWing src={RIGHT} alt="LUXERA private jet right" />

      <Brand>
        <WordmarkFrame>
          <Rule />
          <WordmarkWrap>
            <Wordmark>LUXERA</Wordmark>
            <ShimmerOverlay aria-hidden="true">LUXERA</ShimmerOverlay>
          </WordmarkWrap>
          <Rule />
        </WordmarkFrame>

        <Tagline>
          <span>—</span> PRIVATE AVIATION <span>—</span>
        </Tagline>
        <Coming>COMING SOON</Coming>

        <Emblem>
          <svg
            viewBox="0 0 60 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 28 L2 4 L14 10 L30 2 L46 10 L58 4 Z"
              fill="url(#gold)"
            />
            <defs>
              <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f6e6c4" />
                <stop offset="55%" stopColor="#cda968" />
                <stop offset="100%" stopColor="#9a7434" />
              </linearGradient>
            </defs>
          </svg>
        </Emblem>

        <DiamondRow aria-hidden="true">
          <Diamond />
          <DiamondLarge />
          <Diamond />
        </DiamondRow>
      </Brand>
    </Screen>
  );
}

const slideFromLeft = keyframes`
  from { opacity: 0; transform: translateY(-50%) translateX(-110%); }
  to   { opacity: 1; transform: translateY(-50%) translateX(0); }
`;

const slideFromRight = keyframes`
  from { opacity: 0; transform: translateY(-50%) translateX(110%); }
  to   { opacity: 1; transform: translateY(-50%) translateX(0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spreadRule = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

const shimmerSweep = keyframes`
  0%   { background-position: -300% center; }
  100% { background-position: 300% center; }
`;

const goldPulse = keyframes`
  0%, 100% { text-shadow: 0 0 12px rgba(205,169,104,0.25), 0 0 30px rgba(205,169,104,0.1); }
  50%       { text-shadow: 0 0 24px rgba(246,230,196,0.55), 0 0 60px rgba(205,169,104,0.3), 0 0 90px rgba(184,153,90,0.15); }
`;

const emblemFloat = keyframes`
  0%, 100% { transform: translateY(0)   rotate(0deg); }
  33%       { transform: translateY(-5px) rotate(1.5deg); }
  66%       { transform: translateY(3px)  rotate(-1deg); }
`;

const emblemGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 6px rgba(205,169,104,0.4)); }
  50%       { filter: drop-shadow(0 0 18px rgba(246,230,196,0.9)) drop-shadow(0 0 36px rgba(205,169,104,0.55)); }
`;

const orbFloat = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(20px, -30px) scale(1.06); }
  66%       { transform: translate(-15px, 20px) scale(0.95); }
`;

const diamondSpin = keyframes`
  0%   { transform: rotate(45deg) scale(1);    opacity: 0.6; }
  50%  { transform: rotate(225deg) scale(1.25); opacity: 1; }
  100% { transform: rotate(405deg) scale(1);    opacity: 0.6; }
`;

const diamondSpinLarge = keyframes`
  0%   { transform: rotate(45deg) scale(1);   opacity: 0.8; }
  50%  { transform: rotate(225deg) scale(1.4); opacity: 1; }
  100% { transform: rotate(405deg) scale(1);   opacity: 0.8; }
`;

const comingGlow = keyframes`
  0%, 100% { filter: brightness(1)   drop-shadow(0 0 0px transparent); }
  50%       { filter: brightness(1.25) drop-shadow(0 0 12px rgba(246,230,196,0.5)); }
`;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

const OrbLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(205, 169, 104, 0.18) 0%,
    rgba(184, 153, 90, 0.06) 55%,
    transparent 80%
  );
  opacity: 0.12;
  animation: ${orbFloat} linear infinite;
  will-change: transform;
`;

const Screen = styled.main`
  position: fixed;
  inset: 0;
  z-index: 1000001;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaneBase = styled.img`
  position: absolute;
  top: 50%;
  height: auto;
  max-height: 90vh;
  z-index: 2;
  pointer-events: none;
  user-select: none;
`;

const LeftWing = styled(PlaneBase)`
  left: 0;
  width: clamp(260px, 48vw, 780px);
  animation: ${slideFromLeft} 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (min-width: 1100px) and (max-width: 1600px) {
    width: clamp(300px, 30vw, 460px);
  }
  @media (max-width: 1099px) {
    width: clamp(380px, 75vw, 680px);
    top: 22%;
    left: 0;
  }
  @media (max-width: 480px) {
    width: clamp(420px, 100vw, 480px);
    top: 18%;
    left: calc(40vw - 210px);
  }
`;

const RightWing = styled(PlaneBase)`
  right: 0;
  width: clamp(260px, 48vw, 780px);
  animation: ${slideFromRight} 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (min-width: 1100px) and (max-width: 1600px) {
    width: clamp(300px, 30vw, 460px);
  }
  @media (max-width: 1099px) {
    width: clamp(380px, 75vw, 680px);
    top: 75%;
    right: 0;
  }
  @media (max-width: 480px) {
    width: clamp(420px, 100vw, 480px);
    top: 78%;
    right: auto;
    left: calc(60vw - 210px);
  }
`;

const Brand = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 clamp(12px, 4vw, 32px);
  gap: 0;
`;

const WordmarkFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 6px;

  opacity: 0;
  animation: ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
`;

const Rule = styled.div`
  width: clamp(160px, 30vw, 320px);
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #b8995a 30%,
    #e8d4a0 50%,
    #b8995a 70%,
    transparent 100%
  );
  transform-origin: center;
  transform: scaleX(0);
  will-change: transform;
  backface-visibility: hidden;
  animation: ${spreadRule} 1.1s ease-out 1s forwards;
`;

const WordmarkWrap = styled.div`
  position: relative;
  display: inline-block;
`;

const Wordmark = styled.h1`
  margin: 0;
  font-family: var(--font-nasalization), var(--font-mulish), sans-serif;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
  line-height: 1.2;
  font-size: clamp(32px, 5vw, 60px);
  letter-spacing: clamp(10px, 2.5vw, 36px);
  animation: ${goldPulse} 4s ease-in-out 2s infinite;
`;

const ShimmerOverlay = styled.span`
  position: absolute;
  inset: 0;
  font-family: var(--font-nasalization), var(--font-mulish), sans-serif;
  font-weight: 400;
  font-size: clamp(32px, 5vw, 60px);
  letter-spacing: clamp(10px, 2.5vw, 36px);
  line-height: 1.2;
  white-space: nowrap;
  pointer-events: none;

  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 245, 210, 0.85) 48%,
    rgba(205, 169, 104, 0.95) 50%,
    rgba(255, 245, 210, 0.85) 52%,
    transparent 70%
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  animation: ${shimmerSweep} 3.5s ease-in-out 1.8s infinite;
`;

const Tagline = styled.p`
  margin: clamp(8px, 1.2vw, 16px) 0 0;
  font-family: var(--font-mulish), sans-serif;
  font-weight: 400;
  color: #d7d0c5;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: clamp(6px, 1vw, 12px);
  font-size: clamp(9px, 1.1vw, 13px);
  letter-spacing: clamp(3px, 0.8vw, 8px);

  opacity: 0;
  animation: ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;

  span {
    color: #b8995a;
    font-size: 0.85em;
    letter-spacing: 0;
  }
`;

const Coming = styled.p`
  margin: clamp(10px, 1.8vw, 22px) 0 0;
  font-family: var(--font-playfair-display), serif;
  font-weight: 600;
  font-style: italic;
  white-space: nowrap;
  background: linear-gradient(180deg, #f6e6c4 0%, #cda968 55%, #9a7434 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #cda968;
  font-size: clamp(14px, 2.2vw, 32px);
  letter-spacing: clamp(4px, 0.8vw, 10px);
  text-indent: clamp(4px, 0.8vw, 10px);

  opacity: 0;
  animation:
    ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) 1.1s forwards,
    ${comingGlow} 3s ease-in-out 2.5s infinite;
`;

const Emblem = styled.div`
  margin-top: clamp(10px, 1.5vw, 18px);
  width: clamp(36px, 5vw, 56px);
  opacity: 0;
  animation:
    ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) 1.4s forwards,
    ${emblemFloat} 7s ease-in-out 2.8s infinite,
    ${emblemGlow} 3.5s ease-in-out 2.8s infinite;

  svg {
    width: 100%;
    height: auto;
  }
`;

const DiamondRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: clamp(10px, 1.4vw, 18px);

  opacity: 0;
  animation: ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) 1.7s forwards;
`;

const Diamond = styled.div`
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #f6e6c4, #cda968);
  box-shadow: 0 0 8px rgba(205, 169, 104, 0.6);
  animation: ${diamondSpin} 5s linear infinite;
  animation-delay: calc(var(--i, 0) * 0.5s);
`;

const DiamondLarge = styled.div`
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #fff8e8, #e8c97a, #b8995a);
  box-shadow:
    0 0 14px rgba(246, 230, 196, 0.8),
    0 0 28px rgba(205, 169, 104, 0.4);
  animation: ${diamondSpinLarge} 4s linear infinite;
`;

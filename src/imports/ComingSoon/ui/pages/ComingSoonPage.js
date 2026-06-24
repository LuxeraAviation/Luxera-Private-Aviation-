"use client";

import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const LEFT = "/image/luxera/left.png";

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

      <Brand>
        <WordmarkFrame>
          <Rule />
          <WordmarkWrap>
            <Wordmark>LUXERA</Wordmark>
          </WordmarkWrap>
          <Rule />
        </WordmarkFrame>

        <Tagline>
          <span>—</span> PRIVATE AVIATION <span>—</span>
        </Tagline>
        <Coming>COMING SOON</Coming>
      </Brand>
    </Screen>
  );
}

const slideFromLeft = keyframes`
  from { opacity: 0; transform: translateY(-50%) translateX(-110%); }
  to   { opacity: 1; transform: translateY(-50%) translateX(0); }
`;

const slideFromLeftCenter = keyframes`
  from { opacity: 0; transform: translateY(-50%) translateX(-150%); }
  to   { opacity: 1; transform: translateY(-50%) translateX(-50%); }
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

const orbFloat = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(20px, -30px) scale(1.06); }
  66%       { transform: translate(-15px, 20px) scale(0.95); }
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
  align-items: stretch;
  justify-content: flex-end;
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
  top: 50%;
  width: clamp(480px, 58vw, 1020px);
  max-height: 100vh;
  animation: ${slideFromLeft} 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 1099px) {
    width: clamp(560px, 92vw, 900px);
    top: 38%;
    left: 50%;
    animation: ${slideFromLeftCenter} 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @media (max-width: 600px) {
    width: clamp(400px, 100vw, 640px);
    top: 35%;
    left: 50%;
    animation: ${slideFromLeftCenter} 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
`;

const Brand = styled.div`
  position: relative;
  z-index: 3;
  width: clamp(280px, 42vw, 680px);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 clamp(20px, 4vw, 60px);
  gap: 0;
  margin-right: clamp(24px, 5vw, 80px);

  opacity: 0;
  animation: ${fadeUp} 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;

  @media (max-width: 1099px) {
    width: 100%;
    margin-right: 0;
    justify-content: flex-end;
    padding-bottom: clamp(16px, 3vw, 36px);
    top: -20%;
  }
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
  @media (max-width: 700px) {
    font-size: clamp(52px, 5vw, 60px);
  }
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
  font-size: clamp(12px, 1.1vw, 13px);
  letter-spacing: clamp(3px, 0.8vw, 8px);

  opacity: 0;
  animation: ${fadeUp} 1s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;

  span {
    color: #b8995a;
    font-size: 0.85em;
    letter-spacing: 0;
  }
  @media (max-width: 700px) {
    font-size: clamp(10px, 1.1vw, 13px);
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
  @media (max-width: 700px) {
    font-size: clamp(20px, 1.1vw, 13px);
  } 
`;

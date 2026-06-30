"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Container from "@/imports/core/atom/Container";
import Button from "@/imports/core/components/Button";
import { useThemeMode } from "@/imports/core/components/ThemeMode";
import { NAV_ITEMS, RESERVATION, BRAND } from "@/imports/core/constants/header";
import { DUBAI_MAP } from "@/imports/core/constants/footer";

export default function Header() {
  const { mode, toggle } = useThemeMode();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleSubmenu = (idx) =>
    setOpenIdx((prev) => (prev === idx ? null : idx));

  const atTop = !scrolled;
  const logoSrc = scrolled && mode === "light" ? BRAND.logoDark : BRAND.logoLight;

  return (
    <HeaderEl $scrolled={scrolled} $mode={mode}>
      <Container>
        <Inner>
          <LogoLink href="/" aria-label={BRAND.name}>
            <Image
              src={logoSrc}
              alt={BRAND.name}
              width={161}
              height={80}
              priority
            />
          </LogoLink>

          <Nav $open={open}>
            <NavList>
              {NAV_ITEMS.map((item, idx) => (
                <NavItem key={item.label} $hasChildren={!!item.submenu}>
                  <NavLink
                    href={item.url}
                    $transparent={atTop}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    {item.submenu && (
                      <Caret
                        className="fas fa-chevron-down"
                        $open={openIdx === idx}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSubmenu(idx);
                        }}
                      />
                    )}
                  </NavLink>
                  {item.submenu && (
                    <SubMenu $open={openIdx === idx}>
                      {item.submenu.map((sub) => (
                        <li key={sub.url + sub.text}>
                          <SubLink href={sub.url} onClick={() => setOpen(false)}>
                            {sub.text}
                          </SubLink>
                        </li>
                      ))}
                    </SubMenu>
                  )}
                </NavItem>
              ))}
            </NavList>

            <MobileMap>
              <MapLabel>Dubai</MapLabel>
              <MapFrame
                src={DUBAI_MAP}
                title="Dubai location"
                allowFullScreen
                loading="lazy"
              />
            </MobileMap>
          </Nav>

          <Right>
            <ThemeToggle
              onClick={toggle}
              aria-label="Toggle dark mode"
              type="button"
              $transparent={atTop}
            >
              <i className={mode === "dark" ? "fas fa-sun" : "fas fa-moon"} />
            </ThemeToggle>
            <ReserveBtn href={RESERVATION.url} $transparent={atTop}>
              {RESERVATION.label}
            </ReserveBtn>
            <Hamburger
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              type="button"
              $transparent={atTop && !open}
            >
              <i className={open ? "fas fa-times" : "fas fa-bars"} />
            </Hamburger>
          </Right>
        </Inner>
      </Container>
      <Backdrop $open={open} onClick={() => setOpen(false)} />
    </HeaderEl>
  );
}

const HeaderEl = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  padding: ${({ $scrolled }) => ($scrolled ? "0" : "10px 0")};
  transition: all 0.4s ease;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? theme.bg : "transparent"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 6px 24px rgba(0, 0, 0, 0.08)" : "none"};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 90px;

  @media (max-width: 991px) {
    height: 76px;
  }
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  img {
    width: 140px;
    height: auto;
  }
`;

const Nav = styled.nav`
  @media (min-width: 992px) {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    max-width: 85vw;
    padding: 90px 30px 30px;
    overflow-y: auto;
    background: ${({ theme }) => theme.bg};
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 0.4s ease;
    z-index: 1001;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

const MobileMap = styled.div`
  @media (min-width: 992px) {
    display: none;
  }

  margin-top: 28px;
`;

const MapLabel = styled.h2`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.heading};
  margin: 0 0 12px;
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 200px;
  border: 0;
  border-radius: 6px;
  filter: grayscale(100%);
`;

const NavItem = styled.li`
  position: relative;

  &:hover > ul {
    @media (min-width: 992px) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  @media (max-width: 991px) {
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 8px 0;
  color: ${({ theme }) => theme.heading};

  &:hover {
    color: ${({ theme }) => theme.base};
  }

  @media (min-width: 992px) {
    ${({ $transparent }) =>
      $transparent &&
      css`
        color: ${({ theme }) => theme.white};
      `}
  }

  @media (max-width: 991px) {
    padding: 14px 0;
    font-size: 14px;
  }
`;

const Caret = styled.i`
  font-size: 10px;
  transition: transform 0.3s ease;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0")});
`;

const SubMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px 0;

  @media (min-width: 992px) {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 220px;
    background: ${({ theme }) => theme.bg};
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    border-top: 2px solid ${({ theme }) => theme.base};
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }

  @media (max-width: 991px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    padding: 0 0 10px 14px;
  }
`;

const SubLink = styled(Link)`
  display: block;
  padding: 9px 24px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.base};
  }

  @media (max-width: 991px) {
    padding: 8px 0;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;

const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid
    ${({ theme, $transparent }) =>
      $transparent ? "rgba(255,255,255,0.5)" : theme.border};
  background: transparent;
  color: ${({ theme, $transparent }) => ($transparent ? theme.white : theme.heading)};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.base};
    border-color: ${({ theme }) => theme.base};
    color: ${({ theme }) => theme.white};
  }
`;

const ReserveBtn = styled(Button)`
  padding: 11px 26px;
  border-radius: 20px;

  ${({ $transparent }) =>
    $transparent &&
    css`
      background: transparent;
      border-color: rgba(255, 255, 255, 0.6);
      color: ${({ theme }) => theme.white};
    `}

  @media (max-width: 575px) {
    display: none;
  }
`;

const Hamburger = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: none;
  background: transparent;
  color: ${({ theme, $transparent }) =>
    $transparent ? theme.white : theme.heading};
  font-size: 20px;
  cursor: pointer;
  z-index: 1002;

  @media (max-width: 991px) {
    display: inline-flex;
  }
`;

const Backdrop = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    transition: all 0.3s ease;
    z-index: 1000;
  }
`;

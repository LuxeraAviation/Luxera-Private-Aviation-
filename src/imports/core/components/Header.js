"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { theme } from "@/styles/Theme";
import styled, { css } from "styled-components";
import Link from "next/link";
import Button from "@/imports/core/components/Button";
import Container from "@/imports/core/atom/Container";
import Flex from "@/imports/core/atom/Flex";

import { NAV_ITEMS } from "@/imports/core/constants/header";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);

  const toggleSubmenu = (idx) =>
    setOpenIdx((prev) => (prev === idx ? null : idx));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = () => {
    setOpen((o) => {
      const next = !o;
      if (!next) {
        setOpenIdx(null);
      }
      return next;
    });
  };

  return (
    <HeaderEl>
      <HeaderContainer>
        <HeaderInner $alignitems="center" $justifycontent="space-between">
          <LogoLink href="/">
            <Image
              src="/image/luxera-logo.svg"
              alt="Luxera — Private Aviation"
              width={185}
              height={91}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </LogoLink>

          <MainMenu $open={open}>
            {NAV_ITEMS.map((item, idx) => (
              <MenuItem key={idx}>
                {item.submenu ? (
                  <MenuLinkButton
                    onClick={() => toggleSubmenu(idx)}
                    $submenuOpen={openIdx === idx}
                  >
                    {item.label}
                    <MobileChevron $open={openIdx === idx}>
                      <Icon className="fas fa-chevron-down" />
                    </MobileChevron>
                  </MenuLinkButton>
                ) : (
                  <MenuLink href={item.url}>{item.label}</MenuLink>
                )}
                {item.submenu && (
                  <SubMenu
                    className="submenu-dropdown"
                    $mobileOpen={openIdx === idx}
                  >
                    {item.submenu.map((link, i) => (
                      <SubMenuItem key={i}>
                        <SubMenuLink href={link.url}>{link.text}</SubMenuLink>
                      </SubMenuItem>
                    ))}
                  </SubMenu>
                )}
              </MenuItem>
            ))}
            <MobileBookWrap>
              <BookButton href="#0">
                <Image src="/image/fav.png" alt="icon" width={20} height={20} />
                Book Now
              </BookButton>
            </MobileBookWrap>
          </MainMenu>

          <HeaderRight $alignitems="center">
            <SearchBar
              onClick={() => setSearchOpen((s) => !s)}
              $active={searchOpen}
            >
              <Icon className="fas fa-search" />
            </SearchBar>
            <DesktopOnlyBook>
              <BookButton href="#0">
                <Image src="/image/fav.png" alt="icon" width={20} height={20} />
                Book Now
              </BookButton>
            </DesktopOnlyBook>
            <NavbarToggler
              aria-label="Toggle navigation"
              onClick={handleToggle}
            >
              <Icon className="fas fa-bars" />
            </NavbarToggler>
          </HeaderRight>
        </HeaderInner>
      </HeaderContainer>

      {searchOpen && <SearchOverlay onClick={() => setSearchOpen(false)} />}
      <SearchDropdown $open={searchOpen}>
        <SearchForm onSubmit={(e) => e.preventDefault()}>
          <SearchInput
            type="text"
            placeholder="Search Product..."
            autoFocus={searchOpen}
          />
          <SearchSubmit type="submit">
            <Icon className="fas fa-search" />
          </SearchSubmit>
        </SearchForm>
      </SearchDropdown>
    </HeaderEl>
  );
}

const HeaderEl = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 100px 15px 100px;
  background-color: transparent;
  transition:
    background 0.4s ease,
    box-shadow 0.4s ease;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1317px) {
    padding: 15px 0 15px 0;
  }

  @media (max-width: 991px) {
    padding: 15px 0 15px 0;
    background: ${theme.dark};
  }
`;

const HeaderContainer = styled(Container)`
  max-width: 100%;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  overflow: visible;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderInner = styled(Flex)`
  width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LogoLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  margin-right: 100px;
  flex-shrink: 0;
  width: 185px;

  @media (max-width: 991px) {
    width: 120px;
    margin-right: 20px;
  }

  @media (max-width: 575px) {
    width: 100px;
  }
`;

const MainMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: 40px;

  @media (max-width: 1317px) {
    gap: 25px;
    margin-right: 25px;
  }

  @media (max-width: 1199px) {
    gap: 16px;
    margin-right: 16px;
  }

  @media (max-width: 991px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    max-height: calc(100dvh - 74px);
    overflow-y: auto;
    background: ${theme.dark};
  box-shadow: 0 5px 100px rgba(255, 255, 255, 0.25);
    padding: 0 0 20px;
    gap: 0;
    margin-left: 0;
    margin-right: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    z-index: 998;

    opacity: ${({ $open }) => ($open ? "1" : "0")};
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    transform: ${({ $open }) =>
      $open ? "translateY(0)" : "translateY(-14px)"};
    transition:
      opacity 0.35s ease,
      transform 0.35s ease,
      visibility 0.35s ease;
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  }
`;

const SubMenuLink = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: white;
  font-size: 15px;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  font-family: ${theme?.fonts?.mulish || "Mulish, sans-serif"};

  @media (max-width: 991px) {
    padding: 12px 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);

    &:hover {
      color: ${theme.white};
      background: transparent;
      padding-left: 4px;
    }
  }

  &:hover {
    background: ${theme?.base};
    color: ${theme.dark};
    padding-left: 20px;
  }
`;

const SubMenuItem = styled.li`
  list-style: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child {
    border-bottom: none;
  }

  &.active > a,
  &.active > a:hover {
    background: ${theme?.base};
    color: ${theme.dark};
    border-left: none;
    padding-left: 20px;
  }

  @media (max-width: 991px) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    margin-left: 20px;
    margin-right: 20px;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const SubMenu = styled.ul`
  position: absolute;
  top: calc(100% + 14px);
  left: 0;
  min-width: 230px;
  background: ${theme?.dark};
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
  border-radius: 0;
  padding: 0;
  margin: 0;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition:
    opacity 0.28s ease,
    transform 0.28s ease,
    visibility 0.28s ease;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: -14px;
    left: 0;
    right: 0;
    height: 14px;
    background: transparent;
  }

  @media (max-width: 991px) {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    background: transparent;
    padding: 0;
    min-width: unset;
    max-height: ${({ $mobileOpen }) => ($mobileOpen ? "600px" : "0")};
    overflow: hidden;
    transition: max-height 0.35s ease;
  }
`;

const MenuItem = styled.li`
  position: relative;
  list-style: none;

  &:hover > .submenu-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  @media (max-width: 991px) {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
`;

const MobileChevron = styled.span`
  display: none;

  @media (max-width: 991px) {
    display: inline-flex;
    margin-left: auto;
    transition: transform 0.3s ease;
    transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
    font-size: 12px;
    opacity: 0.7;
  }
`;
const MobileBookWrap = styled.li`
  display: none;
  background: ${theme.dark};

  @media (max-width: 991px) {
    display: flex;
    padding: 20px 20px 8px;
    list-style: none;
  }
`;

const DesktopOnlyBook = styled.div`
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 991px) {
    display: none;
  }
`;

const menuLinkStyles = css`
  color: ${theme.white};
  font-weight: 700;
  font-size: 16px;
  padding: 8px 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${theme?.base};
  }

  @media (max-width: 991px) {
    display: flex;
    width: 100%;
    padding: 16px 20px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    background: ${theme?.dark};
    color: ${({ $submenuOpen }) =>
      $submenuOpen ? theme?.base : theme.white};
    text-align: left;
    transition: color 0.3s ease;
  }
`;

const MenuLink = styled(Link)`
  ${menuLinkStyles}
`;

const MenuLinkButton = styled.button`
  ${menuLinkStyles}
`;

const HeaderRight = styled(Flex)`
  gap: 40px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchBar = styled.div`
  color: ${({ $active }) => ($active ? theme?.base : theme.white)};
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1000;

  &:hover {
    color: ${theme?.base};
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const SearchOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 997;
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 60px;
  z-index: 998;
  width: 380px;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  opacity: ${({ $open }) => ($open ? "1" : "0")};
  transform: translateY(${({ $open }) => ($open ? "0px" : "-10px")});
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  @media (max-width: 991px) {
    right: 20px;
    width: calc(100% - 40px);
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: stretch;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  margin-top: 14px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: ${theme.white};
  border: none;
  outline: none;
  padding: 0 20px;
  height: 52px;
  font-size: 15px;
  font-weight: 500;
  color: ${theme.dark};
  font-family: ${theme?.fonts?.mulish || "Mulish, sans-serif"};

  &::placeholder {
    color: ${theme.base};
    font-weight: 400;
  }
`;

const SearchSubmit = styled.button`
  background: ${theme?.base};
  border: none;
  width: 56px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: ${theme.dark};
  flex-shrink: 0;
  transition: background 0.25s ease;

  &:hover {
    background: ${theme.dark};
  }
`;

const NavbarToggler = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${theme.white};
  font-size: 22px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.white};
  }

  @media (max-width: 991px) {
    display: inline-block;
  }
`;

const Icon = styled.i``;

const BookButton = styled(Button)`
  position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 16px;
    height: 16px;
    transform: rotate(-45deg);
    transition: all 0.4s ease-in-out;
    object-fit: contain;
    filter: brightness(0);
  }

  &:hover img {
    transform: rotate(0deg);
    filter: none;
  }

  @media (max-width: 1200px) {
    font-size: 0;
    padding: 0;
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    gap: 0;

    img {
      width: 20px;
      height: 20px;
      margin: 0;
      transform: rotate(0deg);
      filter: brightness(0);
    }

    &:hover img {
      transform: rotate(90deg);
      filter: none;
    }
  }

  @media (max-width: 767px) {
    img {
      width: 14px;
      height: 14px;
    }
  }
`;

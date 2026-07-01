"use client";

import Link from "next/link";
import styled from "styled-components";
import Container from "@/imports/core/atom/Container";
import {
  FOOTER_CONTACT,
  FOOTER_ADDRESS,
  FOOTER_LINKS,
  DUBAI_MAP,
  SOCIAL_LINKS,
  COPYRIGHT,
} from "@/imports/core/constants/footer";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterEl>
      <Main>
        <Container>
          <Grid>
            <Col>
              <Title>{FOOTER_CONTACT.title}</Title>
              <Menu>
                <MenuItem>
                  Call :{" "}
                  <MenuLink href={FOOTER_CONTACT.phone.href}>
                    {FOOTER_CONTACT.phone.label}
                  </MenuLink>
                </MenuItem>
                <MenuItem>
                  Email :{" "}
                  <MenuLink href={FOOTER_CONTACT.email.href}>
                    {FOOTER_CONTACT.email.label}
                  </MenuLink>
                </MenuItem>
                <MenuItem>{FOOTER_CONTACT.note}</MenuItem>
              </Menu>
              <Socials>
                {SOCIAL_LINKS.map((s) => (
                  <SocialLink key={s.iconClass} href={s.url} aria-label="social">
                    <Icon className={s.iconClass} />
                  </SocialLink>
                ))}
              </Socials>
            </Col>

            <Col>
              <Title>{FOOTER_ADDRESS.title}</Title>
              <Text>
                {FOOTER_ADDRESS.lines.map((line) => (
                  <AddressLine key={line}>{line}</AddressLine>
                ))}
              </Text>
            </Col>

            <Col>
              <Title>{FOOTER_LINKS.title}</Title>
              <Menu>
                {FOOTER_LINKS.links.map((l) => (
                  <MenuItem key={l.text}>
                    <NavLink href={l.url}>{l.text}</NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Col>

            <Col>
              <Title>Map Location</Title>
              <MapWrap>
                <Map
                  src={DUBAI_MAP}
                  title="Map location"
                  allowFullScreen
                  loading="lazy"
                />
              </MapWrap>
            </Col>
          </Grid>
        </Container>
      </Main>

      <Bottom>
        <Container>
          <BottomInner>
            <Copyright>{COPYRIGHT} Copyright © {new Date().getFullYear()}</Copyright>
            <ScrollUp onClick={scrollToTop} aria-label="Scroll to top">
              <ArrowSvg width="15" height="7" viewBox="0 0 15 7" fill="none">
                <path d="M15 6.18793L14.1169 7L7.93687 1.31723C7.81958 1.20941 7.66053 1.14885 7.49468 1.14885C7.32884 1.14885 7.16978 1.20941 7.0525 1.31723L0.884376 6.99022L0 6.177L6.16812 0.505163C6.51998 0.181708 6.99715 0 7.49468 0C7.99222 0 8.46938 0.181708 8.82125 0.505163L15 6.18793Z" fill="white"/>
              </ArrowSvg>
              <BgDotted>
                <DottedSvg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="27.5" stroke="currentColor" strokeDasharray="5 5"/>
                </DottedSvg>
              </BgDotted>
            </ScrollUp>
            <BottomLinks>
              <BottomLink href="#">Privacy &amp; Cookie Policy</BottomLink>
            </BottomLinks>
          </BottomInner>
        </Container>
      </Bottom>
    </FooterEl>
  );
}

const FooterEl = styled.footer`
  background: ${({ theme }) => theme.footerBg};
  color: ${({ theme }) => theme.ternary};
`;

const Main = styled.div`
  padding: 100px 0 90px;

  @media (max-width: 991px) {
    padding: 70px 0 60px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1.4fr;
  gap: 40px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const Col = styled.div``;

const Title = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.white};
  margin: 0 0 28px;

  @media (max-width: 991px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.white};
`;

const MenuLink = styled.a`
  color: ${({ theme }) => theme.ternary};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.base};
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.ternary};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.base};
  }
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.9;
`;

const AddressLine = styled.span`
  display: block;
`;

const Socials = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.white};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.base};
    border-color: ${({ theme }) => theme.base};
  }
`;

const Icon = styled.i``;

const MapWrap = styled.div``;

const Map = styled.iframe`
  width: 100%;
  height: 160px;
  border: 0;
  filter: grayscale(100%);
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 26px 0;
`;

const BottomInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
`;

const ArrowSvg = styled.svg`
  position: relative;
  z-index: 2;
`;

const DottedSvg = styled.svg``;

const BgDotted = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: rotate 15s linear infinite;
  animation-play-state: paused;
  color: ${({ theme }) => theme.base};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ScrollUp = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 46px;
  width: 46px;
  top: -49px;
  background-color: #181818;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  z-index: 10;
  color: #fff;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.base};
    opacity: 0.5;
    transition: transform 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    transform: scale(1.1);
  }

  &:hover ${BgDotted} {
    animation-play-state: running;
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @media (max-width: 767px) {
    top: auto;
    position: relative;
    left: auto;
    transform: none;
    margin: 10px auto 0;
  }
`;

const Copyright = styled.div``;

const BottomLinks = styled.div``;

const BottomLink = styled.a`
  color: ${({ theme }) => theme.ternary};

  &:hover {
    color: ${({ theme }) => theme.base};
  }
`;

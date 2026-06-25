"use client";

import styled, { css } from "styled-components";
import { theme, Reveal, floatY } from "@/styles/Theme";
import Link from "next/link";
import Image from "next/image";
import EnvelopeIcon from "@/imports/core/assets/envelopeIcon";
import PlaneIcon from "@/imports/core/assets/PlaneIcon";
import Container from "@/imports/core/atom/Container";

const logoImg = "/image/logo.png";
const elementImg = "/image/element/element-1.png";

import {
  OFFICE_LOCATIONS,
  NAVIGATION_COLUMNS,
  SOCIAL_LINKS,
} from "@/imports/core/constants/footer";

export default function Footer() {
  return (
    <FooterEl>
      <FooterElement variant="fade-left" duration={1200}>
        <Image src={elementImg} alt="element" width={1152} height={1080} />
      </FooterElement>
      <StyledContainer>
        <FooterTopArea>
          <FooterTopRow>
            <Col $xl={4} $lg={3} $md={6}>
              <FooterLogo>
                <Image src={logoImg} alt="Luxera" width={185} height={55} />
              </FooterLogo>
              <FooterText>
                Luxera was founded in 1991 by a group of safety-focused
                professionals who created The Wingman Standard for rigorously
                vetting air charter operators.
              </FooterText>
            </Col>
            {OFFICE_LOCATIONS.map((loc, index) => (
              <Col key={index} $xl={index === 1 ? 2 : 3} $lg={3} $md={6}>
                <WidgetTitle>{loc.title}</WidgetTitle>
                <FooterList>
                  {loc.details.map((detail, idx) => {
                    const isPhone =
                      detail.startsWith("+") || detail.includes("+");
                    return (
                      <FooterListItem key={idx}>
                        {isPhone ? (
                          <FooterContactLink
                            href={`tel:${detail.replace(/[^+\d]/g, "")}`}
                          >
                            {detail}
                          </FooterContactLink>
                        ) : (
                          <FooterTextSpan>{detail}</FooterTextSpan>
                        )}
                      </FooterListItem>
                    );
                  })}
                </FooterList>
              </Col>
            ))}
          </FooterTopRow>
        </FooterTopArea>

        <FooterBottomArea>
          <Row>
            {NAVIGATION_COLUMNS.map((col, index) => (
              <Col
                key={index}
                $xl={index === 2 ? 2 : 3}
                $lg={index === 2 ? 2 : 3}
                $md={6}
              >
                <SectionTitle>{col.title}</SectionTitle>
                <FooterList>
                  {col.links.map((link, idx) => (
                    <FooterListItem key={idx}>
                      <FooterLink href={link.url}>{link.text}</FooterLink>
                    </FooterListItem>
                  ))}
                </FooterList>
              </Col>
            ))}
            <Col $xl={4} $lg={4} $md={6}>
              <SectionTitle>Newsletter</SectionTitle>
              <FooterText>
                Luxera was founded in 1991 by a group of safety-focused
                professionals erators.
              </FooterText>
              <SubscribeForm onSubmit={(e) => e.preventDefault()}>
                <SubscribeIconLabel>
                  <EnvelopeIcon />
                </SubscribeIconLabel>
                <SubscribeInput type="email" placeholder="Enter Email" />
                <SubscribeBtn type="submit">
                  Subscribe Us <PlaneIcon className="plane-icon ml-1" />
                </SubscribeBtn>
              </SubscribeForm>
            </Col>
          </Row>
        </FooterBottomArea>

        <CopyrightArea className="copyright-area">
          <SocialArea>
            <SocialList className="footer-social">
              {SOCIAL_LINKS.map((social, idx) => (
                <SocialListItem key={idx}>
                  <SocialLink href={social.url} $active={social.active}>
                    <Icon className={social.iconClass} />
                  </SocialLink>
                </SocialListItem>
              ))}
            </SocialList>
          </SocialArea>
          <CopyrightText>
            © 2024 Fly Next Airlines. All rights reserved.
          </CopyrightText>
        </CopyrightArea>
      </StyledContainer>
    </FooterEl>
  );
}

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 1;
  padding: 0 15px;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const FooterEl = styled.footer`
  background-color: ${theme.dark};
  padding: 120px 0px 0px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5em;
  color: #dfdfdf;
  margin-top: auto;

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    padding: 80px 0 0;
  }
`;

const FooterElement = styled(Reveal)`
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  pointer-events: none;

  img {
    width: 1152px !important;
    height: 1080px !important;
    max-width: none !important;
  }

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const FooterTopArea = styled.div`
  margin-bottom: 40px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: -30px;
`;

const FooterTopRow = styled(Row)`
  align-items: flex-end;
`;

const FooterBottomArea = styled.div`
  border: 1px solid ${theme.base};
  border-radius: 20px;
  background-color: ${theme.dark};
  position: relative;
  z-index: 9;
  padding: 60px;

  @media (max-width: 991px) {
    padding: 30px;
  }
`;

const Col = styled.div`
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  flex: 0 0 100%;
  max-width: 100%;

  @media (min-width: 768px) {
    flex: 0 0 ${({ $md }) => ($md ? ($md / 12) * 100 : 100)}%;
    max-width: ${({ $md }) => ($md ? ($md / 12) * 100 : 100)}%;
  }

  @media (min-width: 992px) {
    flex: 0 0 ${({ $lg }) => ($lg ? ($lg / 12) * 100 : 100)}%;
    max-width: ${({ $lg }) => ($lg ? ($lg / 12) * 100 : 100)}%;
  }

  @media (min-width: 1200px) {
    flex: 0 0 ${({ $xl }) => ($xl ? ($xl / 12) * 100 : 100)}%;
    max-width: ${({ $xl }) => ($xl ? ($xl / 12) * 100 : 100)}%;
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 15px;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

const FooterText = styled.p`
  margin-bottom: 15px;
  line-height: 1.7em;
  font-size: 16px;
  font-weight: 500;
  color: ${theme.white};
  font-family: ${theme.fonts.mulish};

  &:last-child {
    margin-bottom: 0px;
  }

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }
`;

const WidgetTitle = styled.h4`
  color: ${theme.base};
  margin-top: 0;
  margin-bottom: 15px;
  line-height: 1.3em;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  font-family: ${theme.fonts.playfair};

  @media only screen and (max-width: 991px) {
    font-size: 16px;
  }
`;

const SectionTitle = styled.h4`
  color: white;
  position: relative;
  font-family: ${theme.fonts.mulish};
  font-weight: 800;

  margin-top: 3px;
  margin-bottom: 30px;
  font-size: 18px;

  &::before {
    border: 1px solid ${theme.base};
    bottom: -10px;
    content: "";
    left: 0;
    position: absolute;
    width: 50px;
  }

  @media only screen and (max-width: 991px) {
    font-size: 16px;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 10px;
`;

const footerLinkStyles = css`
  color: white;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  font-family: ${theme.fonts.mulish};

  &:hover {
    color: ${theme.base};
    padding-left: 5px;
  }
`;

const FooterLink = styled(Link)`
  ${footerLinkStyles}
`;

const FooterContactLink = styled.a`
  ${footerLinkStyles}
`;

const FooterTextSpan = styled.span`
  color: white;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  font-family: ${theme.fonts.mulish};
  display: inline-block;
`;

const SubscribeForm = styled.form`
  position: relative;
  margin-top: 10px;
`;

const SubscribeIconLabel = styled.label`
  position: absolute;
  top: 13px;
  left: 15px;
  color: ${theme.base};
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
  }
`;

const SubscribeInput = styled.input`
  width: 100%;
  background: white;
  color: ${theme.text};
  border: none;
  border-radius: 5px;
  font-family: ${theme.fonts.mulish};
  font-size: 14px;
  padding: 0 16px 0 40px;
  height: 45px;
  font-weight: 400;
  outline: none;

  &:focus {
    color: ${theme.text};
    border: none;
    background: white;
  }

  &::placeholder {
    color: #bfbfbf;
  }
`;

const SubscribeBtn = styled.button`
  border-radius: 5px;
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: ${theme.base};
  border: 1px solid ${theme.base};
  color: ${theme.dark};
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.5s ease;
  font-family: ${theme.fonts.mulish};

  .plane-icon {
    width: 16px;
    height: 16px;
    fill: ${theme.dark};
    transform: rotate(45deg) translateY(-2px);
    transition: all 0.4s ease-in-out;
  }

  &:hover {
    background: transparent;
    color: ${theme.base};
    border-color: ${theme.base};

    .plane-icon {
      fill: ${theme.base};
      transform: rotate(-90deg) translateY(-2px);
    }
  }
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const CopyrightArea = styled.div`
  padding: 45px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;

  @media only screen and (max-width: 991px) {
    display: block;
    text-align: center;
  }
`;

const SocialArea = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SocialListItem = styled.li`
  display: inline-block;
  margin-right: 9px;

  &:last-child {
    margin-right: 0;
  }
`;

const SocialLink = styled.a`
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? theme.base : "transparent")};
  border: 1px solid
    ${({ $active }) => ($active ? theme.base : "rgba(220, 187, 135, 0.3)")};
  color: ${({ $active }) => ($active ? "#fff" : theme.base)};
  font-size: 12px;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: white;
    background-color: ${theme.base};
    border-color: ${theme.base};
  }
`;

const CopyrightText = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0;
  color: #dfdfdf;
  font-family: ${theme.fonts.mulish};

  @media only screen and (max-width: 991px) {
    margin-top: 15px;
  }
`;

const Icon = styled.i``;

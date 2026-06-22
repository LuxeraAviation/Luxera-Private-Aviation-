"use client";

import Image from "next/image";
import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Slider from "@/imports/core/components/Slider";
import Link from "next/link";

export default function Charter(props) {
  const {
    subtitle,
    title,
    items,
    perView,
    resolvePerView,
    seats,
    price,
    ctaLabel,
  } = props || {};
  return (
    <Section>
      <Container>
        <HeaderWithNav>
          <SectionHeader>
            <SubTitle>{subtitle}</SubTitle>
            <Title>{title}</Title>
          </SectionHeader>
          <Slider
            items={items}
            perView={perView}
            resolvePerView={resolvePerView}
            controls={({ prev, next }) => (
              <Reveal variant="fade-left" duration={1200}>
                <SliderNav>
                  <NavBtn onClick={prev}>
                    <NavIcon className="fas fa-chevron-left" />
                  </NavBtn>
                  <NavBtn onClick={next}>
                    <NavIcon className="fas fa-chevron-right" />
                  </NavBtn>
                </SliderNav>
              </Reveal>
            )}
            renderItem={(c) => (
              <Card>
                <Thumb>
                  <Image src={c.img} alt={c.title} width={270} height={195} />
                </Thumb>
                <CardBody>
                  <CardTitle>
                    <CardLink href={c.href || "#0"}>{c.title}</CardLink>
                  </CardTitle>
                  <CardSub>{c.sub}</CardSub>
                  <CardMeta>
                    <MetaItem>{c.seats || seats}</MetaItem>
                    <MetaItem>{c.price || price}</MetaItem>
                  </CardMeta>
                  <CardBtn>
                    <BtnLink href={c.href || "#0"}>
                      <Image
                        src="/image/fav.png"
                        alt=""
                        width={16}
                        height={16}
                      />{" "}
                      {ctaLabel}
                    </BtnLink>
                  </CardBtn>
                </CardBody>
              </Card>
            )}
          />
        </HeaderWithNav>
      </Container>
    </Section>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    max-width: 960px;
  }
  @media (max-width: 991px) {
    max-width: 720px;
  }
  @media (max-width: 767px) {
    max-width: 560px;
  }
`;

const Section = styled.section`
  padding-top: 120px;
  position: relative;
  @media (max-width: 767px) {
    padding-top: 70px;
  }
`;

const HeaderWithNav = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const SectionHeader = styled.div`
  margin-bottom: 15px;
  padding-left: 15px;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
  color: ${theme.base};
  font-family: ${theme.fonts.mulish};
  @media (max-width: 991px) {
    font-size: 13px;
  }
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  font-family: ${theme.fonts.playfair};
  @media (max-width: 991px) {
    font-size: 28px;
  }
  @media (max-width: 575px) {
    font-size: 22px;
  }
`;

const SliderNav = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
  padding-right: 15px;

  @media (max-width: 575px) {
    display: none;
  }
`;

const NavBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${theme.base};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.base};
  transition: all 0.3s ease;
  &:hover {
    background: ${theme.base};
    border-color: ${theme.base};
    color: #fff;
  }
`;

const NavIcon = styled.i`
  font-size: 14px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  overflow: hidden;
`;

const Thumb = styled.div`
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const CardBody = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  font-size: 21px;
  margin-top: 0;
  margin-bottom: 4px;
  font-family: ${theme.fonts.playfair};
  a {
    color: ${theme.dark};
    text-decoration: none;
    &:hover {
      color: ${theme.base};
    }
  }
`;

const CardSub = styled.span`
  color: #979797;
  font-weight: 500;
  font-size: 14px;
  display: block;
  margin-bottom: 14px;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 16px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 700;
  color: ${theme.dark};
`;

const MetaItem = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${theme.dark};
`;

const CardBtn = styled.div``;

const CardLink = styled.a`
  color: ${theme.dark};
  text-decoration: none;

  &:hover {
    color: ${theme.base};
  }
`;

const BtnLink = styled(Link)`
  color: ${theme.dark};
  font-weight: 800;
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  img {
    margin-right: 8px;
  }

  &:hover {
    color: ${theme.base};
  }
`;

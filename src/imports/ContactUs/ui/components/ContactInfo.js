"use client";

import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";
import { CONTACT_DATA } from "@/imports/core/constants/contactus";

import LocationIconIcon from "@/imports/core/assets/LocationIconIcon";
import CallIconIcon from "@/imports/core/assets/CallIconIcon";
import MailIconIcon from "@/imports/core/assets/MailIconIcon";

const iconMap = {
  Location: LocationIconIcon,
  Phone: CallIconIcon,
  Email: MailIconIcon,
};

export default function ContactInfo() {
  const { info } = CONTACT_DATA;

  return (
    <InfoSection>
      <StyledContainer>
        <InfoGrid>
          <MapColumn>
            <Reveal
              variant="fade-right"
              duration={1200}
              style={{ width: "100%" }}
            >
              <MapArea>
                <iframe
                  src={info.mapUrl}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps"
                />
              </MapArea>
            </Reveal>
          </MapColumn>

          <DetailsColumn>
            <Reveal
              variant="fade-left"
              duration={1200}
              style={{ width: "100%" }}
            >
              <ContactWidget>
                <WidgetHeader>
                  <SubTitle>{info.subTitle}</SubTitle>
                  <Title>{info.title}</Title>
                  <Description>{info.description}</Description>
                </WidgetHeader>

                <ItemList>
                  {info.items.map((item, idx) => {
                    const IconComp = iconMap[item.icon];
                    return (
                      <ItemCardWrapper key={idx}>
                        <ItemCard href={item.linkUrl || "#"}>
                          <IconBox>
                            {IconComp && <IconComp width="24" height="24" />}
                          </IconBox>
                          <ItemContent>
                            <ItemTitle>{item.title}</ItemTitle>
                            {item.lines.map((line, lIdx) => (
                              <ItemText key={lIdx}>{line}</ItemText>
                            ))}
                            {item.subText && <SubText>{item.subText}</SubText>}
                            {item.linkText && (
                              <LinkLabel>
                                {item.linkText}
                                <Image
                                  src="/image/element/element-20.png"
                                  alt="element decoration"
                                  width={17}
                                  height={17}
                                />
                              </LinkLabel>
                            )}
                          </ItemContent>
                        </ItemCard>
                      </ItemCardWrapper>
                    );
                  })}
                </ItemList>
              </ContactWidget>
            </Reveal>
          </DetailsColumn>
        </InfoGrid>
      </StyledContainer>
    </InfoSection>
  );
}

const InfoSection = styled.section`
  padding: 120px 0;
  position: relative;
  background-color: #ffffff;
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 100%;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;

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

const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: -30px;
`;

const MapColumn = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  display: flex;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const MapArea = styled.div`
  margin-right: 30px;
  width: 100%;

  @media only screen and (max-width: 991px) {
    margin-right: 0;
  }

  iframe {
    width: 100%;
    height: 585px;
    border: none;
    display: block;

    @media (max-width: 768px) {
      height: 400px;
    }
  }
`;

const DetailsColumn = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  display: flex;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const ContactWidget = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WidgetHeader = styled.div`
  margin-bottom: 30px;
`;

const SubTitle = styled.span`
  display: inline-block;
  color: ${theme.base};
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;
  font-family: ${theme.fonts.mulish};

  @media only screen and (max-width: 991px) {
    font-size: 14px;
  }
`;

const Title = styled.h2`
  color: ${theme.dark};
  font-size: 40px;
  font-weight: 700;
  margin: 0 0 10px 0;
  font-family: ${theme.fonts.playfair};

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  color: ${theme.text};
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ItemCardWrapper = styled.li`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px dashed #e5e5e5;

  &:first-child {
    border: none;
    padding: 0;
    margin: 0;
  }
`;

const ItemCard = styled.a`
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  cursor: pointer;
`;

const IconBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f5f3f1;
  border-radius: 50%;
  color: ${theme.base};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ItemContent = styled.div`
  width: calc(100% - 60px);
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ItemTitle = styled.h4`
  font-family: ${theme.fonts.mulish};
  font-weight: 800;
  font-size: 24px;
  color: ${theme.dark};
  margin: 0 0 5px 0;

  @media only screen and (max-width: 991px) {
    font-size: 18px;
  }
`;

const ItemText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.text};
  margin: 0;
  line-height: 1.5;
`;

const SubText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.text};
`;

const LinkLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.base};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
`;

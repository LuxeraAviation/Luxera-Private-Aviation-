"use client";

import Image from "next/image";
import styled from "styled-components";
import { theme, Reveal } from "@/styles/Theme";
import SkillCircle from "@/imports/Team-Details/components/SkillCircle";
import { TEAM_DETAILS } from "@/imports/core/constants/teamDetails";

export default function TeamDetails() {
  const {
    image,
    name,
    designation,
    description,
    phone,
    email,
    socials,
    widgets,
  } = TEAM_DETAILS;

  return (
    <TeamSection>
      <Container>
        <Reveal variant="zoom-in" duration={1200}>
          <TeamItem>
            <TeamThumb>
              <Image
                src={image}
                alt={name}
                width={370}
                height={360}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </TeamThumb>

            <TeamContentArea>
              <TeamContent>
                <Title>{name}</Title>
                <SubTitle>{designation}</SubTitle>
                <Description>{description}</Description>

                <ContactList>
                  {phone && (
                    <ContactItem>
                      <ContactIcon className="fas fa-phone-alt fa-rotate-90" />{" "}
                      {phone}
                    </ContactItem>
                  )}
                  {email && (
                    <ContactItem>
                      <ContactIcon className="fas fa-envelope" /> {email}
                    </ContactItem>
                  )}
                </ContactList>

                {socials?.length > 0 && (
                  <SocialArea>
                    <FollowLabel>Follow Me</FollowLabel>
                    <Social>
                      {socials.map((s, i) => (
                        <SocialItem key={i}>
                          <SocialLink
                            href={s.href || "#0"}
                            aria-label={`${name} social link`}
                          >
                            <SocialIcon className={s.icon} />
                          </SocialLink>
                        </SocialItem>
                      ))}
                    </Social>
                  </SocialArea>
                )}
              </TeamContent>
            </TeamContentArea>
          </TeamItem>
        </Reveal>

        <WidgetArea>
          {widgets?.map((widget) => (
            <Reveal key={widget.title} variant="fade-up" duration={1200}>
              <WidgetContent>
                <WidgetTitle>{widget.title}</WidgetTitle>
                <WidgetText>{widget.text}</WidgetText>

                {widget.skills?.length > 0 && (
                  <SkillArea>
                    {widget.skills.map((skill) => (
                      <SkillCircle
                        key={skill.label}
                        value={skill.value}
                        label={skill.label}
                      />
                    ))}
                  </SkillArea>
                )}
              </WidgetContent>
            </Reveal>
          ))}
        </WidgetArea>
      </Container>
    </TeamSection>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const TeamSection = styled.section`
  padding: 120px 0;
  position: relative;

  @media (max-width: 767px) {
    padding: 70px 0;
  }
`;

const TeamItem = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TeamThumb = styled.div`
  width: 370px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #dde6ef;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const TeamContentArea = styled.div`
  width: calc(100% - 370px);
  padding-left: 30px;

  @media (max-width: 991px) {
    width: 100%;
    padding-left: 0;
    padding-top: 30px;
  }
`;

const TeamContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  background-color: rgb(245, 243, 241);
  padding: 20px;
`;

const Title = styled.h3`
  font-family: ${theme.fonts.mulish};
  font-weight: 700;
  font-size: 24px;
  color: ${theme.dark};
  margin: 0 0 8px;
  line-height: 1.3;
  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

const SubTitle = styled.span`
  display: block;
  color: ${theme.base};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

const Description = styled.p`
  color: ${theme.text};
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
  margin-bottom: 15px;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  margin-top: 10px;
  padding: 0;
`;

const ContactItem = styled.li`
  color: ${theme.dark};
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
`;

const ContactIcon = styled.i`
  color: ${theme.base};
  margin-right: 5px;
`;

const SocialArea = styled.div`
  margin-top: 20px;
`;

const FollowLabel = styled.span`
  display: block;
  color: ${theme.dark};
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Social = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 4px;
`;

const SocialItem = styled.li`
  display: inline-block;

  & + & {
    margin-left: 8px;
  }
`;

const SocialIcon = styled.i``;

const SocialLink = styled.a`
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  font-size: 12px;
  text-decoration: none;
  transition: all 0.3s;
  border: 1px solid rgba(25, 35, 45, 0.3);
  color: ${theme.dark};

  &:hover {
    border-color: ${theme.base};
    background-color: ${theme.base};
    color: ${theme.white};
  }
`;

const WidgetArea = styled.div`
  margin-top: 0;
`;

const WidgetContent = styled.div`
  margin-top: 52px;
`;

const WidgetTitle = styled.h3`
  font-family: ${theme.fonts.playfair};
  font-weight: 700;
  font-size: 30px;
  color: ${theme.dark};
  margin: 0 0 15px;

  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

const WidgetText = styled.p`
  color: ${theme.text};
  font-size: 16px;
  line-height: 1.9;
  margin: 0;
  margin-bottom: 15px;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const SkillArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

"use client";

import styled from "styled-components";
import { theme, floatY, Reveal } from "@/styles/Theme";
import Image from "next/image";
import Container from "@/imports/core/atom/Container";
import Button from "@/imports/core/components/Button";
import { CONTACT_DATA } from "@/imports/core/constants/contactus";

import UserIcon from "@/imports/core/assets/UserIcon";
import MailIconIcon from "@/imports/core/assets/MailIconIcon";
import CallIconIcon from "@/imports/core/assets/CallIconIcon";
import MessageIcon from "@/imports/core/assets/MessageIcon";
import ChevronDownIcon from "@/imports/core/assets/ChevronDownIcon";
import ArrowRightIcon from "@/imports/core/assets/ArrowRightIcon";

export default function ContactForm() {
  const { form } = CONTACT_DATA;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <FormSection>
      <ContactElement>
        <Image
          src="/image/element/element-18.png"
          alt="element decoration"
          width={674}
          height={304}
          priority
        />
      </ContactElement>

      <StyledContainer>
        <GridRow>
          <LeftColumn>
            <Reveal
              variant="fade-right"
              duration={1200}
              style={{ width: "100%" }}
            >
              <LeftContent>
                <SubTitle>{form.subTitle}</SubTitle>
                <Title>{form.title}</Title>
                <Description>{form.description}</Description>

                <SocialList>
                  {form.socials.map((social, idx) => (
                    <SocialItem key={idx}>
                      <SocialLink href={social.url}>
                        <SocialIcon className={social.icon} />
                      </SocialLink>
                    </SocialItem>
                  ))}
                </SocialList>
              </LeftContent>
            </Reveal>
          </LeftColumn>

          <RightColumn>
            <Reveal
              variant="fade-left"
              duration={1200}
              style={{ width: "100%" }}
            >
              <FormInner>
                <FormArea>
                  <StyledForm onSubmit={handleSubmit}>
                    <FormRow>
                      <FormCol>
                        <InputGroup>
                          <InputLabel>
                            <UserIcon width="20" height="20" />
                          </InputLabel>
                          <FormInput
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                          />
                        </InputGroup>
                      </FormCol>

                      <FormCol>
                        <InputGroup>
                          <InputLabel>
                            <MailIconIcon width="20" height="20" />
                          </InputLabel>
                          <FormInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                          />
                        </InputGroup>
                      </FormCol>

                      <FormCol>
                        <InputGroup>
                          <InputLabel>
                            <CallIconIcon width="20" height="20" />
                          </InputLabel>
                          <FormInput
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            required
                          />
                        </InputGroup>
                      </FormCol>

                      <FormCol>
                        <SelectWrapper>
                          <FormSelect name="subject" defaultValue="1">
                            {form.subjects.map((subj) => (
                              <FormOption key={subj.value} value={subj.value}>
                                {subj.text}
                              </FormOption>
                            ))}
                          </FormSelect>
                          <SelectArrow>
                            <ChevronDownIcon width="16" height="16" />
                          </SelectArrow>
                        </SelectWrapper>
                      </FormCol>

                      <FormCol $isFull>
                        <InputGroup>
                          <TextareaLabel>
                            <MessageIcon width="20" height="20" />
                          </TextareaLabel>
                          <FormTextarea
                            name="message"
                            placeholder="Message"
                            rows={5}
                            required
                          />
                        </InputGroup>
                      </FormCol>

                      <FormCol $isFull>
                        <SubmitButtonWrapper>
                          <StyledSubmitButton type="submit">
                            Submit Now <ArrowRightIcon width="23" height="12" />
                          </StyledSubmitButton>
                        </SubmitButtonWrapper>
                      </FormCol>
                    </FormRow>
                  </StyledForm>
                </FormArea>
              </FormInner>
            </Reveal>
          </RightColumn>
        </GridRow>
      </StyledContainer>
    </FormSection>
  );
}

const FormSection = styled.section`
  background-color: ${theme.soft};
  padding: 120px 0;
  position: relative;
  z-index: 2;
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const ContactElement = styled.div`
  position: absolute;
  right: -10%;
  bottom: -5%;
  z-index: 1;
  pointer-events: none;

  img {
    width: 674px !important;
    height: auto !important;
    max-width: none !important;
  }

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 100%;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
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

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;

  @media (min-width: 1200px) {
    height: 400px;
  }
`;

const RightColumn = styled.div`
  display: flex;

  & > div.is-visible {
    transform: none !important;
    will-change: auto !important;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 20px;
  }
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
  line-height: 1.3em;
  margin: 0 0 15px 0;
  width: 80%;
  font-family: ${theme.fonts.playfair};

  @media (max-width: 991px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  color: #19232d;
`;

const SocialList = styled.ul`
  display: flex;
  gap: 5px;
  list-style: none;
  padding: 0;
  margin: 30px 0 0 0;
`;

const SocialItem = styled.li`
  display: inline-block;
`;

const SocialLink = styled.a`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid rgba(220, 187, 135, 0.5);
  color: ${theme.base};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${theme.base};
    color: #ffffff;
    border-color: ${theme.base};
  }
`;

const SocialIcon = styled.i`
  font-size: 12px;
`;

const FormInner = styled.div`
  width: 100%;

  @media (max-width: 575px) {
    padding: 25px;
  }
`;

const FormArea = styled.div``;

const StyledForm = styled.form``;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: -20px;
  margin-top: 0px;

  @media (min-width: 1200px) {
    height: 420px;
  }
`;

const FormCol = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: ${({ $isFull }) => ($isFull ? "100%" : "50%")};
  }
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const InputLabel = styled.label`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: rgba(61, 61, 61, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const TextareaLabel = styled.label`
  position: absolute;
  top: 15px;
  right: 15px;
  color: rgba(61, 61, 61, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const FormInput = styled.input`
  width: 100%;
  border: 1px solid #dcbb87;
  background-color: #ffffff;
  color: #3d3d3d;
  font-family: ${theme.fonts.mulish};
  padding: 10px 40px 10px 15px;
  height: 50px;
  font-weight: 700;
  font-size: 15px;
  border-radius: 3px;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #dcbb87;
    background-color: #ffffff;
    color: #3d3d3d;
  }

  &::placeholder {
    color: rgba(61, 61, 61, 0.7);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #dcbb87;
  background-color: #ffffff;
  color: #3d3d3d;
  font-family: ${theme.fonts.mulish};
  padding: 10px 40px 10px 15px;
  height: 180px;
  font-weight: 700;
  font-size: 15px;
  border-radius: 3px;
  transition: all 0.3s ease;
  outline: none;
  resize: none;

  &:focus {
    border-color: #dcbb87;
    background-color: #ffffff;
    color: #3d3d3d;
  }

  &::placeholder {
    color: rgba(61, 61, 61, 0.7);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const FormSelect = styled.select`
  width: 100%;
  border: 1px solid #dcbb87;
  background-color: #ffffff;
  color: rgba(61, 61, 61, 0.7);
  font-family: ${theme.fonts.mulish};
  padding: 10px 40px 10px 15px;
  height: 50px;
  font-weight: 700;
  font-size: 15px;
  border-radius: 3px;
  transition: all 0.3s ease;
  outline: none;
  appearance: none;
  cursor: pointer;

  &:focus {
    border-color: #dcbb87;
    background-color: #ffffff;
    color: #3d3d3d;
  }

  &:not([value="1"]) {
    color: #3d3d3d;
  }
`;

const FormOption = styled.option`
  color: #3d3d3d;
  background-color: #ffffff;
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: rgba(61, 61, 61, 0.7);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 10px;
`;

const StyledSubmitButton = styled(Button)`
  width: auto;
  border-radius: 45px;
  padding: 12px 30px;
  height: 50px;
`;

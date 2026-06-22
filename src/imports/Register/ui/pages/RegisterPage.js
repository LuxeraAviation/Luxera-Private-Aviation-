"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/imports/core/components/Banner";
import { theme, Reveal } from "@/styles/Theme";
import {
  SIGN_IN_BANNER,
  SIGN_UP_BANNER,
} from "@/imports/core/constants/banner";

export default function RegisterPage({ isLogin = false }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Banner banner={isLogin ? SIGN_IN_BANNER : SIGN_UP_BANNER} />
      <AccountSection>
        <Container>
          <Reveal variant="fade-up" duration={1200}>
            <SectionHeader>
              <SubTitle>
                <SubTitleSpan>{isLogin ? "Sign In" : "Sign Up"}</SubTitleSpan>
              </SubTitle>
              <SectionTitle>
                {isLogin
                  ? "Sign in to your account"
                  : "Sign up to your account"}
              </SectionTitle>
            </SectionHeader>
          </Reveal>

          <FormWrapper>
            <Reveal variant="fade-up" duration={1200}>
              <AccountForm onSubmit={handleSubmit}>
                <InputGroup>
                  <FormControl
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <InputIcon>
                    <IconEl className="fas fa-envelope" />
                  </InputIcon>
                </InputGroup>

                {!isLogin && (
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                    />
                    <InputIcon>
                      <IconEl className="icon-name_icone" />
                    </InputIcon>
                  </InputGroup>
                )}
                <InputGroup>
                  <FormControl
                    type="password"
                    name="password"
                    placeholder={isLogin ? "Password" : "Create Password"}
                    required
                  />
                  <InputIcon>
                    <IconEl className="icon-Create_Password_icone" />
                  </InputIcon>
                </InputGroup>

                {!isLogin && (
                  <PolicyText>
                    By clicking up you confirm that you&apos;ve read and accept
                    our <PolicySpan>Policy</PolicySpan> and{" "}
                    <PolicySpan>Privacy</PolicySpan>
                  </PolicyText>
                )}

                <SubmitButton type="submit">
                  {isLogin ? "Sign In" : "Sign Up"}
                </SubmitButton>

                <OrDivider>Or</OrDivider>

                <GoogleButton type="button">
                  <GoogleIconWrapper>
                    <Image
                      src="/image/google.png"
                      alt="google"
                      width={20}
                      height={20}
                    />
                  </GoogleIconWrapper>
                  Continue With Google
                </GoogleButton>
                <AccountPrompt>
                  {isLogin ? (
                    <>
                      Not Register Yet?{" "}
                      <Link href="/register">Create an account</Link>
                    </>
                  ) : (
                    <>
                      Already Have An Account?{" "}
                      <Link href="/login">Sign In</Link>
                    </>
                  )}
                </AccountPrompt>
              </AccountForm>
            </Reveal>
          </FormWrapper>
        </Container>
      </AccountSection>
    </>
  );
}

const AccountSection = styled.section`
  background-color: ${theme.soft};
  padding: 120px 0;
  width: 100%;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 0 15px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  color: ${theme.base};
  font-family: ${theme.fonts.mulish};
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;

  span {
    color: ${theme.base};
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.playfair};
  font-size: 40px;
  font-weight: 700;
  color: ${theme.dark};
  margin: 0;

  @media (max-width: 767px) {
    font-size: 28px;
  }
`;

const FormWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;

  @media (max-width: 575px) {
    padding: 0;
  }
`;

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const FormControl = styled.input`
  width: 100%;
  background-color: ${theme.soft};
  border: 1px solid ${theme.base};
  color: ${theme.text};
  font-family: ${theme.fonts.mulish};
  padding: 10px 55px 10px 20px;
  height: 52px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  outline: none;

  &:focus {
    border-color: ${theme.base};
    background-color: ${theme.white};
  }

  &::placeholder {
    color: rgba(61, 61, 61, 0.55);
    font-weight: 400;
  }
`;

const InputIcon = styled.label`
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  color: ${theme.dark};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0.65;
`;

const SubTitleSpan = styled.span`
  color: ${theme.base};
`;

const IconEl = styled.i``;

const PolicyText = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 15px;
  font-weight: 700;
  color: ${theme.text};
  text-align: center;
  line-height: 1.6;
  margin: 0 0 40px;
`;

const PolicySpan = styled.span`
  color: ${theme.base};
  font-weight: 800;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.base};
  border: 1.5px solid ${theme.base};
  color: ${theme.dark};
  height: 52px;
  width: 100%;
  border-radius: 5px;
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.35s ease;
  letter-spacing: 0.3px;
  margin-bottom: 0;

  &:hover {
    background-color: transparent;
    color: ${theme.base};
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 22px 0;
  color: ${theme.dark};
  font-family: ${theme.fonts.mulish};
  font-weight: 700;
  font-size: 15px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #e5e5e5;
  }

  &::before {
    margin-right: 15px;
  }

  &::after {
    margin-left: 15px;
  }
`;

const GoogleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${theme.white};
  border: 1px solid ${theme.base};
  color: ${theme.dark};
  height: 52px;
  width: 100%;
  border-radius: 5px;
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    color: ${theme.base};
  }
`;

const GoogleIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const AccountPrompt = styled.div`
  text-align: center;
  margin-top: 22px;
  font-family: ${theme.fonts.mulish};
  font-weight: 700;
  font-size: 15px;
  color: ${theme.text};

  a {
    color: ${theme.base};
    font-weight: 800;
    text-decoration: none;
    margin-left: 5px;
    transition: color 0.3s ease;

    &:hover {
      color: #c9a56f;
    }
  }
`;

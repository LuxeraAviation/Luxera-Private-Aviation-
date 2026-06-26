"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/styles/Theme";
import Container from "@/imports/core/atom/Container";
import Dropdown from "@/imports/core/components/Dropdown";

import {
  FROM_OPTIONS,
  TO_OPTIONS,
  DATE_OPTIONS,
} from "@/imports/core/constants/homepage";

export default function BookFlight() {
  const [qty, setQty] = useState(1);

  return (
    <BookFormSection>
      <StyledContainer>
        <BookFormArea>
          <SectionHeader>
            <SubTitle>
              <span>Luxera</span> Book
            </SubTitle>
            <SectionTitle>Book A Personal Flight</SectionTitle>
          </SectionHeader>
          <BookForm onSubmit={(e) => e.preventDefault()}>
            <FormRow>
              <FormGroup>
                <Label>From</Label>
                <Dropdown
                  options={FROM_OPTIONS}
                  defaultValue="dhaka"
                  icon={<Icon className="fas fa-plane-departure" />}
                />
              </FormGroup>

              <FormGroup>
                <Label>To</Label>
                <Dropdown
                  options={TO_OPTIONS}
                  defaultValue="london"
                  icon={<Icon className="fas fa-plane-arrival" />}
                />
              </FormGroup>

              <FormGroup>
                <Label>Date</Label>
                <Dropdown
                  options={DATE_OPTIONS}
                  defaultValue="25/12/2021"
                  icon={<Icon className="fas fa-calendar-alt" />}
                />
              </FormGroup>

              <FormGroup>
                <Label>Passenger</Label>
                <BookQuantity>
                  <BookPlusMinus>
                    <QtyButton
                      className="dec"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      -
                    </QtyButton>
                    <QtyInput type="text" name="qty" value={qty} readOnly />
                    <QtyButton
                      className="inc"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      +
                    </QtyButton>
                  </BookPlusMinus>
                </BookQuantity>
              </FormGroup>

              <ButtonGroup>
                <SubmitBtn type="submit">
                  <BtnIcon
                    src="/image/fav.png"
                    alt="icon"
                    width={20}
                    height={20}
                  />{" "}
                  Book Now
                </SubmitBtn>
              </ButtonGroup>
            </FormRow>
          </BookForm>
        </BookFormArea>
      </StyledContainer>
    </BookFormSection>
  );
}

const BookFormSection = styled.section`
  padding: 120px 0;
  position: relative;
  background-color: ${theme.white};

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1140px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
`;

const BookFormArea = styled.div`
  background:
    linear-gradient(rgba(0, 0, 0, 0.9), rgba(66, 69, 69, 0.9)),
    url("/image/demo/12.webp") center/cover no-repeat;
  padding: 100px 180px;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 1199px) {
    padding: 40px 30px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.span`
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 500;
  font-size: 20px;
  color: ${theme.base};
  margin-bottom: 12px;
  font-family: ${theme.fonts?.mulish};

  span {
    color: #fff;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts?.playfair};
  font-size: 42px;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: #fff;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 32px;
  }
`;

const BookForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  text-align: left;
  font-family: ${theme.fonts?.mulish};
  font-size: 18px;
  font-weight: 300;
  color: white;
  margin-bottom: 8px;
`;

const BookQuantity = styled.div`
  position: relative;
  width: 100%;
`;

const BookPlusMinus = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

const QtyButton = styled.div`
  color: ${theme.base};
  font-size: 20px;
  font-weight: 500;
  line-height: 45px;
  margin: 0;
  text-align: center;
  width: 45px;
  height: 45px !important;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  transition: all ease 0.3s;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;

  &.dec {
    left: 0px;
  }

  &.inc {
    right: 0px;
  }

  &:hover {
    color: white;
  }
`;

const QtyInput = styled.input`
  color: white;
  font-size: 16px;
  height: 45px;
  font-weight: 500;
  margin: 0;
  text-align: center;
  width: 100%;
  outline: none;
  border: 1px solid ${theme.base };
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const BtnIcon = styled(Image)`
  transform: rotate(-45deg);
  transition: all 0.5s;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
  filter: brightness(0);
`;

const SubmitBtn = styled.button`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${theme.base};
  border: 1px solid ${theme.base};
  color: ${theme.dark};
  font-size: 16px;
  font-weight: 500;
  padding: 12px 35px;
  border-radius: 39px;
  cursor: pointer;
  transition: all 0.5s;
  font-family: ${theme.fonts?.mulish};

  &:hover {
    background-color: transparent;
    color: ${theme.base};

    ${BtnIcon} {
      transform: rotate(0deg);
      filter: none;
    }
  }
`;

const Icon = styled.i``;

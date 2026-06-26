"use client";

import { useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "@/styles/Theme";
import BookPlaneIcon from "@/imports/core/assets/BookPlaneIcon";
import Dropdown from "@/imports/core/components/Dropdown";
import {
  FROM_OPTIONS,
  TO_OPTIONS,
  DATE_OPTIONS,
} from "@/imports/core/constants/homepage";

export default function CallWidget() {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  return (
    <WidgetWrap $open={open}>
      <ToggleTab
        $open={open}
        aria-label="Toggle booking form"
        onClick={() => setOpen((o) => !o)}
      >
        <TabNum $open={open}>
          <Icon className="fas fa-phone-alt" /> +1 814 929 4263
        </TabNum>
        <TabArrow $open={open} />
      </ToggleTab>

      <BookForm onSubmit={(e) => e.preventDefault()}>
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
              <QtyButton className="inc" onClick={() => setQty((q) => q + 1)}>
                +
              </QtyButton>
            </BookPlusMinus>
          </BookQuantity>
        </FormGroup>

        <FormGroup $full>
          <SubmitBtn type="submit">
            <PlaneIconWrap>
              <BookPlaneIcon />
            </PlaneIconWrap>
            Book Now
          </SubmitBtn>
        </FormGroup>
      </BookForm>
    </WidgetWrap>
  );
}

const WidgetWrap = styled.div`
  position: fixed;
  z-index: 9990;
  top: 50%;
  right: 0;
  width: 900px;
  transform: translateY(-50%) translateX(900px);
  transition: transform 0.5s ease;
  background-color: ${theme.dark};
  box-shadow: 0 5px 100px rgba(255, 255, 255, 0.25);
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ $open }) =>
    $open &&
    css`
      transform: translateY(-50%) translateX(0);
    `}

  @media (max-width: 1199px) {
    display: none;
  }
`;
const ToggleTab = styled.button`
  position: absolute;
  top: 50%;
  left: -20px;
  background-color: ${theme.white};
  transform: translate(-50%, -50%) rotate(-90deg);
  transform-origin: center;
  color: ${theme.dark};
  font-weight: 700;
  border-radius: 5px 5px 0 0;
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
  overflow: hidden;
  height: 40px;
  cursor: pointer;
  transition: all 0.5s;

  ${({ $open, theme }) =>
    $open &&
    css`
      background-color: ${theme.dark};
      color: ${theme.white};
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    `}
`;
const TabNum = styled.span`
  padding: 10px 27px;
  font-size: 15px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  background-color: transparent;
  color: ${theme.dark};

  ${({ $open, theme }) =>
    $open &&
    css`
      background-color: ${theme.dark};
      color: ${theme.white};
    `}
`;

const Icon = styled.i`
  color: ${theme.base};
  font-size: 16px;
  margin-right: 8px;
`;

const TabArrow = styled.span`
  width: 50px;
  height: 100%;
  background-color: ${theme.base};
  position: relative;
  flex-shrink: 0;

  &::after {
    content: "";
    display: block;
    position: absolute;
    right: 18px;
    top: 50%;
    width: 14px;
    height: 14px;
    pointer-events: none;
    transform-origin: 50% 50%;

    border-top: 3px solid ${theme.dark};
    border-left: 3px solid ${theme.dark};
    border-bottom: none;
    border-right: none;
    margin-top: -3px;
    transform: rotate(45deg);
    transition: all 0.15s ease-in-out;

    ${({ $open }) =>
      $open &&
      css`
        border-top: none;
        border-left: none;
        border-bottom: 3px solid ${theme.dark};
        border-right: 3px solid ${theme.dark};
        margin-top: -10px;
      `}
  }
`;

const BookForm = styled.form`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  align-items: end;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ $full }) =>
    $full &&
    css`
      grid-column: 1 / -1;
    `}
`;

const Label = styled.label`
  text-align: left;
  font-family: ${theme.fonts?.mulish || "var(--font-mulish), sans-serif"};
  font-size: 15px;
  font-weight: 500;
  color: white;
  margin-bottom: 10px;
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
  border: 1px solid ${theme.base};
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
`;

const PlaneIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
  transition: transform 0.35s ease;
`;

const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background: ${theme.base};
  border: 1.5px solid ${theme.base};
  color: ${theme.dark};
  padding: 13px 25px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: all 0.35s ease;
  margin-top: 0;

  &:hover {
    background: transparent;
    color: ${theme.base};

    ${PlaneIconWrap} {
      transform: rotate(45deg);
    }
  }
`;
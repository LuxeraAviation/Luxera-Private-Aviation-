"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/Theme";

export default function FormInput({ iconClass, type = "text", ...props }) {
  return (
    <InputGroup>
      {iconClass && (
        <IconLabel className="icon">
          <Icon className={iconClass} />
        </IconLabel>
      )}
      <StyledInput type={type} {...props} />
    </InputGroup>
  );
}

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const IconLabel = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
  background-color: transparent;
  color: ${theme.gray};
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${theme?.base};
  background-color: ${theme?.cream};
  color: ${theme?.text};
  font-family: ${theme?.fonts?.mulish};
  padding: 10px 60px 10px 25px;
  height: 50px;
  font-weight: 700;
  font-size: 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border: 1px solid ${theme?.base};
    background-color: ${theme.white};
    color: ${theme?.text};
  }

  &::placeholder {
    color: ${theme.gray};
  }
`;

const Icon = styled.i``;

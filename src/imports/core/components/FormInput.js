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
  color: #3d3d3d;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${theme?.base || "#dcbb87"};
  background-color: ${theme?.cream || "#fff8ee"};
  color: ${theme?.text || "#3d3d3d"};
  font-family: ${theme?.fonts?.mulish || "Mulish, sans-serif"};
  padding: 10px 60px 10px 25px;
  height: 50px;
  font-weight: 700;
  font-size: 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border: 1px solid ${theme?.base || "#dcbb87"};
    background-color: white;
    color: ${theme?.text || "#3d3d3d"};
  }

  &::placeholder {
    color: rgba(61, 61, 61, 0.7);
  }
`;

const Icon = styled.i``;

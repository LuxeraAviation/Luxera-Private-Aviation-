"use client";

import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { theme } from "@/styles/Theme";

export default function Dropdown({
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = "Select option",
  icon,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    options.find((opt) => opt.value === selectedValue) ||
    options.find((opt) => opt.label === selectedValue);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <HeaderLeft>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <SelectedLabel>{displayLabel}</SelectedLabel>
        </HeaderLeft>
        <ChevronIcon
          className={isOpen ? "fas fa-chevron-up" : "fas fa-chevron-down"}
        />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((opt) => (
            <DropdownItem
              key={opt.value}
              $isSelected={opt.value === selectedValue}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  padding: 0 15px;
  border: 1px solid ${theme.base};
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  font-family: ${theme.fonts?.mulish || "var(--font-mulish), sans-serif"};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.base};
  font-size: 16px;
`;

const ChevronIcon = styled.i`
  color: white;
  font-size: 12px;
`;

const SelectedLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: white;
  font-family: ${theme.fonts?.mulish || "var(--font-mulish), sans-serif"};
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  margin: 0;
  padding: 5px 0;
  list-style: none;
  z-index: 999;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

const DropdownItem = styled.li`
  padding: 10px 20px;
  font-size: 14px;
  color: ${theme.dark};
  font-family: ${theme.fonts?.mulish || "var(--font-mulish), sans-serif"};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background-color: ${theme.base};
    color: ${theme.dark};
  }

  ${(props) =>
    props.$isSelected &&
    css`
      background-color: ${theme.base};
      color: ${theme.dark};
    `}
`;

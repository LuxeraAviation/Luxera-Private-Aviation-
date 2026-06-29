"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AIRPORTS } from "@/imports/core/constants/airports";

function searchAirports(query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return AIRPORTS.filter(
    (a) =>
      a.iata_code.toLowerCase().startsWith(q) ||
      a.airport_name.toLowerCase().includes(q) ||
      a.city_name.toLowerCase().includes(q) ||
      a.country_name.toLowerCase().includes(q),
  ).slice(0, 8);
}

export default function AirportAutocomplete({
  label,
  value,
  onSelect,
  placeholder = "City / airport",
  ariaLabel,
}) {
  const [prevValue, setPrevValue] = useState(value);
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapRef = useRef(null);

  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(value || "");
  }

  useEffect(() => {
    function handleOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function handleChange(e) {
    const q = e.target.value;
    setQuery(q);
    setActiveIndex(-1);
    const found = searchAirports(q);
    setResults(found);
    setIsOpen(found.length > 0);
  }

  function handleSelect(airport) {
    const display = `${airport.airport_name} (${airport.iata_code})`;
    setQuery(display);
    setIsOpen(false);
    setResults([]);
    onSelect(airport);
  }

  function handleKeyDown(e) {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <Wrap ref={wrapRef}>
      <FieldInner>
        <FieldLabel>{label}</FieldLabel>
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          aria-label={ariaLabel || label}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          autoComplete="off"
          spellCheck={false}
        />
      </FieldInner>

      {isOpen && (
        <Dropdown role="listbox">
          {results.map((airport, idx) => (
            <DropdownItem
              key={airport.iata_code}
              role="option"
              aria-selected={idx === activeIndex}
              $active={idx === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(airport);
              }}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <ItemCode>{airport.iata_code}</ItemCode>
              <ItemInfo>
                <ItemName>{airport.airport_name}</ItemName>
                <ItemSub>{airport.country_name}</ItemSub>
              </ItemInfo>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

const FieldInner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 6px;
  padding: 12px 16px;
  min-height: 48px;
  background: transparent;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: rgba(255, 255, 255, 0.85);
  }
`;

const FieldLabel = styled.span`
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
  }
`;

const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  flex-shrink: 0;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  min-width: 260px;
  max-width: calc(100vw - 32px);
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  z-index: 300;
  list-style: none;
  margin: 0;
  padding: 6px 0;
  max-height: 280px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "rgba(170, 132, 83, 0.1)" : "transparent"};
  transition: background 0.15s ease;

  &:hover {
    background: rgba(170, 132, 83, 0.1);
  }
`;

const ItemCode = styled.span`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 700;
  color: #aa8453;
  background: rgba(170, 132, 83, 0.1);
  padding: 3px 7px;
  border-radius: 4px;
  flex-shrink: 0;
  letter-spacing: 0.5px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
`;

const ItemName = styled.span`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  color: #1b1b1b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemSub = styled.span`
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 12px;
  color: #888;
`;

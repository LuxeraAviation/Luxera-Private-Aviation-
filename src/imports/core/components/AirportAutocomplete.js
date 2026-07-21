"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

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
    setResults([]);
    setIsOpen(false);
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

  useEffect(() => {
    if (query === value || query.trim().length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/airports?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setIsOpen(data.length > 0);
        }
      } catch (err) {
        console.error("Failed to fetch airports:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, value]);

  function handleChange(e) {
    const q = e.target.value;
    setQuery(q);
    setActiveIndex(-1);
    if (q.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
    }
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
          aria-label={
            ariaLabel || (typeof label === "string" ? label : "Airport")
          }
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
                <ItemSub>
                  {airport.city_name ? `${airport.city_name}, ` : ""}
                  {airport.country_name}
                </ItemSub>
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
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 6px;
  padding: 10px 14px;
  height: 44px;
  background: transparent;
  transition: border-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus-within {
    border-color: rgba(255, 255, 255, 0.85);
  }
`;

const FieldLabel = styled.span`
  position: absolute;
  top: 0;
  left: 10px;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.base};
  padding: 0 6px;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.85;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 400;
  padding: 0;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 400;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: auto;
  min-width: 400px;
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

  @media (max-width: 575px) {
    min-width: 100%;
  }
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

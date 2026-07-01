"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import DatePickerPopover from "@/imports/core/components/DatePickerPopover";
import AirportAutocomplete from "@/imports/core/components/AirportAutocomplete";

export default function BookingForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [passengers, setPassengers] = useState(4);

  const dateRef = useRef(null);
  const paxRef = useRef(null);

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isPaxOpen, setIsPaxOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setFrom("");
    setTo("");
    setDateRange({ start: null, end: null });
    setPassengers(4);
  };

  useEffect(() => {
    function clickOutside(e) {
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setIsDateOpen(false);
      }
      if (paxRef.current && !paxRef.current.contains(e.target)) {
        setIsPaxOpen(false);
      }
    }
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const displayDate =
    dateRange.start && dateRange.end
      ? `${formatDate(dateRange.start)}  →  ${formatDate(dateRange.end)}`
      : dateRange.start
      ? formatDate(dateRange.start)
      : "Select dates";

  return (
    <Form onSubmit={handleSearch}>
      <AirportAutocompleteWrapper>
        <AirportAutocomplete
          label="From :"
          value={from}
          onSelect={(airport) =>
            setFrom(`${airport.airport_name} (${airport.iata_code})`)
          }
          placeholder="City / airport"
          ariaLabel="From"
        />
      </AirportAutocompleteWrapper>

      <AirportAutocompleteWrapper>
        <AirportAutocomplete
          label="To :"
          value={to}
          onSelect={(airport) =>
            setTo(`${airport.airport_name} (${airport.iata_code})`)
          }
          placeholder="City / airport"
          ariaLabel="To"
        />
      </AirportAutocompleteWrapper>

      <FieldContainer ref={dateRef}>
        <Field onClick={() => setIsDateOpen((o) => !o)}>
          <Content>{displayDate}</Content>
          <Chevron>
            <i
              className={`fa-solid fa-chevron-${isDateOpen ? "up" : "down"}`}
            />
          </Chevron>
        </Field>
        {isDateOpen && (
          <DatePickerPopover
            value={dateRange}
            onChange={(range) => setDateRange(range)}
            onClose={() => setIsDateOpen(false)}
          />
        )}
      </FieldContainer>

      <FieldContainer ref={paxRef}>
        <Field onClick={() => setIsPaxOpen((o) => !o)}>
          <Content>Passengers : {String(passengers).padStart(2, "0")}</Content>
          <Chevron>
            <i className={`fa-solid fa-chevron-${isPaxOpen ? "up" : "down"}`} />
          </Chevron>
        </Field>
        {isPaxOpen && (
          <DropdownMenu>
            <DropdownItem>
              <DropdownLabel>Passengers :</DropdownLabel>
              <CounterContainer>
                <CounterButton
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPassengers(Math.max(1, passengers - 1));
                  }}
                  aria-label="Decrease passengers"
                >
                  <i className="fa-solid fa-minus" />
                </CounterButton>
                <CounterValue>
                  {String(passengers).padStart(2, "0")}
                </CounterValue>
                <CounterButton
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPassengers(Math.min(50, passengers + 1));
                  }}
                  aria-label="Increase passengers"
                >
                  <i className="fa-solid fa-plus" />
                </CounterButton>
              </CounterContainer>
            </DropdownItem>
          </DropdownMenu>
        )}
      </FieldContainer>

      <SearchButton type="submit">
        Search Jets
      </SearchButton>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1.1fr 1.1fr 1fr 1fr 150px;
  align-items: center;
  gap: 12px;
  background: ${({ theme }) => theme.base};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    padding: 22px;
  }
  @media (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const AirportAutocompleteWrapper = styled.div`
  grid-column: span 1;
  min-width: 0;
  width: 100%;
`;

const FieldContainer = styled.div`
  position: relative;
  grid-column: span 1;
  min-width: 0;
  width: 100%;
`;

const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 6px;
  padding: 12px 10px;
  min-height: 48px;
  cursor: pointer;
  background: transparent;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 991px) {
    padding: 12px 16px;
  }
`;

const Content = styled.span`
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

const Chevron = styled.span`
  color: #fff;
  opacity: 0.85;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  pointer-events: none;
  flex-shrink: 0;

  @media (max-width: 991px) {
    margin-left: 8px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: auto;
  min-width: 320px;
  max-width: calc(100vw - 32px);
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 16px 20px;
  z-index: 100;

  @media (max-width: 1199px) {
    right: auto;
    left: 0;
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const DropdownLabel = styled.span`
  color: #1b1b1b;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CounterButton = styled.button`
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  color: #1b1b1b;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(170, 132, 83, 0.1);
    border-color: #aa8453;
    color: #aa8453;
  }
`;

const CounterValue = styled.span`
  color: #1b1b1b;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 6px;
  padding: 12px 10px;
  min-height: 48px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;

  grid-column: span 1;

  @media (max-width: 991px) {
    grid-column: span 2;
    padding: 14px 28px;
    font-size: 15px;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }

  &:hover {
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.dark};
  }
`;

"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import DatePickerPopover from "./DatePickerPopover";
import AirportAutocomplete from "./AirportAutocomplete";

export default function BookingForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [passengers, setPassengers] = useState(4);
  const [isPaxOpen, setIsPaxOpen] = useState(false);

  const dateRef = useRef(null);
  const paxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setIsDateOpen(false);
      }
      if (paxRef.current && !paxRef.current.contains(e.target)) {
        setIsPaxOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <Form onSubmit={(e) => e.preventDefault()}>
      <AirportAutocomplete
        label="From :"
        value={from}
        onSelect={(airport) =>
          setFrom(`${airport.airport_name} (${airport.iata_code})`)
        }
        placeholder="City / airport"
        ariaLabel="From"
      />

      <AirportAutocomplete
        label="To :"
        value={to}
        onSelect={(airport) =>
          setTo(`${airport.airport_name} (${airport.iata_code})`)
        }
        placeholder="City / airport"
        ariaLabel="To"
      />

      <FieldContainer ref={dateRef}>
        <Field onClick={() => setIsDateOpen((o) => !o)}>
          <Content>{displayDate}</Content>
          <Chevron>
            <i className={`fa-solid fa-chevron-${isDateOpen ? "up" : "down"}`} />
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
                <CounterValue>{String(passengers).padStart(2, "0")}</CounterValue>
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

      <Submit type="submit">Search Jets</Submit>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
  align-items: center;
  gap: 14px;
  background: ${({ theme }) => theme.base};
  border-radius: 5px;
  padding: 22px;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 575px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const FieldContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 6px;
  padding: 12px 16px;
  min-height: 48px;
  cursor: pointer;
  background: transparent;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
  }
`;

const Content = styled.span`
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Chevron = styled.span`
  color: ${({ theme }) => theme.white};
  opacity: 0.85;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  pointer-events: none;
  flex-shrink: 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 100%;
  min-width: 260px;
  max-width: calc(100vw - 32px);
  background: ${({ theme }) => theme.white};
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
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CounterButton = styled.button`
  background: transparent;
  border: none;
  color: #1b1b1b;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const CounterValue = styled.span`
  color: #1b1b1b;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 15px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
  user-select: none;
`;

const Submit = styled.button`
  background: ${({ theme }) => theme.heading};
  color: ${({ theme }) => theme.bg};
  border: none;
  border-radius: 6px;
  padding: 14px 28px;
  min-height: 48px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  @media (max-width: 1199px) {
    grid-column: 1 / -1;
  }

  &:hover {
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.base};
  }
`;

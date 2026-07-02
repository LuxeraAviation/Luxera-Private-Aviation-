"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import DateTimePickerPopover from "@/imports/core/components/DatePickerPopover";
import AirportAutocomplete from "@/imports/core/components/AirportAutocomplete";

const AIRCRAFT_CATEGORIES = [
  "Light Jet",
  "Midsize Jet",
  "Super Midsize",
  "Heavy Jet",
  "Ultra Long Range",
  "VIP Airliner",
];

export default function BookingForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depDateTime, setDepDateTime] = useState(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  });
  const [retDateTime, setRetDateTime] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(12, 0, 0, 0);
    return d;
  });
  const [passengers, setPassengers] = useState(4);
  const [aircraftCategory, setAircraftCategory] = useState("Light Jet");
  const [specialRequests, setSpecialRequests] = useState("");

  const depDateTimeRef = useRef(null);
  const retDateTimeRef = useRef(null);
  const paxRef = useRef(null);
  const categoryRef = useRef(null);

  const [isDepOpen, setIsDepOpen] = useState(false);
  const [isRetOpen, setIsRetOpen] = useState(false);
  const [isPaxOpen, setIsPaxOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    setFrom("");
    setTo("");
    setDepDateTime(() => {
      const d = new Date();
      d.setHours(12, 0, 0, 0);
      return d;
    });
    setRetDateTime(() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      d.setHours(12, 0, 0, 0);
      return d;
    });
    setPassengers(4);
    setAircraftCategory("Light Jet");
    setSpecialRequests("");
  };

  useEffect(() => {
    function clickOutside(e) {
      if (depDateTimeRef.current && !depDateTimeRef.current.contains(e.target)) {
        setIsDepOpen(false);
      }
      if (retDateTimeRef.current && !retDateTimeRef.current.contains(e.target)) {
        setIsRetOpen(false);
      }
      if (paxRef.current && !paxRef.current.contains(e.target)) {
        setIsPaxOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  function formatDateTime(date) {
    if (!date) return "Select date & time";
    const dateStr = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const h = date.getHours();
    const m = date.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    const timeStr = `${h12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return `${dateStr}, ${timeStr}`;
  }

  return (
    <Form onSubmit={handleSearch}>
      {/* --- ROW 1 --- */}
      {/* 1. Departure Airport */}
      <AirportAutocompleteWrapper>
        <AirportAutocomplete
          label={
            <>
              <i className="fa-solid fa-plane-departure" /> From
            </>
          }
          value={from}
          onSelect={(airport) =>
            setFrom(`${airport.airport_name} (${airport.iata_code})`)
          }
          placeholder="Departure Airport"
          ariaLabel="Departure Airport"
        />
      </AirportAutocompleteWrapper>

      {/* 2. Arrival Airport */}
      <AirportAutocompleteWrapper>
        <AirportAutocomplete
          label={
            <>
              <i className="fa-solid fa-plane-arrival" /> To
            </>
          }
          value={to}
          onSelect={(airport) =>
            setTo(`${airport.airport_name} (${airport.iata_code})`)
          }
          placeholder="Arrival Airport"
          ariaLabel="Arrival Airport"
        />
      </AirportAutocompleteWrapper>

      {/* 3. Number of Passengers */}
      <PassengersContainer ref={paxRef}>
        <Field onClick={() => setIsPaxOpen((o) => !o)}>
          <Label>
            <i className="fa-solid fa-users" /> Pax
          </Label>
          <Content>{String(passengers).padStart(2, "0")}</Content>
          <Chevron>
            <i className={`fa-solid fa-chevron-${isPaxOpen ? "up" : "down"}`} />
          </Chevron>
        </Field>
        {isPaxOpen && (
          <DropdownMenu>
            <DropdownItem>
              <DropdownLabel>Passengers:</DropdownLabel>
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
      </PassengersContainer>

      {/* 4. Preferred Aircraft Category */}
      <CategoryContainer ref={categoryRef}>
        <Field onClick={() => setIsCategoryOpen((o) => !o)}>
          <Label>
            <i className="fa-solid fa-plane" /> Class
          </Label>
          <Content>{aircraftCategory}</Content>
          <Chevron>
            <i
              className={`fa-solid fa-chevron-${isCategoryOpen ? "up" : "down"}`}
            />
          </Chevron>
        </Field>
        {isCategoryOpen && (
          <SelectDropdownMenu>
            {AIRCRAFT_CATEGORIES.map((cat) => (
              <DropdownItemSelect
                key={cat}
                $active={cat === aircraftCategory}
                onClick={(e) => {
                  e.stopPropagation();
                  setAircraftCategory(cat);
                  setIsCategoryOpen(false);
                }}
              >
                {cat}
              </DropdownItemSelect>
            ))}
          </SelectDropdownMenu>
        )}
      </CategoryContainer>

      {/* --- ROW 2 --- */}
      {/* 5. Departure Date & Time */}
      <DateContainer ref={depDateTimeRef}>
        <Field onClick={() => setIsDepOpen((o) => !o)}>
          <Label>
            <i className="fa-solid fa-calendar-days" /> Departure
          </Label>
          <Content>
            {depDateTime ? formatDateTime(depDateTime) : "Select date & time"}
          </Content>
          <Chevron>
            <i className={`fa-solid fa-chevron-${isDepOpen ? "up" : "down"}`} />
          </Chevron>
        </Field>
        {isDepOpen && (
          <DateTimePickerPopover
            value={depDateTime}
            onChange={(date) => setDepDateTime(date)}
            onClose={() => setIsDepOpen(false)}
            align="left"
          />
        )}
      </DateContainer>

      {/* 6. Return Date & Time */}
      <DateContainer ref={retDateTimeRef}>
        <Field onClick={() => setIsRetOpen((o) => !o)}>
          <Label>
            <i className="fa-solid fa-calendar-days" /> Return
          </Label>
          <Content>
            {retDateTime ? formatDateTime(retDateTime) : "Select date & time"}
          </Content>
          <Chevron>
            <i className={`fa-solid fa-chevron-${isRetOpen ? "up" : "down"}`} />
          </Chevron>
        </Field>
        {isRetOpen && (
          <DateTimePickerPopover
            value={retDateTime}
            onChange={(date) => setRetDateTime(date)}
            onClose={() => setIsRetOpen(false)}
            align="left"
          />
        )}
      </DateContainer>

      {/* 7. Special Requests */}
      <RequestsContainer>
        <Field as="label" htmlFor="special-requests-input" style={{ cursor: "text" }}>
          <Label style={{ cursor: "pointer" }}>
            <i className="fa-solid fa-clipboard-list" /> Special Request
          </Label>
          <RequestsInput
            id="special-requests-input"
            type="text"
            placeholder="Any special requests?"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            autoComplete="off"
          />
        </Field>
      </RequestsContainer>

      {/* 8. Search Button */}
      <SearchButton type="submit">Request Quotation</SearchButton>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
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
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    padding: 22px;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const AirportAutocompleteWrapper = styled.div`
  grid-column: span 3;
  min-width: 0;
  width: 100%;

  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const FieldContainer = styled.div`
  position: relative;
  min-width: 0;
  width: 100%;
`;

const CategoryContainer = styled(FieldContainer)`
  grid-column: span 3;
  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const DateContainer = styled(FieldContainer)`
  grid-column: span 3;
  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const PassengersContainer = styled(FieldContainer)`
  grid-column: span 3;
  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const RequestsContainer = styled(FieldContainer)`
  grid-column: span 3;
  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 6px;
  padding: 10px 14px;
  min-height: 44px;
  cursor: pointer;
  background: transparent;
  transition: border-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: rgba(255, 255, 255, 0.85);
  }

  @media (max-width: 991px) {
    padding: 10px 14px;
  }
`;

const Label = styled.span`
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

const Content = styled.span`
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const RequestsInput = styled.input`
  border: none !important;
  background: transparent !important;
  color: #fff !important;
  font-family: ${({ theme }) => theme.fonts.mulish} !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  outline: none !important;
  width: 100% !important;
  padding: 0 !important;
  text-align: left !important;
  box-shadow: none !important;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6) !important;
    font-size: 12px !important;
    font-weight: 400 !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px #aa8453 inset !important;
    -webkit-text-fill-color: #fff !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }
`;

const Chevron = styled.span`
  color: #fff;
  opacity: 0.85;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  margin-left: 2px;
  pointer-events: none;
  flex-shrink: 0;

  @media (max-width: 991px) {
    margin-left: 6px;
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

const SelectDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 180px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 6px 0;
  z-index: 100;
  max-height: 240px;
  overflow-y: auto;

  /* styling scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }
`;

const DropdownItemSelect = styled.div`
  padding: 10px 16px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#aa8453" : "#1b1b1b")};
  background: ${({ $active }) => ($active ? "rgba(170, 132, 83, 0.08)" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(170, 132, 83, 0.1);
    color: #aa8453;
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
  min-height: 44px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;

  grid-column: span 3;

  @media (max-width: 991px) {
    grid-column: span 6;
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

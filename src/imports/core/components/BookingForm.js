"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DateTimePickerPopover from "@/imports/core/components/DatePickerPopover";
import AirportAutocomplete from "@/imports/core/components/AirportAutocomplete";

const TRIP_TYPES = [
  { key: "oneway", label: "One way" },
  { key: "round", label: "Round trip" },
  { key: "multi", label: "Multi-city" },
];

const TRIP_LABELS = {
  oneway: "One way",
  round: "Round trip",
  multi: "Multi-city",
};

const emptyLeg = () => ({ from: "", to: "", dep: null });

export default function BookingForm() {
  const [tripType, setTripType] = useState("oneway");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [depDateTime, setDepDateTime] = useState(null);
  const [retDateTime, setRetDateTime] = useState(null);
  const [passengers, setPassengers] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");
  const [legs, setLegs] = useState([emptyLeg(), emptyLeg()]);

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const depDateTimeRef = useRef(null);
  const retDateTimeRef = useRef(null);
  const paxRef = useRef(null);
  const legRefs = useRef([]);

  const [isDepOpen, setIsDepOpen] = useState(false);
  const [isRetOpen, setIsRetOpen] = useState(false);
  const [isPaxOpen, setIsPaxOpen] = useState(false);
  const [openLeg, setOpenLeg] = useState(null);

  const updateLeg = (i, patch) =>
    setLegs((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  const addLeg = () =>
    setLegs((prev) => (prev.length >= 5 ? prev : [...prev, emptyLeg()]));

  const removeLeg = (i) =>
    setLegs((prev) => (prev.length <= 2 ? prev : prev.filter((_, idx) => idx !== i)));

  const resetForm = () => {
    setFrom("");
    setTo("");
    setEmail("");
    setPhone("");
    setDepDateTime(null);
    setRetDateTime(null);
    setPassengers(0);
    setSpecialRequests("");
    setLegs([emptyLeg(), emptyLeg()]);
    setOpenLeg(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    setSent(false);
    try {
      const payload = {
        tripType: TRIP_LABELS[tripType],
        email,
        phone,
        passengers: passengers > 0 ? passengers : "",
        additionalInfo: specialRequests,
      };
      if (tripType === "multi") {
        payload.legs = legs
          .filter((l) => l.from || l.to || l.dep)
          .map((l) => ({
            from: l.from,
            to: l.to,
            departure: l.dep ? formatDateTime(l.dep) : "",
          }));
      } else {
        payload.from = from;
        payload.to = to;
        payload.departure = depDateTime ? formatDateTime(depDateTime) : "";
        payload.return =
          tripType === "round" && retDateTime ? formatDateTime(retDateTime) : "";
      }

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setSent(true);
      resetForm();
    } catch (err) {
      console.error("Quote form error:", err);
      setError(err.message || "Could not send your request. Please try again.");
    } finally {
      setLoading(false);
    }
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
      if (openLeg !== null) {
        const ref = legRefs.current[openLeg];
        if (ref && !ref.contains(e.target)) setOpenLeg(null);
      }
    }
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, [openLeg]);

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

  const routeSpan = tripType === "multi" ? 4 : 6;
  const contactSpan = tripType === "oneway" ? 6 : 4;
  const fullSpan = 12;
  const requestsMdSpan = tripType === "oneway" ? 12 : 6;
  const PaxField = (
    <PassengersContainer ref={paxRef} $span={contactSpan}>
      <Field onClick={() => setIsPaxOpen((o) => !o)}>
        <Label>
          <i className="fa-solid fa-users" /> Pax
        </Label>
        <Content $isPlaceholder={passengers === 0}>
          {passengers > 0
            ? String(passengers).padStart(2, "0")
            : "Number of passengers"}
        </Content>
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
                  setPassengers(Math.max(0, passengers - 1));
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
    </PassengersContainer>
  );

  const EmailField = (
    <EmailContainer $span={contactSpan}>
      <Field as="label" htmlFor="booking-email-input" style={{ cursor: "text" }}>
        <Label style={{ cursor: "pointer" }}>
          <i className="fa-solid fa-envelope" /> Email
        </Label>
        <RequestsInput
          id="booking-email-input"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={loading}
        />
      </Field>
    </EmailContainer>
  );

  const PhoneField = (
    <EmailContainer $span={contactSpan}>
      <Field as="div" style={{ cursor: "text" }}>
        <Label>
          <i className="fa-solid fa-phone" /> Phone
        </Label>
        <PhoneInputStyled
          international
          defaultCountry="US"
          value={phone}
          onChange={(value) => setPhone(value || "")}
          placeholder="Phone number"
          disabled={loading}
          numberInputProps={{ autoComplete: "tel" }}
        />
      </Field>
    </EmailContainer>
  );

  const RequestsField = (
    <RequestsContainer $span={fullSpan} $mdSpan={requestsMdSpan}>
      <Field
        as="label"
        htmlFor="special-requests-input"
        style={{ cursor: "text" }}
      >
        <Label style={{ cursor: "pointer" }}>
          <i className="fa-solid fa-clipboard-list" /> Additional Information
        </Label>
        <RequestsInput
          id="special-requests-input"
          type="text"
          placeholder=""
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          autoComplete="off"
          disabled={loading}
        />
      </Field>
    </RequestsContainer>
  );

  const SubmitButton = (
    <SearchButton type="submit" disabled={loading}>
      {loading ? "Sending..." : "Request Quotation"}
    </SearchButton>
  );

  const DepartureField = (
    <DepartureDateContainer ref={depDateTimeRef} $span={routeSpan}>
      <Field onClick={() => setIsDepOpen((o) => !o)}>
        <Label>
          <i className="fa-solid fa-calendar-days" /> Departure
        </Label>
        <Content $isPlaceholder={!depDateTime}>
          {depDateTime ? formatDateTime(depDateTime) : "Departure Date"}
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
    </DepartureDateContainer>
  );

  const ReturnField = (
    <DateContainer ref={retDateTimeRef} $span={routeSpan}>
      <Field onClick={() => setIsRetOpen((o) => !o)}>
        <Label>
          <i className="fa-solid fa-calendar-days" /> Return
        </Label>
        <Content $isPlaceholder={!retDateTime}>
          {retDateTime ? formatDateTime(retDateTime) : "Return Date"}
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
  );

  return (
    <Form onSubmit={handleSearch}>
      <TripTabs role="tablist">
        {TRIP_TYPES.map(({ key, label }) => (
          <TripTab
            key={key}
            type="button"
            role="tab"
            aria-selected={tripType === key}
            $active={tripType === key}
            onClick={() => setTripType(key)}
          >
            {label}
          </TripTab>
        ))}
      </TripTabs>

      {tripType === "multi" ? (
        <>
          <LegsContainer>
            {legs.map((leg, i) => (
              <LegRow key={i}>
                <FieldContainer>
                  <AirportAutocomplete
                    label={
                      <>
                        <i className="fa-solid fa-plane-departure" /> From
                      </>
                    }
                    value={leg.from}
                    onSelect={(airport) =>
                      updateLeg(i, {
                        from: `${airport.airport_name} (${airport.iata_code})`,
                      })
                    }
                    placeholder="Departure Airport"
                    ariaLabel={`Flight ${i + 1} departure airport`}
                  />
                </FieldContainer>

                <FieldContainer>
                  <AirportAutocomplete
                    label={
                      <>
                        <i className="fa-solid fa-plane-arrival" /> To
                      </>
                    }
                    value={leg.to}
                    onSelect={(airport) =>
                      updateLeg(i, {
                        to: `${airport.airport_name} (${airport.iata_code})`,
                      })
                    }
                    placeholder="Arrival Airport"
                    ariaLabel={`Flight ${i + 1} arrival airport`}
                  />
                </FieldContainer>

                <FieldContainer
                  ref={(el) => {
                    legRefs.current[i] = el;
                  }}
                >
                  <Field onClick={() => setOpenLeg(openLeg === i ? null : i)}>
                    <Label>
                      <i className="fa-solid fa-calendar-days" /> Departure
                    </Label>
                    <Content $isPlaceholder={!leg.dep}>
                      {leg.dep ? formatDateTime(leg.dep) : "Departure Date"}
                    </Content>
                    <Chevron>
                      <i
                        className={`fa-solid fa-chevron-${openLeg === i ? "up" : "down"}`}
                      />
                    </Chevron>
                  </Field>
                  {openLeg === i && (
                    <DateTimePickerPopover
                      value={leg.dep}
                      onChange={(date) => updateLeg(i, { dep: date })}
                      onClose={() => setOpenLeg(null)}
                      align="left"
                    />
                  )}
                </FieldContainer>

                {legs.length > 2 && (
                  <RemoveLegButton
                    type="button"
                    onClick={() => removeLeg(i)}
                    aria-label={`Remove flight ${i + 1}`}
                  >
                    <i className="fa-solid fa-xmark" />
                  </RemoveLegButton>
                )}
              </LegRow>
            ))}
            <AddLegButton
              type="button"
              onClick={addLeg}
              disabled={legs.length >= 5}
            >
              <i className="fa-solid fa-plus" /> Add another flight
            </AddLegButton>
          </LegsContainer>

          {PaxField}
          {EmailField}
          {PhoneField}
          {RequestsField}
          {SubmitButton}
        </>
      ) : (
        <>
          <AirportAutocompleteWrapper $span={routeSpan}>
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

          <AirportAutocompleteWrapper $span={routeSpan}>
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

          {DepartureField}
          {tripType === "round" && ReturnField}

          {PaxField}
          {EmailField}
          {PhoneField}
          {RequestsField}
          {SubmitButton}
        </>
      )}

      {sent && (
        <StatusNote>
          Thank you — your quote request has been received. We&apos;ll be in
          touch shortly.
        </StatusNote>
      )}
      {error && <StatusNote $error>{error}</StatusNote>}
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  align-content: space-between;
  gap: 16px;
  background: ${({ theme }) => theme.base};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);

  /* Keep the widget the same height on every trip type (one way / round /
     multi-city). Multi-city is the tallest, so this floor matches it and the
     shorter tabs spread their rows to fill via align-content. */
  min-height: 430px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    padding: 22px;
    min-height: 460px;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 16px;
    min-height: 0;
  }
`;

const TripTabs = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: 24px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
`;

const TripTab = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 2px 12px;
  color: #fff;
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  transition: opacity 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.25s ease;
  }

  &:hover {
    opacity: 1;
  }
`;

const AirportAutocompleteWrapper = styled.div`
  grid-column: span ${({ $span }) => $span || 4};
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

const DateContainer = styled(FieldContainer)`
  grid-column: span ${({ $span }) => $span || 4};
  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const EmailContainer = styled(FieldContainer)`
  grid-column: span ${({ $span }) => $span || 4};
  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const DepartureDateContainer = styled(FieldContainer)`
  grid-column: span ${({ $span }) => $span || 4};
  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
  @media (min-width: 576px) and (max-width: 991px) {
    .datetime-picker-popover {
      left: auto !important;
      right: 0 !important;
    }
  }
`;

const PassengersContainer = styled(FieldContainer)`
  grid-column: span ${({ $span }) => $span || 4};
  @media (max-width: 991px) {
    grid-column: span 6;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const RequestsContainer = styled(FieldContainer)`
  grid-column: span ${({ $span }) => $span || 12};
  @media (max-width: 991px) {
    grid-column: ${({ $mdSpan }) => ($mdSpan === 6 ? "span 6" : "1 / -1")};
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }
`;

const LegsContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

const LegRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 16px;
  align-items: center;
  min-width: 0;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
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
  height: 44px;
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
  color: ${({ $isPlaceholder }) =>
    $isPlaceholder ? "rgba(255, 255, 255, 0.6)" : "#fff"};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 400;
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
  font-weight: 400 !important;
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

const PhoneInputStyled = styled(PhoneInput)`
  width: 100%;
  display: flex;
  align-items: center;

  .PhoneInputCountry {
    margin: 0 10px 0 0;
    padding-right: 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }

  .PhoneInputCountryIcon {
    box-shadow: none;
  }

  .PhoneInputCountryIcon--border {
    box-shadow: none;
    background: transparent;
  }

  .PhoneInputCountrySelectArrow {
    color: #fff;
    opacity: 0.85;
    border-color: currentColor;
  }

  .PhoneInputInput {
    border: none;
    background: transparent;
    color: #fff;
    font-family: ${({ theme }) => theme.fonts.mulish};
    font-size: 13px;
    font-weight: 400;
    outline: none;
    width: 100%;
    padding: 0;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px #aa8453 inset !important;
      -webkit-text-fill-color: #fff !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }
  }

  .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon .PhoneInputInternationalIconGlobe {
    color: #fff;
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

const RemoveLegButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.45);
  color: #fff;
  border-radius: 6px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.25s ease;

  &:hover {
    border-color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const AddLegButton = styled.button`
  align-self: flex-start;
  background: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.5);
  color: #fff;
  border-radius: 6px;
  padding: 10px 16px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;

  &:hover {
    border-color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  height: 44px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;

  grid-column: 1 / -1;

  @media (max-width: 991px) {
    grid-column: 1 / -1;
    padding: 14px 28px;
    font-size: 15px;
    height: auto;
    min-height: 44px;
  }
  @media (max-width: 767px) {
    grid-column: span 1;
  }

  &:hover {
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.dark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatusNote = styled.p`
  grid-column: 1 / -1;
  margin: 0;
  color: ${({ $error, theme }) => ($error ? "#ff6b6b" : theme.white)};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  text-align: center;
`;

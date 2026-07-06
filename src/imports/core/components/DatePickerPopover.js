"use client";

import { useState } from "react";
import styled from "styled-components";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    const d = new Date(year, month, 1 - (firstDay.getDay() - i));
    days.push({ date: d, outside: true });
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), outside: false });
  }
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      days.push({ date: new Date(year, month + 1, d), outside: true });
    }
  }

  return days;
}

export default function DateTimePickerPopover({ value, onChange, onClose, align = "left" }) {
  const today = new Date();

  const [year, setYear] = useState(value ? value.getFullYear() : today.getFullYear());
  const [month, setMonth] = useState(value ? value.getMonth() : today.getMonth());
  const [selectedDate, setSelectedDate] = useState(value || null);

  const [hours, setHours] = useState(() => {
    if (!value) return 12;
    const h = value.getHours();
    const h12 = h % 12 || 12;
    return h12;
  });
  const [minutes, setMinutes] = useState(() => {
    if (!value) return 0;
    return value.getMinutes();
  });
  const [ampm, setAmpm] = useState(() => {
    if (!value) return "PM";
    const h = value.getHours();
    return h >= 12 ? "PM" : "AM";
  });

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  function handleDayClick(date) {
    setSelectedDate(date);
  }

  function goLeft() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goRight() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function handleApply() {
    if (!selectedDate) return;

    const resultDate = new Date(selectedDate);
    let h24 = hours;
    if (ampm === "PM" && hours !== 12) {
      h24 += 12;
    } else if (ampm === "AM" && hours === 12) {
      h24 = 0;
    }
    resultDate.setHours(h24, minutes, 0, 0);

    onChange(resultDate);
    onClose();
  }

  const days = getMonthDays(year, month);

  return (
    <>
      <Backdrop onClick={onClose} />
      <Popover $align={align}>
        <PopoverBody>
          <CalendarSection>
            <CalendarHeader>
              <NavBtn onClick={goLeft} type="button" aria-label="Previous month">
                <i className="fa-solid fa-chevron-left" />
              </NavBtn>
              <MonthTitle>
                {MONTHS[month]} {year}
              </MonthTitle>
              <NavBtn onClick={goRight} type="button" aria-label="Next month">
                <i className="fa-solid fa-chevron-right" />
              </NavBtn>
            </CalendarHeader>
            <WeekRow>
              {DAYS.map((d) => (
                <WeekDay key={d}>{d}</WeekDay>
              ))}
            </WeekRow>
            <DayGrid>
              {days.map(({ date, outside }, idx) => {
                const isSelected = isSameDay(date, selectedDate);
                const disabled = isBeforeToday(date);

                return (
                  <DayCell
                    key={idx}
                    $outside={outside}
                    $isSelected={isSelected}
                    $disabled={disabled}
                    onClick={() => !disabled && !outside && handleDayClick(date)}
                  >
                    {date.getDate()}
                  </DayCell>
                );
              })}
            </DayGrid>
          </CalendarSection>

          <Divider />

          <TimeSection>
            <TimeTitle>Select Time</TimeTitle>
            <TimeColumns>
              <TimeColumn>
                {hourOptions.map((h) => (
                  <TimeItem
                    key={h}
                    type="button"
                    $active={h === hours}
                    onClick={() => setHours(h)}
                  >
                    {h.toString().padStart(2, "0")}
                  </TimeItem>
                ))}
              </TimeColumn>
              <TimeColumn>
                {minuteOptions.map((m) => (
                  <TimeItem
                    key={m}
                    type="button"
                    $active={m === minutes}
                    onClick={() => setMinutes(m)}
                  >
                    {m.toString().padStart(2, "0")}
                  </TimeItem>
                ))}
              </TimeColumn>
              <TimeColumn style={{ overflow: "hidden", justifyContent: "center" }}>
                {["AM", "PM"].map((a) => (
                  <TimeItem
                    key={a}
                    type="button"
                    $active={a === ampm}
                    onClick={() => setAmpm(a)}
                    style={{ margin: "4px 0", height: "36px" }}
                  >
                    {a}
                  </TimeItem>
                ))}
              </TimeColumn>
            </TimeColumns>
          </TimeSection>
        </PopoverBody>

        <Footer>
          <CancelBtn type="button" onClick={onClose}>
            Cancel
          </CancelBtn>
          <ApplyBtn type="button" onClick={handleApply} disabled={!selectedDate}>
            Apply
          </ApplyBtn>
        </Footer>
      </Popover>
    </>
  );
}

const Backdrop = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 199;
  }
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  ${({ $align }) => ($align === "right" ? "right: 0;" : "left: 0;")}
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.07);
  z-index: 200;
  padding: 20px 20px 14px;
  box-sizing: border-box;

  @media (max-width: 575px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    z-index: 200;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
    padding: 12px 12px 10px;
  }
`;

const PopoverBody = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const CalendarSection = styled.div`
  width: 230px;

  @media (max-width: 575px) {
    width: 100%;
  }
`;

const TimeSection = styled.div`
  width: 220px;

  @media (max-width: 575px) {
    width: 100%;
  }
`;

const Divider = styled.div`
  align-self: stretch;
  width: 1px;
  background: rgba(0, 0, 0, 0.08);

  @media (max-width: 575px) {
    width: 100%;
    height: 1px;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;

  @media (max-width: 575px) {
    margin-bottom: 8px;
  }
`;

const NavBtn = styled.button`
  background: transparent;
  border: none;
  color: #1b1b1b;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 13px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
  z-index: 10;

  &:hover {
    opacity: 1;
  }
`;

const MonthTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1b1b1b;
  letter-spacing: 0.3px;
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 6px;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #999;
  padding: 4px 0;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayCell = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 0;
  cursor: ${({ $outside, $disabled }) =>
    $outside || $disabled ? "default" : "pointer"};
  color: ${({ $outside, $disabled, $isSelected }) =>
    $isSelected
      ? "#fff"
      : $outside || $disabled
      ? "#ccc"
      : "#1b1b1b"};
  background: ${({ $isSelected }) =>
    $isSelected
      ? "#aa8453"
      : "transparent"};
  border-radius: 50%;
  font-style: ${({ $outside, $disabled }) =>
    $outside || $disabled ? "italic" : "normal"};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $outside, $disabled, $isSelected }) =>
      $outside || $disabled || $isSelected
        ? undefined
        : "rgba(170, 132, 83, 0.2)"};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);

  @media (max-width: 575px) {
    margin-top: 8px;
    padding-top: 8px;
  }
`;

const CancelBtn = styled.button`
  background: transparent;
  border: none;
  color: #555;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover {
    color: #1b1b1b;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ApplyBtn = styled.button`
  background: #aa8453;
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #96703f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const TimeTitle = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #1b1b1b;
  margin-bottom: 14px;
  letter-spacing: 0.3px;

  @media (max-width: 575px) {
    margin-bottom: 8px;
  }
`;

const TimeColumns = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  height: 250px;
  margin-bottom: 4px;

  @media (max-width: 575px) {
    height: 160px;
  }
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 70px;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  padding: 4px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }
`;

const TimeItem = styled.button`
  background: ${({ $active }) => ($active ? "#aa8453" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#1b1b1b")};
  border: none;
  border-radius: 4px;
  padding: 8px 0;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ $active }) => ($active ? "#aa8453" : "rgba(170, 132, 83, 0.1)")};
    color: ${({ $active }) => ($active ? "#fff" : "#aa8453")};
  }
`;
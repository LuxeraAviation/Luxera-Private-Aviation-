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

function isBetween(date, start, end) {
  if (!start || !end) return false;
  const d = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return d > s && d < e;
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

function MonthGrid({ year, month, startDate, endDate, hoverDate, onDayClick, onDayHover }) {
  const days = getMonthDays(year, month);

  return (
    <MonthWrap>
      <MonthTitle>
        {MONTHS[month]} {year}
      </MonthTitle>
      <WeekRow>
        {DAYS.map((d) => (
          <WeekDay key={d}>{d}</WeekDay>
        ))}
      </WeekRow>
      <DayGrid>
        {days.map(({ date, outside }, idx) => {
          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const effectiveEnd = endDate || hoverDate;
          const inRange = isBetween(date, startDate, effectiveEnd);
          const disabled = isBeforeToday(date);

          return (
            <DayCell
              key={idx}
              $outside={outside}
              $isStart={isStart}
              $isEnd={isEnd}
              $inRange={inRange}
              $disabled={disabled}
              onClick={() => !disabled && !outside && onDayClick(date)}
              onMouseEnter={() => !disabled && !outside && onDayHover(date)}
            >
              {date.getDate()}
            </DayCell>
          );
        })}
      </DayGrid>
    </MonthWrap>
  );
}

export default function DatePickerPopover({ value, onChange, onClose }) {
  const today = new Date();

  const [leftYear, setLeftYear] = useState(today.getFullYear());
  const [leftMonth, setLeftMonth] = useState(today.getMonth());

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  const [startDate, setStartDate] = useState(value?.start || null);
  const [endDate, setEndDate] = useState(value?.end || null);
  const [hoverDate, setHoverDate] = useState(null);

  function handleDayClick(date) {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  }

  function goLeft() {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear((y) => y - 1);
    } else {
      setLeftMonth((m) => m - 1);
    }
  }

  function goRight() {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear((y) => y + 1);
    } else {
      setLeftMonth((m) => m + 1);
    }
  }

  function formatDate(date) {
    if (!date) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function handleApply() {
    onChange({ start: startDate, end: endDate });
    onClose();
  }

  return (
    <Popover>
      <Header>
        <NavBtn onClick={goLeft} aria-label="Previous month">
          <i className="fa-solid fa-chevron-left" />
        </NavBtn>
        <MonthsRow>
          <MonthGrid
            year={leftYear}
            month={leftMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
          <Divider />
          <MonthGrid
            year={rightYear}
            month={rightMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
        </MonthsRow>
        <NavBtn onClick={goRight} aria-label="Next month">
          <i className="fa-solid fa-chevron-right" />
        </NavBtn>
      </Header>

      <Footer>
        <CancelBtn type="button" onClick={onClose}>
          Cancel
        </CancelBtn>
        <ApplyBtn type="button" onClick={handleApply} disabled={!startDate}>
          Apply
        </ApplyBtn>
      </Footer>
    </Popover>
  );
}

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.07);
  z-index: 200;
  padding: 24px 20px 16px;
  width: max-content;

  @media (max-width: 767px) {
    width: calc(100vw - 32px);
    left: 50%;
    transform: translateX(-50%);
    padding: 20px 12px 14px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const MonthsRow = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const NavBtn = styled.button`
  background: transparent;
  border: none;
  color: #1b1b1b;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 13px;
  margin-top: 2px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
  }
`;

const Divider = styled.div`
  width: 1px;
  background: rgba(0, 0, 0, 0.08);
  align-self: stretch;

  @media (max-width: 767px) {
    width: 100%;
    height: 1px;
  }
`;

const MonthWrap = styled.div`
  min-width: 220px;
`;

const MonthTitle = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #1b1b1b;
  margin-bottom: 14px;
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
  padding: 7px 2px;
  cursor: ${({ $outside, $disabled }) =>
    $outside || $disabled ? "default" : "pointer"};
  color: ${({ $outside, $disabled, $isStart, $isEnd }) =>
    $isStart || $isEnd
      ? "#fff"
      : $outside || $disabled
      ? "#ccc"
      : "#1b1b1b"};
  background: ${({ $isStart, $isEnd, $inRange }) =>
    $isStart || $isEnd
      ? "#aa8453"
      : $inRange
      ? "rgba(170, 132, 83, 0.12)"
      : "transparent"};
  border-radius: ${({ $isStart, $isEnd }) =>
    $isStart ? "50% 0 0 50%" : $isEnd ? "0 50% 50% 0" : "0"};
  font-style: ${({ $outside, $disabled }) =>
    $outside || $disabled ? "italic" : "normal"};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $outside, $disabled, $isStart, $isEnd }) =>
      $outside || $disabled || $isStart || $isEnd
        ? undefined
        : "rgba(170, 132, 83, 0.2)"};
    border-radius: ${({ $outside, $disabled, $isStart, $isEnd }) =>
      $outside || $disabled || $isStart || $isEnd ? undefined : "50%"};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
`;

const CancelBtn = styled.button`
  background: transparent;
  border: none;
  color: #555;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 20px;
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
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 24px;
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

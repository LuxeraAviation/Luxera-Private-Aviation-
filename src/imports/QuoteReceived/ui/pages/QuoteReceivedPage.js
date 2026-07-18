"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";

const STORAGE_KEY = "luxera_quote_request";
const EDIT_KEY = "luxera_quote_edit";
const HERO_IMAGE = "/image/av/jet-gold-hero.png";

const STEPS = [
  { icon: "fa-plane-departure", label: "Flight feasibility review" },
  { icon: "fa-magnifying-glass", label: "Aircraft availability check" },
  { icon: "fa-file-lines", label: "Personalized quotation" },
  { icon: "fa-envelope-open-text", label: "Flight confirmation" },
];

function buildRows(d) {
  if (!d) return [];
  const rows = [{ icon: "fa-arrows-rotate", label: "Trip Type", value: d.tripLabel }];

  const isMulti = d.tripType === "multi" && Array.isArray(d.legs) && d.legs.length;

  if (isMulti) {
    d.legs.forEach((l, i) => {
      const route = [l.from, l.to].filter(Boolean).join(" → ");
      const parts = [route, l.departure];
      if (l.pax) parts.push(`${l.pax} pax`);
      rows.push({
        icon: "fa-plane",
        label: `Flight ${i + 1}`,
        value: parts.filter(Boolean).join("  ·  ") || "—",
      });
    });
  } else {
    rows.push({ icon: "fa-plane-departure", label: "From", value: d.from || "—" });
    rows.push({ icon: "fa-plane-arrival", label: "To", value: d.to || "—" });
    rows.push({
      icon: "fa-calendar-days",
      label: "Departure Date",
      value: d.departure || "—",
    });
    if (d.tripType === "round") {
      rows.push({
        icon: "fa-calendar-days",
        label: "Return Date",
        value: d.return || "—",
      });
    }
  }

  if (!isMulti) {
    rows.push({
      icon: "fa-users",
      label: "Number of Passengers",
      value: d.passengers ? String(d.passengers) : "—",
    });
  }
  if (d.name) rows.push({ icon: "fa-user", label: "Name", value: d.name });
  rows.push({ icon: "fa-envelope", label: "Email", value: d.email || "—" });
  if (d.phone) rows.push({ icon: "fa-phone", label: "Phone", value: d.phone });
  if (d.urgent) {
    rows.push({
      icon: "fa-bolt",
      label: "Priority",
      value: "Needs to fly urgently",
    });
  }
  if (d.additionalInfo) {
    rows.push({
      icon: "fa-clipboard-list",
      label: "Additional Information",
      value: d.additionalInfo,
    });
  }
  return rows;
}

export default function QuoteReceivedPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {
    }
    setReady(true);
  }, []);

  const handleEdit = () => {
    try {
      sessionStorage.setItem(EDIT_KEY, "true");
      sessionStorage.setItem("scrollToBooking", "true");
    } catch {
    }
    router.push("/");
  };

  const handleNew = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
    }
    router.push("/");
  };

  if (!ready) return <Page />;

  if (!data) {
    return (
      <Page>
        <Notice>
          <Image
            src="/image/logo-base.svg"
            alt="Luxera Private Aviation"
            width={240}
            height={46}
          />
          <Heading>No request found</Heading>
          <Sub>We couldn&apos;t find a recent quotation request.</Sub>
          <UpdateBtn type="button" onClick={handleNew}>
            <i className="fa-solid fa-paper-plane" /> Start a New Request
          </UpdateBtn>
        </Notice>
      </Page>
    );
  }

  const rows = buildRows(data);

  return (
    <Page role="status" aria-live="polite">
      <Banner data-hero>
        <BannerImg>
          <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" />
        </BannerImg>
        <BannerOverlay />
        <Curve viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,34 Q720,210 1440,34 L1440,130 L0,130 Z" fill={CREAM} />
          <path
            d="M0,34 Q720,210 1440,34"
            fill="none"
            stroke={GOLD}
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </Curve>
        <Badge aria-hidden="true">
          <i className="fa-solid fa-check" />
        </Badge>
      </Banner>

      <Content>
        <Inner>
          <TopBlock>
            <Heading>Your request has been received</Heading>
            <Flourish />
            <Lead>Thank you for choosing Luxera Aviation.</Lead>
            <Sub>
              Your charter request has been successfully received. Our aviation
              specialists are now reviewing your itinerary and will contact you
              shortly with the most suitable aircraft options and pricing.
            </Sub>
          </TopBlock>

          <Columns>
            <Col>
              <SectionTitle>Your Request Summary</SectionTitle>
              <Summary>
                {rows.map((r, i) => (
                  <SummaryRow key={i}>
                    <RowLabel>
                      <IconChip>
                        <i className={`fa-solid ${r.icon}`} />
                      </IconChip>
                      {r.label}
                    </RowLabel>
                    <RowValue>{r.value}</RowValue>
                  </SummaryRow>
                ))}
              </Summary>
            </Col>

            <Col>
              <SectionTitle>What Happens Next?</SectionTitle>
              <Steps>
                {STEPS.map((s, i) => (
                  <Step key={s.label}>
                    <StepNum>{i + 1}</StepNum>
                    <StepIcon>
                      <i className={`fa-solid ${s.icon}`} />
                    </StepIcon>
                    <StepLabel>{s.label}</StepLabel>
                  </Step>
                ))}
              </Steps>

              <Actions>
                <UpdateBtn type="button" onClick={handleEdit}>
                  <i className="fa-solid fa-paper-plane" /> View or Update Your
                  Request
                </UpdateBtn>
                <Secure>
                  <i className="fa-solid fa-shield-halved" /> Your information is
                  secure and will only be used to process your request.
                </Secure>
                <NewLink type="button" onClick={handleNew}>
                  Make a new request
                </NewLink>
              </Actions>
            </Col>
          </Columns>
        </Inner>
      </Content>
    </Page>
  );
}

const GOLD = "#aa8453";
const CREAM = "#faf7f1";
const INK = "#1b1b1b";

const Page = styled.main`
  min-height: 100vh;
  background: ${CREAM};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Banner = styled.section`
  position: relative;
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 1251px) and (max-width: 1600px) {
    height: 600px;
  }
  @media (min-width: 768px) and (max-width: 1250px) {
    height: 500px;
  }
  @media (max-width: 767px) {
    height: 300px;
  }
`;

const Curve = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  width: 100%;
  height: 118px;
  z-index: 2;
  display: block;

  @media (max-width: 767px) {
    height: 64px;
  }
`;

const BannerImg = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;

  img {
    object-fit: cover;
    object-position: center 40%;
    height: calc(100% + 100px) !important;
    transform: translateY(-100px);
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 16, 10, 0.55) 0%,
    rgba(20, 16, 10, 0.28) 45%,
    rgba(20, 16, 10, 0.62) 100%
  );
`;

const Badge = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 3;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: ${GOLD};
  color: #fff;
  border: 4px solid ${CREAM};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 12px 28px rgba(170, 132, 83, 0.45);

  @media (max-width: 767px) {
    width: 68px;
    height: 68px;
    font-size: 26px;
  }
`;

/* ---- Content ---- */
const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 78px 24px 90px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding: 60px 18px 64px;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1120px;
`;

const TopBlock = styled.div`
  text-align: center;
  margin-bottom: 54px;

  @media (max-width: 767px) {
    margin-bottom: 40px;
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
    max-width: 620px;
    margin: 0 auto;
  }
`;

const Col = styled.div``;

const Heading = styled.h1`
  margin: 0 0 16px;
  color: ${INK};
  font-family: ${({ theme }) => theme.fonts.playfair};
  font-weight: 500;
  font-size: 38px;
  line-height: 1.15;

  @media (max-width: 575px) {
    font-size: 27px;
  }
`;

const Flourish = styled.span`
  display: block;
  width: 66px;
  height: 2px;
  background: ${GOLD};
  margin: 0 auto 22px;
`;

const Lead = styled.p`
  margin: 0 0 12px;
  color: ${INK};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 17px;
  font-weight: 600;
`;

const Sub = styled.p`
  margin: 0 auto;
  max-width: 640px;
  color: #6a6a68;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 15px;
  line-height: 1.75;
`;

const SectionTitle = styled.p`
  margin: 0 0 20px;
  color: ${GOLD};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 14px;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(170, 132, 83, 0.35);
  }
`;

const Summary = styled.div`
  background: #fff;
  border: 1px solid rgba(170, 132, 83, 0.2);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 14px 34px rgba(27, 27, 27, 0.06);
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  padding: 15px 22px;
  transition: background 0.2s ease;

  & + & {
    border-top: 1px solid rgba(170, 132, 83, 0.14);
  }

  &:hover {
    background: rgba(170, 132, 83, 0.05);
  }

  @media (max-width: 575px) {
    grid-template-columns: 118px 1fr;
    gap: 12px;
    padding: 13px 15px;
  }
`;

const IconChip = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(170, 132, 83, 0.12);
  color: ${GOLD};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
`;

const RowLabel = styled.span`
  color: ${INK};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const RowValue = styled.span`
  color: #4a4a48;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  line-height: 1.5;
  word-break: break-word;
  align-self: center;
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
`;

const Step = styled.div`
  position: relative;
  border: 1px solid rgba(170, 132, 83, 0.22);
  border-radius: 12px;
  padding: 26px 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #fff;
  box-shadow: 0 10px 26px rgba(27, 27, 27, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 32px rgba(27, 27, 27, 0.1);
  }
`;

const StepNum = styled.span`
  position: absolute;
  top: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${GOLD};
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(170, 132, 83, 0.4);
`;

const StepIcon = styled.span`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(170, 132, 83, 0.1);
  color: ${GOLD};
  font-size: 19px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StepLabel = styled.span`
  color: ${INK};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 12.5px;
  line-height: 1.4;
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const UpdateBtn = styled.button`
  width: 100%;
  border: none;
  background: ${INK};
  color: #fff;
  border-radius: 10px;
  padding: 17px 24px;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background: ${GOLD};
    transform: translateY(-2px);
  }
`;

const Secure = styled.p`
  margin: 18px 0 0;
  color: #6a6a68;
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 12px;
  line-height: 1.6;
  text-align: center;

  i {
    color: ${GOLD};
    margin-right: 8px;
  }
`;

const NewLink = styled.button`
  margin: 18px auto 0;
  display: block;
  background: none;
  border: none;
  color: ${GOLD};
  font-family: ${({ theme }) => theme.fonts.mulish};
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

const Notice = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
  padding: 150px 20px 80px;

  img {
    width: 220px;
    height: auto;
    margin-bottom: 24px;
  }
`;

"use client";

import { useState } from "react";
import styled from "styled-components";
import PageHeading from "@/imports/core/components/PageHeading";
import Section from "@/imports/core/atom/Section";
import Container from "@/imports/core/atom/Container";
import SectionHeading from "@/imports/core/components/SectionHeading";
import { Reveal } from "@/styles/Theme";
import EnquiryForm from "@/imports/core/components/EnquiryForm";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      {!submitted && (
        <PageHeading title="Contact Us" bg="/image/luxera/new.png" />
      )}
      <ContactSection $top="120px" $bottom="150px">
        <Container>
          <FormWrap as={Reveal} variant="fade-up">
            {!submitted && (
              <>
                <Heading
                  center
                  subtitle="GET IN TOUCH"
                  title="Plan Your Next Private Flight"
                  maxWidth="640px"
                />
                <FormLead>
                  Reach our charter desk by phone, email, or the form below — we
                  respond within minutes, 24/7. Tell us your route and dates and
                  we&apos;ll send tailored aircraft options and an all-in quote.
                </FormLead>
              </>
            )}
            <EnquiryForm
              subject="New Contact Enquiry"
              onSuccess={() => setSubmitted(true)}
            />
          </FormWrap>
        </Container>
      </ContactSection>
    </main>
  );
}

const ContactSection = styled(Section)`
  @media (max-width: 991px) {
    padding-top: 40px;
  }
`;

const FormWrap = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

const Heading = styled(SectionHeading)`
  /* subtitle → title breathing room */
  & > p {
    margin-bottom: 22px;
    @media (max-width: 991px) {
      margin-bottom: 20px;
    }
  }
`;

const FormLead = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin: 28px auto 44px;
  max-width: 560px;
  line-height: 1.9em;
  @media (max-width: 991px) {
    margin-top: 24px;
    line-height: 2em;
  }
`;

"use client";

import Banner from "@/imports/core/components/Banner";
import { CONTACT_BANNER } from "@/imports/core/constants/banner";
import ContactInfo from "@/imports/ContactUs/ui/components/ContactInfo";
import ContactForm from "@/imports/ContactUs/ui/components/ContactForm";

export default function ContactUsPage() {
  return (
    <main>
      <Banner {...CONTACT_BANNER} />
      <ContactInfo />
      <ContactForm />
    </main>
  );
}

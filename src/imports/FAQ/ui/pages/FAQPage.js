"use client";

import Banner from "@/imports/core/components/Banner";
import { FAQ_BANNER } from "@/imports/core/constants/faq";
import FaqAccordions from "@/imports/FAQ/ui/components/FaqAccordions";
import ContactForm from "@/imports/ContactUs/ui/components/ContactForm";

export default function FAQPage() {
  return (
    <main>
      <Banner {...FAQ_BANNER} />
      <FaqAccordions />
      <ContactForm />
    </main>
  );
}

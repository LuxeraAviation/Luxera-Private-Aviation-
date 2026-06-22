import ContactForm from "@/imports/ContactUs/ui/components/ContactForm";
import Banner from "@/imports/core/components/Banner";
import TeamDetails from "@/imports/Team-Details/components/TeamDetails";
import { TEAM_DETAILS_BANNER } from "@/imports/core/constants/banner";
import React from "react";

function TeamDetailsPage() {
  return (
    <>
      <Banner {...TEAM_DETAILS_BANNER} />
      <TeamDetails />
      <ContactForm />
    </>
  );
}

export default TeamDetailsPage;

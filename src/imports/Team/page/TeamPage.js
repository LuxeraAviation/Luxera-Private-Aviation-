import Banner from "@/imports/core/components/Banner";
import { TEAM_BANNER } from "@/imports/core/constants/banner";
import Team from "@/imports/Team/components/Team";
import Brands from "@/imports/HomePage/ui/components/Brands";
import {
  TEAM_MEMBERS,
  TEAM_PILOTS,
  TRAINING_INSTRUCTORS,
  SUPPORT,
} from "@/imports/core/constants/team";
import React from "react";

export default function TeamPage() {
  return (
    <main>
      <Banner {...TEAM_BANNER} />
      <Team title="Meet Our Management Team" members={TEAM_MEMBERS} />
      <Team title="Our Pilots" members={TEAM_PILOTS} />
      <Team title="Training Instructor" members={TRAINING_INSTRUCTORS} />
      <Team title="Support" members={SUPPORT} />
      <Brands />
    </main>
  );
}

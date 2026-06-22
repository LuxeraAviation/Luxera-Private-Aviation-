"use client";

import Banner from "@/imports/core/components/Banner";
import { COURSES_BANNER } from "@/imports/core/constants/banner";
import Courses from "@/imports/Courses/components/Courses";

export default function CoursesPage() {
  return (
    <main>
      <Banner banner={COURSES_BANNER} />
      <Courses />
    </main>
  );
}

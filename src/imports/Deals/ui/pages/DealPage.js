"use client";

import React from "react";
import Banner from "@/imports/core/components/Banner";
import Charter from "@/imports/core/components/Charter";
import Brands from "@/imports/HomePage/ui/components/Brands";
import {
  PRIVATE_JET_MODEL_SECTION,
  BUSINESS_JET_MODEL_SECTION,
  PRIVATE_HELICOPTER_MODEL_SECTION,
  AIR_AMBULANCE_MODEL_SECTION,
} from "@/imports/core/constants/deal";
import { DEALS_BANNER } from "@/imports/core/constants/banner";

function DealPage() {
  return (
    <div>
      <Banner {...DEALS_BANNER} />
      <Charter {...PRIVATE_JET_MODEL_SECTION} />
      <Charter {...BUSINESS_JET_MODEL_SECTION} />
      <Charter {...PRIVATE_HELICOPTER_MODEL_SECTION} />
      <Charter {...AIR_AMBULANCE_MODEL_SECTION} />
      <Brands />
    </div>
  );
}

export default DealPage;

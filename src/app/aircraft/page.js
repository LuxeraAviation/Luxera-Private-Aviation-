import { Suspense } from "react";
import AircraftDetailsPage from "@/imports/AircraftDetails/ui/pages/AircraftDetailsPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AircraftDetailsPage />
    </Suspense>
  );
}

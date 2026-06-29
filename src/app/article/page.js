import { Suspense } from "react";
import ArticlePage from "@/imports/Journal/ui/pages/ArticlePage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ArticlePage />
    </Suspense>
  );
}

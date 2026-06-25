"use client";

import { usePathname } from "next/navigation";
import NotFoundPage from "@/app/not-found";

export default function LockdownGate({ isProd, children }) {
  const pathname = usePathname();

  if (isProd && pathname !== "/") {
    return <NotFoundPage />;
  }

  return <>{children}</>;
}

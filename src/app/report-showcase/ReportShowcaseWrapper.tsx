"use client";

import { useSearchParams } from "next/navigation";
import ReportShowcase from "@/components/Services/ReportShowcase";
import { PAYLOADS } from "@/data/payloads";

export default function ReportShowcaseWrapper() {
  const params = useSearchParams();
  const key = params.get("key") || "integrated";

  const payload = PAYLOADS[key];

  return <ReportShowcase {...payload} />;
}

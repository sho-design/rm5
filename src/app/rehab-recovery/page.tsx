import type { Metadata } from "next";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

export const metadata: Metadata = divisionMetadata("rehab");

export default function RehabRecoveryPage() {
  return <DivisionPage k="rehab" />;
}

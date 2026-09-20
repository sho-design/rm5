import type { Metadata } from "next";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

export const metadata: Metadata = divisionMetadata("pain");

export default function PainCentrePage() {
  return <DivisionPage k="pain" />;
}

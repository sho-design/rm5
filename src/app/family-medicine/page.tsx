import type { Metadata } from "next";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

export const metadata: Metadata = divisionMetadata("family");

export default function FamilyMedicinePage() {
  return <DivisionPage k="family" />;
}

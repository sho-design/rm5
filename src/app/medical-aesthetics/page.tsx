import type { Metadata } from "next";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

export const metadata: Metadata = divisionMetadata("aesthetics");

export default function MedicalAestheticsPage() {
  return <DivisionPage k="aesthetics" />;
}

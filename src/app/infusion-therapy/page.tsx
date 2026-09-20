import type { Metadata } from "next";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

export const metadata: Metadata = divisionMetadata("infusion");

export default function InfusionTherapyPage() {
  return <DivisionPage k="infusion" />;
}

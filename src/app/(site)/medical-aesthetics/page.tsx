import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

const baseMetadata: Metadata = divisionMetadata("aesthetics");

export async function generateMetadata() {
  return pageMetadata("aesthetics", baseMetadata);
}

export default function MedicalAestheticsPage() {
  return <DivisionPage k="aesthetics" />;
}

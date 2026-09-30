import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

const baseMetadata: Metadata = divisionMetadata("family");

export async function generateMetadata() {
  return pageMetadata("family", baseMetadata);
}

export default function FamilyMedicinePage() {
  return <DivisionPage k="family" />;
}

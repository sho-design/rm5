import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

const baseMetadata: Metadata = divisionMetadata("infusion");

export async function generateMetadata() {
  return pageMetadata("infusion", baseMetadata);
}

export default function InfusionTherapyPage() {
  return <DivisionPage k="infusion" />;
}

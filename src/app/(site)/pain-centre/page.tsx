import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

const baseMetadata: Metadata = divisionMetadata("pain");

export async function generateMetadata() {
  return pageMetadata("pain", baseMetadata);
}

export default function PainCentrePage() {
  return <DivisionPage k="pain" />;
}

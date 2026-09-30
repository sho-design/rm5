import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

const baseMetadata: Metadata = divisionMetadata("rehab");

export async function generateMetadata() {
  return pageMetadata("rehab", baseMetadata);
}

export default function RehabRecoveryPage() {
  return <DivisionPage k="rehab" />;
}

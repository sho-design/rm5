import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

const baseMetadata: Metadata = divisionMetadata("about");

export async function generateMetadata() {
  return pageMetadata("about", baseMetadata);
}

export default function AboutPage() {
  return <DivisionPage k="about" />;
}

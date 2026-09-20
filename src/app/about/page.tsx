import type { Metadata } from "next";
import { DivisionPage, divisionMetadata } from "@/components/pages/division/DivisionPage";

export const metadata: Metadata = divisionMetadata("about");

export default function AboutPage() {
  return <DivisionPage k="about" />;
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BookFlow } from "@/components/pages/book/BookFlow";
import { bookingTitles } from "@/content/booking";
import { divisionList } from "@/content/divisions";

const baseMetadata: Metadata = {
  title: bookingTitles.step1.title,
  description: bookingTitles.step1.lead,
  robots: { index: true, follow: true },
};

export async function generateMetadata() {
  return pageMetadata("book", baseMetadata);
}

export default function BookPage() {
  return <BookFlow divisions={divisionList.map((d) => d.label)} />;
}

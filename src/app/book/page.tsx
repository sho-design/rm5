import type { Metadata } from "next";
import { BookFlow } from "@/components/pages/book/BookFlow";
import { bookingTitles } from "@/content/booking";
import { divisionList } from "@/content/divisions";

export const metadata: Metadata = {
  title: bookingTitles.step1.title,
  description: bookingTitles.step1.lead,
  robots: { index: true, follow: true },
};

export default function BookPage() {
  return <BookFlow divisions={divisionList.map((d) => d.label)} />;
}

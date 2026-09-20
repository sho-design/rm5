import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/faq/FaqPage";
import { faqCopy } from "@/content/faq";
import { getFaq } from "@/lib/cms";

export const metadata: Metadata = {
  title: faqCopy.title,
  description: faqCopy.lead,
};

export default async function Page() {
  const { items, categories } = await getFaq();
  return <FaqPage items={items} categories={categories} />;
}

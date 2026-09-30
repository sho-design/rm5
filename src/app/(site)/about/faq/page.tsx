import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FaqPage } from "@/components/pages/faq/FaqPage";
import { faqCopy } from "@/content/faq";
import { getFaq } from "@/lib/cms";

const baseMetadata: Metadata = {
  title: faqCopy.title,
  description: faqCopy.lead,
};

export async function generateMetadata() {
  return pageMetadata("faq", baseMetadata);
}

export default async function Page() {
  const { items, categories } = await getFaq();
  return <FaqPage items={items} categories={categories} />;
}

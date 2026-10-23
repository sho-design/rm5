import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FaqPage } from "@/components/pages/faq/FaqPage";
import { faqCopy } from "@/content/faq";
import { getFaq } from "@/lib/cms";
import { faqPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

const baseMetadata: Metadata = {
  title: faqCopy.title,
  description: faqCopy.lead,
};

export async function generateMetadata() {
  return pageMetadata("faq", baseMetadata);
}

export default async function Page() {
  const { items, categories } = await getFaq();
  return (
    <>
      <JsonLd data={faqPage(items)} />
      <FaqPage items={items} categories={categories} />
    </>
  );
}

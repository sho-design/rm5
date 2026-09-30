import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/pages/legal/LegalPage";
import { getLegalPage, getLegalPages } from "@/lib/cms";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await getLegalPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) return {};
  return { title: page.title, description: page.intro };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) notFound();
  return <LegalPage page={page} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPage } from "@/components/pages/topic/TopicPage";
import { topicBySlug, topicsFor } from "@/content/topics";
import type { NavKey } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ topic: string }> };

/**
 * Shared handlers for the /<division>/[topic] routes. Each division folder
 * re-exports these with its own key, so every topic page is static and an
 * unknown slug is a 404.
 */
export function topicRoute(division: NavKey) {
  return {
    generateStaticParams: () => topicsFor(division).map((t) => ({ topic: t.slug })),
    generateMetadata: async ({ params }: Params): Promise<Metadata> => {
      const t = topicBySlug(division, (await params).topic);
      if (!t) return {};
      return pageMetadata(t.key, { title: t.title, description: t.description });
    },
    Page: async ({ params }: Params) => {
      const t = topicBySlug(division, (await params).topic);
      if (!t) notFound();
      return <TopicPage t={t} />;
    },
  };
}

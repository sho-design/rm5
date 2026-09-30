import type { Metadata } from "next";
import { NotFoundPage, notFoundCopy } from "@/components/pages/not-found/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found",
  description: notFoundCopy.lead,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage />;
}

/**
 * Read-side façade for the collections the handoff assigns to the CMS
 * (healthNotes, jobs, team, faq, locations, announcements, legal). Pages call
 * these functions only, so moving the data to Payload CMS means replacing
 * this file's bodies with Payload local-API queries and nothing else.
 */
import { healthNotes } from "@/content/notes";
import { jobs } from "@/content/jobs";
import { team } from "@/content/team";
import { faqItems, faqCategories } from "@/content/faq";
import { legalPages } from "@/content/legal";
import { locations, announcements } from "@/content/site";
import type { HealthNote, Job, LegalPage } from "@/content/types";

export async function getHealthNotes(): Promise<HealthNote[]> {
  return healthNotes;
}
export async function getHealthNote(slug: string): Promise<HealthNote | undefined> {
  return healthNotes.find((n) => n.slug === slug);
}
export async function getJobs(): Promise<Job[]> {
  return jobs;
}
export async function getTeam() {
  return team;
}
export async function getFaq() {
  return { items: faqItems, categories: faqCategories };
}
export async function getLocations() {
  return locations;
}
export async function getAnnouncements() {
  return announcements;
}
export async function getLegalPages(): Promise<LegalPage[]> {
  return legalPages;
}
export async function getLegalPage(slug: string): Promise<LegalPage | undefined> {
  return legalPages.find((p) => p.slug === slug);
}

import type { CollectionConfig } from "payload";
import { lexicalEditor, HeadingFeature, ParagraphFeature, BoldFeature, ItalicFeature, LinkFeature, UnorderedListFeature, OrderedListFeature } from "@payloadcms/richtext-lexical";
import { anyone, isStaff, publishedOrStaff } from "../access";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { divisionOptions, imageFields, linkFields, routeOptions, slugField } from "../fields";

const hooks = { afterChange: [auditAfterChange, revalidateAfterChange], afterDelete: [auditAfterDelete, revalidateAfterDelete] };
const staffWrites = { create: isStaff, update: isStaff, delete: isStaff };

/** Restricted editor: headings and paragraphs, bold, italic, links and lists. No embeds, no colours. */
export const articleEditor = lexicalEditor({
  features: () => [ParagraphFeature(), HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }), BoldFeature(), ItalicFeature(), LinkFeature({ enabledCollections: [] }), UnorderedListFeature(), OrderedListFeature()],
});

export const HealthNotes: CollectionConfig = {
  slug: "health-notes",
  labels: { singular: "Health note", plural: "Health notes" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "division", "author", "date", "_status"], group: "Content", description: "Short plain-language notes written and reviewed by physicians. Follow the copy rules: no outcome, immunity or weight-loss claims, no superlatives." },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 20 },
  access: { read: publishedOrStaff, ...staffWrites },
  hooks,
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "dek", type: "textarea", required: true, admin: { description: "One or two sentences under the title." } },
    {
      type: "row",
      fields: [
        { name: "division", type: "select", required: true, options: divisionOptions, admin: { width: "50%" } },
        { name: "date", type: "date", required: true, admin: { width: "25%", date: { pickerAppearance: "monthOnly", displayFormat: "MMM yyyy" } } },
        { name: "readMinutes", type: "number", required: true, min: 1, max: 30, defaultValue: 2, admin: { width: "25%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "author", type: "relationship", relationTo: "team", admin: { width: "50%", description: "Reviewing physician" } },
        { name: "authorName", type: "text", admin: { width: "50%", description: "Shown if no team member is linked" } },
      ],
    },
    { name: "coAuthor", type: "text", admin: { description: 'For example "with a TMU medical learner"' } },
    ...imageFields("hero", "Hero image"),
    { name: "body", type: "richText", editor: articleEditor, required: true },
    {
      type: "group",
      name: "cta",
      label: "Call to action card",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "sub", type: "text", required: true },
        { name: "page", type: "select", options: routeOptions, defaultValue: "book", required: true },
      ],
    },
  ],
};

export const Jobs: CollectionConfig = {
  slug: "jobs",
  labels: { singular: "Job posting", plural: "Job postings" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "location", "division", "type", "status", "postedDate"], group: "Content" },
  access: { read: anyone, ...staffWrites },
  hooks,
  fields: [
    { name: "title", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "location", type: "select", required: true, options: ["Thornhill", "Maple", "Thornhill and Maple"], admin: { width: "34%" } },
        { name: "division", type: "select", required: true, options: ["Family Medicine", "Pain Centre", "Medical Aesthetics", "Infusion Therapy", "Rehab and Recovery", "Front desk", "Operations"], admin: { width: "33%" } },
        { name: "type", type: "select", required: true, options: ["Full time", "Part time", "Contract", "Full or part time"], admin: { width: "33%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "schedule", type: "text", required: true, admin: { width: "50%", description: 'For example "Tue, Sat, Sun"' } },
        { name: "postedDate", type: "date", required: true, admin: { width: "25%", date: { pickerAppearance: "dayOnly" } } },
        { name: "status", type: "select", required: true, defaultValue: "open", options: ["open", "closed"], admin: { width: "25%" } },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    { name: "requirements", type: "array", fields: [{ name: "text", type: "text", required: true }], admin: { description: "One requirement per row" } },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { description: "Featured roles show as cards above the job board (up to four)." } },
  ],
};

export const Team: CollectionConfig = {
  slug: "team",
  labels: { singular: "Team member", plural: "Team members" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "divisions", "order", "active"], group: "Content", description: "Real headshots, credentials and CPSO or CNO numbers replace the sample roster before launch." },
  access: { read: anyone, ...staffWrites },
  hooks,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true, admin: { description: 'For example "Registered Nurse" or "Physician, Medical Director"' } },
    { name: "divisions", type: "select", hasMany: true, required: true, options: divisionOptions },
    ...imageFields("photo", "Headshot"),
    { name: "bio", type: "textarea" },
    { name: "credentials", type: "array", fields: [{ name: "text", type: "text", required: true }], admin: { description: "MD, CCFP, CPSO #, CNO # and so on" } },
    { name: "preceptorTag", type: "text", admin: { description: 'For example "Preceptor, physician learners"' } },
    {
      type: "row",
      fields: [
        { name: "order", type: "number", defaultValue: 100, admin: { width: "50%", description: "Lower numbers show first" } },
        { name: "active", type: "checkbox", defaultValue: true, admin: { width: "50%" } },
      ],
    },
  ],
};

export const Faq: CollectionConfig = {
  slug: "faq",
  labels: { singular: "FAQ item", plural: "FAQ" },
  admin: { useAsTitle: "question", defaultColumns: ["question", "category", "order"], group: "Content", description: "Facts the front desk can repeat. Keep answers to two or three sentences." },
  access: { read: anyone, ...staffWrites },
  hooks,
  fields: [
    { name: "category", type: "select", required: true, options: ["Visits", "Coverage", "Results", "Prescriptions", "Clinic", "Privacy", "Pain Centre", "Infusion", "Aesthetics", "Rehab"] },
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        { name: "linkLabel", type: "text", admin: { width: "50%", description: 'Optional link under the answer, for example "Book a visit"' } },
        { name: "linkPage", type: "select", options: routeOptions, admin: { width: "50%" } },
      ],
    },
    { name: "order", type: "number", defaultValue: 100, admin: { description: "Lower numbers show first within the category" } },
  ],
};

export const Locations: CollectionConfig = {
  slug: "locations",
  labels: { singular: "Clinic", plural: "Clinics" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "comingSoon", "phone"], group: "Content" },
  access: { read: anyone, ...staffWrites },
  hooks,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "key", type: "select", required: true, unique: true, options: ["thornhill", "maple"], admin: { description: "Matches the site's location keys" } },
    { name: "addressLine1", type: "text", required: true },
    { name: "addressLine2", type: "text", required: true },
    { name: "mapsUrl", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { width: "50%" } },
        { name: "fax", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "hours", type: "array", fields: [{ type: "row", fields: [{ name: "day", type: "text", required: true, admin: { width: "50%" } }, { name: "time", type: "text", required: true, admin: { width: "50%" } }] }], admin: { description: 'Seven rows for an open clinic ("Monday", "9:00 am to 4:00 pm"). Write "Closed" for closed days.' } },
    { name: "access", type: "textarea", label: "Accessibility, parking and transit" },
    { name: "services", type: "select", hasMany: true, options: [{ label: "Family Medicine", value: "family" }, { label: "Pain Centre", value: "pain" }, { label: "Infusion Therapy", value: "infusion" }, { label: "Medical Aesthetics", value: "aesthetics" }, { label: "Rehab & Recovery", value: "rehab" }] },
    ...imageFields("image", "Exterior photo"),
    { name: "comingSoon", type: "checkbox", defaultValue: false },
    { name: "cta", type: "text", required: true, admin: { description: 'Button label, for example "Book at Thornhill"' } },
    { name: "footCta", type: "text", required: true, admin: { description: "Closing band headline" } },
    { name: "footSub", type: "text", required: true, admin: { description: "Closing band line" } },
  ],
};

export const Announcements: CollectionConfig = {
  slug: "announcements",
  labels: { singular: "Announcement", plural: "Announcements" },
  admin: { useAsTitle: "text", defaultColumns: ["text", "active", "startsAt", "endsAt"], group: "Content", description: 'Items in the "What\'s new" strip on the home page. The three most recent active items show.' },
  access: { read: anyone, ...staffWrites },
  hooks,
  fields: [
    { name: "text", type: "text", required: true, maxLength: 70 },
    ...linkFields(),
    {
      type: "row",
      fields: [
        { name: "active", type: "checkbox", defaultValue: true, admin: { width: "34%" } },
        { name: "startsAt", type: "date", admin: { width: "33%" } },
        { name: "endsAt", type: "date", admin: { width: "33%" } },
      ],
    },
  ],
};

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  labels: { singular: "Legal page", plural: "Legal pages" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "updatedLabel"], group: "Content", description: "Privacy, accessibility, patient rights and terms. Drafts pending privacy officer review." },
  access: { read: anyone, ...staffWrites },
  hooks,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "select", required: true, unique: true, options: ["privacy", "accessibility", "patient-rights", "terms"] },
    {
      type: "row",
      fields: [
        { name: "eyebrow", type: "text", required: true, admin: { width: "50%" } },
        { name: "updatedLabel", type: "text", required: true, admin: { width: "50%", description: 'For example "Last updated September 2026"' } },
      ],
    },
    { name: "intro", type: "textarea", required: true },
    { name: "sections", type: "array", required: true, fields: [{ name: "heading", type: "text", required: true }, { name: "paragraphs", type: "array", required: true, fields: [{ name: "text", type: "textarea", required: true }] }] },
    { name: "contactTitle", type: "text", required: true },
    { name: "contact", type: "textarea", required: true },
  ],
};

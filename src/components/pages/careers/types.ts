import type { Job } from "@/content/types";

/** A job with its relative posted date computed on the server. */
export type BoardJob = Job & { ago: string };

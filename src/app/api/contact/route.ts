import { forwardForm } from "@/lib/forms";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  return forwardForm("contact", req);
}

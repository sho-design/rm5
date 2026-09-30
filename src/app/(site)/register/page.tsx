import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { RegisterForm } from "@/components/pages/register/RegisterForm";
import { registerCopy } from "@/content/booking";

const baseMetadata: Metadata = {
  title: registerCopy.title,
  description: registerCopy.lead,
};

export async function generateMetadata() {
  return pageMetadata("register", baseMetadata);
}

export default function RegisterPage() {
  return <RegisterForm />;
}

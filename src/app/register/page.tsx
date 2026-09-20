import type { Metadata } from "next";
import { RegisterForm } from "@/components/pages/register/RegisterForm";
import { registerCopy } from "@/content/booking";

export const metadata: Metadata = {
  title: registerCopy.title,
  description: registerCopy.lead,
};

export default function RegisterPage() {
  return <RegisterForm />;
}

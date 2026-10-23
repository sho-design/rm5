import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { RegisterForm } from "@/components/pages/register/RegisterForm";
import { registerCopy } from "@/content/booking";
import { EmergencyNote } from "@/components/pages/help/EmergencyNote";

const baseMetadata: Metadata = {
  title: registerCopy.title,
  description: registerCopy.lead,
};

export async function generateMetadata() {
  return pageMetadata("register", baseMetadata);
}

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />
      <div className="px-4 pb-6 md:px-content">
        <EmergencyNote className="max-w-[760px]" />
      </div>
    </>
  );
}

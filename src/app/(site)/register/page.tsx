import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { RegisterForm } from "@/components/pages/register/RegisterForm";
import { registerCopy } from "@/content/booking";
import { EmergencyNote } from "@/components/pages/help/EmergencyNote";
import { OceanHandoff } from "@/components/pages/book/OceanHandoff";
import { Display, Section } from "@/components/ui";
import { oceanRegisterUrl } from "@/lib/ocean";

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
      {/* With Ocean set up, registration (health card number, date of birth, address) goes straight into OSCAR Pro. */}
      {oceanRegisterUrl ? (
        <Section className="flex max-w-[760px] flex-col gap-4">
          <Display as="h1">{registerCopy.title}</Display>
          <p className="pretty text-[17px] leading-[1.5] text-secondary">{registerCopy.lead}</p>
          <OceanHandoff url={oceanRegisterUrl} kind="register" />
        </Section>
      ) : (
        <RegisterForm />
      )}
      <div className="px-4 pb-6 md:px-content">
        <EmergencyNote className="max-w-[760px]" />
      </div>
    </>
  );
}

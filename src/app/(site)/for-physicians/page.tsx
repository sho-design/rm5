import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { refServices, refSteps, referralsPage } from "@/content/referrals";
import { ReferralsHero } from "@/components/pages/referrals/ReferralsHero";
import { ReferralServices } from "@/components/pages/referrals/ReferralServices";
import { ReferralProcess } from "@/components/pages/referrals/ReferralProcess";
import { ReferralForm } from "@/components/pages/referrals/ReferralForm";
import { ReferralBand } from "@/components/pages/referrals/ReferralBand";

const baseMetadata: Metadata = {
  title: "For physicians: refer a patient",
  description: referralsPage.lead,
};

export async function generateMetadata() {
  return pageMetadata("referrals", baseMetadata);
}

export default function ForPhysiciansPage() {
  return (
    <>
      <ReferralsHero />
      <ReferralServices services={refServices} />
      <ReferralProcess steps={refSteps} />
      <ReferralForm services={refServices.map((r) => r.title)} />
      <ReferralBand />
    </>
  );
}

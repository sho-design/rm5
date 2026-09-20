import type { Metadata } from "next";
import { refServices, refSteps, referralsPage } from "@/content/referrals";
import { ReferralsHero } from "@/components/pages/referrals/ReferralsHero";
import { ReferralServices } from "@/components/pages/referrals/ReferralServices";
import { ReferralProcess } from "@/components/pages/referrals/ReferralProcess";
import { ReferralForm } from "@/components/pages/referrals/ReferralForm";
import { ReferralBand } from "@/components/pages/referrals/ReferralBand";

export const metadata: Metadata = {
  title: "For physicians: refer a patient",
  description: referralsPage.lead,
};

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

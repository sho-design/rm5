import { Block, Button } from "@/components/ui";
import { referralsPage } from "@/content/referrals";
import { site } from "@/content/site";
import { LiveHours } from "./LiveHours";

/** Navy closing band with the live clinic status and a call button. */
export function ReferralBand() {
  const b = referralsPage.band;
  return (
    <Block tone="navy" last tight className="flex flex-col gap-6 p-7 md:p-10 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="display-tight text-[26px] tracking-[-.02em] lg:text-[30px]">{b.title}</h2>
        <p className="text-[15px] text-white/75">
          {b.sub} <LiveHours />.
        </p>
      </div>
      <Button to={site.phoneHref} variant="accent" size="md" className="self-start lg:self-auto">
        {b.cta}
      </Button>
    </Block>
  );
}

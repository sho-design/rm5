import type { Metadata } from "next";
import { CtaBand, Faq, PageHeader, Section } from "@/components/ui";
import { faqItems } from "@/content/faq";
import { divisions } from "@/content/divisions";
import { feesCopy as c } from "@/content/patient-help";
import { getUninsuredFees } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { routes } from "@/lib/routes";
import { ironPrices } from "@/content/iron";
import { rehabCoverage } from "@/content/deep";
import { SmartLink } from "@/components/ui/SmartLink";
import { linkPhones } from "@/components/ui/Phones";

/** Prices the site already publishes on service pages, gathered here so the fees page is never empty. */
const known: { service: string; note?: string; fee: string; page: string }[] = [
  ...ironPrices.map((p) => ({ service: `${c.ironPrefix}: ${p.t}`, note: p.note, fee: p.price, page: "iron" })),
  ...(rehabCoverage.find((o) => o.label === "Paying myself")?.facts ?? [])
    .filter((f) => /\$/.test(f.v))
    .map((f) => ({ service: f.k, fee: f.v, page: "rehabBilling" })),
];

const faq = (q: string) => {
  const f = faqItems.find((x) => x.q === q);
  if (!f) throw new Error(`fees page: FAQ "${q}" missing`);
  return f;
};
const forms = faq("Do you charge for forms and notes?");

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("fees", { title: c.title, description: `${forms.a} Restoration Medical, Thornhill.` });
}

/**
 * Uninsured services and fees. The list comes from Site settings > Fees in
 * the admin; until the clinic fills it in, the page says to ask the front
 * desk. Fees are never invented here.
 */
export default async function FeesPage() {
  const fees = await getUninsuredFees();
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          [divisions.about.label, routes.about],
          [c.title, routes.fees],
        ])}
      />
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={forms.a} />
      <Section className="pt-8 md:pt-10">
        {fees.length ? (
          <div className="flex flex-col gap-3">
            <table className="w-full overflow-hidden rounded-card border border-border text-left text-[15px]">
              <thead className="bg-card text-[13px] text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-semibold">
                    {c.tableService}
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right font-semibold">
                    {c.tableFee}
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.service} className="border-t border-border align-top">
                    <td className="px-5 py-4">
                      <span className="font-semibold">{f.service}</span>
                      {f.note ? <span className="block pt-0.5 text-[13px] text-muted">{f.note}</span> : null}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-semibold">{f.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[13px] text-muted">{c.receipts}</p>
          </div>
        ) : (
          <div className="flex max-w-[760px] flex-col gap-2 rounded-card border border-border bg-card p-6 md:p-8">
            <span className="text-[18px] font-semibold">{c.emptyTitle}</span>
            <p className="pretty text-[15px] leading-[1.55] text-secondary">{linkPhones(c.emptyBody)}</p>
          </div>
        )}
        {known.length ? (
          <div className="flex flex-col gap-3 pt-8">
            <h2 className="text-[20px] font-semibold">{c.knownTitle}</h2>
            <p className="text-[14px] text-muted">{c.knownSub}</p>
            <table className="w-full overflow-hidden rounded-card border border-border text-left text-[15px]">
              <thead className="bg-card text-[13px] text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-semibold">
                    {c.tableService}
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right font-semibold">
                    {c.tableFee}
                  </th>
                </tr>
              </thead>
              <tbody>
                {known.map((f) => (
                  <tr key={f.service} className="border-t border-border align-top">
                    <td className="px-5 py-4">
                      <SmartLink to={f.page} className="font-semibold text-link">
                        {f.service} ›
                      </SmartLink>
                      {f.note ? <span className="block pt-0.5 text-[13px] text-muted">{f.note}</span> : null}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold">{f.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </Section>
      <Faq items={[faq("What is covered by OHIP?"), faq("What if I do not have OHIP?"), forms]} />
      <CtaBand title={divisions.about.footCta ?? ""} cta="Contact us" ctaTo="contact" />
    </>
  );
}

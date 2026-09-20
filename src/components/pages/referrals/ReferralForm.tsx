"use client";

import { useState, type FormEvent } from "react";
import { Button, Display, Eyebrow, Field, Input, Select, StateCard, Textarea } from "@/components/ui";
import { referralsPage } from "@/content/referrals";
import { site } from "@/content/site";
import { submitForm } from "@/lib/forms";

type Status = "form" | "sending" | "done" | "error";

/**
 * Online referral (handoff "Refer a patient": physician, patient DOB, reason).
 * Posts to /api/referral, which forwards and stores nothing. Attachments go
 * by fax or secure email; no patient name is collected here.
 */
export function ReferralForm({ services }: { services: string[] }) {
  const f = referralsPage.form;
  const [status, setStatus] = useState<Status>("form");
  const [missing, setMissing] = useState<string[]>([]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = (k: string) => String(fd.get(k) ?? "").trim();
    const data = {
      physician: text("physician"),
      clinic: text("clinic"),
      fax: text("fax"),
      patientDob: text("dob"),
      service: text("service"),
      reason: text("reason"),
    };
    const req = (["physician", "fax", "patientDob", "service", "reason"] as const).filter((k) => !data[k]);
    setMissing(req);
    if (req.length) return;
    setStatus("sending");
    const res = await submitForm("referral", data);
    setStatus(res.ok ? "done" : "error");
  }

  const err = (k: string) => (missing.includes(k) ? "Required" : undefined);

  return (
    <section id="refer" className="grid scroll-mt-6 grid-cols-1 items-start gap-8 px-4 pt-10 md:px-content md:pt-12 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
      <div className="flex flex-col gap-3.5 lg:sticky lg:top-6">
        <Eyebrow tone="sky">{f.eyebrow}</Eyebrow>
        <Display size="xs">{f.title}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">{f.sub}</p>
        <span className="text-[13px] text-muted">
          {referralsPage.contactLabels.fax} {site.fax}.{" "}
          <a href={`mailto:${site.referralsEmail}`} className="font-semibold text-link">
            {site.referralsEmail}
          </a>
        </span>
      </div>

      {status === "done" ? (
        <StateCard state="success" title={f.success.title} actions={<Button to="referrals">Back to the top</Button>}>
          <p>{f.success.body}</p>
        </StateCard>
      ) : status === "error" ? (
        <StateCard
          state="error"
          title={f.error.title}
          actions={
            <Button variant="outline" onClick={() => setStatus("form")}>
              Try again
            </Button>
          }
        >
          <p>{f.error.body}</p>
        </StateCard>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="flex flex-col gap-[22px] rounded-block border border-border bg-card p-5 md:p-9">
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
            <Field label={f.fields.physician} htmlFor="ref-physician" required error={err("physician")}>
              <Input id="ref-physician" name="physician" autoComplete="name" aria-invalid={!!err("physician")} />
            </Field>
            <Field label={f.fields.clinic} htmlFor="ref-clinic">
              <Input id="ref-clinic" name="clinic" autoComplete="organization" />
            </Field>
            <Field label={f.fields.fax} htmlFor="ref-fax" required error={err("fax")}>
              <Input id="ref-fax" name="fax" type="tel" inputMode="tel" autoComplete="off" aria-invalid={!!err("fax")} />
            </Field>
            <Field label={f.fields.dob} htmlFor="ref-dob" required error={err("patientDob")}>
              <Input id="ref-dob" name="dob" type="date" autoComplete="off" aria-invalid={!!err("patientDob")} />
            </Field>
          </div>
          <Field label={f.fields.service} htmlFor="ref-service" required error={err("service")}>
            <Select id="ref-service" name="service" defaultValue="" aria-invalid={!!err("service")}>
              <option value="" disabled>
                {f.servicePlaceholder}
              </option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={f.fields.reason} htmlFor="ref-reason" required hint={f.reasonHint} error={err("reason")}>
            <Textarea id="ref-reason" name="reason" rows={5} aria-invalid={!!err("reason")} />
          </Field>
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? f.sending : f.submit}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

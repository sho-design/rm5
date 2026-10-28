"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button, Display, Eyebrow, Field, Input, Select, StateCard, Textarea } from "@/components/ui";
import { referralsPage } from "@/content/referrals";
import { site } from "@/content/site";
import { referralExtraCopy } from "@/content/forms-copy";
import { submitForm } from "@/lib/forms";
import { useRevealOnChange } from "@/lib/a11y";
import { errorProps, focusFirstError, formErrors, readForm, type FormErrors } from "@/lib/validate";
import { FieldError } from "../book/FormBits";

type Status = "form" | "sending" | "done" | "error";

/**
 * Online referral (handoff "Refer a patient": physician, patient DOB, reason).
 * Posts to /api/referral, which forwards and stores nothing. Attachments go
 * by fax or secure email; no patient name is collected here. Fields are
 * uncontrolled so typing before the page finishes loading is kept; errors
 * show inline and a failed send keeps the form filled in.
 */
export function ReferralForm({ services }: { services: string[] }) {
  const f = referralsPage.form;
  const [status, setStatus] = useState<Status>("form");
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const outcomeRef = useRevealOnChange<HTMLDivElement>(status === "done" || status === "error" ? status : "form");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const errs = formErrors(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(form, errs);
      return;
    }
    const v = readForm(form);
    setStatus("sending");
    const res = await submitForm("referral", {
      physician: v.physician,
      clinic: v.clinic,
      fax: v.fax,
      patientDob: v.dob,
      service: v.service,
      reason: v.reason,
    });
    setStatus(res.ok ? "done" : "error");
  }

  const ep = (id: string) => errorProps(errors, id);

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
        <div ref={outcomeRef} tabIndex={-1} className="scroll-mt-24 outline-none">
          <StateCard state="success" title={f.success.title} actions={<Button to="referrals">Back to the top</Button>}>
            <p>{f.success.body}</p>
          </StateCard>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {status === "error" ? (
            <div ref={outcomeRef} tabIndex={-1} className="scroll-mt-24 outline-none">
              <StateCard
                state="error"
                title={f.error.title}
                actions={
                  <Button variant="outline" onClick={() => formRef.current?.requestSubmit()}>
                    Try again
                  </Button>
                }
              >
                <p>{f.error.body}</p>
              </StateCard>
            </div>
          ) : null}
          <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="flex flex-col gap-[22px] rounded-block border border-border bg-card p-5 md:p-9">
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
              <Field label={f.fields.physician} htmlFor="ref-physician" required>
                <Input id="ref-physician" name="physician" autoComplete="name" required {...ep("ref-physician")} />
                <FieldError id="ref-physician" error={errors["ref-physician"]} />
              </Field>
              <Field label={f.fields.clinic} htmlFor="ref-clinic">
                <Input id="ref-clinic" name="clinic" autoComplete="organization" />
              </Field>
              <Field label={f.fields.fax} htmlFor="ref-fax" required>
                <Input id="ref-fax" name="fax" type="tel" inputMode="tel" autoComplete="off" required {...ep("ref-fax")} />
                <FieldError id="ref-fax" error={errors["ref-fax"]} />
              </Field>
              <Field label={f.fields.dob} htmlFor="ref-dob" required>
                <Input id="ref-dob" name="dob" data-error={referralExtraCopy.dobError} type="date" autoComplete="off" required {...ep("ref-dob")} />
                <FieldError id="ref-dob" error={errors["ref-dob"]} />
              </Field>
            </div>
            <Field label={f.fields.service} htmlFor="ref-service" required>
              <Select id="ref-service" name="service" data-error={referralExtraCopy.serviceError} defaultValue="" required {...ep("ref-service")}>
                <option value="" disabled>
                  {f.servicePlaceholder}
                </option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
              <FieldError id="ref-service" error={errors["ref-service"]} />
            </Field>
            <Field label={f.fields.reason} htmlFor="ref-reason" required hint={f.reasonHint}>
              <Textarea id="ref-reason" name="reason" rows={5} required {...ep("ref-reason")} />
              <FieldError id="ref-reason" error={errors["ref-reason"]} />
            </Field>
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? f.sending : f.submit}
              </Button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Display, Eyebrow, Input, Lead, StateCard, Textarea } from "@/components/ui";
import { renewalCopy as c } from "@/content/patient-help";
import { submitForm } from "@/lib/forms";
import { useRevealOnChange } from "@/lib/a11y";
import { errorProps, focusFirstError, formErrors, readForm, type FormErrors } from "@/lib/validate";
import { ConsentRow, FieldLabel, Panel, SubmitButton } from "../book/FormBits";
import { EmergencyNote } from "./EmergencyNote";

/**
 * Prescription renewal request for existing patients. Posts to
 * /api/renewal, which forwards to FORM_ENDPOINT_RENEWAL (a PHIPA-compliant
 * destination) and stores nothing. Analytics never runs on this page.
 * Fields are uncontrolled so typing before the page finishes loading is kept.
 */
export function RenewalForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const doneRef = useRevealOnChange<HTMLDivElement>(done);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    const errs = formErrors(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(form, errs);
      return;
    }
    const v = readForm(form);
    setBusy(true);
    setError(false);
    const res = await submitForm("renewal", {
      first: v.first,
      last: v.last,
      dob: v.dob,
      phone: v.phone,
      email: v.email,
      pharmacy: v.pharmacy,
      meds: v.meds,
      notes: v.notes,
      existingPatient: v.existing === true,
      contactConsent: v.contact === true,
    });
    setBusy(false);
    if (res.ok) setDone(true);
    else setError(true);
  };

  const text = (k: string, required = true) => ({ id: `rx-${k}`, name: k, required, ...errorProps(errors, `rx-${k}`) });

  return (
    <section id="request" className="grid scroll-mt-6 grid-cols-1 gap-6 px-4 pt-12 md:px-content md:pt-section lg:grid-cols-[1fr_1.4fr] lg:gap-12">
      <div className="flex flex-col gap-3">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <Display size="xs">{c.title}</Display>
        <Lead size="sm" tone="muted">
          {c.lead}
        </Lead>
        <EmergencyNote className="mt-2" />
      </div>
      {done ? (
        <div ref={doneRef} tabIndex={-1} className="scroll-mt-24 outline-none">
          <StateCard state="success" title={c.done.title}>
            <p>{c.done.body}</p>
            <button type="button" onClick={() => setDone(false)} className="self-start border-b-[1.5px] border-ink text-[14px] font-semibold text-ink">
              {c.done.again}
            </button>
          </StateCard>
        </div>
      ) : (
        <Panel>
          <form onSubmit={submit} noValidate className="flex flex-col gap-[14px] md:gap-[18px]">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
              <FieldLabel label={c.fields.first} htmlFor="rx-first" error={errors["rx-first"]}>
                <Input {...text("first")} autoComplete="given-name" />
              </FieldLabel>
              <FieldLabel label={c.fields.last} htmlFor="rx-last" error={errors["rx-last"]}>
                <Input {...text("last")} autoComplete="family-name" />
              </FieldLabel>
              <FieldLabel label={c.fields.dob} htmlFor="rx-dob" error={errors["rx-dob"]}>
                <Input {...text("dob")} type="date" autoComplete="bday" />
              </FieldLabel>
              <FieldLabel label={c.fields.phone} htmlFor="rx-phone" error={errors["rx-phone"]}>
                <Input {...text("phone")} type="tel" inputMode="tel" autoComplete="tel" />
              </FieldLabel>
              <FieldLabel label={c.fields.email} htmlFor="rx-email" error={errors["rx-email"]}>
                <Input {...text("email", false)} type="email" inputMode="email" autoComplete="email" />
              </FieldLabel>
              <FieldLabel label={c.fields.pharmacy} htmlFor="rx-pharmacy" error={errors["rx-pharmacy"]}>
                <Input {...text("pharmacy")} />
              </FieldLabel>
            </div>
            <FieldLabel label={c.fields.meds} htmlFor="rx-meds" hint={c.medsHint} error={errors["rx-meds"]}>
              <Textarea {...text("meds")} rows={4} />
            </FieldLabel>
            <FieldLabel label={c.fields.notes} htmlFor="rx-notes">
              <Textarea {...text("notes", false)} rows={3} />
            </FieldLabel>
            <ConsentRow id="rx-existing" name="existing" required error={errors["rx-existing"]} {...errorProps(errors, "rx-existing")}>
              {c.existing}
            </ConsentRow>
            <ConsentRow id="rx-contact" name="contact">
              {c.contactConsent}
            </ConsentRow>
            {error ? (
              <p role="alert" className="text-[13px] font-semibold text-[color:var(--status-error-fg)]">
                {c.failed}
              </p>
            ) : null}
            <SubmitButton busy={busy} trailing={false}>
              {c.submit}
            </SubmitButton>
          </form>
        </Panel>
      )}
    </section>
  );
}

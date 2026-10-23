"use client";

import { useState, type FormEvent } from "react";
import { Display, Eyebrow, Input, Lead, StateCard, Textarea } from "@/components/ui";
import { renewalCopy as c } from "@/content/patient-help";
import { submitForm } from "@/lib/forms";
import { ConsentRow, FieldLabel, Panel, SubmitButton } from "../book/FormBits";
import { EmergencyNote } from "./EmergencyNote";

const empty = { first: "", last: "", dob: "", phone: "", email: "", pharmacy: "", meds: "", notes: "" };

/**
 * Prescription renewal request for existing patients. Posts to
 * /api/renewal, which forwards to FORM_ENDPOINT_RENEWAL (a PHIPA-compliant
 * destination) and stores nothing. Analytics never runs on this page.
 */
export function RenewalForm() {
  const [v, setV] = useState(empty);
  const [existing, setExisting] = useState(false);
  const [contact, setContact] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const field = (k: keyof typeof empty) => ({ id: `rx-${k}`, value: v[k], onChange: (e: { target: { value: string } }) => setV((x) => ({ ...x, [k]: e.target.value })) });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const res = await submitForm("renewal", { ...v, existingPatient: existing, contactConsent: contact });
    setBusy(false);
    if (res.ok) {
      setDone(true);
      setV(empty);
      setExisting(false);
      setContact(false);
    } else setError(true);
  };

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
        <StateCard state="success" title={c.done.title}>
          <p>{c.done.body}</p>
          <button type="button" onClick={() => setDone(false)} className="self-start border-b-[1.5px] border-ink text-[14px] font-semibold text-ink">
            {c.done.again}
          </button>
        </StateCard>
      ) : (
        <Panel>
          <form onSubmit={submit} className="flex flex-col gap-[14px] md:gap-[18px]">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
              <FieldLabel label={c.fields.first} htmlFor="rx-first">
                <Input {...field("first")} autoComplete="given-name" required />
              </FieldLabel>
              <FieldLabel label={c.fields.last} htmlFor="rx-last">
                <Input {...field("last")} autoComplete="family-name" required />
              </FieldLabel>
              <FieldLabel label={c.fields.dob} htmlFor="rx-dob">
                <Input {...field("dob")} type="date" autoComplete="bday" required />
              </FieldLabel>
              <FieldLabel label={c.fields.phone} htmlFor="rx-phone">
                <Input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" required />
              </FieldLabel>
              <FieldLabel label={c.fields.email} htmlFor="rx-email">
                <Input {...field("email")} type="email" inputMode="email" autoComplete="email" />
              </FieldLabel>
              <FieldLabel label={c.fields.pharmacy} htmlFor="rx-pharmacy">
                <Input {...field("pharmacy")} required />
              </FieldLabel>
            </div>
            <FieldLabel label={c.fields.meds} htmlFor="rx-meds" hint={c.medsHint}>
              <Textarea {...field("meds")} required rows={4} />
            </FieldLabel>
            <FieldLabel label={c.fields.notes} htmlFor="rx-notes">
              <Textarea {...field("notes")} rows={3} />
            </FieldLabel>
            <ConsentRow checked={existing} onChange={(e) => setExisting(e.target.checked)} required>
              {c.existing}
            </ConsentRow>
            <ConsentRow checked={contact} onChange={(e) => setContact(e.target.checked)}>
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

"use client";

import { useState, type FormEvent } from "react";
import { Display, Eyebrow, Input, Lead, StateCard, Textarea } from "@/components/ui";
import { renewalCopy as c } from "@/content/patient-help";
import { submitForm } from "@/lib/forms";
import { useRevealOnChange } from "@/lib/a11y";
import { errorProps, focusFirstError, formErrors, readForm, type FormErrors, clearFixedError } from "@/lib/validate";
import { Choice, ConsentRow, DobInput, FieldLabel, Panel, SubmitButton } from "../book/FormBits";
import { linkPhones } from "@/components/ui/Phones";
import { EmergencyNote } from "./EmergencyNote";

/**
 * Prescription renewal request for existing patients. Posts to
 * /api/renewal, which forwards to FORM_ENDPOINT_RENEWAL (a PHIPA-compliant
 * destination) and stores nothing. Analytics never runs on this page.
 * Fields are uncontrolled so typing before the page finishes loading is kept.
 */
export function RenewalForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [forWhom, setForWhom] = useState(0);
  const other = forWhom === 1;
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
      requestAnimationFrame(() => focusFirstError(form, errs));
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
      forSomeoneElse: other,
      requesterName: other ? v.requesterName : undefined,
      requesterRelationship: other ? v.requesterRelationship : undefined,
      existingPatient: v.existing === true,
      contactConsent: v.contact === true,
    });
    setBusy(false);
    if (res.ok) setDone(true);
    else setError(true);
  };

  const text = (k: string, required = true) => ({ id: `rx-${k}`, name: k, required, ...errorProps(errors, `rx-${k}`) });

  return (
    <section id="request" tabIndex={-1} className="grid scroll-mt-6 outline-none grid-cols-1 gap-6 px-4 pt-12 md:px-content md:pt-section lg:grid-cols-[1fr_1.4fr] lg:gap-12">
      <div className="flex flex-col gap-3">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <Display size="xs">{c.title}</Display>
        <Lead size="sm" tone="muted">
          {c.lead} {c.afterHours}
        </Lead>
        <p className="pretty text-[14px] leading-[1.5] text-ink-2">{c.forSomeone}</p>
        <aside aria-labelledby="rx-urgent" className="mt-2 flex flex-col gap-1 rounded-tile border border-border bg-card px-5 py-4">
          <h3 id="rx-urgent" className="text-[15px] font-semibold text-ink">
            {c.urgentTitle}
          </h3>
          <p className="pretty text-[14px] leading-[1.5] text-ink-2">{linkPhones(c.urgentBody)}</p>
        </aside>
        <EmergencyNote headingLevel={3} />
      </div>
      {done ? (
        <div ref={doneRef} tabIndex={-1} className="scroll-mt-24 outline-none">
          <StateCard state="success" title={c.done.title}>
            <p>{c.done.body}</p>
            <p>{linkPhones(c.done.urgent)}</p>
            <button type="button" onClick={() => setDone(false)} className="self-start border-b-[1.5px] border-ink text-[14px] font-semibold text-ink">
              {c.done.again}
            </button>
          </StateCard>
        </div>
      ) : (
        <Panel>
          <form method="post" onSubmit={submit} onInput={clearFixedError(errors, setErrors)} onChange={clearFixedError(errors, setErrors)} noValidate className="flex flex-col gap-[14px] md:gap-[18px]">
            <Choice options={c.forWhom.options} value={forWhom} onChange={setForWhom} ariaLabel={c.forWhom.label} />
            {other ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                <FieldLabel label={c.yourName} htmlFor="rx-requesterName" error={errors["rx-requesterName"]}>
                  <Input {...text("requesterName")} autoComplete="name" />
                </FieldLabel>
                <FieldLabel label={c.yourRelationship} htmlFor="rx-requesterRelationship" error={errors["rx-requesterRelationship"]}>
                  <Input {...text("requesterRelationship")} />
                </FieldLabel>
              </div>
            ) : null}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
              <FieldLabel label={other ? c.patientFirst : c.fields.first} htmlFor="rx-first" error={errors["rx-first"]}>
                <Input {...text("first")} autoComplete="given-name" />
              </FieldLabel>
              <FieldLabel label={other ? c.patientLast : c.fields.last} htmlFor="rx-last" error={errors["rx-last"]}>
                <Input {...text("last")} autoComplete="family-name" />
              </FieldLabel>
              <FieldLabel label={other ? c.patientDob : c.fields.dob} htmlFor="rx-dob" error={errors["rx-dob"]}>
                <DobInput {...text("dob")} label={other ? c.patientDob : c.fields.dob} autoComplete="bday" />
              </FieldLabel>
              <FieldLabel label={other ? c.yourPhone : c.fields.phone} htmlFor="rx-phone" error={errors["rx-phone"]}>
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
              <Textarea {...text("meds")} aria-describedby={errors["rx-meds"] ? "rx-meds-hint rx-meds-error" : "rx-meds-hint"} rows={4} />
            </FieldLabel>
            <FieldLabel label={c.fields.notes} htmlFor="rx-notes">
              <Textarea {...text("notes", false)} rows={3} />
            </FieldLabel>
            <ConsentRow id="rx-existing" name="existing" required error={errors["rx-existing"]} {...errorProps(errors, "rx-existing")}>
              {other ? c.existingOther : c.existing}
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

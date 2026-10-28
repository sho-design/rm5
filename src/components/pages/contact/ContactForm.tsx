"use client";

import { useState, type FormEvent } from "react";
import { Display, Input, StateCard, Textarea } from "@/components/ui";
import { contactCopy, contactTopics, formFailedLine } from "@/content/booking";
import { contactExtraCopy } from "@/content/forms-copy";
import { submitForm } from "@/lib/forms";
import { radioKeys, rovingTab, useRevealOnChange } from "@/lib/a11y";
import { errorProps, focusFirstError, formErrors, readForm, type FormErrors } from "@/lib/validate";
import { Choice, ConsentRow, FieldLabel, Panel, PillChip, SubmitButton } from "../book/FormBits";

/**
 * Contact form: topic chips, name, email or phone, message, optional clinic
 * updates. Text fields are uncontrolled so typing before the page finishes
 * loading is kept. Replies use the contact details given; updates are a
 * separate opt-in.
 */
export function ContactForm() {
  const [topic, setTopic] = useState(0);
  const [replyBy, setReplyBy] = useState(0);
  /** The approved topics plus "A concern or complaint", so complaints have a clear place. */
  const topics = [...contactTopics, contactExtraCopy.complaintTopic];
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
    const res = await submitForm("contact", { topic: topics[topic], name: v.name, email: v.contact, message: v.message, replyBy: contactExtraCopy.replyOptions[replyBy], updates: v.updates === true });
    setBusy(false);
    if (res.ok) setDone(true);
    else setError(true);
  };

  if (done) {
    return (
      <div ref={doneRef} tabIndex={-1} className="scroll-mt-24 outline-none">
        <StateCard state="success" title={contactCopy.done.title}>
          <p>{contactCopy.done.body}</p>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setTopic(0);
            }}
            className="self-start border-b-[1.5px] border-ink text-[14px] font-semibold text-ink"
          >
            {contactCopy.done.again}
          </button>
        </StateCard>
      </div>
    );
  }

  return (
    <Panel>
      <form method="post" onSubmit={submit} noValidate className="flex flex-col gap-[14px] md:gap-[22px]">
        <Display as="h2" size="title-md" balance={false}>
          {contactCopy.formTitle}
        </Display>
        <div role="radiogroup" aria-label="Topic" onKeyDown={radioKeys} className="flex flex-wrap gap-1.5">
          {topics.map((t, i) => (
            <PillChip key={t} on={topic === i} tabIndex={rovingTab(topic === i, i, true)} size="sm" onClick={() => setTopic(i)}>
              {t}
            </PillChip>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
          <FieldLabel label={contactCopy.fields.name} htmlFor="contact-name" error={errors["contact-name"]}>
            <Input id="contact-name" name="name" autoComplete="name" required {...errorProps(errors, "contact-name")} />
          </FieldLabel>
          <FieldLabel label={contactCopy.fields.contact} htmlFor="contact-email" error={errors["contact-email"]}>
            <Input id="contact-email" name="contact" autoComplete="email" required {...errorProps(errors, "contact-email")} />
          </FieldLabel>
        </div>
        <FieldLabel label={contactCopy.fields.message} htmlFor="contact-message" hint={contactCopy.messageHint} error={errors["contact-message"]}>
          <Textarea id="contact-message" name="message" required {...errorProps(errors, "contact-message")} />
        </FieldLabel>
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold text-muted">{contactExtraCopy.replyLabel}</span>
          <Choice options={contactExtraCopy.replyOptions} value={replyBy} onChange={setReplyBy} ariaLabel={contactExtraCopy.replyLabel} />
        </div>
        <ConsentRow id="contact-updates" name="updates">
          {contactExtraCopy.updates}
        </ConsentRow>
        {error ? (
          <p role="alert" className="text-[13px] font-semibold text-[color:var(--status-error-fg)]">
            {formFailedLine}
          </p>
        ) : null}
        <SubmitButton busy={busy} trailing={false}>
          {contactCopy.submit}
        </SubmitButton>
      </form>
    </Panel>
  );
}

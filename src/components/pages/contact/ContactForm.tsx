"use client";

import { useState, type FormEvent } from "react";
import { Display, Input, StateCard, Textarea } from "@/components/ui";
import { contactCopy, contactTopics, formFailedLine } from "@/content/booking";
import { submitForm } from "@/lib/forms";
import { ConsentRow, FieldLabel, Panel, PillChip, SubmitButton } from "../book/FormBits";

/** Contact form: topic chips, name, email or phone, message, optional consent. */
export function ContactForm() {
  const [topic, setTopic] = useState(0);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const res = await submitForm("contact", { topic: contactTopics[topic], name, email: contact, message, updates: consent });
    setBusy(false);
    if (res.ok) {
      setDone(true);
      setName("");
      setContact("");
      setMessage("");
      setConsent(false);
    } else setError(true);
  };

  if (done) {
    return (
      <StateCard state="success" title={contactCopy.done.title}>
        <p>{contactCopy.done.body}</p>
        <button type="button" onClick={() => setDone(false)} className="self-start border-b-[1.5px] border-ink text-[14px] font-semibold text-ink">
          {contactCopy.done.again}
        </button>
      </StateCard>
    );
  }

  return (
    <Panel>
      <form onSubmit={submit} className="flex flex-col gap-[14px] md:gap-[22px]">
        <Display as="h2" size="title-md" balance={false}>
          {contactCopy.formTitle}
        </Display>
        <div role="radiogroup" aria-label="Topic" className="flex flex-wrap gap-1.5">
          {contactTopics.map((t, i) => (
            <PillChip key={t} on={topic === i} size="sm" onClick={() => setTopic(i)}>
              {t}
            </PillChip>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
          <FieldLabel label={contactCopy.fields.name} htmlFor="contact-name">
            <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </FieldLabel>
          <FieldLabel label={contactCopy.fields.contact} htmlFor="contact-email">
            <Input id="contact-email" value={contact} onChange={(e) => setContact(e.target.value)} autoComplete="email" required />
          </FieldLabel>
        </div>
        <FieldLabel label={contactCopy.fields.message} htmlFor="contact-message" hint={contactCopy.messageHint}>
          <Textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </FieldLabel>
        <ConsentRow checked={consent} onChange={(e) => setConsent(e.target.checked)}>
          {contactCopy.consent}
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

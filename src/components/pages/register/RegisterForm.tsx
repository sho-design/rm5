"use client";

import { useState, type FormEvent } from "react";
import { Button, Display, Eyebrow, Input, Lead, SmartLink, StateCard } from "@/components/ui";
import { formFailedLine, registerCopy, registerFamily, registerLanguages, registerSteps } from "@/content/booking";
import { submitForm } from "@/lib/forms";
import { cn } from "@/lib/cn";
import { Choice, ConsentRow, FieldLabel, OutcomeTile, Panel, PillChip, SubmitButton } from "../book/FormBits";

interface Fields {
  first: string;
  last: string;
  dob: string;
  card: string;
  email: string;
  phone: string;
  address: string;
  previous: string;
}

const empty: Fields = { first: "", last: "", dob: "", card: "", email: "", phone: "", address: "", previous: "" };

/** Three-step strip on the left: the first step is active until the form is sent, then the first two. */
function Steps({ done }: { done: boolean }) {
  return (
    <ol className="flex flex-col gap-2.5" aria-label="Registration steps">
      {registerSteps.map((s, i) => {
        const on = done ? i <= 1 : i === 0;
        return (
          <li key={s.n} className="grid grid-cols-[32px_1fr] items-start gap-3" aria-current={on && (done ? i === 1 : true) ? "step" : undefined}>
            <span className={cn("flex h-8 w-8 items-center justify-center rounded-full font-display text-[15px]", on ? "bg-ink text-white" : "bg-line text-muted")} aria-hidden>
              {s.n}
            </span>
            <span className="flex flex-col gap-0.5 pt-[5px]">
              <span className="text-[15px] font-semibold">{s.t}</span>
              <span className="text-[13px] leading-[1.45] text-muted">{s.d}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** New patient registration: sticky intro and steps left, form (or the received card) right. */
export function RegisterForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [lang, setLang] = useState(0);
  const [family, setFamily] = useState<number[]>([]);
  const [consent, setConsent] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const field = (k: keyof Fields) => ({
    id: `reg-${k}`,
    value: fields[k],
    onChange: (e: { target: { value: string } }) => setFields((f) => ({ ...f, [k]: e.target.value })),
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const res = await submitForm("register", {
      name: `${fields.first} ${fields.last}`.trim(),
      dateOfBirth: fields.dob,
      healthCard: fields.card,
      email: fields.email,
      phone: fields.phone,
      address: fields.address,
      language: registerLanguages[lang],
      family: family.map((i) => registerFamily[i]),
      previousClinic: fields.previous,
      consent,
      reminders,
    });
    setBusy(false);
    if (res.ok) setDone(true);
    else setError(true);
  };

  return (
    <div className="grid grid-cols-1 gap-6 px-4 pb-8 pt-8 md:px-content md:pt-16 md:pb-10 lg:grid-cols-2 lg:items-start lg:gap-8">
      <div className="flex flex-col gap-4 lg:sticky lg:top-[80px] lg:gap-5">
        <Eyebrow tone="sky">{registerCopy.eyebrow}</Eyebrow>
        <Display as="h1" size="lg">
          {registerCopy.title}
        </Display>
        <Lead size="md" tone="muted">
          {registerCopy.lead}
        </Lead>
        <Steps done={done} />
      </div>

      {done ? (
        <StateCard
          state="success"
          title={registerCopy.done.title}
          actions={
            <>
              <Button to="notes">{registerCopy.done.notes}</Button>
              <Button to="home" variant="ghost" className="text-ink">
                {registerCopy.done.home}
              </Button>
            </>
          }
        >
          <p>{registerCopy.done.body}</p>
          <OutcomeTile k={registerCopy.done.waitTitle}>
            <span className="text-[14px] leading-[1.5]">{registerCopy.done.waitBody}</span>
          </OutcomeTile>
        </StateCard>
      ) : (
        <Panel>
          <form onSubmit={submit} className="flex flex-col gap-[14px] md:gap-[22px]">
            <Display as="h2" size="title-md" balance={false}>
              {registerCopy.formTitle}
            </Display>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
              <FieldLabel label={registerCopy.fields.first} htmlFor="reg-first">
                <Input {...field("first")} autoComplete="given-name" required />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.last} htmlFor="reg-last">
                <Input {...field("last")} autoComplete="family-name" required />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.dob} htmlFor="reg-dob">
                <Input {...field("dob")} type="date" autoComplete="bday" required />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.card} htmlFor="reg-card">
                <Input {...field("card")} inputMode="numeric" autoComplete="off" />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.email} htmlFor="reg-email">
                <Input {...field("email")} type="email" autoComplete="email" inputMode="email" required />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.phone} htmlFor="reg-phone">
                <Input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" required />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.address} htmlFor="reg-address" className="sm:col-span-2">
                <Input {...field("address")} autoComplete="street-address" />
              </FieldLabel>
            </div>
            <div className="flex flex-col gap-1.5">
              <span id="reg-lang" className="text-[12px] font-semibold text-muted">
                {registerCopy.fields.language}
              </span>
              <Choice options={registerLanguages} value={lang} onChange={setLang} ariaLabel={registerCopy.fields.language} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted">{registerCopy.fields.family}</span>
              <div role="group" aria-label={registerCopy.fields.family} className="flex flex-wrap gap-2">
                {registerFamily.map((f, i) => {
                  const on = family.includes(i);
                  return (
                    <PillChip key={f} role="checkbox" on={on} size="sm" onClick={() => setFamily((cur) => (on ? cur.filter((x) => x !== i) : [...cur, i]))}>
                      {f}
                    </PillChip>
                  );
                })}
              </div>
            </div>
            <FieldLabel label={registerCopy.fields.previous} htmlFor="reg-previous" hint={registerCopy.fields.previousHint}>
              <Input {...field("previous")} />
            </FieldLabel>
            <ConsentRow checked={consent} onChange={(e) => setConsent(e.target.checked)} required>
              {registerCopy.consent}
              <SmartLink to="privacy" className="font-semibold text-link">
                {registerCopy.consentLink}
              </SmartLink>
              .
            </ConsentRow>
            <ConsentRow checked={reminders} onChange={(e) => setReminders(e.target.checked)}>
              {registerCopy.reminders}
            </ConsentRow>
            {error ? (
              <p role="alert" className="text-[13px] font-semibold text-[color:var(--status-error-fg)]">
                {formFailedLine}
              </p>
            ) : null}
            <SubmitButton busy={busy}>{registerCopy.submit}</SubmitButton>
          </form>
        </Panel>
      )}
    </div>
  );
}

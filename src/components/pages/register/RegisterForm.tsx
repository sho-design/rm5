"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button, Display, Eyebrow, Input, Lead, SmartLink, StateCard } from "@/components/ui";
import { formFailedLine, registerCopy, registerFamily, registerLanguages, registerSteps } from "@/content/booking";
import { registerExtraCopy as x } from "@/content/forms-copy";
import { submitForm } from "@/lib/forms";
import { useRevealOnChange } from "@/lib/a11y";
import { errorProps, focusFirstError, formErrors, readForm, type FormErrors } from "@/lib/validate";
import { cn } from "@/lib/cn";
import { Choice, ConsentRow, FieldLabel, OutcomeTile, Panel, PillChip, SubmitButton } from "../book/FormBits";

/** Family groups in registerFamily order: My partner, My children, My parents. */
const relations = ["partner", "children", "parents"] as const;
type Relation = (typeof relations)[number];
const maxPeople: Record<Relation, number> = { partner: 1, children: 6, parents: 2 };

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

/** One family member's details. Uncontrolled fields named fam-<relation>-<key>-<field>. */
function PersonFields({ relation, k, n, errors, onRemove }: { relation: Relation; k: number; n: number; errors: FormErrors; onRemove?: () => void }) {
  const id = (f: string) => `fam-${relation}-${k}-${f}`;
  const title = maxPeople[relation] > 1 ? `${x.family.relation[relation]} ${n}` : x.family.relation[relation];
  return (
    <fieldset className="flex flex-col gap-2 rounded-row border border-border bg-white p-4">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-center justify-between gap-3">
        <span aria-hidden className="text-[14px] font-semibold">
          {title}
        </span>
        {onRemove ? (
          <button type="button" onClick={onRemove} className="text-[13px] font-semibold text-link" aria-label={`${x.family.remove} ${title.toLowerCase()}`}>
            {x.family.remove}
          </button>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
        <FieldLabel label={x.family.first} htmlFor={id("first")} error={errors[id("first")]}>
          <Input id={id("first")} name={id("first")} data-error={x.family.firstError} autoComplete="off" required {...errorProps(errors, id("first"))} />
        </FieldLabel>
        <FieldLabel label={x.family.last} htmlFor={id("last")} error={errors[id("last")]}>
          <Input id={id("last")} name={id("last")} data-error={x.family.lastError} autoComplete="off" required {...errorProps(errors, id("last"))} />
        </FieldLabel>
        <FieldLabel label={x.family.dob} htmlFor={id("dob")} error={errors[id("dob")]}>
          <Input id={id("dob")} name={id("dob")} data-error={x.family.dobError} type="date" autoComplete="off" required {...errorProps(errors, id("dob"))} />
        </FieldLabel>
        <FieldLabel label={x.family.card} htmlFor={id("card")}>
          <Input id={id("card")} name={id("card")} inputMode="numeric" autoComplete="off" />
        </FieldLabel>
      </div>
    </fieldset>
  );
}

/**
 * New patient registration: sticky intro and steps left, form (or the received
 * card) right. Text fields are uncontrolled so anything typed before the page
 * finishes loading is kept; they are read with readForm on submit.
 */
export function RegisterForm() {
  const [lang, setLang] = useState(0);
  const [forWhom, setForWhom] = useState(0);
  const [clinic, setClinic] = useState(0);
  const [people, setPeople] = useState<Record<Relation, number[]>>({ partner: [], children: [], parents: [] });
  const [nextKey, setNextKey] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  /** What was sent, repeated on the confirmation: who is registered and at which clinic. */
  const [sent, setSent] = useState<{ names: string[]; clinic: string } | null>(null);
  const [error, setError] = useState(false);
  const doneRef = useRevealOnChange<HTMLDivElement>(done);

  const caregiver = forWhom === 1;

  // "Register a child" and similar links pass ?for=someone: start on "Someone I care for".
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("for") === "someone") setForWhom(1);
  }, []);

  const toggle = (r: Relation) => {
    if (people[r].length) {
      setPeople((p) => ({ ...p, [r]: [] }));
      return;
    }
    setPeople((p) => ({ ...p, [r]: [nextKey] }));
    setNextKey((k) => k + 1);
  };
  const add = (r: Relation) => {
    if (people[r].length >= maxPeople[r]) return;
    setPeople((p) => ({ ...p, [r]: [...p[r], nextKey] }));
    setNextKey((k) => k + 1);
  };
  const remove = (r: Relation, k: number) => setPeople((p) => ({ ...p, [r]: p[r].filter((x) => x !== k) }));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy || done) return;
    const form = e.currentTarget;
    const errs = formErrors(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(form, errs);
      return;
    }
    const v = readForm(form);
    const s = (k: string) => String(v[k] ?? "");
    const family = relations.flatMap((r) =>
      people[r].map((k) => {
        const f = (n: string) => s(`fam-${r}-${k}-${n}`);
        return { relation: x.family.relation[r], first: f("first"), last: f("last"), dob: f("dob"), card: f("card") };
      }),
    );
    setBusy(true);
    setError(false);
    const res = await submitForm("register", {
      name: `${s("first")} ${s("last")}`.trim(),
      dateOfBirth: s("dob"),
      healthCard: s("card"),
      email: s("email"),
      phone: s("phone"),
      address: s("address"),
      language: registerLanguages[lang],
      clinic: clinic === 0 ? "Thornhill" : "Maple",
      submittedBy: caregiver ? { name: s("helperName"), relationship: s("helperRelation"), phone: s("helperPhone") } : null,
      family,
      previousClinic: s("previous"),
      consent: v.consent === true,
      reminders: v.reminders === true,
      updates: v.updates === true,
    });
    setBusy(false);
    if (res.ok) {
      setSent({ names: [`${s("first")} ${s("last")}`.trim(), ...family.map((m) => `${m.first} ${m.last}`.trim())].filter(Boolean), clinic: clinic === 0 ? "Thornhill" : "Maple" });
      setDone(true);
    } else setError(true);
  };

  const err = (id: string) => ({ error: errors[id] });

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
        <div ref={doneRef} tabIndex={-1} className="scroll-mt-24 outline-none">
          <StateCard
            state="success"
            title={registerCopy.done.title}
            actions={
              <>
                {/* No "book" button here: the clinic calls or emails to book the first visit, and a second path confused testers. */}
                <Button to="notes">{registerCopy.done.notes}</Button>
                <SmartLink to="home" className="inline-flex h-12 items-center px-[22px] text-[14px] font-semibold text-ink hover:opacity-80">
                  {registerCopy.done.home}
                </SmartLink>
              </>
            }
          >
            <p>{registerCopy.done.body}</p>
            {sent ? (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <OutcomeTile k={x.done.people(sent.names.length)}>
                  <ul className="flex flex-col text-[15px] font-semibold">
                    {sent.names.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </OutcomeTile>
                <OutcomeTile k={x.done.clinic}>
                  <span className="text-[15px] font-semibold">{sent.clinic}</span>
                  {sent.clinic === "Maple" ? <span className="text-[13px] leading-[1.5] text-muted">{x.clinic.mapleNote}</span> : null}
                </OutcomeTile>
              </div>
            ) : null}
            <OutcomeTile k={registerCopy.done.waitTitle}>
              <span className="text-[14px] leading-[1.5]">{registerCopy.done.waitBody}</span>
            </OutcomeTile>
          </StateCard>
        </div>
      ) : (
        <Panel>
          <form method="post" onSubmit={submit} noValidate className="flex flex-col gap-[14px] md:gap-[22px]">
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted">{x.forWhom.label}</span>
              <Choice options={x.forWhom.options} value={forWhom} onChange={setForWhom} ariaLabel={x.forWhom.label} />
            </div>

            {caregiver ? (
              <fieldset className="flex flex-col gap-2.5">
                <legend className="mb-2 font-display text-[22px] font-medium tracking-[-.02em]">{x.helper.title}</legend>
                <p className="text-[13px] leading-[1.5] text-muted">{x.helper.note}</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                  <FieldLabel label={x.helper.name} htmlFor="reg-helperName" {...err("reg-helperName")}>
                    <Input id="reg-helperName" name="helperName" data-error={x.helper.nameError} autoComplete="name" required {...errorProps(errors, "reg-helperName")} />
                  </FieldLabel>
                  <FieldLabel label={x.helper.phone} htmlFor="reg-helperPhone" {...err("reg-helperPhone")}>
                    <Input id="reg-helperPhone" name="helperPhone" data-error={x.helper.phoneError} type="tel" inputMode="tel" autoComplete="tel" required {...errorProps(errors, "reg-helperPhone")} />
                  </FieldLabel>
                  <FieldLabel label={x.helper.relation} htmlFor="reg-helperRelation" hint={x.helper.relationHint} className="sm:col-span-2">
                    <Input id="reg-helperRelation" name="helperRelation" autoComplete="off" />
                  </FieldLabel>
                </div>
              </fieldset>
            ) : null}

            <Display as="h2" size="title-md" balance={false}>
              {caregiver ? x.patientTitle : registerCopy.formTitle}
            </Display>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
              <FieldLabel label={registerCopy.fields.first} htmlFor="reg-first" {...err("reg-first")}>
                <Input id="reg-first" name="first" autoComplete={caregiver ? "off" : "given-name"} required {...errorProps(errors, "reg-first")} />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.last} htmlFor="reg-last" {...err("reg-last")}>
                <Input id="reg-last" name="last" autoComplete={caregiver ? "off" : "family-name"} required {...errorProps(errors, "reg-last")} />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.dob} htmlFor="reg-dob" {...err("reg-dob")}>
                <Input id="reg-dob" name="dob" type="date" autoComplete={caregiver ? "off" : "bday"} required {...errorProps(errors, "reg-dob")} />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.card} htmlFor="reg-card">
                <Input id="reg-card" name="card" inputMode="numeric" autoComplete="off" />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.email} htmlFor="reg-email" hint={caregiver ? x.helper.contactHint : undefined} {...err("reg-email")}>
                <Input id="reg-email" name="email" type="email" autoComplete="email" inputMode="email" required {...errorProps(errors, "reg-email")} />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.phone} htmlFor="reg-phone" {...err("reg-phone")}>
                <Input id="reg-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required {...errorProps(errors, "reg-phone")} />
              </FieldLabel>
              <FieldLabel label={registerCopy.fields.address} htmlFor="reg-address" className="sm:col-span-2">
                <Input id="reg-address" name="address" autoComplete="street-address" />
              </FieldLabel>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted">{x.clinic.label}</span>
              <Choice options={x.clinic.options} value={clinic} onChange={setClinic} ariaLabel={x.clinic.label} />
              {clinic === 1 ? <span className="text-[12px] leading-[1.5] text-muted">{x.clinic.mapleNote}</span> : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted">{registerCopy.fields.language}</span>
              <Choice options={registerLanguages} value={lang} onChange={setLang} ariaLabel={registerCopy.fields.language} />
            </div>
            <div className="flex flex-col gap-2">
              <span id="reg-family" className="text-[12px] font-semibold text-muted">
                {registerCopy.fields.family}
              </span>
              <span id="reg-family-hint" className="text-[12px] text-muted">
                {x.family.hint}
              </span>
              <div role="group" aria-labelledby="reg-family" aria-describedby="reg-family-hint" className="flex flex-wrap gap-2">
                {registerFamily.map((f, i) => {
                  const r = relations[i];
                  const on = people[r].length > 0;
                  return (
                    <PillChip key={f} role="checkbox" on={on} size="sm" onClick={() => toggle(r)}>
                      {f}
                    </PillChip>
                  );
                })}
              </div>
              {relations.map((r) =>
                people[r].length ? (
                  <div key={r} className="flex flex-col gap-2">
                    {people[r].map((k, n) => (
                      <PersonFields key={k} relation={r} k={k} n={n + 1} errors={errors} onRemove={people[r].length > 1 ? () => remove(r, k) : undefined} />
                    ))}
                    {people[r].length < maxPeople[r] ? (
                      <button type="button" onClick={() => add(r)} className="self-start text-[13px] font-semibold text-link">
                        {r === "children" ? x.family.addChild : x.family.addParent} ›
                      </button>
                    ) : null}
                  </div>
                ) : null,
              )}
            </div>
            <FieldLabel label={registerCopy.fields.previous} htmlFor="reg-previous" hint={registerCopy.fields.previousHint}>
              <Input id="reg-previous" name="previous" />
            </FieldLabel>
            <ConsentRow id="reg-consent" name="consent" required error={errors["reg-consent"]} {...errorProps(errors, "reg-consent")}>
              {caregiver ? x.helper.consent : registerCopy.consent}
              <SmartLink to="privacy" className="font-semibold text-link">
                {registerCopy.consentLink}
              </SmartLink>
              .
            </ConsentRow>
            <ConsentRow id="reg-reminders" name="reminders">
              {x.reminders}
            </ConsentRow>
            <ConsentRow id="reg-updates" name="updates">
              {x.updates}
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

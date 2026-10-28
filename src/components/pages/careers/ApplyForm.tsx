"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button, Display, Field, Input, Select, StateCard, Textarea } from "@/components/ui";
import { careersCopy } from "@/content/about";
import { site } from "@/content/site";
import { submitForm } from "@/lib/forms";
import { useRevealOnChange } from "@/lib/a11y";
import { errorProps, focusFirstError, formErrors, type FormErrors } from "@/lib/validate";
import { FieldError } from "../book/FormBits";

type Status = "form" | "sending" | "done" | "error";

/**
 * Application form. Only text fields are posted to /api/careers; the CV file
 * input is never read or uploaded by the site (it belongs to the ATS). Text
 * fields are uncontrolled so typing before the page finishes loading is kept;
 * errors show inline under each field.
 */
export function ApplyForm({ roles, role, onRoleChange }: { roles: string[]; role: string; onRoleChange: (r: string) => void }) {
  const f = careersCopy.form;
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
    const fd = new FormData(form);
    const text = (k: string) => String(fd.get(k) ?? "").trim();
    const data = {
      role: role || text("role"),
      firstName: text("firstName"),
      lastName: text("lastName"),
      email: text("email"),
      phone: text("phone"),
      licence: text("licence"),
      note: text("note"),
    };
    setStatus("sending");
    const res = await submitForm("careers", data);
    setStatus(res.ok ? "done" : "error");
  }

  return (
    <section id="apply" className="grid scroll-mt-6 grid-cols-1 items-start gap-8 px-4 pb-10 pt-12 md:px-content md:pt-section lg:grid-cols-2">
      <div className="flex flex-col gap-3.5 lg:sticky lg:top-6">
        <Display size="xs">{f.title}</Display>
        <Lead16>{f.body}</Lead16>
        <span className="text-[13px] text-muted">
          {f.emailLine}
          <a href={`mailto:${site.careersEmail}`} className="font-semibold text-link">
            {site.careersEmail}
          </a>
          {f.emailLineEnd}
        </span>
      </div>

      {status === "done" ? (
        <div ref={outcomeRef} tabIndex={-1} className="scroll-mt-24 outline-none">
          <StateCard state="success" title={f.doneTitle} actions={<Button to="team">{f.doneCta}</Button>}>
            <p>{f.doneBody}</p>
          </StateCard>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {status === "error" ? (
            <div ref={outcomeRef} tabIndex={-1} className="scroll-mt-24 outline-none">
              <StateCard
                state="error"
                title={f.errorTitle}
                actions={
                  <Button variant="outline" onClick={() => formRef.current?.requestSubmit()}>
                    {f.retry}
                  </Button>
                }
              >
                <p>
                  {f.errorBody}
                  <a href={`mailto:${site.careersEmail}`} className="font-semibold text-link">
                    {site.careersEmail}
                  </a>
                  .
                </p>
              </StateCard>
            </div>
          ) : null}
          <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-[22px] rounded-block border border-border bg-card p-5 md:p-9" aria-busy={status === "sending"}>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <Field label={f.firstName} htmlFor="ap-first" required>
                <Input id="ap-first" name="firstName" autoComplete="given-name" required {...errorProps(errors, "ap-first")} />
                <FieldError id="ap-first" error={errors["ap-first"]} />
              </Field>
              <Field label={f.lastName} htmlFor="ap-last" required>
                <Input id="ap-last" name="lastName" autoComplete="family-name" required {...errorProps(errors, "ap-last")} />
                <FieldError id="ap-last" error={errors["ap-last"]} />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <Field label={f.email} htmlFor="ap-email" required>
                <Input id="ap-email" name="email" type="email" autoComplete="email" inputMode="email" required {...errorProps(errors, "ap-email")} />
                <FieldError id="ap-email" error={errors["ap-email"]} />
              </Field>
              <Field label={f.phone} htmlFor="ap-phone">
                <Input id="ap-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" {...errorProps(errors, "ap-phone")} />
                <FieldError id="ap-phone" error={errors["ap-phone"]} />
              </Field>
            </div>
            <Field label={f.role} htmlFor="ap-role">
              <Select id="ap-role" name="role" value={role} onChange={(e) => onRoleChange(e.target.value)}>
                <option value="">{f.rolePlaceholder}</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                <option value={f.roleGeneral}>{f.roleGeneral}</option>
              </Select>
            </Field>
            <Field label={f.licence} htmlFor="ap-licence">
              <Input id="ap-licence" name="licence" autoComplete="off" />
            </Field>
            <Field label={f.note} htmlFor="ap-note">
              <Textarea id="ap-note" name="note" className="min-h-[110px]" />
            </Field>
            <Field label={f.cv} htmlFor="ap-cv" hint={f.cvHint}>
              <input id="ap-cv" type="file" accept=".pdf,application/pdf" className="text-[14px] file:mr-3 file:rounded-chip file:border-[1.5px] file:border-border file:bg-white file:px-3.5 file:py-2 file:text-[13px] file:font-semibold file:text-primary" />
            </Field>
            <Button type="submit" variant="secondary" size="lg" fullWidth disabled={status === "sending"}>
              {status === "sending" ? f.sending : f.submit}
            </Button>
          </form>
        </div>
      )}
    </section>
  );
}

function Lead16({ children }: { children: string }) {
  return <p className="pretty text-[16px] leading-[1.55] text-secondary">{children}</p>;
}

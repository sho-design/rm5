"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button, Display, Field, Input, StateCard, SmartLink } from "@/components/ui";
import { locationsCopy } from "@/content/about";
import { submitForm } from "@/lib/forms";
import { useRevealOnChange } from "@/lib/a11y";
import { errorProps, focusFirstError, formErrors, readForm, type FormErrors } from "@/lib/validate";
import { FieldError } from "../book/FormBits";

type Status = "form" | "sending" | "done" | "error";

/**
 * Short Maple waitlist: name, email, phone, posted to /api/register with list
 * "maple". Fields are uncontrolled so typing before the page finishes loading
 * is kept; errors show inline. A failed send keeps the form filled in.
 */
export function WaitlistForm() {
  const w = locationsCopy.waitlist;
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
    const res = await submitForm("register", { list: "maple", name: v.name, email: v.email, phone: v.phone });
    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div ref={outcomeRef} tabIndex={-1} className="scroll-mt-24 outline-none">
        <StateCard state="success" title={w.doneTitle} actions={<Button to="book">{w.doneCta}</Button>}>
          <p>{w.doneBody}</p>
        </StateCard>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {status === "error" ? (
        <div ref={outcomeRef} tabIndex={-1} className="scroll-mt-24 outline-none">
          <StateCard
            state="error"
            title={w.errorTitle}
            actions={
              <Button variant="outline" onClick={() => formRef.current?.requestSubmit()}>
                {w.retry}
              </Button>
            }
          >
            <p>{w.errorBody}</p>
          </StateCard>
        </div>
      ) : null}
      <form method="post" ref={formRef} onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="grid grid-cols-1 gap-6 rounded-card border border-border bg-card p-5 md:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
        <div className="flex flex-col gap-3">
          <Display size="title-lg" as="h2">
            {w.title}
          </Display>
          <p className="pretty text-[15px] leading-[1.5] text-secondary">{w.body}</p>
          <SmartLink to="register" className="text-[14px] font-semibold text-link">
            {w.register} ›
          </SmartLink>
        </div>
        <div className="flex flex-col gap-4">
          <Field label={w.name} htmlFor="wl-name" required>
            <Input id="wl-name" name="name" autoComplete="name" required {...errorProps(errors, "wl-name")} />
            <FieldError id="wl-name" error={errors["wl-name"]} />
          </Field>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field label={w.email} htmlFor="wl-email" required>
              <Input id="wl-email" name="email" type="email" autoComplete="email" inputMode="email" required {...errorProps(errors, "wl-email")} />
              <FieldError id="wl-email" error={errors["wl-email"]} />
            </Field>
            <Field label={w.phone} htmlFor="wl-phone">
              <Input id="wl-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" {...errorProps(errors, "wl-phone")} />
              <FieldError id="wl-phone" error={errors["wl-phone"]} />
            </Field>
          </div>
          <Button type="submit" size="lg" disabled={status === "sending"} className="self-start">
            {status === "sending" ? w.sending : w.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}

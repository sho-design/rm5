"use client";

import { useState, type FormEvent } from "react";
import { Button, Display, Field, Input, StateCard, SmartLink } from "@/components/ui";
import { locationsCopy } from "@/content/about";
import { submitForm } from "@/lib/forms";

type Status = "form" | "sending" | "done" | "error";

/** Short Maple waitlist: name, email, phone, posted to /api/register with list "maple". */
export function WaitlistForm() {
  const w = locationsCopy.waitlist;
  const [status, setStatus] = useState<Status>("form");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = (k: string) => String(fd.get(k) ?? "").trim();
    const data = { list: "maple", name: text("name"), email: text("email"), phone: text("phone") };
    if (!data.name || !data.email) {
      setError(w.required);
      return;
    }
    setError(null);
    setStatus("sending");
    const res = await submitForm("register", data);
    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <StateCard state="success" title={w.doneTitle} actions={<Button to="book">{w.doneCta}</Button>}>
        <p>{w.doneBody}</p>
      </StateCard>
    );
  }
  if (status === "error") {
    return (
      <StateCard
        state="error"
        title={w.errorTitle}
        actions={
          <Button variant="outline" onClick={() => setStatus("form")}>
            {w.retry}
          </Button>
        }
      >
        <p>{w.errorBody}</p>
      </StateCard>
    );
  }
  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="grid grid-cols-1 gap-6 rounded-card border border-border bg-card p-5 md:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
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
          <Input id="wl-name" name="name" autoComplete="name" required />
        </Field>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <Field label={w.email} htmlFor="wl-email" required>
            <Input id="wl-email" name="email" type="email" autoComplete="email" inputMode="email" required />
          </Field>
          <Field label={w.phone} htmlFor="wl-phone">
            <Input id="wl-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
          </Field>
        </div>
        {error ? (
          <span role="alert" className="text-[13px] font-semibold text-[color:var(--status-error-fg)]">
            {error}
          </span>
        ) : null}
        <Button type="submit" size="lg" disabled={status === "sending"} className="self-start">
          {status === "sending" ? w.sending : w.submit}
        </Button>
      </div>
    </form>
  );
}

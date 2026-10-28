"use client";

import { formErrorCopy as c } from "@/content/forms";

export type FormErrors = Record<string, string>;

const labelFor = (form: HTMLFormElement, id: string) => {
  const raw = form.querySelector(`label[for="${CSS.escape(id)}"]`)?.textContent ?? "";
  return raw.replace(/\s*\(optional\)\s*/i, "").trim();
};

/**
 * Check a form with the browser's constraint rules (required, type, pattern,
 * maxlength) and return our own plain-language messages keyed by field id.
 * Forms set noValidate so these show inline instead of browser pop-ups.
 * A field can carry data-error="..." to use its own message.
 */
export function formErrors(form: HTMLFormElement): FormErrors {
  const out: FormErrors = {};
  for (const el of Array.from(form.elements)) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) continue;
    if (!el.id || el.disabled || el.validity.valid) continue;
    const own = el.dataset.error;
    if (own) {
      out[el.id] = own;
      continue;
    }
    const v = el.validity;
    const label = labelFor(form, el.id);
    if (el instanceof HTMLInputElement && el.type === "checkbox") out[el.id] = c.checkbox;
    else if (v.valueMissing) out[el.id] = c.missing(label);
    else if (v.typeMismatch && el.type === "email") out[el.id] = c.email;
    else if (el.type === "tel" || v.patternMismatch) out[el.id] = el.type === "tel" ? c.phone : c.pattern;
    else out[el.id] = c.generic;
  }
  return out;
}

/** Focus the first field with an error, in form order. */
export function focusFirstError(form: HTMLFormElement, errors: FormErrors) {
  const first = Array.from(form.elements).find((el) => (el as HTMLElement).id && errors[(el as HTMLElement).id]) as HTMLElement | undefined;
  first?.focus();
}

/** aria-invalid and aria-describedby for a control, matching FieldLabel's error id. */
export function errorProps(errors: FormErrors, id: string) {
  return errors[id] ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};
}

/** Read a form's named fields as strings (checkboxes as booleans). Works for uncontrolled fields. */
export function readForm(form: HTMLFormElement): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {};
  for (const el of Array.from(form.elements)) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) || !el.name) continue;
    if (el instanceof HTMLInputElement && el.type === "checkbox") out[el.name] = el.checked;
    else if (el instanceof HTMLInputElement && el.type === "radio") {
      if (el.checked) out[el.name] = el.value;
    } else out[el.name] = el.value.trim();
  }
  return out;
}

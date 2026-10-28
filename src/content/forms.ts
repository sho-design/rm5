import { draft } from "./review";

/**
 * Inline form error messages (new wording, not in the prototype; listed in
 * docs/content-review.md). Shown under the field instead of browser pop-ups.
 */
export const formErrorCopy = {
  missing: (label: string) => (label ? draft(`Add your ${label.charAt(0).toLowerCase()}${label.slice(1)}.`) : draft("Please fill this in.")),
  checkbox: draft("Tick this box to continue."),
  email: draft("Check the email address. It needs an @ and a domain, like name@example.com."),
  phone: draft("Check the phone number, for example 905-555-0123."),
  pattern: draft("Check the format of this field."),
  generic: draft("Check this field."),
  summary: draft("A few things need a look before this can be sent."),
};

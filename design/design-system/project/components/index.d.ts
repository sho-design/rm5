/* Restoration Medical Website components (window.RM). Props as the site's design handoff defines them. */

import * as React from "react";

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  /** true renders the › chevron; or pass a custom node */
  trailing?: boolean | React.ReactNode;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;

export interface IconButtonProps {
  /** Required accessible name */
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  size?: number;
  /** On navy surfaces */
  inverse?: boolean;
  style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): JSX.Element;

export interface PillNavProps {
  brand?: string;
  items: string[];
  active?: string;
  onSelect?: (item: string) => void;
  onBook?: () => void;
  bookLabel?: string;
  /** Extra controls left of Book (search, language) */
  right?: React.ReactNode;
  style?: React.CSSProperties;
}
export function PillNav(props: PillNavProps): JSX.Element;

export interface StepperProps {
  steps: string[];
  /** 1-based */
  current: number;
  style?: React.CSSProperties;
}
export function Stepper(props: StepperProps): JSX.Element;

export interface TabsProps {
  tabs: Array<string | { value: string; label: string; count?: number }>;
  value: string;
  onChange?: (value: string) => void;
  /** pill (default) or underline (sub-nav) */
  variant?: 'pill' | 'underline';
  inverse?: boolean;
  style?: React.CSSProperties;
}
export function Tabs(props: TabsProps): JSX.Element;

export interface UtilityBarProps {
  phone?: string;
  /** e.g. "Open until 4pm" or "Closed. Opens Tue 3pm" */
  status?: string;
  open?: boolean;
  links?: Array<{ label: string; onClick?: () => void; accent?: boolean }>;
  /** Text size and contrast IconButtons */
  right?: React.ReactNode;
  style?: React.CSSProperties;
}
export function UtilityBar(props: UtilityBarProps): JSX.Element;

export interface AccordionProps {
  items: Array<{ q: string; a: string }>;
  /** Index open on load; -1 for none */
  defaultOpen?: number;
  style?: React.CSSProperties;
}
export function Accordion(props: AccordionProps): JSX.Element;

export interface BenefitCardProps {
  /** Short numeral or token: 1, 0, MD, $0 */
  big: string;
  title: string;
  children?: React.ReactNode;
  tone?: 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  style?: React.CSSProperties;
}
export function BenefitCard(props: BenefitCardProps): JSX.Element;

export interface CardProps {
  tone?: 'card' | 'raised' | 'inverse' | 'accent';
  /** Tints the card and colours the eyebrow */
  division?: 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  eyebrow?: string;
  title?: string;
  children?: React.ReactNode;
  /** Buttons / links row */
  footer?: React.ReactNode;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;

export interface ChooserProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  options: Array<{ label: string; sub?: string }>;
  /** Index-matched to options */
  results: Array<{ title: string; body: string; tags?: string[]; facts?: Array<{ k: string; v: string }> }>;
  tone?: 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  value?: number;
  onChange?: (index: number) => void;
  /** Buttons row, or a function of (result, index) */
  cta?: React.ReactNode | ((result: any, index: number) => React.ReactNode);
  style?: React.CSSProperties;
}
export function Chooser(props: ChooserProps): JSX.Element;

export interface CtaBandProps {
  title: string;
  lead?: string;
  /** Button plus optional phone link */
  actions: React.ReactNode;
  tone?: 'accent' | 'inverse' | 'card';
  compact?: boolean;
  style?: React.CSSProperties;
}
export function CtaBand(props: CtaBandProps): JSX.Element;

export interface PathStepsProps {
  steps: Array<{ time?: string; title: string; body: string }>;
  /** Default true: designed for navy blocks */
  inverse?: boolean;
  style?: React.CSSProperties;
}
export function PathSteps(props: PathStepsProps): JSX.Element;

export interface PriceCardProps {
  kicker?: string;
  title: string;
  /** Already formatted: $250, From $95 */
  price: string;
  children?: React.ReactNode;
  note?: string;
  tone?: 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  featured?: boolean;
  style?: React.CSSProperties;
}
export function PriceCard(props: PriceCardProps): JSX.Element;

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children: React.ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  style?: React.CSSProperties;
}
export function Checkbox(props: CheckboxProps): JSX.Element;

export interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  /** ink: filters and service picks. sage: symptom / drip multi-select. sun: tabs on navy */
  tone?: 'ink' | 'sage' | 'sun';
  size?: 'sm' | 'md';
  /** Show a check circle (multi-select) */
  check?: boolean;
  style?: React.CSSProperties;
}
export function Chip(props: ChipProps): JSX.Element;

export interface FieldProps {
  label?: string;
  helper?: string;
  /** Replaces helper and turns label red */
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode | ((state: { invalid: boolean }) => React.ReactNode);
  style?: React.CSSProperties;
}
export function Field(props: FieldProps): JSX.Element;

export interface InputProps {
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;

export interface RangeProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  format?: (value: number) => string;
  inverse?: boolean;
  style?: React.CSSProperties;
}
export function Range(props: RangeProps): JSX.Element;

export interface SegmentedProps {
  options: Array<string | { value: string; label: string; hint?: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  /** On navy surfaces: sunshine selection */
  inverse?: boolean;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
export function Segmented(props: SegmentedProps): JSX.Element;

export interface SelectProps {
  options: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;

export interface TextareaProps {
  invalid?: boolean;
  disabled?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}
export function Textarea(props: TextareaProps): JSX.Element;

export interface NoticeProps {
  tone?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export function Notice(props: NoticeProps): JSX.Element;

export interface StateCardProps {
  tone?: 'success' | 'waitlist' | 'error';
  title: string;
  lead?: string;
  facts?: Array<{ k: string; v: string; sub?: string }>;
  /** Row of Buttons */
  actions?: React.ReactNode;
  glyph?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function StateCard(props: StateCardProps): JSX.Element;

export interface TagProps {
  tone?: 'neutral' | 'sun' | 'success' | 'warning' | 'error' | 'info' | 'inverse' | 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  children: React.ReactNode;
  /** Leading status dot (Open now) */
  dot?: boolean;
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): JSX.Element;

export interface TableProps {
  columns: string[];
  rows: string[][];
  /** Column index to tint sage with check marks (our column in comparisons) */
  highlight?: number;
  caption?: string;
  style?: React.CSSProperties;
}
export function Table(props: TableProps): JSX.Element;

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  /** Row of Buttons, right-aligned */
  actions?: React.ReactNode;
  width?: number;
  /** Position absolute inside a relative parent (demos) */
  inline?: boolean;
}
export function Modal(props: ModalProps): JSX.Element;

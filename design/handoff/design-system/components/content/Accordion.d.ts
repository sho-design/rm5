export interface AccordionProps {
  items: Array<{ q: string; a: string }>;
  /** Index open on load; -1 for none */
  defaultOpen?: number;
  style?: React.CSSProperties;
}
export function Accordion(props: AccordionProps): JSX.Element;

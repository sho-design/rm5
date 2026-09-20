/** @startingPoint section="Feedback" subtitle="Confirmation, waitlist and error outcomes" viewport="700x420" */
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

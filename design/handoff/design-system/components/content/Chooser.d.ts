/** @startingPoint section="Content" subtitle="Options list that reveals a result card" viewport="900x520" */
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

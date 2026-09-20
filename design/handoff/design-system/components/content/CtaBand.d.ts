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

export interface TagProps {
  tone?: 'neutral' | 'sun' | 'success' | 'warning' | 'error' | 'info' | 'inverse' | 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  children: React.ReactNode;
  /** Leading status dot (Open now) */
  dot?: boolean;
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): JSX.Element;

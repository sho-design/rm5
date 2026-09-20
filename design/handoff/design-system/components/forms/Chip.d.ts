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

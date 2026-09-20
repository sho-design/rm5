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

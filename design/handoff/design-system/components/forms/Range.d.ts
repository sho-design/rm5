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

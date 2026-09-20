export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children: React.ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  style?: React.CSSProperties;
}
export function Checkbox(props: CheckboxProps): JSX.Element;

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

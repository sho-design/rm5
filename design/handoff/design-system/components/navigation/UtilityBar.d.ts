export interface UtilityBarProps {
  phone?: string;
  /** e.g. "Open until 4pm" or "Closed. Opens Tue 3pm" */
  status?: string;
  open?: boolean;
  links?: Array<{ label: string; onClick?: () => void; accent?: boolean }>;
  /** Text size and contrast IconButtons */
  right?: React.ReactNode;
  style?: React.CSSProperties;
}
export function UtilityBar(props: UtilityBarProps): JSX.Element;

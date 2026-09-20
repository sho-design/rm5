/** @startingPoint section="Actions" subtitle="Pill buttons in six variants" viewport="700x220" */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  /** true renders the › chevron; or pass a custom node */
  trailing?: boolean | React.ReactNode;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;

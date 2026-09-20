export interface IconButtonProps {
  /** Required accessible name */
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  size?: number;
  /** On navy surfaces */
  inverse?: boolean;
  style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): JSX.Element;

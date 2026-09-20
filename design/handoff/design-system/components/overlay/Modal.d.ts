export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  /** Row of Buttons, right-aligned */
  actions?: React.ReactNode;
  width?: number;
  /** Position absolute inside a relative parent (demos) */
  inline?: boolean;
}
export function Modal(props: ModalProps): JSX.Element;

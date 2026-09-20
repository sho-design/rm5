export interface NoticeProps {
  tone?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export function Notice(props: NoticeProps): JSX.Element;

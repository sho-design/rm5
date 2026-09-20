export interface TextareaProps {
  invalid?: boolean;
  disabled?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}
export function Textarea(props: TextareaProps): JSX.Element;

/** @startingPoint section="Content" subtitle="Rounded content card in surface, division, accent and inverse tones" viewport="700x300" */
export interface CardProps {
  tone?: 'card' | 'raised' | 'inverse' | 'accent';
  /** Tints the card and colours the eyebrow */
  division?: 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  eyebrow?: string;
  title?: string;
  children?: React.ReactNode;
  /** Buttons / links row */
  footer?: React.ReactNode;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;

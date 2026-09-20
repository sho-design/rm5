export interface PriceCardProps {
  kicker?: string;
  title: string;
  /** Already formatted: $250, From $95 */
  price: string;
  children?: React.ReactNode;
  note?: string;
  tone?: 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  featured?: boolean;
  style?: React.CSSProperties;
}
export function PriceCard(props: PriceCardProps): JSX.Element;

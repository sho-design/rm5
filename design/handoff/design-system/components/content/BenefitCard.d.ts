export interface BenefitCardProps {
  /** Short numeral or token: 1, 0, MD, $0 */
  big: string;
  title: string;
  children?: React.ReactNode;
  tone?: 'family' | 'pain' | 'infusion' | 'aesthetics' | 'rehab';
  style?: React.CSSProperties;
}
export function BenefitCard(props: BenefitCardProps): JSX.Element;

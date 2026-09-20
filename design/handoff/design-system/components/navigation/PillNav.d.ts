/** @startingPoint section="Navigation" subtitle="Site header with pill nav and Book" viewport="900x80" */
export interface PillNavProps {
  brand?: string;
  items: string[];
  active?: string;
  onSelect?: (item: string) => void;
  onBook?: () => void;
  bookLabel?: string;
  /** Extra controls left of Book (search, language) */
  right?: React.ReactNode;
  style?: React.CSSProperties;
}
export function PillNav(props: PillNavProps): JSX.Element;

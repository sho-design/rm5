export interface TableProps {
  columns: string[];
  rows: string[][];
  /** Column index to tint sage with check marks (our column in comparisons) */
  highlight?: number;
  caption?: string;
  style?: React.CSSProperties;
}
export function Table(props: TableProps): JSX.Element;

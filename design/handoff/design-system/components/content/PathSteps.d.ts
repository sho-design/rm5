export interface PathStepsProps {
  steps: Array<{ time?: string; title: string; body: string }>;
  /** Default true: designed for navy blocks */
  inverse?: boolean;
  style?: React.CSSProperties;
}
export function PathSteps(props: PathStepsProps): JSX.Element;

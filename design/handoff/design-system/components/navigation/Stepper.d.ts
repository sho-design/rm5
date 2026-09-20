export interface StepperProps {
  steps: string[];
  /** 1-based */
  current: number;
  style?: React.CSSProperties;
}
export function Stepper(props: StepperProps): JSX.Element;

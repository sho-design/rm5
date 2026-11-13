import { MenConcerns } from "./men/MenConcerns";
import { MenRoutine } from "./men/MenRoutine";
import { MenWeek } from "./men/MenWeek";

/**
 * Men's aesthetics page (Nov 2026): the concerns men bring in, with a turning line drawing that points at
 * each one; time off laid on a busy week; a three-product routine; and the questions men usually ask.
 */
export function MenExtra() {
  return (
    <>
      <MenConcerns />
      <MenWeek />
      <MenRoutine />
    </>
  );
}

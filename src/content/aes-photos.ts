import { draft } from "./review";

/*
 * "How we take your photos" on the before-and-after page (November 2026). The page already says photos taken at
 * your consult stay in your chart and the site shows no patient photos. CLINIC TO CONFIRM the new details: same
 * room, light and distance each time; three angles; photos taken only with consent; saying no does not change care.
 */

export const photosCopy = {
  eyebrow: draft("How we take your photos"),
  title: draft("Same light, three angles, kept in your chart."),
  lead: draft(
    "This site does not show patient photos. If photos help plan your care, this is how we take them and where they go.",
  ),
  steps: [
    {
      t: draft("Same light, same spot"),
      d: draft(
        "Photos are taken in the consult room with the same light and distance each time, so visits are easier to compare.",
      ),
    },
    {
      t: draft("Front and both sides"),
      d: draft("Usually three angles: straight on, then each side."),
    },
    {
      t: draft("Kept in your chart"),
      d: draft(
        "Photos stay in your chart. They are never shown on this site, and are taken only with your consent.",
      ),
    },
  ],
  choice: draft("You can say no to photos. It does not change your care."),
  angles: [draft("Front"), draft("Left side"), draft("Right side")],
  light: draft("Same light"),
  chart: draft("Your chart"),
  pause: draft("Pause"),
  play: draft("Play"),
  illustration: draft("Illustration"),
  figure: [
    draft(
      "A soft light and a camera frame with a grid line up on a face, straight on.",
    ),
    draft(
      "The same light and frame photograph the face from the front, then the left and right sides.",
    ),
    draft(
      "The three photos slide into a folder marked Your chart, which locks.",
    ),
  ],
};

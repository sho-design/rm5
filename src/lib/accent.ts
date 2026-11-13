/**
 * Text colour for a division accent that comes from content (a hex such as "#3D9B78").
 * The accents are fill colours; as small text several fall below 4.5:1, so text uses the same hue mixed toward
 * the primary text colour (ink in light mode, white in dark, ink in high contrast).
 */
export function accentText(c: string): string {
  return `color-mix(in srgb, ${c} 70%, var(--text-primary))`;
}

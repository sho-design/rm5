/** The line drawings shared by the aesthetics face map and the treatment menu's "Where would you like to start?". */
export type Face = "female" | "male";

/** Calm line drawing of a female face. Purely decorative. */
export function FemaleFace() {
  return (
    <g fill="none" stroke="var(--rm-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Neck and shoulders sit behind the face, so the neck runs up into the jaw with no gap. */}
      <path d="M116 262c2 34 4 66 2 92M184 262c-2 34-4 66-2 92" />
      <path d="M118 352c-22 6-42 14-58 26M182 352c22 6 42 14 58 26" />
      <path d="M150 22c-58 0-92 40-92 104 0 34 6 66 20 96 16 34 42 66 72 66s56-32 72-66c14-30 20-62 20-96 0-64-34-104-92-104z" fill="var(--rm-paper)" />
      <path d="M62 112c8-46 44-74 88-74s80 28 88 74c-22-24-52-36-88-36s-66 12-88 36z" fill="var(--rm-lilac)" fillOpacity=".55" stroke="none" />
      <path d="M62 112c8-46 44-74 88-74s80 28 88 74" />
      <path d="M58 150c-12-2-18 10-14 26 4 14 12 22 22 20M242 150c12-2 18 10 14 26-4 14-12 22-22 20" />
      <path d="M94 142c10-8 26-8 36-2M170 140c10-6 26-6 36 2" />
      <path d="M98 166c8-6 22-6 30 0M172 166c8-6 22-6 30 0" />
      {/* Nose: a soft bridge on one side, rounded nostril wings and the base between them. */}
      <path d="M145 158c1 16 0 29-7 39c-4 6-3 11 3 11M165 199c4 4 3 9-3 9M144 210c4 1.5 8 1.5 12 0" strokeWidth="2" />
      <path d="M124 246c10 8 42 8 52 0M124 246c14-6 38-6 52 0" />
    </g>
  );
}

/** Calm line drawing of a male face: squarer jaw, short crop, heavier brows, wider neck and shoulders. Decorative. */
export function MaleFace() {
  return (
    <g fill="none" stroke="var(--rm-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M110 258c2 36 4 66 2 96M190 258c-2 36-4 66-2 96" />
      <path d="M112 352c-26 6-50 14-70 26M188 352c26 6 50 14 70 26" />
      <path d="M150 26c-56 0-88 38-88 98 0 36 4 66 12 94 8 28 22 50 40 62 10 7 22 10 36 10s26-3 36-10c18-12 32-34 40-62 8-28 12-58 12-94 0-60-32-98-88-98z" fill="var(--rm-paper)" />
      <path d="M64 116c0-58 36-92 86-92s86 34 86 92c-10-22-22-34-34-38-16 8-34 12-52 12s-36-4-52-12c-12 4-24 16-34 38z" fill="var(--rm-lilac)" fillOpacity=".55" />
      <path d="M62 150c-12-2-18 10-14 26 4 14 12 22 22 20M238 150c12-2 18 10 14 26-4 14-12 22-22 20" />
      <path d="M92 140c12-6 28-6 38-1M170 139c10-5 26-5 38 1" strokeWidth="4.2" />
      <path d="M98 166c8-6 22-6 30 0M172 166c8-6 22-6 30 0" />
      {/* Nose: a soft bridge on one side, rounded nostril wings and the base between them. */}
      <path d="M145 158c1 17 0 31-7 41c-4 6-3 12 3 12M165 201c4 4 3 10-3 10M144 213c4 1.5 8 1.5 12 0" strokeWidth="2.2" />
      <path d="M126 248c12 4 36 4 48 0" />
    </g>
  );
}


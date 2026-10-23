import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Favicon: the wordmark's "R" tile (Fraunces on ink). No other logo exists; do not draw one. */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const fraunces = await readFile(path.join(process.cwd(), "src/fonts/static/Fraunces-Medium.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F1F2E", borderRadius: 18, color: "#FFFFFF", fontFamily: "Fraunces", fontSize: 44, paddingBottom: 4 }}>R</div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: fraunces, weight: 500, style: "normal" }] },
  );
}

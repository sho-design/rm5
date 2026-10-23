import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Home-screen icon: the "R" tile, square (iOS rounds the corners itself). */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fraunces = await readFile(path.join(process.cwd(), "src/fonts/static/Fraunces-Medium.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F1F2E", color: "#FFFFFF", fontFamily: "Fraunces", fontSize: 120, paddingBottom: 10 }}>R</div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: fraunces, weight: 500, style: "normal" }] },
  );
}

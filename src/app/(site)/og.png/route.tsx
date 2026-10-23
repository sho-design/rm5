import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Default social share image at a fixed address, /og.png (Facebook,
 * LinkedIn, iMessage, X). Every page's metadata points here unless Page SEO
 * in the admin sets its own image. Brand colours from tokens/colors.css,
 * Fraunces headline, Instrument Sans body. Built once at deploy.
 */
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export async function GET() {
  // Static instances: the image renderer cannot read variable fonts.
  const dir = path.join(process.cwd(), "src/fonts/static");
  const [fraunces, regular, semibold] = await Promise.all(["Fraunces-Regular.ttf", "InstrumentSans-Regular.ttf", "InstrumentSans-SemiBold.ttf"].map((f) => readFile(path.join(dir, f))));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0F1F2E", color: "#FFFFFF", padding: "72px 80px", fontFamily: "Instrument Sans" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#FFFFFF", color: "#0F1F2E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Fraunces", fontSize: 40, paddingBottom: 4 }}>R</div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.6 }}>Restoration Medical</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#FFD84D", color: "#0F1F2E", borderRadius: 999, padding: "10px 22px", fontSize: 24, fontWeight: 600 }}>Thornhill, Ontario</div>
          <div style={{ fontFamily: "Fraunces", fontSize: 76, lineHeight: 1.02, letterSpacing: -2, maxWidth: 960 }}>Family medicine, pain care, infusion, aesthetics and rehab.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(255,255,255,.72)" }}>
          <span>Physician-led. Care in English and Tiếng Việt.</span>
          <span>Refined by Medicine.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 400, style: "normal" },
        { name: "Instrument Sans", data: regular, weight: 400, style: "normal" },
        { name: "Instrument Sans", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}

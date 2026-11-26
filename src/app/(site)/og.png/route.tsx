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
  const [fraunces, frauncesMedium, regular, semibold] = await Promise.all(["Fraunces-Regular.ttf", "Fraunces-Medium.ttf", "InstrumentSans-Regular.ttf", "InstrumentSans-SemiBold.ttf"].map((f) => readFile(path.join(dir, f))));
  // The RM monogram from the clinic's logo artwork (public/logos), with the name set in Fraunces beside it.
  const mark = `data:image/png;base64,${(await readFile(path.join(process.cwd(), "public/logos/rm-mark.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0F1F2E", color: "#FFFFFF", padding: "72px 80px", fontFamily: "Instrument Sans" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={64} height={64} alt="" />
          <div style={{ fontFamily: "Fraunces", fontWeight: 500, fontSize: 42, letterSpacing: -0.8 }}>Restoration Medical</div>
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
        { name: "Fraunces", data: frauncesMedium, weight: 500, style: "normal" },
        { name: "Instrument Sans", data: regular, weight: 400, style: "normal" },
        { name: "Instrument Sans", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}

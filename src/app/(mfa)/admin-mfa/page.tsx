import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import QRCode from "qrcode";
import config from "@payload-config";
import { MFA_COOKIE, mfaEnabled, tokenClaims, verifyMfa } from "@/lib/mfa-cookie";
import { generateSecret, openSecret, otpauthUri, sealSecret } from "@/payload/totp";
import { CodeForm } from "./CodeForm";

export const dynamic = "force-dynamic";

const card: React.CSSProperties = { width: "min(440px, calc(100vw - 32px))", background: "#fff", border: "1px solid #e2e9f0", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", gap: 16, boxSizing: "border-box" };

/**
 * Two-factor step. Signed out: back to the login. Already verified for this
 * sign-in: on to the admin. First time: show the QR code (secret held
 * encrypted as "pending" until the first correct code). Otherwise: ask for
 * the six-digit code.
 */
export default async function MfaPage() {
  if (!mfaEnabled()) redirect("/admin");
  const payload = await getPayload({ config });
  const h = await headers();
  const { user } = await payload.auth({ headers: h });
  if (!user) redirect("/admin/login");

  const jar = await cookies();
  const claims = tokenClaims(jar.get("payload-token")?.value);
  if (claims && (await verifyMfa(jar.get(MFA_COOKIE)?.value, claims.id, claims.sid))) redirect("/admin");

  const full = await payload.findByID({ collection: "users", id: user.id, overrideAccess: true, depth: 0 });
  let qr: string | null = null;
  let manual: string | null = null;
  if (!full.twoFactorEnabled) {
    let secret = full.totpPending ? openSecret(full.totpPending) : null;
    if (!secret) {
      secret = generateSecret();
      await payload.update({ collection: "users", id: user.id, data: { totpPending: sealSecret(secret) }, overrideAccess: true, context: { resettingTwoFactor: true } });
    }
    qr = await QRCode.toString(otpauthUri(secret, full.email), { type: "svg", margin: 1, width: 200, errorCorrectionLevel: "M" });
    manual = secret.match(/.{1,4}/g)?.join(" ") ?? secret;
  }

  return (
    <main style={card}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#5a6b7b" }}>Restoration Medical admin</span>
      {qr ? (
        <>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1.15 }}>Set up two-factor sign-in</h1>
          <p style={{ margin: 0, color: "#3d4f60" }}>Scan this code with an authenticator app on your phone, such as Google Authenticator, Microsoft Authenticator or 1Password. Then enter the six-digit code it shows.</p>
          <div style={{ alignSelf: "center", width: 200, height: 200 }} dangerouslySetInnerHTML={{ __html: qr }} />
          <p style={{ margin: 0, fontSize: 13, color: "#5a6b7b" }}>
            Cannot scan? Enter this key in the app: <code style={{ display: "block", marginTop: 4, fontSize: 15, letterSpacing: ".04em", color: "#0f1f2e", wordBreak: "break-all" }}>{manual}</code>
          </p>
        </>
      ) : (
        <>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1.15 }}>Enter your code</h1>
          <p style={{ margin: 0, color: "#3d4f60" }}>Open your authenticator app and enter the six-digit code for Restoration Medical.</p>
        </>
      )}
      <CodeForm email={full.email} />
      <p style={{ margin: 0, fontSize: 13, color: "#5a6b7b" }}>Lost your phone? Ask a clinic admin to reset two-factor on your account.</p>
    </main>
  );
}

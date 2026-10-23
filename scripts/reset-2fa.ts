/**
 * Emergency reset of one person's two-factor sign-in, for when the only
 * admin has lost their phone. Run with the production database URL:
 *
 *   DATABASE_URL=... PAYLOAD_SECRET=... npx tsx scripts/reset-2fa.ts person@clinic.ca
 *
 * They set up their authenticator again at next sign-in. In every other
 * case an admin ticks "Reset two-factor" on the account in the panel.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npx tsx scripts/reset-2fa.ts person@clinic.ca");
    process.exit(1);
  }
  const payload = await getPayload({ config });
  const found = await payload.find({ collection: "users", where: { email: { equals: email.toLowerCase() } }, limit: 1, overrideAccess: true });
  const user = found.docs[0];
  if (!user) {
    console.error(`No staff account for ${email}`);
    process.exit(1);
  }
  await payload.update({
    collection: "users",
    id: user.id,
    data: { twoFactorEnabled: false, resetTwoFactor: false, totpSecret: null, totpPending: null, totpLastStep: null, totpFailures: 0, totpLockedUntil: null },
    overrideAccess: true,
    context: { resettingTwoFactor: true },
  });
  payload.logger.info(`Two-factor reset for ${email}. They set it up again at next sign-in.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

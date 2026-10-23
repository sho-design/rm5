/**
 * Time-based one-time passwords (RFC 6238: HMAC-SHA1, 30-second steps, six
 * digits), the scheme every authenticator app uses. Secrets are stored
 * encrypted (AES-256-GCM, key derived from PAYLOAD_SECRET) so a database
 * dump alone cannot generate codes. Server-only (node:crypto).
 */
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const STEP_MS = 30_000;

export function base32Encode(buf: Buffer): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(input: string): Buffer {
  const clean = input.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    value = (value << 5) | ALPHABET.indexOf(ch);
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

/** A new 160-bit secret, base32 (what the authenticator app stores). */
export function generateSecret(): string {
  return base32Encode(randomBytes(20));
}

export function hotp(key: Buffer, counter: number, digits = 6): string {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(counter));
  const h = createHmac("sha1", key).update(msg).digest();
  const offset = (h[h.length - 1] ?? 0) & 0xf;
  const bin = h.readUInt32BE(offset) & 0x7fffffff;
  return String(bin % 10 ** digits).padStart(digits, "0");
}

/**
 * Check a six-digit code against the secret, allowing one step of clock
 * drift either way. Returns the matching time step (store it to refuse
 * replays), or null.
 */
export function verifyTotp(secret: string, code: string, now = Date.now(), window = 1): number | null {
  const c = code.replace(/\s+/g, "");
  if (!/^\d{6}$/.test(c)) return null;
  const key = base32Decode(secret);
  const t = Math.floor(now / STEP_MS);
  let match: number | null = null;
  for (let w = -window; w <= window; w++) {
    // Compare every candidate so timing does not reveal which step matched.
    if (timingSafeEqual(Buffer.from(hotp(key, t + w)), Buffer.from(c)) && match === null) match = t + w;
  }
  return match;
}

export function otpauthUri(secret: string, account: string, issuer = "Restoration Medical"): string {
  const label = encodeURIComponent(`${issuer}:${account}`);
  return `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
}

function key(): Buffer {
  const secret = process.env.PAYLOAD_SECRET;
  if (!secret) throw new Error("PAYLOAD_SECRET is required for two-factor secrets");
  return createHash("sha256").update(`rm-totp:${secret}`).digest();
}

/** Encrypt a TOTP secret for storage: base64(iv | tag | ciphertext). */
export function sealSecret(plain: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(), iv);
  const ct = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), ct]).toString("base64");
}

export function openSecret(sealed: string): string | null {
  try {
    const raw = Buffer.from(sealed, "base64");
    const d = createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    d.setAuthTag(raw.subarray(12, 28));
    return Buffer.concat([d.update(raw.subarray(28)), d.final()]).toString("utf8");
  } catch {
    return null;
  }
}

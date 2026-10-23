"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const btn: React.CSSProperties = { height: 48, borderRadius: 999, border: 0, background: "#0f1f2e", color: "#fff", font: "inherit", fontWeight: 600, cursor: "pointer" };

/** Six-digit code entry. Posts to /admin-mfa/verify, then continues to the admin panel. */
export function CodeForm({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/admin-mfa/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }), cache: "no-store" });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        window.location.assign("/admin");
        return;
      }
      setError(json.error ?? "That code did not work. Try the newest code in your app.");
      setCode("");
    } catch {
      setError("That did not go through. Try again.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label htmlFor="mfa-code" style={{ fontSize: 13, fontWeight: 600 }}>
        Six-digit code for {email}
      </label>
      <input
        id="mfa-code"
        name="code"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9 ]{6,7}"
        maxLength={7}
        required
        autoFocus
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/[^0-9 ]/g, ""))}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "mfa-error" : undefined}
        style={{ height: 52, borderRadius: 14, border: "1px solid #c9d5e1", padding: "0 16px", fontSize: 22, letterSpacing: ".3em", textAlign: "center", font: "inherit" }}
      />
      {error ? (
        <p id="mfa-error" role="alert" style={{ margin: 0, color: "#b3261e", fontSize: 14 }}>
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={busy} style={{ ...btn, opacity: busy ? 0.6 : 1 }}>
        {busy ? "Checking" : "Continue"}
      </button>
      <Link href="/admin/logout" prefetch={false} style={{ textAlign: "center", fontSize: 14, color: "#2f7fd1" }}>
        Sign out
      </Link>
    </form>
  );
}

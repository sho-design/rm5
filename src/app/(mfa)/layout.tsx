import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Two-factor sign-in | Restoration Medical admin",
  robots: { index: false, follow: false },
};

/** Minimal root layout for the two-factor step between Payload's login and the admin panel. */
export default function MfaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#f5f8fb", color: "#0f1f2e", font: "16px/1.55 system-ui, -apple-system, Segoe UI, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

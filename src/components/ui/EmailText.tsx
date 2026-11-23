/**
 * An email address that wraps only at the @ or before the final dot, never mid-word (round 33: "contact
 * @restorationme dical.ca" on phones and "restorationmedic al.ca" in the footer).
 */
export function EmailText({ email }: { email: string }) {
  const [user, domain = ""] = email.split("@");
  const dot = domain.lastIndexOf(".");
  return (
    <>
      {user}
      <wbr />@{dot > 0 ? domain.slice(0, dot) : domain}
      {dot > 0 ? (
        <>
          <wbr />
          {domain.slice(dot)}
        </>
      ) : null}
    </>
  );
}

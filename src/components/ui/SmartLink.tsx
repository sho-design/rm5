import Link from "next/link";
import type { ComponentProps } from "react";
import { href as resolve } from "@/lib/routes";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  /** A prototype page key ("kids"), an internal path ("/book") or an external URL. */
  to: string;
};

/**
 * Link that accepts a prototype page key, internal path or external URL.
 * External links open in a new tab with rel="noopener".
 */
export function SmartLink({ to, children, ...rest }: Props) {
  const url = resolve(to);
  const isExternal = /^(https?:|mailto:|tel:)/.test(url);
  if (isExternal) {
    const external = url.startsWith("http");
    return (
      <a href={url} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={url} {...rest}>
      {children}
    </Link>
  );
}

"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

/** Routes where no analytics or session replay may load. */
const excluded = [routes.book, routes.register, routes.contact, routes.referrals, routes.careers];

/**
 * GA4 via Google Tag Manager with Consent Mode v2 defaults (denied until the
 * consent banner grants). Loads only when NEXT_PUBLIC_GTM_ID is set and the
 * current route is not a form route.
 */
export function Analytics() {
  const pathname = usePathname();
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id || excluded.some((r) => pathname.startsWith(r))) return null;
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
      </Script>
    </>
  );
}

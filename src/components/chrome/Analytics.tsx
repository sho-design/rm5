"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { routes } from "@/lib/routes";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";

/** Routes where analytics never runs: every page with a form that can carry health information. */
export const analyticsExcluded = [routes.book, routes.register, routes.contact, routes.referrals, routes.careers, routes.rx];
const isExcluded = (path: string) => analyticsExcluded.some((r) => path === r || path.startsWith(`${r}/`));

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/**
 * Google Tag Manager or Google Analytics 4, loaded only after the visitor
 * accepts analytics in the cookie banner, and never on a form page.
 * Consent Mode v2: advertising storage is always denied (no ads on a health
 * site); analytics storage follows the visitor's choice and is switched off
 * again whenever they move onto a form page. GA4 page views are sent here so
 * form pages are never recorded.
 */
export function Analytics({ gtmId, gaId }: { gtmId?: string; gaId?: string }) {
  const pathname = usePathname() ?? "/";
  const [consent, setConsent] = useState<Consent>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    const on = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, on);
    return () => window.removeEventListener(CONSENT_EVENT, on);
  }, []);

  const excluded = isExcluded(pathname);
  const allowed = consent === "granted" && !excluded;

  // Load once, the first time analytics is allowed on a non-form page.
  useEffect(() => {
    if (allowed && !loaded) setLoaded(true);
  }, [allowed, loaded]);

  // After loading: follow consent and the form-page rule, and send GA4 page views ourselves.
  useEffect(() => {
    if (!loaded || !window.gtag) return;
    window.gtag("consent", "update", { analytics_storage: allowed ? "granted" : "denied" });
    if (allowed && gaId) window.gtag("event", "page_view", { page_path: pathname, page_location: window.location.origin + pathname });
  }, [loaded, allowed, pathname, gaId]);

  if (!(gtmId || gaId) || !loaded) return null;

  const base = `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'${allowed ? "granted" : "denied"}'});gtag('set','ads_data_redaction',true);`;
  return gtmId ? (
    <Script id="gtm" strategy="afterInteractive">
      {`${base}(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
    </Script>
  ) : (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {`${base}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});gtag('event','page_view',{page_path:location.pathname,page_location:location.origin+location.pathname});`}
      </Script>
      <Script id="ga4" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId ?? "")}`} />
    </>
  );
}

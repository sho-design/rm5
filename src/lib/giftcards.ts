/**
 * Square eGift Cards. The clinic's hosted Square gift card pages sell, email and look up the cards, so payment
 * details never pass through this site. The clinic's own pages are the defaults; NEXT_PUBLIC_SQUARE_GIFT_URL and
 * NEXT_PUBLIC_SQUARE_GIFT_BALANCE_URL override them. To stop selling online, remove the defaults below and the gift
 * card page goes back to "call the front desk".
 */
const SQUARE_HOSTS = /^https:\/\/(?:[a-z0-9-]+\.)*(?:squareup\.com|square\.link|square\.site|squareup\.ca)\/[^\s"'<>]*$/i;
const ok = (v?: string | null) => (v && SQUARE_HOSTS.test(v) ? v : null);

/** Clinic's Square eGift Card pages (Nov 2026). */
const CLINIC_ORDER = "https://app.squareup.com/gift/MLDR38SA366F5/order";
const CLINIC_BALANCE = "https://app.squareup.com/gift/MLDR38SA366F5/check-balance";

// Written out in full so Next.js inlines them at build time.
/** Buy an eGift card, or null when there is no Square page. */
export const squareGiftUrl: string | null = ok(process.env.NEXT_PUBLIC_SQUARE_GIFT_URL) ?? ok(CLINIC_ORDER);
/** Check a gift card balance, or null. */
export const squareGiftBalanceUrl: string | null = ok(process.env.NEXT_PUBLIC_SQUARE_GIFT_BALANCE_URL) ?? ok(CLINIC_BALANCE);

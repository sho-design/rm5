/**
 * Square eGift Cards. The clinic's hosted Square gift card page sells and emails the cards, so payment details
 * never pass through this site. Set NEXT_PUBLIC_SQUARE_GIFT_URL to that page, for example
 * https://squareup.com/gift/XXXXXXXX/order or a square.link short link. Unset, the gift card page asks people to
 * call or visit the front desk instead.
 */
const SQUARE_HOSTS = /^https:\/\/(?:[a-z0-9-]+\.)*(?:squareup\.com|square\.link|square\.site|squareup\.ca)\/[^\s"'<>]*$/i;

// Written out in full so Next.js inlines it at build time.
const raw = process.env.NEXT_PUBLIC_SQUARE_GIFT_URL;

/** The Square eGift Card page, or null when it is not set (or is not a Square address). */
export const squareGiftUrl: string | null = raw && SQUARE_HOSTS.test(raw) ? raw : null;

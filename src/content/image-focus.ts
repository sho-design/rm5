/**
 * Where to anchor each photo when a frame crops it (CSS object-position): x is the centre of the people, y is the
 * top of the highest head, so heads are never cut off at the top in wide or short frames. Set by eye from each
 * image (November 2026). Photos without people, and the team portraits, keep the default centre.
 */
export const imageFocus: Record<string, string> = {
  "hf_20260903_071606_44b313fa-3033-44bf-a024-17701e5927ec.webp": "40% 8%",
  "hf_20260909_210338_1f84abb8-ac77-4c13-9c48-3229a771d31d.webp": "40% 12%",
  "hf_20260909_211042_a7b5fb6e-1495-4937-b800-a600b041bfa1.webp": "50% 15%",
  "hf_20260909_211043_05a3377c-e39a-48b9-a370-cc57ac35b4ff.webp": "65% 12%",
  "hf_20260910_053343_a16fe24a-bef4-4a55-8c39-e33b4e4d46a5.webp": "57% 38%",
  "hf_20260910_054249_6d69b0c5-bf4a-409b-a4cc-f300008e4ff6.webp": "60% 10%",
  "hf_20260910_054249_827089e8-0c06-4cd4-8bf6-a5c62209099d.webp": "72% 28%",
  "hf_20260910_054249_92d534a6-fc85-47a1-b2d4-dfa0c042669f.webp": "55% 12%",
  "hf_20260910_054249_a518bfca-7f1e-4738-913f-636c0be7311a.webp": "62% 6%",
  "hf_20260910_054249_b106cbee-9ab4-4e8b-94f3-8de24911a742.webp": "50% 25%",
  "hf_20260910_054249_b8452288-39db-4136-a01b-83d24d05d61e.webp": "43% 42%",
  "hf_20260910_054249_bd7a3056-7a1d-4dbe-a847-bc8b6f8a47be.webp": "60% 10%",
  "hf_20260910_060105_0cb3ed00-0123-4bf6-9412-d03a4ea9b74b.webp": "35% 2%",
  "hf_20260910_060105_1363ae38-7a9d-4eea-bee9-380731ae86bf.webp": "50% 25%",
  "hf_20260910_060105_c154b387-2385-491a-ac68-dc6b9755e457.webp": "50% 38%",
  "hf_20260910_060106_5521c7a3-3ad2-47ac-aa52-1dc48b081adb.webp": "60% 28%",
  "hf_20260910_060106_6bb59618-c559-4e39-8d6f-7730e6ba007b.webp": "45% 58%",
  "hf_20260910_060106_9b258e31-bb6b-4f3d-9382-a799be178147.webp": "70% 12%",
  "hf_20260910_060106_c7475602-29ee-4141-a321-16e71b5c1059.webp": "40% 42%",
  "hf_20260910_060114_48022622-60ae-4334-b848-c5833f31d3bf.webp": "50% 38%",
  "hf_20260910_060114_b788a1d8-7536-4324-a8ef-ab33e2246cc4.webp": "30% 35%",
  "hf_20260910_060114_b8564f6d-ac50-4094-9446-7e43874aa6e0.webp": "60% 30%",
  "hf_20260910_060114_c23376f0-56e3-45ee-b544-365dcbe6b173.webp": "42% 18%",
  "hf_20260910_060501_0a575c64-3c00-4281-b6fa-284409f91a6b.webp": "50% 30%",
  "hf_20260910_073149_153c186f-0341-4d36-8958-e6247e19e5a6.webp": "50% 48%",
  "hf_20260911_055045_19619b82-9710-4027-8657-aecaea97a565.webp": "50% 2%",
  "hf_20260911_055045_591c23b8-3c47-4870-8094-5c450ffd40e4.webp": "50% 4%",
  "hf_20260911_055045_a31ae451-66b1-4b04-ba30-f12fb98b233a.webp": "40% 5%",
  "hf_20260911_055045_a6946224-757a-40fc-95f9-7771e3565307.webp": "50% 6%",
  "hf_20260911_055046_8500143f-3de6-40a8-967d-0d7eef0f24fe.webp": "55% 6%",
  "hf_20260911_055325_6dbe2234-4d5c-4269-a3d5-594369bb3cf3.webp": "50% 8%",
  "hf_20260911_055325_a52ad731-f02d-4327-9bce-9b5e8afcade3.webp": "50% 4%",
  "hf_20260912_074608_821f2bd7-99fa-4c0a-91f9-20c88e407960.webp": "37% 2%",
  "hf_20261113_090006_6f8056dd-b5f1-4008-9cf5-37a78bbbd01d.webp": "45% 12%",
  "hf_20261116_074836_f7f71ecb-4cbc-4e2c-a4c4-8618c2ee5362.webp": "50% 4%",
  "hf_20261117_225508_51719d65-137e-4123-9b0d-76f72f032fac.webp": "40% 10%",
  "hf_20261117_225513_98ec25d3-d09f-4c50-9047-75f7cbf353c9.webp": "50% 8%",
  "hf_20261118_053212_68b9f5f3-c8a2-4b6a-be14-f5edee048585.webp": "55% 4%",
  "hf_20261118_053214_12b943a2-a29c-4328-9177-789597d2e3fe.webp": "45% 20%",
  "hf_20261118_053217_93242b62-4ace-4f89-8feb-7c087667b127.webp": "40% 8%",
  "hf_20261118_053219_2797b3f1-efe8-45a4-832c-4afd2e422d27.webp": "40% 5%",
};

/** object-position for a photo, by file name; undefined keeps the centre. */
export function focusOf(src: string): string | undefined {
  return imageFocus[src.split("/").pop() ?? ""];
}

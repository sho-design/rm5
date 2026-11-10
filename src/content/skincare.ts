import { draft } from "./review";

/*
 * SkinCeuticals retail products the clinic sells, from the SkinCeuticals price list effective July 2, 2026. Prices are
 * the suggested retail price (SRP), which the clinic confirmed it charges (2026-11-10); HST is extra. Professional
 * sizes (the "PRO" section) are for in-clinic use and are not listed. Net (wholesale) prices are never shown.
 *
 * Descriptions are plain statements of what each product is and who it is usually for, written by us. They avoid the
 * brand's results claims. All are draft until the clinic checks them against what it stocks. Where we were not sure
 * what a product is, `d` is left out and the card asks people to ask a nurse.
 *
 * Photos: drop a square WebP named after the product id into public/images/skincare/ (for example
 * public/images/skincare/ce-ferulic.webp) and the page picks it up on the next build. Use the official images from
 * the SkinCeuticals retailer asset portal or the clinic's own photos.
 */

export type SkinGroup = "cleanse" | "prevent" | "correct" | "moisturize" | "protect";
export type SkinShape = "dropper" | "tube" | "jar" | "bottle" | "pump";
/** Skin types a product usually suits; "all" shows under every filter, and an empty list only under All. */
export type SkinType = "all" | "oily" | "dry" | "sensitive" | "acne" | "mature";
export type SkinProduct = { id: string; name: string; size: string; srp: number; group: SkinGroup; shape: SkinShape; skin: SkinType[]; d?: string };

/** The skin type filter on the skincare page, in order; the first shows everything. */
export const skinFilters: { k: "any" | Exclude<SkinType, "all">; t: string }[] = [
  { k: "any", t: draft("All") },
  { k: "oily", t: draft("Oily") },
  { k: "dry", t: draft("Dry") },
  { k: "sensitive", t: draft("Sensitive or red") },
  { k: "acne", t: draft("Acne-prone") },
  { k: "mature", t: draft("Mature") },
];

export const skinGroups: Record<SkinGroup, { t: string; d: string }> = {
  cleanse: { t: draft("Cleanse and tone"), d: draft("Morning and night, before anything else.") },
  prevent: { t: draft("Prevent"), d: draft("Antioxidant serums, usually in the morning under sunscreen.") },
  correct: { t: draft("Correct"), d: draft("Treatments for a specific concern. Your nurse helps you choose and when to use them.") },
  moisturize: { t: draft("Moisturize"), d: draft("Light to rich, chosen for your skin type.") },
  protect: { t: draft("Protect"), d: draft("Broad-spectrum SPF 50 for every day.") },
};

export const skinProducts: SkinProduct[] = [
  // Cleanse and tone
  { id: "simply-clean", skin: ["oily"], name: "Simply Clean", size: "200 ml", srp: 65, group: "cleanse", shape: "pump", d: draft("A gel cleanser with hydroxy acids for combination and oily skin.") },
  { id: "gentle-cleanser", skin: ["dry", "sensitive", "mature"], name: "Gentle Cleanser", size: "190 ml", srp: 65, group: "cleanse", shape: "pump", d: draft("A creamy, soap-free cleanser for dry and sensitive skin.") },
  { id: "lha-cleansing-gel", skin: ["oily", "acne"], name: "LHA Cleansing Gel", size: "240 ml", srp: 68, group: "cleanse", shape: "pump", d: draft("A gel cleanser with LHA, salicylic and glycolic acids for oily and acne-prone skin.") },
  { id: "soothing-cleanser", skin: ["sensitive", "dry"], name: "Soothing Cleanser", size: "150 ml", srp: 65, group: "cleanse", shape: "tube", d: draft("A cream cleanser for dry, sensitive or easily irritated skin.") },
  { id: "microexfoliant", skin: ["all"], name: "Microexfoliant", size: "150 ml", srp: 62, group: "cleanse", shape: "tube", d: draft("A gentle exfoliating cleanser with fine particles.") },
  { id: "equalizing-toner", skin: ["all"], name: "Equalizing Toner", size: "200 ml", srp: 65, group: "cleanse", shape: "bottle", d: draft("An alcohol-free toner with botanical extracts for most skin types.") },
  { id: "lha-toner", skin: ["oily", "acne"], name: "LHA Toner", size: "200 ml", srp: 65, group: "cleanse", shape: "bottle", d: draft("A toner with LHA and glycolic acid for oily and acne-prone skin.") },
  // Prevent
  { id: "ce-ferulic", skin: ["dry", "mature"], name: "CE Ferulic", size: "30 ml", srp: 230, group: "prevent", shape: "dropper", d: draft("A vitamin C serum with vitamin E and ferulic acid, for normal to dry skin.") },
  { id: "phloretin-cf", skin: ["oily"], name: "Phloretin CF", size: "30 ml", srp: 230, group: "prevent", shape: "dropper", d: draft("A vitamin C serum with phloretin and ferulic acid, for normal to oily skin.") },
  { id: "silymarin-cf", skin: ["oily", "acne"], name: "Silymarin CF", size: "30 ml", srp: 230, group: "prevent", shape: "dropper", d: draft("A vitamin C serum with silymarin and salicylic acid, for oily and acne-prone skin.") },
  { id: "serum-10-aox", skin: ["sensitive"], name: "Serum 10 AOX+", size: "30 ml", srp: 135, group: "prevent", shape: "dropper", d: draft("A 10% vitamin C serum for sensitive skin or a first vitamin C.") },
  { id: "resveratrol-be", skin: ["mature"], name: "Resveratrol B E", size: "30 ml", srp: 230, group: "prevent", shape: "dropper", d: draft("An antioxidant serum with resveratrol and baicalin, used at night.") },
  { id: "aox-eye", skin: ["all"], name: "AOX+ Eye", size: "15 ml", srp: 135, group: "prevent", shape: "tube", d: draft("An antioxidant gel for the skin around the eyes.") },
  // Correct
  { id: "tnxa-shot", skin: ["all"], name: "TNXA-Shot Discoloration Defense", size: "30 ml", srp: 170, group: "correct", shape: "dropper", d: draft("A serum with tranexamic acid for uneven skin tone and dark spots.") },
  { id: "ha-intensifier", skin: ["all"], name: "H.A. Intensifier Multi-Glycan", size: "30 ml", srp: 175, group: "correct", shape: "dropper", d: draft("A hyaluronic acid serum for hydration.") },
  { id: "retinol-03", skin: ["mature"], name: "Retinol 0.3", size: "30 ml", srp: 110, group: "correct", shape: "tube", d: draft("A 0.3% retinol cream for people new to retinol. Used at night.") },
  { id: "retinol-05", skin: ["mature"], name: "Retinol 0.5", size: "30 ml", srp: 120, group: "correct", shape: "tube", d: draft("A 0.5% retinol cream for people who already use retinol.") },
  { id: "retinol-10", skin: ["mature"], name: "Retinol 1.0", size: "30 ml", srp: 130, group: "correct", shape: "tube", d: draft("A 1.0% retinol cream for experienced retinol users.") },
  { id: "lha-serum", skin: ["acne", "oily"], name: "LHA Serum", size: "30 ml", srp: 145, group: "correct", shape: "dropper", d: draft("A serum with LHA, salicylic and glycolic acids for acne-prone skin.") },
  { id: "phyto-corrective-gel", skin: ["sensitive"], name: "Phyto Corrective Gel", size: "30 ml", srp: 115, group: "correct", shape: "dropper", d: draft("A light botanical gel for redness-prone and sensitive skin.") },
  { id: "phyto-a", skin: ["oily", "sensitive"], name: "Phyto A+", size: "30 ml", srp: 155, group: "correct", shape: "pump", d: draft("A light moisturizer with azelaic acid for oily, redness-prone skin.") },
  { id: "phyto-mist", skin: ["sensitive"], name: "Phyto Mist", size: "50 ml", srp: 100, group: "correct", shape: "bottle", d: draft("A facial mist with botanical extracts for sensitive skin.") },
  { id: "phyto-mask", skin: ["sensitive"], name: "Phyto Mask", size: "60 ml", srp: 100, group: "correct", shape: "tube", d: draft("A cooling botanical mask for skin that feels irritated or flushed.") },
  { id: "clarifying-clay-masque", skin: ["oily", "acne"], name: "Clarifying Clay Masque", size: "60 ml", srp: 90, group: "correct", shape: "tube", d: draft("A clay mask with hydroxy acids for oily skin and congested pores.") },
  { id: "epidermal-repair", skin: ["sensitive", "dry"], name: "Epidermal Repair", size: "40 ml", srp: 105, group: "correct", shape: "bottle", d: draft("A calming moisturizer for sensitive skin, often used after a procedure.") },
  { id: "retexturing-activator", skin: ["dry"], name: "Retexturing Activator", size: "30 ml", srp: 125, group: "correct", shape: "dropper", d: draft("A hydrating serum for skin that feels rough.") },
  { id: "cell-cycle-catalyst", skin: ["all"], name: "Cell Cycle Catalyst", size: "30 ml", srp: 145, group: "correct", shape: "dropper", d: draft("A resurfacing serum for dull-looking skin.") },
  { id: "metacell-b3", skin: ["mature"], name: "Metacell B3", size: "50 ml", srp: 160, group: "correct", shape: "pump", d: draft("A daily moisturizer with niacinamide.") },
  { id: "p-tiox", skin: ["mature"], name: "P-Tiox", size: "30 ml", srp: 200, group: "correct", shape: "dropper", d: draft("A peptide serum for lines from facial expressions.") },
  { id: "p-tiox-cream", skin: ["mature", "dry"], name: "P-Tiox Cream", size: "48 ml", srp: 225, group: "correct", shape: "jar", d: draft("The cream version of P-Tiox, for drier skin.") },
  { id: "triple-lipid-restore", skin: ["dry", "mature"], name: "Triple Lipid Restore", size: "50 ml", srp: 195, group: "correct", shape: "jar", d: draft("A rich cream with ceramides, cholesterol and fatty acids for dry, mature skin.") },
  { id: "advanced-rgn-6", skin: [], name: "Advanced RGN-6", size: "50 ml", srp: 255, group: "correct", shape: "jar" },
  { id: "advanced-sili-gel", skin: [], name: "Advanced Sili-gel", size: "30 ml", srp: 150, group: "correct", shape: "tube" },
  { id: "age-interrupter-advanced", skin: ["mature", "dry"], name: "A.G.E. Interrupter Advanced", size: "48 ml", srp: 240, group: "correct", shape: "jar", d: draft("A rich cream for mature skin.") },
  { id: "age-ultra-serum", skin: [], name: "A.G.E. Ultra Serum", size: "30 ml", srp: 215, group: "correct", shape: "dropper" },
  { id: "age-advanced-eye", skin: ["mature"], name: "A.G.E. Advanced Eye", size: "15 ml", srp: 155, group: "correct", shape: "jar", d: draft("An eye cream for mature skin around the eyes.") },
  { id: "eye-balm", skin: ["dry"], name: "Eye Balm", size: "15 g", srp: 115, group: "correct", shape: "jar", d: draft("A rich eye cream for dry skin around the eyes.") },
  { id: "tripeptide-r-neck", skin: ["mature"], name: "Tripeptide-R Neck", size: "50 ml", srp: 175, group: "correct", shape: "jar", d: draft("A cream for the neck and chest.") },
  { id: "antioxidant-lip-repair", skin: ["all"], name: "Antioxidant Lip Repair", size: "10 ml", srp: 65, group: "correct", shape: "tube", d: draft("An antioxidant treatment for dry lips.") },
  // Moisturize
  { id: "emollience", skin: ["dry"], name: "Emollience", size: "60 ml", srp: 110, group: "moisturize", shape: "tube", d: draft("A moisturizer for normal to dry skin.") },
  { id: "daily-moisture", skin: ["oily"], name: "Daily Moisture", size: "60 ml", srp: 110, group: "moisturize", shape: "tube", d: draft("A light, oil-free moisturizer for normal to oily skin.") },
  { id: "hydrating-b5-gel", skin: ["all"], name: "Hydrating B5 Gel", size: "30 ml", srp: 125, group: "moisturize", shape: "dropper", d: draft("An oil-free gel with hyaluronic acid and vitamin B5.") },
  { id: "hydrating-b5-masque", skin: ["all"], name: "Hydrating B5 Masque", size: "75 ml", srp: 90, group: "moisturize", shape: "tube", d: draft("A hydrating gel mask with vitamin B5.") },
  // Protect
  { id: "physical-fusion", skin: ["all"], name: "Physical Fusion UV Defense SPF 50", size: "50 ml", srp: 68, group: "protect", shape: "tube", d: draft("A tinted mineral sunscreen for daily use.") },
  { id: "sheer-physical", skin: ["oily"], name: "Sheer Physical UV Defense SPF 50", size: "50 ml", srp: 68, group: "protect", shape: "tube", d: draft("An untinted mineral sunscreen with a matte finish.") },
  { id: "clear-daily-soothing", skin: ["sensitive"], name: "Clear Daily Soothing UV Defense SPF 50", size: "30 ml", srp: 65, group: "protect", shape: "tube", d: draft("A light sunscreen for sensitive and redness-prone skin.") },
];

export const skinProduct = (id: string): SkinProduct => {
  const p = skinProducts.find((x) => x.id === id);
  if (!p) throw new Error(`skincare.ts: unknown product ${id}`);
  return p;
};

export const skincareCopy = {
  eyebrow: draft("Skincare we carry"),
  title: draft("SkinCeuticals, chosen with you."),
  lead: draft(
    "These are the SkinCeuticals products we sell at the clinic. Your nurse can help you pick what suits your skin and your treatment plan. Prices are SkinCeuticals suggested retail, HST extra.",
  ),
  buyTitle: draft("How to buy"),
  buy: draft("Ask at any visit, or call us to check what is in stock. We do not sell online."),
  noDesc: draft("Ask our nurses about this product."),
  inRegimen: draft("In the regimen"),
  regimensLink: draft("See the regimens"),
  jump: draft("Jump to"),
  filterLabel: draft("Skin type"),
  filterNote: draft("A starting point. Your nurse helps you choose for your skin."),
  showing: (n: number, type: string) => draft(`${n} products for ${type.toLowerCase()} skin`),
  showingAll: (n: number) => draft(`All ${n} products`),
  note: draft("We sell these products and earn from their sale. Buying them is never a condition of treatment. Stock can vary, so call before you come in for one product."),
  photoAlt: (name: string) => draft(`${name}, SkinCeuticals`),
  seeAll: draft("See all the skincare we carry"),
  bookConsult: draft("Book a complimentary consult"),
  bandSub: draft("A consult starts with screening. If a product or treatment is not right for you, we say so and suggest what is."),
};

/**
 * Search titles (the <title> tag), by path. Location-led and short so the
 * whole title shows in results: the layout template adds " | Restoration
 * Medical". The page's visible heading is unchanged. A title saved under
 * Page SEO in the admin panel still wins over these.
 *
 * These are metadata, not page copy, but they are public: they follow the
 * same rules (sentence case, no superlatives, no outcome claims).
 */
export const seoTitles: Record<string, string> = {
  "/family-medicine": "Family doctor in Thornhill",
  "/family-medicine/children-youth": "Children and youth care in Thornhill",
  "/family-medicine/women-s-health": "Women’s health in Thornhill",
  "/family-medicine/vaccines": "Vaccines and flu shots in Thornhill",
  "/family-medicine/pregnancy-care": "Pregnancy care in Thornhill",
  "/family-medicine/men-s-health": "Men’s health in Thornhill",
  "/family-medicine/chronic-care": "Chronic disease care in Thornhill",
  "/family-medicine/bloodwork-ecg": "Bloodwork and ECG in Thornhill",
  "/family-medicine/prescription-renewals": "Prescription renewals in Thornhill",

  "/pain-centre": "Pain Centre in Thornhill",
  "/pain-centre/back-neck": "Back and neck pain care in Thornhill",
  "/pain-centre/joint-pain": "Joint pain injections in Thornhill",
  "/pain-centre/nerve-blocks": "Nerve blocks in Thornhill",
  "/pain-centre/trigger-point-injections": "Trigger point injections in Thornhill",

  "/infusion-therapy": "IV infusion therapy in Thornhill",
  "/infusion-therapy/iron-therapy": "Iron infusions in Thornhill",
  "/infusion-therapy/drips": "IV drips and vitamin shots in Thornhill",
  "/infusion-therapy/injection-bar": "Vitamin shots in Thornhill",
  "/infusion-therapy/metabolic-program": "Metabolic program in Thornhill",

  "/medical-aesthetics": "Medical aesthetics in Thornhill",
  "/medical-aesthetics/injectables": "Injectables in Thornhill",
  "/medical-aesthetics/skin-treatments": "Skin treatments in Thornhill",
  "/medical-aesthetics/laser": "Laser treatments in Thornhill",
  "/medical-aesthetics/mens-aesthetics": "Men’s aesthetics in Thornhill",
  "/gift-cards": "Gift cards for any service",

  "/rehab-recovery": "Physio, chiro and massage in Thornhill",
  "/rehab-recovery/physiotherapy": "Physiotherapy in Thornhill",
  "/rehab-recovery/chiropractic": "Chiropractor in Thornhill",
  "/rehab-recovery/massage-therapy": "Massage therapy in Thornhill",
  "/rehab-recovery/kinesiology": "Kinesiology in Thornhill",
  "/rehab-recovery/accident-and-injury": "Car accident and WSIB rehab in Thornhill",
  "/rehab-recovery/your-visit": "Your rehab visit, before and after",
  "/rehab-recovery/insurance-billing": "Rehab insurance and direct billing",

  "/about": "About our Thornhill clinic",
  "/about/contact": "Contact our Thornhill clinic",
  "/about/faq": "Frequently asked questions",
  "/about/careers": "Careers in Thornhill and Maple",
  "/book": "Book an appointment in Thornhill",
  "/register": "Register as a new patient in Thornhill",
  "/for-physicians": "For physicians: refer a patient",
};

/** Home page title, used as-is (no template). */
export const homeTitle = "Restoration Medical, physician-led clinic in Thornhill";

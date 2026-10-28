/** Visit type each topic page books, added to its plain /book?service= links. */
export const topicVisit: Record<string, string> = {
  painBack: "concern",
  painJoints: "concern",
  painNerve: "concern",
  painTrigger: "concern",
  painFirstVisit: "concern",
  painOhip: "concern",
  // These pages' buttons say "Book a consult", so they book the consult.
  aesInjectables: "consult",
  aesSkin: "consult",
  aesLaser: "consult",
  aesPlans: "consult",
  aesMen: "consult",
  aesPricing: "consult",
  aesPhotos: "consult",
  aesGift: "consult",
  // Their buttons say "Book an assessment": a first visit with physio or chiro.
  rehabPhysio: "assessment",
  rehabChiro: "assessment",
  rehabMassage: "massage",
  rehabKines: "kines",
  rehabMva: "mva",
  rehabWsib: "wsib",
  rehabBilling: "assessment",
  rehabBring: "assessment",
  rehabHome: "assessment",
  rx: "concern",
  // Lab results: "Book a visit" is to go over results, not a new draw.
  labs: "results",
  vaccines: "vaccine",
  pregnancy: "pregnancy",
};

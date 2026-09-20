import type { LegalPage } from "./types";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    key: "privacy",
    eyebrow: "Privacy",
    title: "Privacy policy",
    updated: "Last updated September 2026",
    intro:
      "Restoration Medical is a health information custodian under Ontario’s Personal Health Information Protection Act (PHIPA). This policy explains what we collect, why, and the choices you have.",
    contactTitle: "Privacy Officer",
    contact:
      "Questions or complaints about privacy can be sent to contact@restorationmedical.ca or 905-709-3222. You also have the right to contact the Information and Privacy Commissioner of Ontario.",
    sections: [
      {
        h: "What we collect",
        p: [
          "Personal health information you share with us for your care: contact details, health card number, medical history, test results and treatment notes. Website analytics data is collected in aggregate and does not identify you.",
        ],
      },
      {
        h: "How we use it",
        p: [
          "Only to provide and coordinate your care, to communicate with you about appointments and results, and to meet legal and professional obligations. Your health information is never used for marketing without your separate, express and revocable consent.",
        ],
      },
      {
        h: "Marketing emails and texts",
        p: [
          "Promotional messages are sent only to people who have opted in. Every message identifies the clinic and includes a working unsubscribe. Appointment reminders and results notices are not marketing and are unaffected by unsubscribing.",
        ],
      },
      {
        h: "Photos, video and reviews",
        p: [
          "We never photograph or record a patient without signed media consent, and we never confirm whether someone is a patient in public replies. Surveillance notices are posted in the clinic.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "You may access and request corrections to your record, withdraw consent for uses that are not required by law, and ask how your information has been shared. Contact our Privacy Officer to begin.",
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    key: "accessibility",
    eyebrow: "Accessibility",
    title: "Accessibility statement",
    updated: "Last updated September 2026",
    intro:
      "We are committed to providing care and information that everyone can use, in line with the Accessibility for Ontarians with Disabilities Act (AODA) and the Ontario Human Rights Code.",
    contactTitle: "Accessibility feedback",
    contact:
      "Tell us about a barrier you experienced, or request a document in an alternate format, at contact@restorationmedical.ca or 905-709-3222. We aim to respond within five business days.",
    sections: [
      {
        h: "In our clinics",
        p: [
          "Wheelchair accessible entryways, hallways, restrooms and treatment rooms. Free on-site parking near the door. Service animals and support persons are welcome. Care is available in English and Vietnamese, and we can arrange interpretation for other languages.",
        ],
      },
      {
        h: "On this website",
        p: [
          "We work to meet WCAG 2.1 Level AA. Text can be resized with the controls in the utility bar or your browser, colour contrast meets minimum ratios, images carry text alternatives, and the site can be navigated by keyboard.",
        ],
      },
      {
        h: "Alternate formats",
        p: [
          "Forms, policies and treatment information can be provided in large print or accessible digital formats on request, at no cost.",
        ],
      },
      {
        h: "Training and review",
        p: ["All staff complete AODA customer service training. Our accessibility plan is reviewed annually each September."],
      },
    ],
  },
  {
    slug: "patient-rights",
    key: "rights",
    eyebrow: "Your care",
    title: "Patient rights and responsibilities",
    updated: "Last updated September 2026",
    intro:
      "Every person who receives care at Restoration Medical can expect the following, in every service line and at every location.",
    contactTitle: "Concerns about your care",
    contact:
      "Speak with any team member, or write to the Medical Director at contact@restorationmedical.ca. Complaints are logged and reviewed. You may also contact the College of Physicians and Surgeons of Ontario or the relevant regulatory college directly.",
    sections: [
      {
        h: "You have the right to",
        p: [
          "Be treated with dignity and respect, free from discrimination. Receive clear information about your options, risks and costs before deciding. Give or refuse consent, and change your mind. Know the name and role of everyone involved in your care. Privacy and confidentiality of your health information. Access your health record.",
        ],
      },
      {
        h: "Costs and coverage",
        p: [
          "Insured services such as family medicine visits and Pain Centre assessments are covered by OHIP. Elective services such as wellness infusions and aesthetic treatments are not, and all-in prices are shared before you decide. There is never a discount or condition attached to consenting to marketing or reviews.",
        ],
      },
      {
        h: "We ask that you",
        p: [
          "Share accurate health information and tell us about changes. Arrive on time or give notice when you cannot. Treat staff and other patients with courtesy. Ask questions whenever something is unclear.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    key: "terms",
    eyebrow: "Legal",
    title: "Terms of use",
    updated: "Last updated September 2026",
    intro: "These terms apply to your use of restorationmedical.ca. By using the site you agree to them.",
    contactTitle: "Questions about these terms",
    contact: "contact@restorationmedical.ca or 905-709-3222. Restoration Medical, 700 Centre St, Thornhill, ON L4J 0A7.",
    sections: [
      {
        h: "Not medical advice",
        p: [
          "Content on this site is educational and general. It does not replace assessment by a qualified clinician and does not create a physician-patient relationship. In an emergency call 911 or go to your nearest emergency department.",
        ],
      },
      {
        h: "Booking and communication",
        p: [
          "Online booking requests are confirmed by our team. Do not send urgent or detailed health information through website forms; use the clinic phone line or your patient portal.",
        ],
      },
      {
        h: "Prices and services",
        p: [
          "Prices for uninsured services are shown all-in and confirmed at your consult. Services described here are available only after appropriate assessment, and may be declined on clinical grounds.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          "Text, images and design on this site belong to Restoration Medical or its licensors and may not be reused without permission. People shown in photographs are models unless stated otherwise.",
        ],
      },
      {
        h: "Changes",
        p: ["We may update these terms at any time. The date above shows the current version."],
      },
    ],
  },
];

/** Side navigation order and labels for the legal pages (LEGAL_ORDER). */
export const legalOrder: { key: LegalPage["key"]; slug: LegalPage["slug"]; label: string }[] = [
  { key: "privacy", slug: "privacy", label: "Privacy policy" },
  { key: "accessibility", slug: "accessibility", label: "Accessibility statement" },
  { key: "rights", slug: "patient-rights", label: "Patient rights" },
  { key: "terms", slug: "terms", label: "Terms of use" },
];

export const legalBySlug = (slug: string): LegalPage | undefined => legalPages.find((p) => p.slug === slug);

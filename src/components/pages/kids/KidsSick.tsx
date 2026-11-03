import { Section } from "@/components/ui";
import { kidsCopy, kidsSick } from "@/content/kids";
import { linkPhones } from "@/components/ui/Phones";
import { SubHeader } from "./FamilySubBits";

/** "Where to go, and when": three tinted triage cards (call or book us, when we cannot see you, emergency). */
export function KidsSick() {
  return (
    <Section tight className="flex flex-col gap-5" id="sick">
      <SubHeader eyebrow={kidsCopy.sick.eyebrow} accentClass="text-sky" title={kidsCopy.sick.title} note={kidsCopy.sick.note} />
      <div className="grid grid-cols-1 gap-card md:grid-cols-3">
        {/* Most urgent first on phones: a parent of a 7-week-old with a fever read "fever for more than two days, book" first.
            On desktop the three sit side by side in their usual order. */}
        {kidsSick.map((s, i) => (
          <div key={s.tag} className={`flex min-h-[300px] flex-col ${i === kidsSick.length - 1 ? "order-first md:order-none" : ""} gap-[18px] rounded-card p-6 text-ink md:p-8`} style={{ background: s.bg }}>
            <span className="self-start rounded-chip bg-white/70 px-3 py-1.5 text-[12px] font-semibold">{s.tag}</span>
            <span className="display balance text-[26px] leading-[1.05] lg:text-[28px]">{s.t}</span>
            <ul className="flex flex-1 flex-col gap-2">
              {s.items.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-secondary">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-ink" />
                  {i}
                </li>
              ))}
            </ul>
            {/* Phone actions are call buttons, with no "›" (it read as a web link). "Call 911" was plain text. */}
            {s.actionHref ? (
              <a href={s.actionHref} className="self-start text-[14px] font-semibold text-link">
                {s.action}
              </a>
            ) : (
              <span className="text-[14px] font-semibold">{linkPhones(s.action)}</span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

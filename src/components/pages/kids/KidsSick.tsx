import { Section } from "@/components/ui";
import { kidsCopy, kidsSick } from "@/content/kids";
import { SubHeader } from "./FamilySubBits";

/** "Where to go, and when": three tinted triage cards (call us, same day, emergency). */
export function KidsSick() {
  return (
    <Section tight className="flex flex-col gap-5" id="sick">
      <SubHeader eyebrow={kidsCopy.sick.eyebrow} accentClass="text-sky" title={kidsCopy.sick.title} note={kidsCopy.sick.note} />
      <div className="grid grid-cols-1 gap-card md:grid-cols-3">
        {kidsSick.map((s) => (
          <div key={s.tag} className="flex min-h-[300px] flex-col gap-[18px] rounded-card p-6 text-ink md:p-8" style={{ background: s.bg }}>
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
            <span className="text-[14px] font-semibold">{s.action}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

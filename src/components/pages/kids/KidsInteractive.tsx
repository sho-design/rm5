"use client";

import { useState } from "react";
import { SubChooser } from "@/components/ui";
import type { ImmunizationStage, KidsAge } from "@/content/kids";
import { Immunizations } from "./Immunizations";

/**
 * Age chooser + immunization tabs. Picking an age band also selects the
 * matching immunization tab (`immIndex`); the tabs can then be changed on
 * their own without moving the age chooser.
 */
export function KidsInteractive({ ages, stages, tint, accent, copy }: { ages: KidsAge[]; stages: ImmunizationStage[]; tint: string; accent: string; copy: { eyebrow: string; title: string; intro: string; link: string } }) {
  const [age, setAge] = useState(0);
  const [imm, setImm] = useState(ages[0]?.immIndex ?? 0);
  const pickAge = (i: number) => {
    setAge(i);
    setImm(ages[i]?.immIndex ?? 0);
  };
  return (
    <>
      <SubChooser id="ages" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} items={ages} tint={tint} accent={accent} link={copy.link} linkTo="register" value={age} onChange={pickAge} titleSize="md" />
      <Immunizations stages={stages} value={imm} onChange={setImm} />
    </>
  );
}

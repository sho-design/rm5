import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import {
  Display,
  Eyebrow,
  Section,
  SmartLink,
  TextLink,
} from "@/components/ui";
import { regimens } from "@/content/programs";
import {
  skinFilters,
  skinGroups,
  skinProducts,
  skincareCopy as c,
  type SkinGroup,
  type SkinProduct,
  type SkinShape,
  type SkinType,
} from "@/content/skincare";
import { SkinFilter } from "./SkinFilter";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";

const groups = Object.keys(skinGroups) as SkinGroup[];

/** Checked at build time: a photo shows once a file named after the product id is in public/images/skincare. */
function photoFor(id: string): string | null {
  const rel = `/images/skincare/${id}.webp`;
  return existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
}

/** A plain outline of the container, standing in until the product photo arrives. */
function Silhouette({ shape }: { shape: SkinShape }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg
      viewBox="0 0 80 120"
      className="h-[64px] w-auto text-lilac-deep/45 sm:h-[120px]"
      aria-hidden
    >
      {shape === "dropper" ? (
        <>
          <rect x="22" y="44" width="36" height="66" rx="6" {...common} />
          <rect x="30" y="30" width="20" height="14" rx="2" {...common} />
          <path d="M33 30 V16 a7 7 0 0 1 14 0 V30" {...common} />
        </>
      ) : shape === "tube" ? (
        <>
          <path d="M20 16 H60 L54 96 H26 Z" {...common} />
          <rect x="28" y="96" width="24" height="14" rx="3" {...common} />
        </>
      ) : shape === "jar" ? (
        <>
          <rect x="12" y="58" width="56" height="44" rx="8" {...common} />
          <rect x="16" y="44" width="48" height="14" rx="4" {...common} />
        </>
      ) : shape === "pump" ? (
        <>
          <rect x="22" y="46" width="36" height="64" rx="7" {...common} />
          <path d="M34 46 V32 H46 V46 M40 32 V22 H56" {...common} />
        </>
      ) : (
        <>
          <rect x="22" y="40" width="36" height="70" rx="8" {...common} />
          <rect x="30" y="22" width="20" height="18" rx="3" {...common} />
        </>
      )}
    </svg>
  );
}

function Product({ p }: { p: SkinProduct }) {
  const img = photoFor(p.id);
  const inRegimens = regimens.filter((r) => r.items.includes(p.id));
  return (
    <li
      id={p.id}
      data-skin-types={p.skin.join(" ")}
      className="flex scroll-mt-28 flex-row overflow-hidden rounded-card border border-border bg-card sm:flex-col"
    >
      <div className="relative grid w-[96px] shrink-0 place-items-center bg-lilac-tint sm:aspect-[4/3] sm:w-auto">
        {img ? (
          <Image
            src={img}
            alt={c.photoAlt(p.name)}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 96px"
            className="object-contain p-2 sm:p-4"
          />
        ) : (
          <>
            <Silhouette shape={p.shape} />
            <span className="absolute inset-x-0 bottom-1.5 text-center text-[10px] font-semibold text-lilac-deep sm:bottom-2.5 sm:text-[12px]">{c.photoSoon}</span>
          </>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4 sm:gap-2 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[19px] font-medium leading-[1.2] tracking-[-.01em]">
            {p.name}
          </h3>
          <span className="shrink-0 text-[17px] font-semibold tabular-nums">
            ${p.srp}
          </span>
        </div>
        <span className="text-[13px] font-semibold text-muted">
          {p.size}, {c.plusHst}
        </span>
        <p className="pretty text-[14px] leading-[1.5] text-secondary">
          {p.d ?? c.noDesc}
        </p>
        {inRegimens.length ? (
          <span className="mt-auto pt-1 text-[13px] text-muted">
            {c.inRegimen}:{" "}
            {inRegimens.map((r, i) => (
              <span key={r.k}>
                {i ? ", " : ""}
                <Link href={`${routes.aesPlans}#regimen-${r.k}`} className="font-semibold text-link hover:underline">
                  {r.t}
                </Link>
              </span>
            ))}
          </span>
        ) : null}
      </div>
    </li>
  );
}

/** The full retail list, grouped as SkinCeuticals groups it, with a jump row and how to buy. */
export function SkincareList() {
  // Products shown under each skin type filter: those tagged with it, plus those that suit all skin.
  const counts: Record<string, number> = Object.fromEntries(
    skinFilters.map((f) => [
      f.k,
      f.k === "any"
        ? skinProducts.length
        : skinProducts.filter(
            (p) => p.skin.includes(f.k as SkinType) || p.skin.includes("all"),
          ).length,
    ]),
  );
  return (
    <>
      <nav
        aria-label={c.jump}
        className="sticky top-[64px] z-20 border-b border-border bg-page/95 backdrop-blur md:top-[76px]"
      >
        <ul className="mx-auto flex w-full max-w-[1440px] gap-2 overflow-x-auto px-4 py-3 md:px-content">
          {groups.map((g) => (
            <li key={g} className="shrink-0">
              <a
                href={`#group-${g}`}
                className="inline-flex rounded-chip border border-border bg-card px-3.5 py-1.5 text-[14px] font-semibold hover:bg-raised"
              >
                {skinGroups[g].t}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <SkinFilter counts={counts}>
        {groups.map((g) => {
          const list = skinProducts.filter((p) => p.group === g);
          return (
            <Section
              key={g}
              id={`group-${g}`}
              className="flex scroll-mt-28 flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <Display size="xs" as="h2">
                  {skinGroups[g].t}
                </Display>
                <p className="pretty text-[15px] text-secondary">
                  {skinGroups[g].d}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((p) => (
                  <Product key={p.id} p={p} />
                ))}
              </ul>
            </Section>
          );
        })}
      </SkinFilter>
      <Section>
        <div className="flex flex-col gap-3 rounded-card bg-inverse p-6 text-on-inverse md:p-8">
          <Eyebrow tone="sun">{c.buyTitle}</Eyebrow>
          <p className="pretty max-w-[640px] text-[17px] leading-[1.55]">
            {c.buy}
          </p>
          <a
            href={site.phoneHref}
            className="w-fit text-[17px] font-semibold text-sun"
          >
            {site.phone}
          </a>
          <SmartLink to={`${routes.aesPlans}#regimens`} className="w-fit">
            <TextLink className="text-[15px] text-white">
              {c.regimensLink}
            </TextLink>
          </SmartLink>
          <p className="pretty max-w-[640px] pt-2 text-[13px] leading-[1.5] text-white/65">
            {c.note}
          </p>
        </div>
      </Section>
    </>
  );
}

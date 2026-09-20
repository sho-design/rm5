import { Display, Photo, SmartLink } from "@/components/ui";
import { storyPage } from "@/content/about";

/** Story header: crumb + Fraunces 72 H1 left, 18px lead right, then the full-bleed team photo. */
export function StoryHero({ img }: { img: string }) {
  const c = storyPage;
  return (
    <>
      <header className="grid grid-cols-1 items-end gap-6 px-4 pt-10 md:px-content md:pt-16 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col gap-4">
          <span className="eyebrow text-link">
            <SmartLink to="about">About</SmartLink> › {c.crumb}
          </span>
          <Display as="h1" size="lg">
            {c.title}
          </Display>
        </div>
        <p className="pretty text-[17px] leading-[1.55] text-secondary lg:text-[18px]">{c.lead}</p>
      </header>
      <Photo src={img} alt={c.imgAlt} radius="block" priority sizes="100vw" className="mx-3 mt-8 min-h-[260px] md:mx-gutter md:mt-10 md:min-h-[480px]" />
    </>
  );
}

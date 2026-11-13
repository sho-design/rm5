import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { laserDevices } from "@/content/aes-laser";
import {
  deviceBySlug,
  devicePath,
  deviceSeo,
  deviceSlug,
} from "@/content/aes-laser-devices";
import { DevicePage } from "@/components/pages/aesthetics/extra/laser/DevicePage";

/** /medical-aesthetics/laser/<device>: one page per laser and energy device (November 2026). */
export const dynamicParams = false;

export function generateStaticParams() {
  return laserDevices.map((d) => ({ topic: "laser", device: deviceSlug[d.k] }));
}

type Params = { params: Promise<{ topic: string; device: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { topic, device } = await params;
  const d = topic === "laser" ? deviceBySlug(device) : undefined;
  if (!d) return {};
  return pageMetadata(devicePath(d.k), {
    title: deviceSeo[d.k].title,
    description: deviceSeo[d.k].description,
  });
}

export default async function LaserDevicePage({ params }: Params) {
  const { topic, device } = await params;
  const d = topic === "laser" ? deviceBySlug(device) : undefined;
  if (!d) notFound();
  return <DevicePage d={d} />;
}

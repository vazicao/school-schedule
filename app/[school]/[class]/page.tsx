import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchedulePage from "@/components/SchedulePage";
import { listClassParams, loadClassData } from "@/lib/classLoader";

// Only the school/class combinations that exist under /data are valid — they're
// pre-rendered at build time, and anything else is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => listClassParams();

type Props = { params: Promise<{ school: string; class: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { school, class: classSlug } = await params;
  const data = await loadClassData(school, classSlug);
  if (!data) return {};
  return {
    title: `${data.displayName} — ${data.school.name}`,
    // This class's own web app manifest (own start_url), so it can be installed
    manifest: `/${school}/${classSlug}/manifest.webmanifest`,
    description: `Raspored časova, kontrolni zadaci i udžbenici — ${data.displayName}, ${data.school.name} (${data.schoolYear})`,
  };
}

export default async function ClassPage({ params }: Props) {
  const { school, class: classSlug } = await params;
  const data = await loadClassData(school, classSlug);
  if (!data) notFound();
  return <SchedulePage data={data} />;
}

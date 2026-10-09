import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { SectionRenderer } from "@/components/SectionRenderer";
import { SiteHeader } from "@/components/SiteHeader";
import { buildSections } from "@/content/landing";
import { CITY_SLUGS, isCitySlug, pilots } from "@/content/pilot";

type Params = Promise<{ city: string }>;

/** /barcelona and /sanfrancisco — statically generated, city pre-filled in the form. */
export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  if (!isCitySlug(city)) return {};
  const pilot = pilots[city];
  return {
    title: `${pilot.name} pilot`,
    description: `${pilot.club.name} in ${pilot.name}: one small club, ${pilot.cap}, meeting twice on two Saturdays. Free. Sign up.`,
    alternates: { canonical: `/${city}` },
  };
}

export default async function CityPage({ params }: { params: Params }) {
  const { city } = await params;
  if (!isCitySlug(city)) notFound();
  return (
    <>
      <SiteHeader onLanding />
      <main id="top">
        <SectionRenderer sections={buildSections(city)} />
      </main>
      <Footer />
    </>
  );
}

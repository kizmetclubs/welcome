import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SectionRenderer } from "@/components/SectionRenderer";
import { SiteHeader } from "@/components/SiteHeader";
import { landingSections } from "@/content/landing";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/*
 * The landing page is data-driven: the order and content come entirely from
 * src/content/landing.ts via <SectionRenderer>. To change the page, edit the content
 * (Axis C) or the theme tokens (Axis A) — not this file.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <SectionRenderer sections={landingSections} />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}

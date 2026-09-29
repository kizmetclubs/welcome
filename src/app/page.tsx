import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SectionRenderer } from "@/components/SectionRenderer";
import { SiteHeader } from "@/components/SiteHeader";
import { landingSections } from "@/content/landing";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/*
 * The landing page is data-driven: the order and content come entirely from
 * src/content/landing.ts via <SectionRenderer>. City pages live at /[city].
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

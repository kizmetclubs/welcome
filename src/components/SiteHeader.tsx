import Link from "next/link";
import { HeaderNav } from "@/components/nav/HeaderNav";
import { NavMockupSwitcher } from "@/components/nav/NavMockupSwitcher";
import { QuickBar } from "@/components/nav/QuickBar";
import { site } from "@/content/site";

/**
 * Sticky header. `onLanding` is true on the home and city pages, whose sections the nav
 * links point at directly; elsewhere the links go back to the home page.
 */
export function SiteHeader({ onLanding = false }: { onLanding?: boolean }) {
  return (
    <header className="hdr">
      <div className="in row">
        <Link href="/" className="wordmark">
          {site.wordmark}
        </Link>
        <HeaderNav onLanding={onLanding} />
        <a className="btn coral sm hdr-cta" href={site.ctaHref}>
          {site.ctaLabel}
        </a>
      </div>
      <QuickBar onLanding={onLanding} />
      <NavMockupSwitcher />
    </header>
  );
}

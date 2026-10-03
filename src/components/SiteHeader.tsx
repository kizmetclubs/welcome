import Link from "next/link";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="hdr">
      <div className="in row">
        <Link href="/" className="wordmark">
          {site.wordmark}
        </Link>
        <a className="btn coral sm" href={site.signupAnchor}>
          {site.ctaLabel}
        </a>
      </div>
    </header>
  );
}

import Link from "next/link";
import { LinkButton } from "@/components/primitives";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="border-muted-soft/60 bg-canvas/85 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-ink text-2xl font-bold lowercase">
          {site.wordmark}
        </Link>
        <LinkButton href={site.signupAnchor} variant="primary" size="sm">
          {site.ctaLabel}
        </LinkButton>
      </div>
    </header>
  );
}

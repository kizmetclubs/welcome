import { LinkButton } from "@/components/primitives";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="border-muted-soft/60 bg-canvas/85 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-ink text-2xl font-bold lowercase">
          {site.wordmark}
        </a>
        <LinkButton href={site.waitlistAnchor} variant="primary" size="sm">
          Join the waitlist
        </LinkButton>
      </div>
    </header>
  );
}

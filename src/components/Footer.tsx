import Link from "next/link";
import { Checkerboard } from "@/components/motifs";
import { Container, Text } from "@/components/primitives";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-canvas">
      <Checkerboard className="text-ink/80 h-3 w-full" />
      <Container className="py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-ink text-2xl font-bold lowercase">{site.wordmark}</p>
            <Text size="sm" tone="muted" className="mt-1">
              {site.tagline}
            </Text>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {site.footer.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-ink-soft hover:text-brand font-semibold underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Text size="sm" tone="muted" className="mt-8">
          {site.footer.cityNote} · Questions?{" "}
          <a className="underline" href={`mailto:${site.footer.contactEmail}`}>
            {site.footer.contactEmail}
          </a>
        </Text>
      </Container>
    </footer>
  );
}

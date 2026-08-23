import { Arrow } from "@/components/motifs";
import {
  Badge,
  Container,
  Eyebrow,
  Heading,
  LinkButton,
  Section,
  Text,
} from "@/components/primitives";
import { resolveHref } from "@/lib/links";
import type { HeroSection } from "@/content/types";

export function Hero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  note,
  stats,
}: HeroSection) {
  const pilotHref = secondaryCta ? resolveHref(secondaryCta.href) : null;

  return (
    <Section tone="canvas" spacing="lg">
      <Container className="text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading level={1} className="mx-auto mt-4 max-w-3xl">
          {headline}
        </Heading>
        <Text size="lg" className="mx-auto mt-5 max-w-xl">
          {subheadline}
        </Text>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="relative">
            <LinkButton href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
            </LinkButton>
            <Arrow className="text-brand pointer-events-none absolute -top-8 -right-14 hidden h-10 w-20 sm:block" />
          </div>
          {secondaryCta && pilotHref ? (
            <a
              href={pilotHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-brand font-semibold underline-offset-4 hover:underline"
            >
              {secondaryCta.label}
            </a>
          ) : null}
        </div>

        {note ? (
          <Text size="sm" tone="muted" className="mx-auto mt-6 max-w-lg">
            {note}
          </Text>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {stats.map((stat, i) => (
            <Badge key={stat} tone={i === 0 ? "brand" : "neutral"}>
              {stat}
            </Badge>
          ))}
        </div>
      </Container>
    </Section>
  );
}

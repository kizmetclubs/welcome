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
import type { HeroSection } from "@/content/types";

export function Hero({ eyebrow, headline, subheadline, primaryCta, scribble, stats }: HeroSection) {
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
          {scribble ? (
            <Text as="span" tone="soft" className="font-display text-xl font-semibold">
              {scribble}
            </Text>
          ) : null}
        </div>

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

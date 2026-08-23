import { Card, Container, Eyebrow, Heading, Section, Text } from "@/components/primitives";
import { resolveHref } from "@/lib/links";
import type { ClubsSection } from "@/content/types";

export function Clubs({ eyebrow, heading, intro, clubs, suggestion }: ClubsSection) {
  const suggestionHref = suggestion ? resolveHref(suggestion.href) : null;

  return (
    <Section tone="canvas" spacing="md">
      <Container size="wide">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading level={2} className="mt-2 max-w-2xl">
          {heading}
        </Heading>
        {intro ? (
          <Text size="lg" className="mt-4 max-w-2xl">
            {intro}
          </Text>
        ) : null}

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <li key={club.name}>
              <Card className="h-full">
                <span className="text-4xl" aria-hidden="true">
                  {club.emoji}
                </span>
                <Heading level={4} as="h3" className="mt-3">
                  {club.name}
                </Heading>
                <Text className="mt-2">{club.blurb}</Text>
                <Text size="sm" tone="muted" className="mt-4">
                  {club.when} · {club.where}
                </Text>
              </Card>
            </li>
          ))}
        </ul>

        {suggestion && suggestionHref ? (
          <Text size="sm" tone="soft" className="mt-8">
            <a
              href={suggestionHref}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="pilot_cta_click"
              className="text-brand font-semibold underline-offset-4 hover:underline"
            >
              {suggestion.label}
            </a>
          </Text>
        ) : null}
      </Container>
    </Section>
  );
}

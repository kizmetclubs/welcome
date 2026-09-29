import { Badge, Card, Container, Eyebrow, Heading, Section, Text } from "@/components/primitives";
import type { PilotSection } from "@/content/types";

/** A city's pilot: the club card plus when / where / how many / cost. */
export function Pilot({ id, eyebrow, heading, intro, pilot }: PilotSection) {
  const facts = [
    { label: "When", value: pilot.dates.join(" and ") },
    { label: "Time", value: pilot.time },
    { label: "Where", value: pilot.place },
    { label: "How many", value: pilot.cap },
    { label: "Cost", value: pilot.cost },
  ];

  return (
    <Section tone="surface" spacing="md" id={id}>
      <Container size="wide">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading level={2} className="mt-2 max-w-2xl">
          {heading}
        </Heading>
        <Text size="lg" className="mt-4 max-w-2xl">
          {intro}
        </Text>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Card tone="cream">
            <Badge tone={pilot.club.tone}>{pilot.name}</Badge>
            <span className="mt-4 block text-5xl" aria-hidden="true">
              {pilot.club.emoji}
            </span>
            <Heading level={2} as="h3" className="mt-2">
              {pilot.club.name}
            </Heading>
            <Text size="lg" className="mt-3">
              {pilot.club.blurb}
            </Text>
          </Card>

          <Card>
            <dl className="divide-muted-soft divide-y">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-body text-muted text-sm font-semibold tracking-wider uppercase">
                    {fact.label}
                  </dt>
                  <dd className="font-body text-ink text-right font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

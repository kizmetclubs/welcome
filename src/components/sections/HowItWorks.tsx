import { Container, Eyebrow, Heading, Section, Text } from "@/components/primitives";
import type { HowItWorksSection } from "@/content/types";

export function HowItWorks({ eyebrow, heading, intro, steps, note }: HowItWorksSection) {
  return (
    <Section tone="surface" spacing="md">
      <Container>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading level={2} className="mt-2 max-w-2xl">
          {heading}
        </Heading>
        {intro ? (
          <Text size="lg" className="mt-4 max-w-2xl">
            {intro}
          </Text>
        ) : null}

        <ol className="mt-10 grid gap-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="rounded-pill bg-brand font-display text-brand-ink flex h-9 w-9 shrink-0 items-center justify-center font-bold"
              >
                {i + 1}
              </span>
              <div>
                <Heading level={4} as="h3">
                  {step.title}
                </Heading>
                <Text className="mt-1">{step.body}</Text>
              </div>
            </li>
          ))}
        </ol>

        {note ? (
          <Text size="sm" tone="muted" className="mt-8 max-w-2xl italic">
            {note}
          </Text>
        ) : null}
      </Container>
    </Section>
  );
}

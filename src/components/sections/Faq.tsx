import { Container, Heading, Section, Text } from "@/components/primitives";
import type { FaqSection } from "@/content/types";

/**
 * Uses native <details>/<summary> — accessible disclosure with zero JS (keyboard-operable,
 * announced by screen readers) and no client bundle.
 */
export function Faq({ heading, items }: FaqSection) {
  return (
    <Section tone="surface" spacing="md">
      <Container size="prose">
        <Heading level={2}>{heading}</Heading>
        <div className="divide-muted-soft border-muted-soft mt-8 divide-y border-y">
          {items.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="font-display text-ink flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-brand transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <Text className="mt-3">{item.a}</Text>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

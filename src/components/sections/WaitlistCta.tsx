import { Container, Heading, Section, Text } from "@/components/primitives";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import type { WaitlistCtaSection } from "@/content/types";

export function WaitlistCta({ id, heading, body, submitLabel, note }: WaitlistCtaSection) {
  return (
    <Section tone="cream" spacing="lg" id={id} aria-labelledby={`${id}-heading`}>
      <Container size="prose" className="text-center">
        <Heading level={2} id={`${id}-heading`}>
          {heading}
        </Heading>
        {body ? (
          <Text size="lg" className="mx-auto mt-4 max-w-xl">
            {body}
          </Text>
        ) : null}

        <div className="mt-8">
          <WaitlistForm submitLabel={submitLabel} />
        </div>

        {note ? (
          <Text size="sm" tone="muted" className="mx-auto mt-6 max-w-md">
            {note}
          </Text>
        ) : null}
      </Container>
    </Section>
  );
}

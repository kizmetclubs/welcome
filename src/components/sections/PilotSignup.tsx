import { PilotSignupForm } from "@/components/pilot/PilotSignupForm";
import { Container, Heading, Section, Text } from "@/components/primitives";
import type { PilotSignupSection } from "@/content/types";

export function PilotSignup({ id, heading, body, city, note }: PilotSignupSection) {
  return (
    <Section tone="cream" spacing="lg" id={id} aria-labelledby={`${id}-heading`}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Heading level={2} id={`${id}-heading`}>
              {heading}
            </Heading>
            {body ? (
              <Text size="lg" className="mt-4">
                {body}
              </Text>
            ) : null}
            {note ? (
              <Text size="sm" tone="muted" className="mt-6">
                {note}
              </Text>
            ) : null}
          </div>
          <div className="rounded-card border-muted-soft bg-surface shadow-card border p-6 sm:p-8">
            <PilotSignupForm city={city} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

import { Container, Heading, Section, Text } from "@/components/primitives";
import type { SafetySection } from "@/content/types";

export function Safety({ heading, body }: SafetySection) {
  return (
    <Section tone="surface" spacing="md">
      <Container size="prose">
        <Heading level={2}>{heading}</Heading>
        <div className="mt-4 space-y-4">
          {body.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} size="lg">
              {paragraph}
            </Text>
          ))}
        </div>
      </Container>
    </Section>
  );
}

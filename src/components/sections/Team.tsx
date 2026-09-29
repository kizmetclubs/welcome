import { Card, Container, Heading, Section, Text } from "@/components/primitives";
import type { TeamSection } from "@/content/types";

export function Team({ heading, intro, members, closing }: TeamSection) {
  return (
    <Section tone="canvas" spacing="md">
      <Container>
        <Heading level={2}>{heading}</Heading>
        <div className="mt-4 max-w-2xl space-y-4">
          {intro.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} size="lg">
              {paragraph}
            </Text>
          ))}
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {members.map((member) => (
            <li key={member.name}>
              <Card tone="cream" className="h-full">
                <Heading level={4} as="h3">
                  {member.name}
                </Heading>
                <Text size="sm" tone="muted" className="mt-1">
                  {member.role}
                  {member.location ? ` · ${member.location}` : ""}
                </Text>
                <Text className="mt-3">{member.detail}</Text>
              </Card>
            </li>
          ))}
        </ul>

        {closing ? (
          <Text size="lg" className="mt-8 max-w-2xl">
            {closing}
          </Text>
        ) : null}
      </Container>
    </Section>
  );
}

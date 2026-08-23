import { GrannySquare } from "@/components/motifs";
import { Container, Heading, Section } from "@/components/primitives";
import type { BeliefsSection } from "@/content/types";

export function Beliefs({ heading, beliefs }: BeliefsSection) {
  return (
    <Section tone="brand" spacing="md">
      <Container>
        <div className="flex items-center gap-4">
          <GrannySquare className="text-brand-ink/80 h-10 w-10" />
          <Heading level={2} className="text-brand-ink">
            {heading}
          </Heading>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {beliefs.map((belief) => (
            <li
              key={belief}
              className="rounded-card bg-brand-ink/10 font-display text-brand-ink p-5 text-lg font-semibold"
            >
              {belief}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

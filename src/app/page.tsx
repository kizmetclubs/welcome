import Link from "next/link";
import {
  Badge,
  Container,
  Eyebrow,
  Heading,
  LinkButton,
  Section,
  Text,
} from "@/components/primitives";

/*
 * M0 placeholder home. This is a temporary hero so the deploy shows something on-brand;
 * M1 replaces it with the data-driven <SectionRenderer> over src/content/landing.ts.
 */
export default function HomePage() {
  return (
    <main>
      <Section tone="canvas" spacing="lg">
        <Container className="text-center">
          <Eyebrow>An honest, early-stage project — no app yet</Eyebrow>
          <Heading level={1} className="mx-auto mt-4 max-w-3xl">
            Clubs are back.
          </Heading>
          <Text size="lg" className="mx-auto mt-5 max-w-xl">
            Small groups. Same people. Every week. Pick something you actually want to do — pastry
            night, a walking group, a book club — and we&apos;ll handle getting everyone there.
          </Text>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="#waitlist" variant="primary" size="lg">
              Join the waitlist
            </LinkButton>
            <Link
              href="#pilot"
              className="font-body text-brand font-semibold underline-offset-4 hover:underline"
            >
              Running a pilot near you? Join it →
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge tone="brand">Barcelona &amp; San Francisco</Badge>
            <Badge tone="neutral">Clubs capped at 10</Badge>
          </div>

          <Text size="sm" tone="muted" className="mx-auto mt-10 max-w-md">
            Foundation build (M0). Full page, waitlist form, and Ash&apos;s design land in the next
            milestones — see{" "}
            <Link className="underline" href="/kitchensink">
              /kitchensink
            </Link>{" "}
            for the theme system.
          </Text>
        </Container>
      </Section>
    </main>
  );
}

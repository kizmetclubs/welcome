import type { Metadata } from "next";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  Badge,
  Button,
  Card,
  Container,
  Eyebrow,
  Heading,
  Input,
  Section,
  Text,
} from "@/components/primitives";

// Internal design tool. Excluded from search, and DELETED before public launch (task 5.5).
export const metadata: Metadata = {
  title: "Kitchen sink",
  robots: { index: false, follow: false },
};

const swatches = [
  ["brand", "bg-brand"],
  ["accent-warm", "bg-accent-warm"],
  ["accent-gold", "bg-accent-gold"],
  ["accent-sky", "bg-accent-sky"],
  ["accent-berry", "bg-accent-berry"],
  ["accent-pink", "bg-accent-pink"],
  ["accent-coral", "bg-accent-coral"],
  ["accent-lime", "bg-accent-lime"],
  ["accent-olive", "bg-accent-olive"],
  ["cream", "bg-cream"],
  ["surface", "bg-surface"],
  ["muted-soft", "bg-muted-soft"],
] as const;

export default function KitchenSinkPage() {
  return (
    <main>
      <Section spacing="sm" tone="canvas">
        <Container>
          <Eyebrow>Internal · not shipped to launch</Eyebrow>
          <Heading level={1} className="mt-2">
            Design kitchen sink
          </Heading>
          <Text size="lg" className="mt-3 max-w-2xl">
            Flip the theme below. Every token and component re-skins with{" "}
            <strong>zero code changes</strong> — this is the swappability guarantee from the spec.
            Your choice is remembered, so it carries over to the landing page.
          </Text>
          <div className="mt-6">
            <ThemeSwitcher />
          </div>
          <Text size="sm" className="mt-4">
            <Link href="/" className="text-brand font-semibold underline-offset-4 hover:underline">
              ← Back to the landing page
            </Link>
          </Text>
        </Container>
      </Section>

      <Section spacing="sm" tone="surface">
        <Container>
          <Heading level={3}>Color tokens</Heading>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {swatches.map(([name, bg]) => (
              <div key={name}>
                <div className={`rounded-card border-muted-soft h-16 border ${bg}`} />
                <Text size="sm" tone="muted" className="mt-2">
                  {name}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="sm" tone="canvas">
        <Container>
          <Heading level={3}>Typography</Heading>
          <div className="mt-6 space-y-3">
            <Heading level={1}>Heading 1 — Clubs are back</Heading>
            <Heading level={2}>Heading 2 — Same people, every week</Heading>
            <Heading level={3}>Heading 3 — Come make pastries</Heading>
            <Heading level={4}>Heading 4 — with your neighbors</Heading>
            <Text size="lg">
              Body large — small groups, the same people, someone else does the planning.
            </Text>
            <Text>Body base — the quick brown fox jumps over the lazy dog.</Text>
            <Text size="sm" tone="muted">
              Body small muted — Barcelona &amp; San Francisco · Clubs capped at 10.
            </Text>
          </div>
        </Container>
      </Section>

      <Section spacing="sm" tone="surface">
        <Container>
          <Heading level={3}>Components</Heading>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button variant="primary">Join the waitlist</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="brand">Pilot open now</Badge>
            <Badge tone="gold">🥐 Pastry Club</Badge>
            <Badge tone="sky">🚶 Walk &amp; Talk</Badge>
            <Badge tone="pink">📖 Reading Club</Badge>
            <Badge tone="lime">🎨 Arts &amp; Crafts</Badge>
            <Badge tone="neutral">Capped at 10</Badge>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card>
              <Heading level={4}>Surface card</Heading>
              <Text className="mt-2">
                Bring butter, leave with friends and more croissants than one person should own.
              </Text>
            </Card>
            <Card tone="cream">
              <Heading level={4}>Cream card</Heading>
              <Text className="mt-2">
                A walk with conversation prompts, so it&apos;s never just weather talk.
              </Text>
            </Card>
          </div>

          <div className="mt-6 max-w-md">
            <label className="mb-2 block">
              <Text size="sm" tone="soft" as="span">
                Email input
              </Text>
            </label>
            <div className="flex gap-2">
              <Input type="email" placeholder="you@example.com" aria-label="Email address" />
              <Button variant="primary">Join</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

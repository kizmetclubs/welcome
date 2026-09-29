import Link from "next/link";
import { Badge, Card, Container, Heading, Section, Text } from "@/components/primitives";
import type { CityPickerSection } from "@/content/types";

/** Home page: one card per city, linking to that city's page. */
export function CityPicker({ heading, intro, cities }: CityPickerSection) {
  return (
    <Section tone="surface" spacing="md">
      <Container size="wide">
        <Heading level={2}>{heading}</Heading>
        {intro ? (
          <Text size="lg" className="mt-4 max-w-2xl">
            {intro}
          </Text>
        ) : null}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {cities.map((city) => (
            <li key={city.slug}>
              <Link href={`/${city.slug}`} className="group block h-full">
                <Card className="h-full transition-transform group-hover:-translate-y-1">
                  <Badge tone={city.club.tone}>
                    {city.name} · {city.status}
                  </Badge>
                  <span className="mt-4 block text-4xl" aria-hidden="true">
                    {city.club.emoji}
                  </span>
                  <Heading level={3} as="h3" className="mt-2">
                    {city.club.name}
                  </Heading>
                  <Text className="mt-2">{city.club.blurb}</Text>
                  <Text
                    size="sm"
                    className="text-brand mt-4 font-semibold underline-offset-4 group-hover:underline"
                  >
                    See the details →
                  </Text>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

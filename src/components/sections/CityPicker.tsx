import Link from "next/link";
import { CityTag } from "@/components/CityTag";
import type { CityPickerSection, ClubTone } from "@/content/types";

const BAND: Record<ClubTone, string> = { mustard: "food", teal: "out" };

// Odd cards wiggle the other way (.r). Built here, not inline, so the class-sorting
// formatter can't strip the separating space.
const cardClass = (i: number) =>
  ["card", "wig", "rise", i % 2 ? "r" : ""].filter(Boolean).join(" ");

/**
 * Home page: one card per city. Each card carries one color family, its club's: the
 * checker band and the button. The city is a tag above the title, not a pill.
 */
export function CityPicker({ id, eyebrow, heading, intro, cities, footnote }: CityPickerSection) {
  return (
    <section id={id} className="sec-white">
      <div className="in stack" style={{ gap: 40 }}>
        <div className="stack nar" style={{ gap: 16 }}>
          {eyebrow ? (
            <span className="pill stk bg-chartreuse" style={{ alignSelf: "flex-start" }}>
              {eyebrow}
            </span>
          ) : null}
          <h2 className="h2">{heading}</h2>
          {intro ? <p className="muted">{intro}</p> : null}
        </div>
        <div className="g2">
          {cities.map((city, i) => (
            <article
              key={city.slug}
              className={cardClass(i)}
              style={
                {
                  overflow: "hidden",
                  ...(i % 2 ? { "--d": "120ms", "--r": "3deg" } : {}),
                } as React.CSSProperties
              }
            >
              <div className={`band ${BAND[city.club.tone]} b24 top0`} />
              <div className="stack" style={{ padding: "clamp(28px,4vw,40px)", gap: 18 }}>
                <CityTag city={city} />
                <h3 className="h3" style={{ marginTop: -6 }}>
                  {city.club.name}
                </h3>
                <p className="muted">{city.club.blurb}</p>
                <Link
                  className={`btn sm ${city.club.tone}`}
                  href={`/${city.slug}`}
                  style={{ alignSelf: "flex-start", marginTop: 12 }}
                >
                  See the details →
                </Link>
              </div>
            </article>
          ))}
        </div>
        {footnote ? <p className="muted nar">{footnote}</p> : null}
      </div>
    </section>
  );
}

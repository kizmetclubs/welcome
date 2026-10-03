import Link from "next/link";
import type { CityPickerSection, ClubTone } from "@/content/types";

const BAND: Record<ClubTone, string> = { mustard: "food", teal: "out" };

// Odd cards wiggle the other way (.r). Built here, not inline, so the class-sorting
// formatter can't strip the separating space.
const cardClass = (i: number) =>
  ["card", "wig", "rise", i % 2 ? "r" : ""].filter(Boolean).join(" ");

/** Home page: one card per city, each wearing its checker band, linking to the city page. */
export function CityPicker({ heading, intro, cities }: CityPickerSection) {
  return (
    <section className="sec-white bb-soft">
      <div className="in stack" style={{ gap: 40 }}>
        <div className="stack nar" style={{ gap: 16 }}>
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
              <div className="stack" style={{ padding: 28, gap: 12 }}>
                <span
                  className={`pill stk bg-${city.club.tone}`}
                  style={{ alignSelf: "flex-start" }}
                >
                  {city.name} · {city.status}
                </span>
                <h3 className="h3">{city.club.name}</h3>
                <p className="muted">{city.club.blurb}</p>
                <Link
                  className={`btn sm ${city.club.tone}`}
                  href={`/${city.slug}`}
                  style={{ alignSelf: "flex-start", marginTop: 6 }}
                >
                  See the details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

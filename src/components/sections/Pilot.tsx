import type { ClubTone, PilotSection } from "@/content/types";

const BAND: Record<ClubTone, string> = { mustard: "food", teal: "out" };

/** City page: the club card (with its checker band) beside the when / where / cost facts. */
export function Pilot({ id, eyebrow, heading, intro, pilot }: PilotSection) {
  const facts = [
    { label: "When", value: pilot.dates.join(" and ") },
    { label: "Time", value: pilot.time },
    { label: "Where", value: pilot.place },
    { label: "How many", value: pilot.cap },
    { label: "Cost", value: pilot.cost },
  ];

  return (
    <section id={id} className="sec-white bb-soft">
      <div className="in stack" style={{ gap: 40 }}>
        <div className="stack nar" style={{ gap: 16 }}>
          {eyebrow ? (
            <span className="pill stk bg-pink" style={{ alignSelf: "flex-start" }}>
              {eyebrow}
            </span>
          ) : null}
          <h2 className="h2">{heading}</h2>
          <p className="muted">{intro}</p>
        </div>
        <div className="g2">
          <article className="card wig rise" style={{ overflow: "hidden" }}>
            <div className={`band ${BAND[pilot.club.tone]} b24 top0`} />
            <div className="stack" style={{ padding: 28, gap: 12 }}>
              <span
                className={`pill stk bg-${pilot.club.tone}`}
                style={{ alignSelf: "flex-start" }}
              >
                {pilot.name} · {pilot.status}
              </span>
              <h3 className="h3">{pilot.club.name}</h3>
              <p className="muted">{pilot.club.blurb}</p>
            </div>
          </article>
          <div
            className="card wig r rise"
            style={{ padding: 28, "--d": "120ms", "--r": "3deg" } as React.CSSProperties}
          >
            <dl className="facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="eye">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

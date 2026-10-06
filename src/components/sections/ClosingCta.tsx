import type { ClosingCtaSection } from "@/content/types";

/** The chartreuse "come be part of it" band near the end of the page. */
export function ClosingCta({ heading, body, kicker, cta }: ClosingCtaSection) {
  return (
    <section className="bg-chartreuse">
      <div className="in">
        <div className="stack nar" style={{ gap: 18, margin: "0 auto", alignItems: "flex-start" }}>
          <h2 className="h2">{heading}</h2>
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p style={{ fontWeight: 700 }}>
            {kicker}{" "}
            <span
              className="e"
              aria-hidden="true"
              style={{ fontSize: 20, verticalAlign: "-.15em" }}
            >
              M
            </span>
          </p>
          <a className="btn coral" href={cta.href} style={{ marginTop: 6 }}>
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

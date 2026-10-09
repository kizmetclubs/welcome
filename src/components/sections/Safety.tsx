import type { SafetySection } from "@/content/types";

/** A plain white section: a centered column of text, entered through the checker band. */
export function Safety({ heading, body }: SafetySection) {
  return (
    <section className="sec-white">
      <div className="in">
        <div className="stack nar" style={{ gap: 18, margin: "0 auto" }}>
          <h2 className="h2">{heading}</h2>
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

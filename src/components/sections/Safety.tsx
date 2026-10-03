import type { SafetySection } from "@/content/types";

export function Safety({ heading, body }: SafetySection) {
  return (
    <section className="sec-white bb-soft">
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

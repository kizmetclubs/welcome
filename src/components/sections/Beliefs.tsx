import type { BeliefsSection } from "@/content/types";

const BULLET_TONES = ["bg-pink", "bg-mustard", "bg-chartreuse", "bg-coral", "bg-teal"];

// Odd tiles wiggle the other way (.r). Built here, not inline, so the class-sorting
// formatter can't strip the separating space.
const tileClass = (i: number) =>
  ["tile", "wig", "rise", i % 2 ? "r" : ""].filter(Boolean).join(" ");

/** The teal beliefs band: white tiles, each a coloured dot, the belief and a line on why. */
export function Beliefs({ heading, beliefs }: BeliefsSection) {
  return (
    <section className="bg-teal">
      <div className="in stack" style={{ gap: 32 }}>
        <h2 className="h2">{heading}</h2>
        <ul className="g2" style={{ gap: 16, listStyle: "none", margin: 0, padding: 0 }}>
          {beliefs.map((belief, i) => (
            <li
              key={belief.title}
              className={tileClass(i)}
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              <span
                className={`bullet ${BULLET_TONES[i % BULLET_TONES.length]}`}
                aria-hidden="true"
              />
              <div className="stack" style={{ gap: 6 }}>
                <span>{belief.title}</span>
                <p className="small muted" style={{ fontWeight: 400 }}>
                  {belief.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

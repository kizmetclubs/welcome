import { Ribbon } from "@/components/Ribbon";
import type { BeliefsSection } from "@/content/types";

const BULLET_TONES = ["bg-pink", "bg-mustard", "bg-chartreuse", "bg-coral", "bg-teal"];

// Odd tiles wiggle the other way (.r). Built here, not inline, so the class-sorting
// formatter can't strip the separating space.
const tileClass = (i: number) =>
  ["tile", "wig", "rise", i % 2 ? "r" : ""].filter(Boolean).join(" ");

/** The teal beliefs band: signature checker strip above, reversed coral ribbon below. */
export function Beliefs({ heading, beliefs }: BeliefsSection) {
  return (
    <>
      <div className="band s b24" aria-hidden="true" />
      <section className="bg-teal">
        <div className="in stack" style={{ gap: 32 }}>
          <h2 className="h2">{heading}</h2>
          <ul className="g2" style={{ gap: 14, listStyle: "none", margin: 0, padding: 0 }}>
            {beliefs.map((belief, i) => (
              <li
                key={belief}
                className={tileClass(i)}
                style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
              >
                <span
                  className={`bullet ${BULLET_TONES[i % BULLET_TONES.length]}`}
                  aria-hidden="true"
                />
                {belief}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Ribbon tone="coral" reverse />
    </>
  );
}

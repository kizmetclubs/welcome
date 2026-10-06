import { PilotSignupForm } from "@/components/pilot/PilotSignupForm";
import type { PilotSignupSection } from "@/content/types";

/** Step stickers: fill, tilt and EmojiFont glyph per step. */
const STEP_LOOK = [
  { tone: "bg-teal", tilt: -2, glyph: "b" },
  { tone: "bg-pink", tilt: 1.5, glyph: "k" },
  { tone: "bg-coral", tilt: 1, glyph: "j" },
  { tone: "bg-chartreuse", tilt: -1.5, glyph: "M" },
];

// Odd stickers wiggle the other way (.r). Built here, not inline, so the class-sorting
// formatter can't strip the separating spaces.
const stepClass = (i: number, tone: string) =>
  ["step", "wig", "rise", i % 2 ? "r" : "", tone].filter(Boolean).join(" ");

/** The mustard sign-up band: pitch and how-it-works steps on the left, the form on the right. */
export function PilotSignup({
  id,
  heading,
  body,
  stepsHeading,
  steps,
  city,
  aside,
  submitLabel,
  successMessage,
}: PilotSignupSection) {
  return (
    <section id={id} className="bg-mustard" aria-labelledby={`${id}-heading`}>
      <div
        className="in"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
          gap: 48,
          alignItems: "start",
        }}
      >
        <div className="stack" style={{ gap: 20, maxWidth: 440 }}>
          <h2 className="h2" id={`${id}-heading`}>
            {heading}
          </h2>
          {body ? <p className="lead">{body}</p> : null}
          {steps?.length ? (
            <div className="stack" style={{ gap: 16, marginTop: 8 }}>
              {stepsHeading ? <h3 className="h4">{stepsHeading}</h3> : null}
              <ol className="stack" style={{ listStyle: "none", padding: 0, margin: 0, gap: 20 }}>
                {steps.map((step, i) => {
                  const look = STEP_LOOK[i % STEP_LOOK.length];
                  return (
                    <li
                      key={step.title}
                      className={stepClass(i, look.tone)}
                      style={
                        {
                          padding: 20,
                          gap: 10,
                          transform: `rotate(${look.tilt}deg)`,
                          "--r": `${look.tilt}deg`,
                          "--d": `${i * 90}ms`,
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="row"
                        style={{ justifyContent: "space-between", flexWrap: "nowrap" }}
                      >
                        <span className="num">{i + 1}</span>
                        <span className="e" aria-hidden="true" style={{ fontSize: 30 }}>
                          {look.glyph}
                        </span>
                      </div>
                      <b style={{ fontSize: 17, lineHeight: 1.25 }}>{step.title}</b>
                      <p className="small">{step.body}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null}
          {aside ? (
            <p className="small" style={{ fontWeight: 700, marginTop: 4 }}>
              {aside}{" "}
              <span
                className="e"
                aria-hidden="true"
                style={{ fontSize: 20, verticalAlign: "-.15em" }}
              >
                j
              </span>
            </p>
          ) : null}
        </div>
        <PilotSignupForm city={city} submitLabel={submitLabel} successMessage={successMessage} />
      </div>
    </section>
  );
}

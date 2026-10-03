import type { HowItWorksSection } from "@/content/types";

const NUM_TONES = ["bg-mustard", "bg-teal", "bg-tomato", "bg-chartreuse"];

export function HowItWorks({ eyebrow, heading, intro, steps, note }: HowItWorksSection) {
  return (
    <section>
      <div className="in stack" style={{ gap: 40 }}>
        <div className="stack nar" style={{ gap: 16 }}>
          {eyebrow ? (
            <span className="pill stk bg-pink" style={{ alignSelf: "flex-start" }}>
              {eyebrow}
            </span>
          ) : null}
          <h2 className="h2">{heading}</h2>
          {intro ? <p className="muted">{intro}</p> : null}
        </div>
        <ol className="g4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="step wig rise"
              style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className={`num ${NUM_TONES[i % NUM_TONES.length]}`} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="h4">{step.title}</h3>
              <p className="small">{step.body}</p>
            </li>
          ))}
        </ol>
        {note ? <p className="small muted nar">{note}</p> : null}
      </div>
    </section>
  );
}

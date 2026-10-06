import type { StorySection } from "@/content/types";

const CHORE_TONES = ["bg-mustard", "bg-pink", "bg-chartreuse", "bg-coral"];
const CHORE_TILT = [-1, 1.5, -1.5, 1];

/**
 * "Why we're doing this": back then vs now, the quote we kept hearing, the chores nobody
 * wants (struck through), and what Kizmet does about it. Cream ground; the team section
 * follows on the same ground, so this one has no bottom padding.
 */
export function Story({
  eyebrow,
  heading,
  then,
  now,
  quoteIntro,
  quote,
  problem,
  chores,
  choresSticker,
  answerHeading,
  answerBody,
  closing,
}: StorySection) {
  return (
    <section style={{ paddingBottom: 0 }}>
      <div className="in stack" style={{ gap: 56 }}>
        <div className="stack nar" style={{ gap: 18 }}>
          <span className="pill stk bg-pink" style={{ alignSelf: "flex-start" }}>
            {eyebrow}
          </span>
          <h2 className="h2">{heading}</h2>
        </div>

        <div className="g2" style={{ alignItems: "stretch" }}>
          <div
            className="card stack rise"
            style={
              {
                padding: 28,
                gap: 14,
                transform: "rotate(-1.5deg)",
                "--r": "-1.5deg",
              } as React.CSSProperties
            }
          >
            <span className="eyebrow">{then.label}</span>
            <p>
              {then.body} <b>{then.punch}</b>
            </p>
          </div>
          <div
            className="card stack rise"
            style={
              {
                padding: 28,
                gap: 14,
                background: "var(--kz-teal-200)",
                transform: "rotate(1.5deg)",
                "--r": "1.5deg",
                "--d": "120ms",
              } as React.CSSProperties
            }
          >
            <span className="eyebrow">{now.label}</span>
            <p>{now.before}</p>
            <span className="bubble">
              {now.bubble}{" "}
              <span
                className="e"
                aria-hidden="true"
                style={{ fontSize: 18, verticalAlign: "-.15em" }}
              >
                k
              </span>
            </span>
            <p>{now.after}</p>
          </div>
        </div>

        <div
          className="stack nar"
          style={{ gap: 14, margin: "0 auto", textAlign: "center", alignItems: "center" }}
        >
          <p className="muted" style={{ maxWidth: 520 }}>
            {quoteIntro}
          </p>
          <blockquote className="display" style={{ margin: 0 }}>
            {quote}
          </blockquote>
        </div>

        <div className="g2" style={{ gap: 48, alignItems: "center" }}>
          <div className="stack" style={{ gap: 18 }}>
            <p>{problem}</p>
            <p className="display" style={{ marginTop: 4 }}>
              {answerHeading}
            </p>
            <p>{answerBody}</p>
          </div>
          <div className="stack" style={{ gap: 18, padding: "8px 0" }}>
            <ul className="stack" style={{ listStyle: "none", padding: 0, margin: 0, gap: 10 }}>
              {chores.map((chore, i) => (
                <li
                  key={chore}
                  className={`chore rise ${CHORE_TONES[i % CHORE_TONES.length]}`}
                  style={
                    {
                      alignSelf: i % 2 ? "flex-end" : "flex-start",
                      transform: `rotate(${CHORE_TILT[i % CHORE_TILT.length]}deg)`,
                      "--r": `${CHORE_TILT[i % CHORE_TILT.length]}deg`,
                      "--d": `${i * 90}ms`,
                    } as React.CSSProperties
                  }
                >
                  <s>{chore}</s>
                </li>
              ))}
            </ul>
            <span
              className="sticker rise"
              style={{ "--r": "-6deg", "--d": "420ms" } as React.CSSProperties}
            >
              {choresSticker}{" "}
              <span
                className="e"
                aria-hidden="true"
                style={{ fontSize: 20, color: "var(--kz-pink-200)" }}
              >
                k
              </span>
            </span>
          </div>
        </div>

        <p className="display rise" style={{ maxWidth: 820 }}>
          {closing.before}
          <mark className="hl">{closing.highlight}</mark>
          {closing.after}
        </p>
      </div>
    </section>
  );
}

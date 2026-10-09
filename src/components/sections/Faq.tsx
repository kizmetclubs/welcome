import type { FaqSection, RichText } from "@/content/types";

function Rich({ text }: { text: RichText }) {
  if (typeof text === "string") return <>{text}</>;
  return (
    <>
      {text.map((run, i) =>
        typeof run === "string" ? (
          run
        ) : (
          <a key={i} href={run.href}>
            {run.text}
          </a>
        )
      )}
    </>
  );
}

/**
 * Native <details>/<summary>: accessible disclosure with zero JS. The coral "+" toggle
 * that rotates to "×" is drawn in CSS (site.css, summary::after).
 */
export function Faq({ id, heading, items }: FaqSection) {
  return (
    <section id={id} className="sec-white">
      <div className="in">
        <div className="stack nar" style={{ gap: 28, margin: "0 auto" }}>
          <h2 className="h2">{heading}</h2>
          <div>
            {items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                {item.a.map((paragraph, i) => (
                  <p key={i}>
                    <Rich text={paragraph} />
                  </p>
                ))}
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

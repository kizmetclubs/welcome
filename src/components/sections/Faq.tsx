import type { FaqSection } from "@/content/types";

/**
 * Native <details>/<summary>: accessible disclosure with zero JS. The coral "+" toggle
 * that rotates to "×" is drawn in CSS (site.css, summary::after).
 */
export function Faq({ heading, items }: FaqSection) {
  return (
    <section className="sec-white bt-soft">
      <div className="in">
        <div className="stack nar" style={{ gap: 28, margin: "0 auto" }}>
          <h2 className="h2">{heading}</h2>
          <div>
            {items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import type { SafetySection } from "@/content/types";

/**
 * A pop-out note: the same white sticker card as the waitlist ("Not in Barcelona or San
 * Francisco?"), on the cream page so it reads as an aside rather than floating text.
 */
export function Safety({ heading, body }: SafetySection) {
  return (
    <section className="bb-soft">
      <div className="in">
        <div
          className="card stack"
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "clamp(28px,5vw,48px)",
            gap: 18,
            boxShadow: "var(--shadow-sticker-lg)",
          }}
        >
          <h2 className="h2">{heading}</h2>
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

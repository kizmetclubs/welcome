import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import type { WaitlistCtaSection } from "@/content/types";

/** Email waitlist for people outside the pilot cities: a white card on cream. */
export function WaitlistCta({ id, heading, body, submitLabel, note }: WaitlistCtaSection) {
  return (
    <>
      <div
        className="scallop"
        aria-hidden="true"
        style={
          {
            backgroundColor: "var(--kz-white)",
            "--scallop": "var(--surface-base)",
          } as React.CSSProperties
        }
      />
      <section id={id} aria-labelledby={`${id}-heading`}>
        <div className="in">
          <div
            className="card stack"
            style={{
              maxWidth: 640,
              margin: "0 auto",
              padding: "clamp(28px,5vw,48px)",
              gap: 20,
              textAlign: "center",
              alignItems: "center",
              boxShadow: "var(--shadow-sticker-lg)",
            }}
          >
            <h2 className="h2" id={`${id}-heading`}>
              {heading}
            </h2>
            {body ? (
              <p className="muted" style={{ maxWidth: 440 }}>
                {body}
              </p>
            ) : null}
            <WaitlistForm submitLabel={submitLabel} />
            {note ? <p className="small muted">{note}</p> : null}
          </div>
        </div>
      </section>
    </>
  );
}

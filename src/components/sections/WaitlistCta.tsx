import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import type { WaitlistCtaSection } from "@/content/types";

/** Email waitlist for people outside the pilot cities: a white callout card on cream. */
export function WaitlistCta({ id, heading, body, submitLabel, note }: WaitlistCtaSection) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="in">
        <div
          className="card callout stack"
          style={{
            maxWidth: 640,
            margin: "0 auto",
            padding: "clamp(28px,5vw,48px)",
            gap: 20,
            textAlign: "center",
            alignItems: "center",
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
  );
}

import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import type { NowNextSection } from "@/content/types";

/**
 * "Pilot now, app next": what we organize by hand for the pilot, what the app will take
 * over afterwards, and the app waitlist for anyone who can't make the pilot. Sits right
 * after the clubs so the waitlist is easy to find.
 */
export function NowNext({ id, eyebrow, heading, intro, now, next, waitlist }: NowNextSection) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="in stack" style={{ gap: 40 }}>
        <div className="stack nar" style={{ gap: 16 }}>
          {eyebrow ? (
            <span className="pill stk bg-pink" style={{ alignSelf: "flex-start" }}>
              {eyebrow}
            </span>
          ) : null}
          <h2 className="h2" id={`${id}-heading`}>
            {heading}
          </h2>
          {intro ? <p className="muted">{intro}</p> : null}
        </div>

        <div className="g2" style={{ alignItems: "start" }}>
          <article className="card stack" style={{ padding: "clamp(28px,4vw,40px)", gap: 16 }}>
            <span className="pill stk bg-mustard" style={{ alignSelf: "flex-start" }}>
              {now.label}
            </span>
            <h3 className="h3">{now.heading}</h3>
            <p className="muted">{now.body}</p>
            <ul className="ticks">
              {now.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <a
              className="btn coral"
              href={now.cta.href}
              style={{ alignSelf: "flex-start", marginTop: 8 }}
            >
              {now.cta.label}
            </a>
          </article>

          <article
            id={waitlist.id}
            className="card callout stack"
            style={{ padding: "clamp(28px,4vw,40px)", gap: 16 }}
          >
            <span className="pill stk bg-teal" style={{ alignSelf: "flex-start" }}>
              {next.label}
            </span>
            <h3 className="h3">{next.heading}</h3>
            <p className="muted">{next.body}</p>
            <div
              className="stack"
              style={{
                gap: 14,
                marginTop: 8,
                paddingTop: 22,
                borderTop: "1px solid var(--border-soft)",
              }}
            >
              <h4 className="h4">{waitlist.heading}</h4>
              {waitlist.body ? <p className="small muted">{waitlist.body}</p> : null}
              <WaitlistForm
                submitLabel={waitlist.submitLabel}
                success={waitlist.success}
                confirmSent={waitlist.confirmSent}
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

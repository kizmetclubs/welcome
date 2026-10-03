import { PilotSignupForm } from "@/components/pilot/PilotSignupForm";
import type { PilotSignupSection } from "@/content/types";

/** The mustard sign-up band, entered through a scalloped edge. */
export function PilotSignup({ id, heading, body, city, note, aside }: PilotSignupSection) {
  return (
    <>
      <div
        className="scallop"
        aria-hidden="true"
        style={
          {
            backgroundColor: "var(--surface-base)",
            "--scallop": "var(--kz-mustard-400)",
          } as React.CSSProperties
        }
      />
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
          <div className="stack" style={{ gap: 16, maxWidth: 400 }}>
            <h2 className="h2" id={`${id}-heading`}>
              {heading}
            </h2>
            {body ? <p className="lead">{body}</p> : null}
            {note ? <p className="small">{note}</p> : null}
            {aside ? (
              <p className="small" style={{ marginTop: 8 }}>
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
          <PilotSignupForm city={city} />
        </div>
      </section>
    </>
  );
}

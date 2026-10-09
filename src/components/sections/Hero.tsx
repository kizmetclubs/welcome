import { HeroJumpLinks } from "@/components/nav/HeroJumpLinks";
import type { HeroSection } from "@/content/types";

const STAT_TONES = ["bg-teal", "bg-mustard", "bg-pink"];

/**
 * The signature hero: a coral/pink checkerboard plate with the copy on a white card (text
 * never sits on the checker) and one corner sparkle.
 */
export function Hero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  scribble,
  stats,
  footLink,
}: HeroSection) {
  return (
    <section style={{ padding: "56px 0 96px" }}>
      <div className="in">
        <div className="ck plate">
          <div
            className="card stack"
            style={{
              position: "relative",
              maxWidth: 760,
              margin: "0 auto",
              padding: "clamp(32px,6vw,64px) clamp(24px,5vw,56px)",
              gap: 24,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span className="e tw sparkle" aria-hidden="true">
              M
            </span>
            {eyebrow ? <span className="pill stk bg-chartreuse">{eyebrow}</span> : null}
            <h1 className="h1">{headline}</h1>
            <p className="lead" style={{ maxWidth: 520 }}>
              {subheadline}
            </p>
            <div className="row" style={{ gap: 20, justifyContent: "center" }}>
              <a className="btn coral lg" href={primaryCta.href}>
                {primaryCta.label}
              </a>
              {scribble ? (
                <a href={scribble.href} style={{ fontWeight: 700 }}>
                  {scribble.label}
                </a>
              ) : null}
            </div>
            <div className="row" style={{ gap: 8, justifyContent: "center" }}>
              {stats.map((stat, i) => (
                <span key={stat} className={`pill stk ${STAT_TONES[i % STAT_TONES.length]}`}>
                  {stat}
                </span>
              ))}
            </div>
            {footLink ? (
              <a href={footLink.href} className="small" style={{ fontWeight: 700 }}>
                {footLink.label}
              </a>
            ) : null}
            <HeroJumpLinks />
          </div>
        </div>
      </div>
    </section>
  );
}

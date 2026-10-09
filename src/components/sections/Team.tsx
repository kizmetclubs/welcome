import Image from "next/image";
import { CityTag } from "@/components/CityTag";
import { pilots } from "@/content/pilot";
import type { TeamSection } from "@/content/types";

/** Polaroid tilt and tape color per member. */
const POLAROIDS = [
  { tilt: -2.5, tape: "var(--kz-mustard-400)" },
  { tilt: 2, tape: "var(--kz-teal-400)" },
  { tilt: -1.5, tape: "var(--kz-pink-200)" },
  { tilt: 2.5, tape: "var(--kz-chartreuse-400)" },
];

// Odd polaroids wiggle the other way (.r). Built here, not inline, so the class-sorting
// formatter can't strip the separating space.
const polaroidClass = (i: number) =>
  ["polaroid", "wig", i % 2 ? "r" : ""].filter(Boolean).join(" ");

/**
 * "The people behind it": taped polaroids with role, a line each and a city tag. Follows
 * the story section on the same cream ground, so it sits closer to it than a new section.
 */
export function Team({ id, heading, members, closing }: TeamSection) {
  return (
    <section id={id} style={{ paddingTop: 72 }}>
      <div className="in stack" style={{ gap: 48 }}>
        <h3 className="h3">{heading}</h3>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
            gap: "48px 28px",
            alignItems: "start",
          }}
        >
          {members.map((member, i) => {
            const look = POLAROIDS[i % POLAROIDS.length];
            return (
              <li
                key={member.name}
                className="stack rise"
                style={
                  {
                    gap: 22,
                    "--d": `${i * 100}ms`,
                    "--r": `${look.tilt}deg`,
                  } as React.CSSProperties
                }
              >
                <figure
                  className={polaroidClass(i)}
                  style={{ "--rot": `${look.tilt}deg` } as React.CSSProperties}
                >
                  <span className="tape" style={{ background: look.tape }} aria-hidden="true" />
                  <div className="ph">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt=""
                        fill
                        sizes="(max-width: 600px) 100vw, 240px"
                      />
                    ) : null}
                  </div>
                  <figcaption>{member.name}</figcaption>
                </figure>
                <div className="stack" style={{ gap: 8, padding: "0 4px" }}>
                  <b style={{ fontSize: 17, lineHeight: 1.25 }}>{member.role}</b>
                  <p className="small muted" style={{ lineHeight: 1.5 }}>
                    {member.detail}
                  </p>
                  <div style={{ marginTop: 12 }}>
                    <CityTag city={pilots[member.location]} size="sm" />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {closing ? (
          <div className="stack nar" style={{ gap: 10 }}>
            <h4 className="h4">{closing.heading}</h4>
            <p className="muted">{closing.body}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

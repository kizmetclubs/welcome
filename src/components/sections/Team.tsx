import type { TeamSection } from "@/content/types";

/** EmojiFont smiley + fill per avatar, cycling through the three faces (j, k, l). */
const AVATARS = [
  { face: "j", tone: "bg-mustard" },
  { face: "k", tone: "bg-teal" },
  { face: "l", tone: "bg-pink" },
  { face: "j", tone: "bg-chartreuse" },
];

export function Team({ heading, intro, members, closing }: TeamSection) {
  return (
    <section>
      <div className="in stack" style={{ gap: 40 }}>
        <div className="stack nar" style={{ gap: 18 }}>
          <h2 className="h2">{heading}</h2>
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <ul className="g4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {members.map((member, i) => {
            const avatar = AVATARS[i % AVATARS.length];
            return (
              <li
                key={member.name}
                className="card stack wig rise"
                style={{ padding: 24, gap: 10 }}
              >
                <span className={`av e ${avatar.tone}`} aria-hidden="true">
                  {avatar.face}
                </span>
                <h3 className="h4">{member.name}</h3>
                <span className="eye">
                  {member.role}
                  {member.location ? ` · ${member.location}` : ""}
                </span>
                <p className="small muted">{member.detail}</p>
              </li>
            );
          })}
        </ul>
        {closing ? <p className="muted nar">{closing}</p> : null}
      </div>
    </section>
  );
}

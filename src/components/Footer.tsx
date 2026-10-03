import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="sec-white">
      <div className="band s b32 top0" aria-hidden="true" />
      <div
        className="in row"
        style={{ justifyContent: "space-between", gap: 24, paddingTop: 40, paddingBottom: 40 }}
      >
        <div className="stack" style={{ gap: 8 }}>
          <span className="wordmark" style={{ fontSize: 36 }}>
            {site.wordmark}
          </span>
          <span className="small muted">{site.tagline}</span>
          <span className="eye" style={{ marginTop: 6, lineHeight: 1.4 }}>
            {site.footer.cityNote} · Questions?{" "}
            <a href={`mailto:${site.footer.contactEmail}`}>{site.footer.contactEmail}</a>
          </span>
        </div>
        <nav aria-label="Footer" className="row" style={{ gap: 24, fontSize: 14 }}>
          {site.footer.links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

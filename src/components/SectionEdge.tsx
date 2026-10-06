import { Ribbon } from "@/components/Ribbon";
import type { Edge, Ground } from "@/content/types";

export const GROUND: Record<Ground, string> = {
  base: "var(--surface-base)",
  white: "var(--kz-white)",
  mustard: "var(--kz-mustard-400)",
  teal: "var(--kz-teal-400)",
  chartreuse: "var(--kz-chartreuse-400)",
};

/** The boundary above a section: animated ribbon, scalloped edge, or signature checker band. */
export function SectionEdge({ edge }: { edge?: Edge }) {
  if (!edge) return null;
  switch (edge.kind) {
    case "ribbon":
      return <Ribbon tone={edge.tone} reverse={edge.reverse} />;
    case "scallop":
      return (
        <div
          className="scallop"
          aria-hidden="true"
          style={
            {
              backgroundColor: GROUND[edge.from],
              "--scallop": GROUND[edge.to],
            } as React.CSSProperties
          }
        />
      );
    case "checker":
      return <div className="band s b24" aria-hidden="true" />;
  }
}

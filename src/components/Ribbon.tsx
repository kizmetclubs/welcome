"use client";

import { useEffect, useState } from "react";

/**
 * The animated EmojiFont banner from the design artifact: a marquee of dingbats between
 * sections. Three glyphs are picked at random per page load from the EmojiFont pool
 * (smileys j k l, sparkles/hearts M N R Q D B, ribbon W) and shared by every ribbon on the
 * page. The track holds the run twice so the -50% marquee loops seamlessly.
 */
const POOL = "jklMNRQDBW".split("");
const DEFAULT_PICK = ["j", "M", "W"]; // server render + first paint, before the random pick

let sharedPick: string[] | null = null;
function pickThree(): string[] {
  if (!sharedPick) {
    const pick: string[] = [];
    while (pick.length < 3) {
      const glyph = POOL[Math.floor(Math.random() * POOL.length)];
      if (!pick.includes(glyph)) pick.push(glyph);
    }
    sharedPick = pick;
  }
  return sharedPick;
}

export function Ribbon({
  tone,
  reverse = false,
}: {
  tone: "chartreuse" | "coral";
  reverse?: boolean;
}) {
  const [pick, setPick] = useState(DEFAULT_PICK);
  useEffect(() => setPick(pickThree()), []);

  const run = Array.from({ length: 16 }, (_, i) => pick[i % 3]);
  // Joined here, not inline, so the class-sorting formatter can't strip the space.
  const ribbonClass = ["ribbon", `bg-${tone}`, reverse ? "rev" : ""].filter(Boolean).join(" ");
  return (
    <div className={ribbonClass} aria-hidden="true">
      <div className="trk">
        {[...run, ...run].map((glyph, i) => (
          <span key={i}>{glyph}</span>
        ))}
      </div>
    </div>
  );
}

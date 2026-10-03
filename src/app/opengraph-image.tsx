import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Social-share image in the Kizmet look: the signature coral/pink checkerboard with the
// wordmark on a white card. The checker is drawn as tiles because the image renderer
// doesn't support conic gradients.
export const alt = "kizmet — clubs for adults. Same people, every week.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TILE = 70;
const COLS = Math.ceil(size.width / TILE);
const ROWS = Math.ceil(size.height / TILE);

export default async function OpengraphImage() {
  const serif = await readFile(
    join(
      process.cwd(),
      "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff"
    )
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#F8CEFF",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexWrap: "wrap",
          width: COLS * TILE,
        }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <div
            key={i}
            style={{
              width: TILE,
              height: TILE,
              background: (i % COLS) % 2 === Math.floor(i / COLS) % 2 ? "#FC793C" : "#F8CEFF",
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 216,
          top: 136,
          width: 800,
          height: 390,
          borderRadius: 24,
          background: "#2A2420",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 120,
          width: 800,
          height: 390,
          borderRadius: 24,
          background: "#FFFFFF",
          border: "2px solid #2A2420",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#2A2420",
        }}
      >
        <div style={{ fontFamily: "Instrument Serif", fontSize: 190, lineHeight: 1 }}>kizmet</div>
        <div style={{ fontSize: 34, marginTop: 18 }}>
          Clubs for adults. Same people, every week.
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }],
    }
  );
}

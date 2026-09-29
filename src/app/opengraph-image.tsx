import { ImageResponse } from "next/og";

// Branded social-share image (spec §10). Generated at build; system font keeps it simple.
export const alt = "Kizmet — Clubs are back";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#E0F5F0",
        color: "#1c2b28",
        fontFamily: "sans-serif",
        padding: 80,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 40, color: "#008E83", fontWeight: 700, letterSpacing: 4 }}>
        kizmet
      </div>
      <div style={{ fontSize: 104, fontWeight: 800, marginTop: 24, lineHeight: 1 }}>
        Clubs are back.
      </div>
      <div style={{ fontSize: 34, color: "#3f524d", marginTop: 28 }}>
        Clubs for adults. Same people, every week.
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 26,
          color: "#fff",
          background: "#CD500D",
          padding: "12px 28px",
          borderRadius: 999,
          fontWeight: 700,
        }}
      >
        Join the pilot
      </div>
    </div>,
    { ...size }
  );
}

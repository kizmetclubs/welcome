import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kizmet",
    short_name: "Kizmet",
    description: "Small groups. Same people. Every week.",
    start_url: "/",
    display: "browser",
    background_color: "#E0F5F0",
    theme_color: "#008E83",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

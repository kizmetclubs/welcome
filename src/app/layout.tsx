import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kizmet — Clubs are back",
    template: "%s · Kizmet",
  },
  description:
    "Clubs for adults. Same people, every week. A small club that meets twice, on two Saturdays, in a park. Pilots in Barcelona and San Francisco — no app, just show up.",
  openGraph: {
    title: "Kizmet — Clubs are back",
    description: "Same people, every week. Join the pilot in Barcelona or San Francisco.",
    type: "website",
    url: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF4E6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <a href="#top" className="btn sm skip">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

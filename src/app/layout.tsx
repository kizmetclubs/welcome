import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { ThemeInit } from "@/components/ThemeInit";
import { cn } from "@/lib/cn";
import { getSiteUrl } from "@/lib/siteUrl";
import { resolveTheme } from "@/themes/registry";

const siteUrl = getSiteUrl();
const activeTheme = resolveTheme(process.env.NEXT_PUBLIC_THEME);

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
  themeColor: "#008E83",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme={activeTheme} className={cn(fontVariables)} suppressHydrationWarning>
      <body>
        <ThemeInit />
        <a
          href="#top"
          className="focus:rounded-pill focus:bg-brand focus:font-body focus:text-brand-ink sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

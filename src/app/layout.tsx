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
    default: "Nearfolk — Clubs are back",
    template: "%s · Nearfolk",
  },
  description:
    "Small groups. Same people. Every week. Nearfolk helps you join a small, recurring club near you — and we handle getting everyone there.",
  openGraph: {
    title: "Nearfolk — Clubs are back",
    description: "Small groups. Same people. Every week. Join the waitlist for Nearfolk.",
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

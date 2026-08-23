import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme={activeTheme} className={cn(fontVariables)} suppressHydrationWarning>
      <body>
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}

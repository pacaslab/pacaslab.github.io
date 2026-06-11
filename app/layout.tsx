import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageTransitionProvider } from "@/components/providers/PageTransition";

/**
 * Neue Haas Grotesk Display — the single brand voice. Extreme weight contrast
 * (XXThin 100 ... Black 900) replaces any second family.
 */
const haas = localFont({
  src: [
    { path: "./fonts/neue-haas-xxthin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/neue-haas-thin.woff2", weight: "200", style: "normal" },
    { path: "./fonts/neue-haas-roman.woff2", weight: "400", style: "normal" },
    { path: "./fonts/neue-haas-roman-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/neue-haas-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/neue-haas-black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-haas",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#310C11",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={haas.variable} suppressHydrationWarning>
      <body className="min-h-dvh">
        <SmoothScroll />
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}

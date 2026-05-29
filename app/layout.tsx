import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { PrimaryNav } from "./_components/PrimaryNav";
import { PreferencesApplier } from "./_components/PreferencesApplier";

// Body font: Open Sans (replaces Inter). CSS variable name kept as
// `--font-inter` so every existing `font-sans` consumer picks up the
// new face without component edits.
const inter = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter"
});

// Brand/display font: Elms Sans (replaces Plus Jakarta Sans, which
// previously replaced Manrope). Loaded via <link> below because
// Elms Sans isn't in next/font/google's static allowlist on this
// Next.js version. The --font-manrope CSS variable is defined in
// globals.css so every `font-brand` consumer keeps working unchanged.

export const metadata: Metadata = {
  title: "klaro",
  description: "Confidence through clarity."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Elms Sans loaded via stylesheet link — not in next/font/google's
            allowlist on this Next.js version, so we load it directly. The
            --font-manrope CSS variable in globals.css points at it. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Elms+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-warm-dark antialiased">
        <PreferencesApplier />
        {/* Shared SVG gradient defs — referenced by .icon-gradient-stroke
            in globals.css so Lucide icons can render their strokes as a
            45° linear gradient (#F97433 → #FDB322). Hidden, takes no space. */}
        <svg
          width="0"
          height="0"
          aria-hidden="true"
          focusable="false"
          style={{ position: "absolute" }}
        >
          <defs>
            {/* gradientUnits="userSpaceOnUse" so the gradient resolves
                against the icon SVG's coordinate space (0 0 24 24) rather
                than each individual element's bounding box. Without this,
                zero-width elements like vertical <line> in the Map icon
                would have an undefined bounding box and render invisible. */}
            <linearGradient
              id="task-icon-gradient"
              x1="0"
              y1="24"
              x2="24"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F97433" />
              <stop offset="100%" stopColor="#FDB322" />
            </linearGradient>
          </defs>
        </svg>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:border focus:bg-elevated focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>

        <header className="sticky top-0 z-50 border-b border-divider/30 bg-canvas">
          <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-6 sm:px-10">
            <Link
              href="/"
              className="flex items-center"
              aria-label="klaro, home"
            >
              {/* Full wordmark (icon + "klaro" lettering) from
               * public/logo.svg. Source lives in docs/illustrations/logo.svg. */}
              <img
                src="/logo.svg"
                alt="klaro"
                className="block h-9 w-auto"
              />
            </Link>
            <div className="hidden md:block">
              <PrimaryNav variant="horizontal" />
            </div>
          </div>
        </header>

        <main
          id="main-content"
          className="mx-auto w-full max-w-content px-6 pb-32 pt-8 sm:px-10 md:pb-16 md:pt-16"
        >
          {children}
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-canvas md:hidden">
          <PrimaryNav variant="bottom-bar" />
        </div>
      </body>
    </html>
  );
}

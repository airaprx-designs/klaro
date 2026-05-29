"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * PrimaryNav — application shell navigation.
 *
 * Brand refresh · Step 3 (2026-05-29):
 *   Active state shifts from a warm-amber underline border to a soft
 *   terracotta highlight pill that sits just under the label (terracotta
 *   at 35% opacity, fully rounded, slightly wider than the text). Reads
 *   like a quiet highlighter mark, in the playful-minimalist language.
 *   Inactive items render in warm-mid; hover lifts to warm-dark.
 *
 * Decided 2026-05-28 after a Mobbin sweep — text-with-quiet-mark is the
 * calm/learning category default. Pills are reserved for content filters
 * or CTAs in that peer group.
 *
 * Top-level destinations: Today / Progress / Settings.
 * The wordmark `klaro` in the header is a backup home affordance.
 *
 * Review and Reflection are internal steps of the /task/[taskSlug] journey,
 * not nav destinations.
 */

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Today" },
  { href: "/progress", label: "Progress" },
  { href: "/settings", label: "Settings" }
];

type Props = { variant: "horizontal" | "bottom-bar" };

export function PrimaryNav({ variant }: Props) {
  const pathname = usePathname() ?? "/";

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  if (variant === "horizontal") {
    return (
      <nav aria-label="Primary">
        <ul className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="inline-flex h-12 items-center"
                >
                  <span
                    className={`relative pb-1 text-lg transition-colors ${
                      active
                        ? "font-semibold text-warm-dark"
                        : "font-medium text-warm-mid hover:text-warm-dark"
                    }`}
                  >
                    {item.label}
                    {/* Soft terracotta highlight underneath the active label */}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-[-6px] right-[-6px] h-1.5 rounded-full bg-[#E04974]/35"
                      />
                    ) : null}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  // bottom-bar (mobile)
  return (
    <nav aria-label="Primary (mobile)">
      <ul className="flex items-center justify-around gap-2 px-4 py-3">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="inline-flex min-h-12 items-center px-3"
              >
                <span
                  className={`relative pb-1 text-lg transition-colors ${
                    active
                      ? "font-semibold text-warm-dark"
                      : "font-medium text-warm-mid hover:text-warm-dark"
                  }`}
                >
                  {item.label}
                  {/* Soft terracotta highlight underneath the active label */}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-[-6px] right-[-6px] h-1.5 rounded-full bg-[#E04974]/35"
                    />
                  ) : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

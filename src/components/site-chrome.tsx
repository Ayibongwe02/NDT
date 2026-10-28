import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/explore" as const, label: "Explore" },
  { to: "/virtual" as const, label: "3D Gallery" },
  { to: "/podcasts" as const, label: "Podcasts" },
  { to: "/collections" as const, label: "Collections" },
  { to: "/about" as const, label: "About" },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/90 shadow-[0_1px_0_0_rgba(196,163,90,0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-surface/80">
      {/* Subtle gold accent line under the header */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          to="/"
          className="group flex min-w-0 items-baseline gap-2.5 no-underline"
        >
          <span className="truncate font-serif text-[15px] font-bold tracking-[0.1em] text-fg transition-colors group-hover:text-primary sm:text-lg sm:tracking-[0.12em]">
            {BRAND.nameUpper}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => {
            const active = pathname === n.to || pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted hover:text-fg",
                )}
              >
                {n.label}
                {active && (
                  <span
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/Code-Community-Museum-updated.zip"
            download="Code-Community-Museum-updated.zip"
            className="hidden rounded-md border border-border bg-surface px-3.5 py-2 text-sm font-medium text-fg no-underline shadow-sm transition-colors hover:bg-border/40 sm:inline-flex"
          >
            Download zip
          </a>
          <Link
            to="/studio"
            className="hidden rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-surface no-underline shadow-sm transition-all hover:bg-primary-dark hover:shadow sm:inline-flex"
          >
            Artist desk
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg transition-colors hover:bg-border/50 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-5 py-3 md:hidden animate-in fade-in slide-in-from-top-1 duration-200">
          {NAV.map((n) => {
            const active = pathname === n.to || pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 text-base font-medium no-underline transition-colors",
                  active ? "text-primary" : "text-fg",
                )}
              >
                {n.label}
              </Link>
            );
          })}
          <a
            href="/Code-Community-Museum-updated.zip"
            download="Code-Community-Museum-updated.zip"
            onClick={() => setOpen(false)}
            className="mt-1 mb-2 inline-flex rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-fg no-underline"
          >
            Download zip
          </a>
          <Link
            to="/studio"
            onClick={() => setOpen(false)}
            className="mt-1 mb-2 ml-2 inline-flex rounded-md bg-primary px-3.5 py-2.5 text-sm font-medium text-surface no-underline"
          >
            Artist desk
          </Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-serif text-sm font-semibold tracking-[0.12em] text-fg">
            {BRAND.nameUpper}
          </span>
        </div>
        <span className="text-sm text-muted">{BRAND.location}</span>
      </div>
    </footer>
  );
}

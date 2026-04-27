"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PRIMARY_NAV, type NavItem } from "@/lib/nav";
import { ButtonAnchor, Container } from "./ds";

const PRIMARY_HREFS = new Set([
  "/procedures/",
  "/smile-gallery/",
  "/financing-options/",
  "/patient-forms/",
  "/contact/",
]);

const ITEMS_PER_COLUMN = 6;

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

function ChevronDown({
  className = "",
  size = 12,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 4.5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Panel layouts                                                     */
/* ------------------------------------------------------------------ */

/**
 * Multi-column mega-menu used for sections that have categories with
 * sub-pages (Procedures, Smile Gallery). Renders every category as a
 * column header + a list of pages beneath. No scrollbars: long lists
 * are truncated with a "View all" link to the category page.
 */
function MegaMenuPanel({
  parent,
  onSelect,
}: {
  parent: NavItem;
  onSelect: () => void;
}) {
  const categories = parent.children ?? [];
  const colsClass =
    categories.length >= 5
      ? "lg:grid-cols-3 xl:grid-cols-3"
      : categories.length >= 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <Container>
      <div className="py-12 lg:py-14">
        <div className="grid grid-cols-12 gap-10 lg:gap-14">
          <div className="col-span-12 lg:col-span-9">
            <div className={`grid grid-cols-1 gap-x-12 gap-y-10 ${colsClass}`}>
              {categories.map((cat) => {
                const sub = cat.children ?? [];
                const visible = sub.slice(0, ITEMS_PER_COLUMN);
                const overflow = sub.length - visible.length;
                return (
                  <div key={cat.href}>
                    <Link
                      href={cat.href}
                      onClick={onSelect}
                      className="group inline-flex items-baseline gap-2"
                    >
                      <span className="font-serif text-[19px] leading-[1.2] tracking-[-0.01em] text-fg underline decoration-accent decoration-[3px] underline-offset-[5px]">
                        {cat.label}
                      </span>
                    </Link>
                    {sub.length ? (
                      <ul className="mt-4 space-y-2.5">
                        {visible.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onSelect}
                              className="block text-[13.5px] leading-[1.4] text-muted hover:text-fg"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                        {overflow > 0 ? (
                          <li>
                            <Link
                              href={cat.href}
                              onClick={onSelect}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-fg hover:text-accent"
                            >
                              View all {sub.length} →
                            </Link>
                          </li>
                        ) : null}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right rail — promotional / CTA */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="flex h-full flex-col justify-between bg-fg p-6 text-ink-contrast">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {parent.label}
                </span>
                <p className="mt-4 font-serif text-2xl leading-[1.2] tracking-[-0.01em]">
                  Not sure where to start?
                </p>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-white/70">
                  Speak with our team — we&rsquo;ll guide you to the right
                  treatment.
                </p>
              </div>
              <a
                href="tel:954-499-1599"
                onClick={onSelect}
                className="mt-6 inline-flex items-center justify-between bg-accent px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-fg hover:bg-bg hover:text-fg"
              >
                Call 954·499·1599
                <ChevronDown className="-rotate-90" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}

/** Compact dropdown for top-level items with only a flat children list. */
function SimplePanel({
  parent,
  onSelect,
}: {
  parent: NavItem;
  onSelect: () => void;
}) {
  return (
    <Container>
      <div className="py-6">
        <ul className="grid gap-1 sm:grid-cols-2">
          {(parent.children ?? []).map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onSelect}
                className="flex items-center justify-between px-4 py-3 text-[13.5px] font-medium text-fg hover:bg-fg hover:text-ink-contrast"
              >
                <span>{child.label}</span>
                <ChevronDown className="-rotate-90 opacity-60" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                            */
/* ------------------------------------------------------------------ */

export function SiteHeader() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close on outside click + on Escape.
  useEffect(() => {
    if (!openKey) return;

    function onDown(e: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setOpenKey(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenKey(null);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openKey]);

  const items = PRIMARY_NAV.filter((i) => PRIMARY_HREFS.has(i.href));
  const openItem = items.find((i) => i.href === openKey) ?? null;

  // Decide if the open menu should render as a mega menu (categories with
  // sub-pages) or as a simple compact dropdown.
  const isMega = !!openItem?.children?.some((c) => c.children?.length);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-bg shadow-[0_6px_18px_rgba(3,31,57,0.08)]"
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Oasis Dental — Home"
            onClick={() => setOpenKey(null)}
            className="group flex items-center gap-3"
          >
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center bg-fg text-ink-contrast"
            >
              <span className="font-serif text-lg leading-none">O</span>
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-[19px] tracking-[-0.01em]">
                Oasis Dental
              </span>
              <span className="block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-soft">
                Pembroke Pines · FL
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const hasChildren = !!item.children?.length;
              const isOpen = openKey === item.href;
              const baseCls =
                "inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium tracking-tight transition-colors";
              const stateCls = isOpen
                ? "bg-fg text-ink-contrast"
                : "text-ink hover:bg-fg hover:text-ink-contrast";
              return (
                <li key={item.href} className="relative">
                  {hasChildren ? (
                    isOpen ? (
                      <button
                        type="button"
                        onClick={() => setOpenKey(null)}
                        className={`${baseCls} ${stateCls}`}
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        {item.label}
                        <ChevronDown className="rotate-180 text-accent transition-transform duration-200" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenKey(item.href)}
                        className={`${baseCls} ${stateCls}`}
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {item.label}
                        <ChevronDown className="text-soft transition-transform duration-200" />
                      </button>
                    )
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpenKey(null)}
                      className={`${baseCls} ${stateCls}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonAnchor href="tel:954-499-1599" size="sm" variant="primary">
              <span className="hidden sm:inline">Call</span>
              <span>954·499·1599</span>
            </ButtonAnchor>
          </div>
        </div>
      </Container>

      {/* Mega-menu / dropdown panel — opens beneath the header */}
      {openItem ? (
        <div className="absolute inset-x-0 top-full hidden bg-bg lg:block">
          {isMega ? (
            <MegaMenuPanel
              parent={openItem}
              onSelect={() => setOpenKey(null)}
            />
          ) : (
            <SimplePanel parent={openItem} onSelect={() => setOpenKey(null)} />
          )}
        </div>
      ) : null}

      {/* Backdrop — subtle, doesn't darken the page but enables click-out */}
      {openItem ? (
        <div
          aria-hidden
          className="fixed inset-x-0 top-[calc(80px+4px)] bottom-0 -z-10 hidden bg-fg/10 lg:block"
          onClick={() => setOpenKey(null)}
        />
      ) : null}
    </header>
  );
}

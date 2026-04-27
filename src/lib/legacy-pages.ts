import "server-only";

import legacySummary from "../../summary.json";
import { PRIMARY_NAV, type NavItem } from "@/lib/nav";

export type LegacyCaptureResult = {
  originalUrl: string;
  finalUrl: string;
  status: number;
  html: string;
  screenshot: string;
  cssFiles: Array<{ url: string; file: string }>;
  errors: unknown[];
};

export type LegacyCaptureSummary = {
  capturedAt: string;
  total: number;
  ok: number;
  failed: number;
  results: LegacyCaptureResult[];
};

export type PageKind =
  | "home"
  | "standard"
  | "proceduresIndex"
  | "proceduresCategory"
  | "proceduresDetail"
  | "galleryIndex"
  | "galleryCategory"
  | "galleryDetail"
  | "financingIndex"
  | "financingDetail"
  | "contact"
  | "appointmentRequest"
  | "patientForms"
  | "testimonials";

export type LegacyPage = {
  path: string;
  title?: string;
  finalUrl: string;
  htmlPath: string;
  screenshotPath: string;
  kind: PageKind;
};

function ensureTrailingSlash(p: string) {
  return p.endsWith("/") ? p : `${p}/`;
}

function flattenNavItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [
    item,
    ...(item.children ? flattenNavItems(item.children) : []),
  ]);
}

function listFallbackLegacyPages(): LegacyPage[] {
  const extraPages: NavItem[] = [
    { label: "Welcome", href: "/welcome/" },
    { label: "Testimonials", href: "/testimonials/" },
  ];

  const pagesByPath = new Map<string, NavItem>();
  for (const item of [...extraPages, ...flattenNavItems(PRIMARY_NAV)]) {
    pagesByPath.set(ensureTrailingSlash(item.href), item);
  }

  return Array.from(pagesByPath.entries())
    .map(([pathname, item]) => ({
      path: pathname,
      title: item.label,
      finalUrl: `https://www.oasisdentalpembrokepines.com${pathname}`,
      htmlPath: "",
      screenshotPath: "",
      kind: classifyPath(pathname),
    }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

export function classifyPath(p: string): PageKind {
  const pathname = ensureTrailingSlash(p);

  if (pathname === "/") return "home";
  if (pathname === "/contact/") return "contact";
  if (pathname === "/appointment-request/") return "appointmentRequest";
  if (pathname === "/patient-forms/") return "patientForms";
  if (pathname === "/testimonials/") return "testimonials";
  if (pathname === "/financing-options/") return "financingIndex";
  if (pathname.startsWith("/financing-options/")) return "financingDetail";

  if (pathname === "/procedures/") return "proceduresIndex";
  if (pathname.startsWith("/procedures/")) {
    const parts = pathname.split("/").filter(Boolean); // ["procedures", ...]
    if (parts.length === 2) return "proceduresCategory";
    return "proceduresDetail";
  }

  if (pathname === "/smile-gallery/") return "galleryIndex";
  if (pathname.startsWith("/smile-gallery/")) {
    const parts = pathname.split("/").filter(Boolean); // ["smile-gallery", ...]
    if (parts.length === 2) return "galleryCategory";
    return "galleryDetail";
  }

  return "standard";
}

export async function readLegacySummary(): Promise<LegacyCaptureSummary> {
  return legacySummary as LegacyCaptureSummary;
}

export async function listLegacyPages(): Promise<LegacyPage[]> {
  const summary = await readLegacySummary();

  if (summary.results.length === 0) {
    return listFallbackLegacyPages();
  }

  return summary.results
    .map((r) => {
      const url = new URL(r.finalUrl);
      const pathname = ensureTrailingSlash(url.pathname);
      return {
        path: pathname,
        finalUrl: r.finalUrl,
        htmlPath: r.html.replaceAll("\\", "/"),
        screenshotPath: r.screenshot.replaceAll("\\", "/"),
        kind: classifyPath(pathname),
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

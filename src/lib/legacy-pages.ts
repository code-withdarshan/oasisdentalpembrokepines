import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

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
  finalUrl: string;
  htmlPath: string;
  screenshotPath: string;
  kind: PageKind;
};

const SUMMARY_PATH_CANDIDATES = [
  path.join(process.cwd(), "summary.json"),
  path.join(process.cwd(), "public", "legacy-screenshots", "summary.json"),
  path.join(process.cwd(), "..", "summary.json"),
] as const;

let summaryPromise: Promise<LegacyCaptureSummary> | null = null;
let warnedMissingSummary = false;
const shouldLogMissingSummary = process.env.LEGACY_SUMMARY_VERBOSE === "1";

function ensureTrailingSlash(p: string) {
  return p.endsWith("/") ? p : `${p}/`;
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
  if (!summaryPromise) {
    summaryPromise = (async () => {
      for (const summaryPath of SUMMARY_PATH_CANDIDATES) {
        try {
          const raw = await readFile(summaryPath, "utf-8");
          return JSON.parse(raw) as LegacyCaptureSummary;
        } catch (error) {
          const err = error as NodeJS.ErrnoException;
          if (err?.code === "ENOENT") continue;
          throw error;
        }
      }

      if (!warnedMissingSummary && shouldLogMissingSummary) {
        warnedMissingSummary = true;
        console.warn(
          [
            "[legacy-pages] No summary.json file was found.",
            "Checked locations:",
            ...SUMMARY_PATH_CANDIDATES.map((p) => `- ${p}`),
            "Continuing with zero captured legacy pages.",
          ].join("\n"),
        );
      }

      return {
        capturedAt: "",
        total: 0,
        ok: 0,
        failed: 0,
        results: [],
      } satisfies LegacyCaptureSummary;
    })();
  }

  return summaryPromise;
}

export async function listLegacyPages(): Promise<LegacyPage[]> {
  const summary = await readLegacySummary();

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


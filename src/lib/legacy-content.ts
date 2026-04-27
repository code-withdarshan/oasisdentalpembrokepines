import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

export type LegacyPageContent = {
  title: string | null;
  description: string | null;
  canonical: string | null;
  h1: string | null;
  h2: string | null;
  bodyHtml: string;
};

type LegacyContentFallback = {
  path?: string;
  title?: string;
  kind?: string;
};

function titleFromPath(pathname?: string) {
  const leaf = pathname?.split("/").filter(Boolean).at(-1) ?? "Oasis Dental";
  return decodeURIComponent(leaf)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bTmj\b/g, "TMJ")
    .replace(/\bFaqs\b/g, "FAQs")
    .replace(/\bX Rays\b/g, "X-Rays")
    .replace(/\bCarecredit\b/g, "CareCredit");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createFallbackContent(
  fallback?: LegacyContentFallback,
): LegacyPageContent {
  const title = fallback?.title ?? titleFromPath(fallback?.path);
  const lowerTitle = title.toLowerCase();
  const isGallery = fallback?.kind?.startsWith("gallery") ?? false;
  const isProcedure =
    fallback?.kind?.startsWith("procedures") ||
    fallback?.path?.startsWith("/procedures/");

  const description = isGallery
    ? `Explore ${lowerTitle} examples from Oasis Dental in Pembroke Pines.`
    : isProcedure
      ? `Learn about ${lowerTitle} at Oasis Dental in Pembroke Pines.`
      : `${title} information from Oasis Dental in Pembroke Pines.`;

  const body = isGallery
    ? `This section shares ${lowerTitle} information from the Oasis Dental smile gallery.`
    : isProcedure
      ? `This page explains ${lowerTitle}, what to expect, and how the Oasis Dental team approaches care with comfort and clarity.`
      : `Find helpful ${lowerTitle} information for Oasis Dental patients and visitors.`;

  return {
    title,
    description,
    canonical: null,
    h1: title,
    h2: title,
    bodyHtml: `<p>${escapeHtml(body)}</p>`,
  };
}

function resolveLegacyHtmlPath(htmlPathFromSummary: string) {
  return path.join(
    /*turbopackIgnore: true*/ process.cwd(),
    htmlPathFromSummary,
  );
}

function rewriteLegacyLinks(html: string) {
  return html
    .replaceAll("Contact.aspx", "/contact/")
    .replaceAll("AppointmentRequest.aspx", "/appointment-request/")
    .replaceAll("OurPractice.aspx", "/our-practice/")
    .replaceAll("Procedures.aspx", "/procedures/")
    .replaceAll("Contact.aspx", "/contact/")
    .replace(/\sstyle="[^"]*display\s*:\s*none\s*;?[^"]*"/gi, "");
}

function cleanMainContent($: cheerio.CheerioAPI) {
  // Remove scripts, iframes, ASP.NET hidden fields, and form scaffolding.
  $("script,noscript,style,link,meta,iframe").remove();
  $("input,select,textarea,button").remove();
  $("form").remove();

  // Legacy FAQ accordions ship answers with inline `display: none`.
  // Static pages should show the imported answer content by default.
  $(".accordion .content, [style*='display: none']").each((_, el) => {
    const $el = $(el);
    const style = $el.attr("style") ?? "";
    const nextStyle = style
      .replace(/display\s*:\s*none\s*;?/gi, "")
      .trim();
    if (nextStyle) {
      $el.attr("style", nextStyle);
    } else {
      $el.removeAttr("style");
    }
  });

  // Strip out broken/legacy imagery — original assets lived on prosites.com
  // and statcounter.com which we don't proxy. Empty wrappers, scoped CSS
  // classes, and placeholders are cleaned up so prose renders clean.
  $("img").each((_, el) => {
    const src = $(el).attr("src") ?? "";
    // Drop trackers, data-uri trackers, legacy CMS assets and any external img.
    if (
      src.startsWith("data:") ||
      src.includes("statcounter") ||
      src.includes("prosites.com") ||
      src.includes("carecredit") ||
      src.startsWith("//") ||
      src.startsWith("http")
    ) {
      $(el).remove();
    }
  });

  // Drop any empty link wrappers and "modal" placeholder anchors left behind.
  $("a").each((_, el) => {
    const $el = $(el);
    if (!$el.text().trim() && $el.children().length === 0) {
      $el.remove();
    }
  });

  // Tidy up empty containers.
  $("div,span,p,section,article").each((_, el) => {
    const $el = $(el);
    if (!$el.text().trim() && $el.children().length === 0) {
      $el.remove();
    }
  });
}

export async function readLegacyHtmlMain(
  htmlPathFromSummary: string,
  fallback?: LegacyContentFallback,
): Promise<LegacyPageContent> {
  if (!htmlPathFromSummary) {
    return createFallbackContent(fallback);
  }

  const full = resolveLegacyHtmlPath(htmlPathFromSummary);
  let raw: string;
  try {
    raw = await readFile(full, "utf-8");
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err?.code === "ENOENT") {
      return createFallbackContent(fallback);
    }
    throw error;
  }

  const $ = cheerio.load(raw);

  const title = $("head title").first().text().trim() || null;
  const description =
    $('head meta[name="description"]').attr("content")?.trim() || null;
  const canonical = $('head link[rel="canonical"]').attr("href")?.trim() || null;

  const contentRoot =
    $(".user-content .col-md-10.col-md-offset-1").first().length
      ? $(".user-content .col-md-10.col-md-offset-1").first()
      : $(".user-content .col-md-10").first();

  // Fallback to main tag if needed.
  const main = contentRoot.length ? contentRoot : $("main").first();

  cleanMainContent($);

  // Capture headings (useful for templates and breadcrumbs).
  const h1 = main.find("h1").first().text().trim() || null;
  const h2 = main.find("h2").first().text().trim() || null;

  // Keep HTML for rendering; rewrite legacy links to new slugs.
  const bodyHtml = rewriteLegacyLinks(main.html() ?? "");

  return {
    title,
    description,
    canonical,
    h1,
    h2,
    bodyHtml,
  };
}

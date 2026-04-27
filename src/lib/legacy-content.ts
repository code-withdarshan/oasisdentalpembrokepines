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

function resolveLegacyHtmlPath(htmlPathFromSummary: string) {
  // App runs in `oasis-dental/`; legacy artifacts live one folder up.
  return path.join(process.cwd(), "..", htmlPathFromSummary);
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
): Promise<LegacyPageContent> {
  const full = resolveLegacyHtmlPath(htmlPathFromSummary);
  const raw = await readFile(full, "utf-8");
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


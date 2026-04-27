import type { ReactNode } from "react";

/**
 * Long-form article styling for legacy HTML content.
 * Mirrors the typography established in the design system (`ds.tsx`).
 */
export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "max-w-none text-ink",
        // Paragraphs
        "[&_p]:my-6 [&_p]:text-[17px] [&_p]:leading-[1.8] [&_p]:text-muted",
        // Headings
        "[&_h1]:font-serif [&_h1]:text-4xl [&_h1]:sm:text-5xl [&_h1]:leading-[1.06] [&_h1]:tracking-[-0.02em] [&_h1]:text-fg [&_h1]:mt-2 [&_h1]:mb-6",
        "[&_h2]:font-serif [&_h2]:text-3xl [&_h2]:sm:text-4xl [&_h2]:leading-[1.08] [&_h2]:tracking-[-0.02em] [&_h2]:text-fg [&_h2]:mt-16 [&_h2]:mb-5 [&_h2]:bg-paper [&_h2]:px-6 [&_h2]:py-5",
        "[&_h3]:font-serif [&_h3]:text-2xl [&_h3]:leading-[1.2] [&_h3]:tracking-[-0.01em] [&_h3]:text-fg [&_h3]:mt-10 [&_h3]:mb-4",
        "[&_h4]:text-base [&_h4]:font-semibold [&_h4]:tracking-tight [&_h4]:text-fg [&_h4]:mt-8 [&_h4]:mb-3",
        // Lists
        "[&_ul]:my-6 [&_ul]:pl-6 [&_ul]:list-disc",
        "[&_ol]:my-6 [&_ol]:pl-6 [&_ol]:list-decimal",
        "[&_li]:my-2 [&_li]:text-muted [&_li]:leading-[1.75] [&_li]:pl-1",
        "[&_li::marker]:text-brand-mid",
        // Inline
        "[&_a]:font-semibold [&_a]:text-fg [&_a]:no-underline hover:[&_a]:text-brand-mid",
        "[&_strong]:text-fg [&_strong]:font-semibold",
        "[&_em]:font-serif [&_em]:not-italic [&_em]:tracking-tight",
        // Block elements
        "[&_blockquote]:my-10 [&_blockquote]:bg-accent-field [&_blockquote]:px-8 [&_blockquote]:py-7 [&_blockquote]:font-serif [&_blockquote]:text-2xl [&_blockquote]:leading-[1.35] [&_blockquote]:text-fg",
        "[&_img]:my-8 [&_img]:max-w-full [&_img]:h-auto",
        "[&_hr]:my-12 [&_hr]:h-px [&_hr]:w-full [&_hr]:bg-line",
        "[&_table]:my-8 [&_table]:w-full [&_table]:text-sm",
        "[&_th]:py-3 [&_th]:pr-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-fg",
        "[&_td]:py-3 [&_td]:pr-4 [&_td]:text-muted",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

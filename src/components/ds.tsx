/**
 * Oasis Dental — centralized design system
 * ------------------------------------------------------------------
 * Single source of truth for all brand-level UI primitives.
 *
 * Brand rules enforced here:
 *  - No border-radius anywhere (also enforced globally in globals.css).
 *  - No `border-*` utilities — visual separation via background tone or
 *    explicit `<Hr />` hairline divs.
 *  - Black foundation with deep blue and bright clinical cyan accents.
 *  - Fraunces (serif) for display + Inter (sans) for UI/body.
 *
 * Compose pages from these primitives — do NOT hand-roll long Tailwind
 * strings inside page files when a primitive already covers the case.
 */

import Image from "next/image";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ComponentProps,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { type Photo, unsplash } from "@/lib/media";

/* ------------------------------------------------------------------ */
/*  Layout                                                            */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  /**
   * default → 1440px (the standard layout container).
   * wide    → 1600px (rare full-bleed sections).
   * narrow  → 768px  (article / reading width).
   */
  width?: "default" | "wide" | "narrow";
}) {
  const max =
    width === "wide"
      ? "max-w-[1600px]"
      : width === "narrow"
        ? "max-w-3xl"
        : "max-w-[1440px]";
  return (
    <div className={`mx-auto w-full px-6 sm:px-10 lg:px-12 ${max} ${className}`}>
      {children}
    </div>
  );
}

type SectionTone = "default" | "surface" | "paper" | "ink" | "accent";
type SectionPadding = "default" | "tight" | "hero" | "none";

const sectionTone: Record<SectionTone, string> = {
  default: "bg-bg text-ink",
  surface: "bg-clinic-paper text-ink",
  paper: "bg-paper text-ink texture-grid",
  ink: "bg-brand-depth text-night-text",
  accent: "bg-accent-field text-accent-fg",
};

const sectionPad: Record<SectionPadding, string> = {
  default: "py-20 sm:py-24 lg:py-32",
  tight: "py-14 sm:py-18 lg:py-20",
  hero: "pt-14 pb-20 sm:pt-20 sm:pb-30 lg:pt-28 lg:pb-36",
  none: "",
};

export function Section({
  children,
  tone = "default",
  padding = "default",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: SectionTone;
  padding?: SectionPadding;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${sectionTone[tone]} ${sectionPad[padding]} ${className}`}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Vertical rhythm                                                   */
/* ------------------------------------------------------------------ */

const stackGap = {
  xs: "space-y-2",
  sm: "space-y-3",
  md: "space-y-5",
  lg: "space-y-8",
  xl: "space-y-12",
} as const;

export function Stack({
  children,
  gap = "md",
  className = "",
  as: Comp = "div",
}: {
  children: ReactNode;
  gap?: keyof typeof stackGap;
  className?: string;
  as?: ElementType;
}) {
  return <Comp className={`${stackGap[gap]} ${className}`}>{children}</Comp>;
}

/* ------------------------------------------------------------------ */
/*  Typography                                                        */
/* ------------------------------------------------------------------ */

type EyebrowTone = "default" | "ink" | "accent" | "invert";

export function Eyebrow({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: EyebrowTone;
  className?: string;
}) {
  const toneCls: Record<EyebrowTone, string> = {
    default: "bg-brand-soft/80 px-3 py-1 text-brand-deep",
    ink: "bg-brand-mid/30 px-3 py-1 text-night-text",
    invert: "text-white",
    accent: "bg-accent px-3 py-1 text-accent-fg",
  };
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] ${toneCls[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

type HeadingLevel = "display" | "h1" | "h2" | "h3" | "h4";
const headingTag: Record<HeadingLevel, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};
const headingCls: Record<HeadingLevel, string> = {
  display:
    "font-serif text-[48px] sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.98] tracking-[-0.035em]",
  h1: "font-serif text-4xl sm:text-5xl lg:text-[68px] leading-[1.01] tracking-[-0.03em]",
  h2: "font-serif text-[34px] sm:text-4xl lg:text-[56px] leading-[1.04] tracking-[-0.025em]",
  h3: "font-serif text-2xl sm:text-3xl leading-[1.2] tracking-[-0.01em]",
  h4: "font-sans text-lg sm:text-xl font-semibold leading-[1.3] tracking-tight",
};

export function Heading({
  children,
  level = "h2",
  as,
  className = "",
}: {
  children: ReactNode;
  level?: HeadingLevel;
  as?: ElementType;
  className?: string;
}) {
  const Comp = (as ?? headingTag[level]) as ElementType;
  return (
    <Comp className={`text-fg ${headingCls[level]} ${className}`}>
      {children}
    </Comp>
  );
}

export function Lead({
  children,
  className = "",
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "ink" | "invert";
}) {
  const toneCls = {
    muted: "text-muted",
    ink: "text-ink",
    invert: "text-night-text",
  }[tone];
  return (
    <p
      className={`text-[17px] sm:text-lg leading-[1.65] ${toneCls} ${className}`}
    >
      {children}
    </p>
  );
}

export function Body({
  children,
  className = "",
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "ink" | "invert";
}) {
  const toneCls = {
    muted: "text-muted",
    ink: "text-ink",
    invert: "text-night-text",
  }[tone];
  return (
    <p className={`text-[15.5px] leading-[1.7] ${toneCls} ${className}`}>
      {children}
    </p>
  );
}

export function Label({
  children,
  className = "",
  tone = "soft",
}: {
  children: ReactNode;
  className?: string;
  tone?: "soft" | "invert";
}) {
  const toneCls = {
    soft: "text-soft",
    invert: "text-white/60",
  }[tone];
  return (
    <span
      className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${toneCls} ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Surfaces                                                          */
/* ------------------------------------------------------------------ */

type CardTone = "surface" | "paper" | "ink" | "accent" | "outline";

export function Card({
  children,
  tone = "surface",
  className = "",
  padding = "default",
  as: Comp = "div",
}: {
  children: ReactNode;
  tone?: CardTone;
  className?: string;
  padding?: "default" | "tight" | "loose" | "none";
  as?: ElementType;
}) {
  const toneCls: Record<CardTone, string> = {
    surface: "bg-surface text-ink",
    paper: "bg-paper text-ink",
    ink: "bg-brand-depth text-night-text",
    accent: "bg-accent-field text-accent-fg",
    outline: "bg-bg text-ink",
  };
  const padCls = {
    default: "p-6 sm:p-8 lg:p-10",
    tight: "p-5 sm:p-6",
    loose: "p-8 sm:p-10 lg:p-16",
    none: "",
  }[padding];
  return (
    <Comp className={`${toneCls[tone]} ${padCls} ${className}`}>
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/*  Dividers                                                          */
/* ------------------------------------------------------------------ */

type DividerVariant = "accent" | "hair" | "hair-invert";

export function Divider({
  variant = "hair",
  className = "",
}: {
  variant?: DividerVariant;
  className?: string;
}) {
  const cls = {
    accent: "h-2 w-24 bg-accent-field",
    hair: "h-px w-full bg-line",
    "hair-invert": "h-px w-full bg-white/15",
  }[variant];
  return <div aria-hidden className={`${cls} ${className}`} />;
}

/* ------------------------------------------------------------------ */
/*  Buttons & links                                                   */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "accent" | "inverse" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.18em] transition-all duration-200";

const buttonSize: Record<ButtonSize, string> = {
  sm: "px-4 py-3 text-[11px]",
  md: "px-6 py-4 text-[12px]",
  lg: "px-8 py-5 text-[12px]",
};

const buttonVariant: Record<ButtonVariant, string> = {
  primary:
    "bg-fg text-ink-contrast hover:bg-accent-field hover:text-accent-fg",
  secondary:
    "bg-paper text-ink hover:bg-fg hover:text-ink-contrast",
  accent:
    "bg-accent-field text-accent-fg hover:bg-fg hover:text-ink-contrast",
  inverse:
    "bg-bg text-ink hover:bg-accent-field hover:text-accent-fg",
  ghost:
    "bg-brand-soft/70 text-ink hover:bg-accent hover:text-accent-fg",
};

function buttonClass(
  variant: ButtonVariant,
  size: ButtonSize,
  extra: string = "",
) {
  return `${buttonBase} ${buttonSize[size]} ${buttonVariant[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <Link {...props} className={buttonClass(variant, size, className)} />;
}

export function ButtonAnchor({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <a {...props} className={buttonClass(variant, size, className)} />;
}

/* Inline link (in copy) */
export function TextLink({
  className = "",
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`font-semibold text-fg no-underline hover:text-brand-mid ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Rich composition blocks                                           */
/* ------------------------------------------------------------------ */

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-4xl text-center" : "max-w-3xl"} ${className}`}
    >
      <Stack gap="md">
        {eyebrow ? (
          <div className={centered ? "flex justify-center" : ""}>
            <Eyebrow tone="accent">{eyebrow}</Eyebrow>
          </div>
        ) : null}
        <Heading level="h2">{title}</Heading>
        <div className={centered ? "flex justify-center" : ""}>
          <Divider variant="accent" />
        </div>
        {lead ? <Lead className={centered ? "mx-auto max-w-2xl" : ""}>{lead}</Lead> : null}
      </Stack>
    </div>
  );
}

export function FeatureTile({
  icon,
  title,
  children,
  index,
  className = "",
}: {
  icon?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <Card
      padding="default"
      tone="paper"
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="absolute right-0 top-0 h-24 w-24 bg-brand-soft/70"
      />
      <div className="relative flex items-start justify-between gap-6">
        <div className="text-fg">{icon}</div>
        {typeof index === "number" ? (
          <span className="font-serif text-5xl leading-none tracking-[-0.04em] text-brand-deep/25">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <div className="relative mt-9 font-serif text-[24px] leading-[1.15] tracking-[-0.015em] text-fg">
        {title}
      </div>
      {children ? (
        <div className="relative mt-4 text-[14.5px] leading-[1.7] text-muted">
          {children}
        </div>
      ) : null}
    </Card>
  );
}

export function AccentPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-accent-field p-8 sm:p-10 lg:p-14 ${className}`}>
      <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 bg-white/25" />
      <div aria-hidden className="absolute bottom-0 left-0 h-4 w-1/2 bg-fg" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Misc utilities                                                    */
/* ------------------------------------------------------------------ */

export function VisuallyHidden({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="absolute h-px w-px overflow-hidden whitespace-nowrap clip-[rect(0,0,0,0)]">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Imagery                                                           */
/* ------------------------------------------------------------------ */

type MediaRatio = "square" | "portrait" | "landscape" | "wide" | "hero";
const ratioCls: Record<MediaRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  hero: "aspect-[5/6] sm:aspect-[4/5] lg:aspect-[5/6]",
};

/**
 * `<Media>` — the canonical image surface.
 *
 * Wraps next/image with brand defaults: zero radius, edge-to-edge cover,
 * warm image treatment and a quiet ink overlay when copy sits on top.
 */
export function Media({
  photo,
  ratio = "landscape",
  priority = false,
  width = 1600,
  className = "",
  overlay = false,
  tone = "default",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  photo: Photo;
  ratio?: MediaRatio;
  priority?: boolean;
  width?: number;
  className?: string;
  overlay?: boolean;
  tone?: "default" | "ink";
  sizes?: string;
}) {
  const objectPosition = photo.position ?? "center";
  return (
    <div
      className={`relative w-full overflow-hidden ${ratioCls[ratio]} ${
        tone === "ink" ? "bg-fg" : "bg-surface"
      } ${className}`}
    >
      <div
        aria-hidden
        className="absolute -right-6 -top-6 z-0 h-24 w-24 bg-accent"
      />
      <Image
        src={unsplash(photo.id, { w: width })}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectFit: "cover", objectPosition }}
        className="z-10 select-none saturate-[1.08] contrast-[1.04]"
      />
      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-fg/80 via-fg/30 to-transparent"
        />
      ) : null}
    </div>
  );
}

/** Decorative dotted background grid used to add texture to plain sections. */
export function DottedBackground({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "soft";
}) {
  const toneCls = tone === "ink" ? "opacity-80 mix-blend-screen" : "opacity-70";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 texture-dots ${toneCls} ${className}`}
    />
  );
}

/** Single stat tile (number + caption) used in stats strips. */
export function Stat({
  value,
  label,
  className = "",
}: {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-paper p-6 ${className}`}>
      <div aria-hidden className="absolute right-0 top-0 h-16 w-16 bg-brand-soft/80" />
      <div className="relative font-serif text-5xl leading-[1] tracking-[-0.04em] text-fg sm:text-6xl">
        {value}
      </div>
      <div className="relative mt-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-soft">
        {label}
      </div>
    </div>
  );
}

/* Low-level hairline rule for inside dark cards & sidebars. */
export function Hr({
  tone = "default",
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement> & { tone?: "default" | "invert" }) {
  const cls = tone === "invert" ? "bg-white/15" : "bg-line";
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`h-px w-full ${cls} ${className}`}
      {...rest}
    />
  );
}

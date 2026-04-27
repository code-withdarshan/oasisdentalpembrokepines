/**
 * Line-icon set used across service tiles, list items, and decorative
 * elements. Strokes are 1.5px to match the editorial brand voice; uses
 * `currentColor` so they inherit text color from their container.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({
  size = 28,
  className = "",
  children,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

export function ToothIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 3.5C5.5 3.5 4 5 4 7.5c0 2 .5 3 1 5s.5 4 1 5.5 1.2 2.5 2 2.5 1.4-1.5 1.7-3.2c.2-1.4.5-2.3 1.3-2.3s1.1.9 1.3 2.3c.3 1.7.9 3.2 1.7 3.2s1.5-1 2-2.5.5-3.5 1-5.5.5-3 1-5C20.5 5 19 3.5 16 3.5c-2 0-2.7 1-4 1s-2-1-4-1Z" />
    </Svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </Svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
    </Svg>
  );
}

export function StethoscopeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3v6a4 4 0 0 0 8 0V3" />
      <path d="M6 3h2M12 3h2" />
      <path d="M10 13v3a4 4 0 0 0 8 0" />
      <circle cx="18" cy="18" r="2" />
    </Svg>
  );
}

export function ScissorsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 8 20 20M8 16 20 4" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4 12 5 5L20 6" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 1-2Z" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 6h18v12H3z" />
      <path d="m3 6 9 7 9-7" />
    </Svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg
      width={props.size ?? 56}
      height={props.size ?? 56}
      viewBox="0 0 56 56"
      fill="currentColor"
      aria-hidden="true"
      className={props.className}
    >
      <path d="M11 36c0-9 6-16 14-19l2 5c-5 2-9 7-9 12h7v15H11V36Zm22 0c0-9 6-16 14-19l2 5c-5 2-9 7-9 12h7v15H33V36Z" />
    </svg>
  );
}

/* Map service hrefs → icon component (used by services grids). */
export const SERVICE_ICONS: Record<
  string,
  (props: IconProps) => React.ReactElement
> = {
  "/procedures/cleanings-prevention/": ShieldIcon,
  "/procedures/cosmetic-dentistry/": SparkleIcon,
  "/procedures/restorations/": ToothIcon,
  "/procedures/periodontics/": HeartIcon,
  "/procedures/oral-maxillofacial-surgery/": ScissorsIcon,
  "/procedures/periodontal-disease/": StethoscopeIcon,
};

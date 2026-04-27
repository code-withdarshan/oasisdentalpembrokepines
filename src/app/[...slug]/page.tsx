import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import * as cheerio from "cheerio";
import {
  AccentPanel,
  ButtonAnchor,
  ButtonLink,
  Card,
  Container,
  Divider,
  DottedBackground,
  Eyebrow,
  Heading,
  Hr,
  Lead,
  Media,
  Section,
  Stack,
} from "@/components/ds";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  HeartIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  QuoteIcon,
  SERVICE_ICONS,
  ShieldIcon,
  SparkleIcon,
} from "@/components/icons";
import { Prose } from "@/components/Prose";
import { listLegacyPages } from "@/lib/legacy-pages";
import { readLegacyHtmlMain } from "@/lib/legacy-content";
import { coverPhotoFor, PHOTOS } from "@/lib/media";
import {
  findNavItemByHref,
  findParentOfHref,
  PRIMARY_NAV,
  type NavItem,
} from "@/lib/nav";

const PHONE = "954-499-1599";
const PHONE_DISPLAY = "954·499·1599";
const EMAIL = "oasisdental10796@gmail.com";
const MAPS_HREF =
  "https://maps.google.com/?daddr=10796+Pines+Boulevard,Pembroke+Pines,FL+33026";

function joinPath(slug: string[] | undefined) {
  const parts = slug ?? [];
  return `/${parts.join("/")}/`.replaceAll("//", "/");
}

export async function generateStaticParams() {
  const pages = await listLegacyPages();
  return pages
    .filter((p) => p.path !== "/")
    .map((p) => ({
      slug: p.path.split("/").filter(Boolean),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pathname = joinPath(slug);
  const pages = await listLegacyPages();
  const match = pages.find((p) => p.path === pathname);
  if (!match) return {};

  const content = await readLegacyHtmlMain(match.htmlPath, match);
  return {
    title: content.title ?? undefined,
    description: content.description ?? undefined,
    alternates: content.canonical
      ? { canonical: content.canonical }
      : undefined,
  };
}

/* ------------------------------------------------------------------ */
/*  Reusable: Page hero                                               */
/* ------------------------------------------------------------------ */

function PageHero({
  eyebrow,
  title,
  subtitle,
  path,
  layout = "split",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string | null;
  path: string;
  layout?: "split" | "centered";
}) {
  const cover = coverPhotoFor(path);

  if (layout === "centered") {
    return (
      <Section padding="hero">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Stack gap="md">
              {eyebrow ? <Eyebrow tone="accent">{eyebrow}</Eyebrow> : null}
              <Heading level="h1">{title}</Heading>
              {subtitle ? <Lead className="mx-auto">{subtitle}</Lead> : null}
              <div className="flex justify-center pt-2">
                <Divider variant="accent" />
              </div>
            </Stack>
          </div>
        </Container>
        <Container className="mt-14">
          <Media photo={cover} ratio="wide" priority />
        </Container>
      </Section>
    );
  }

  return (
    <Section padding="hero">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 lg:self-center">
            <Stack gap="md">
              {eyebrow ? <Eyebrow tone="accent">{eyebrow}</Eyebrow> : null}
              <Heading level="h1">{title}</Heading>
              <Divider variant="accent" />
              {subtitle ? <Lead className="max-w-xl">{subtitle}</Lead> : null}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <ButtonLink href="/appointment-request/" variant="primary">
                  Request appointment
                </ButtonLink>
                <ButtonAnchor href={`tel:${PHONE}`} variant="ghost">
                  <PhoneIcon size={14} />
                  Call {PHONE_DISPLAY}
                </ButtonAnchor>
              </div>
            </Stack>
          </div>
          <aside className="lg:col-span-5">
            <Media
              photo={cover}
              ratio="hero"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </aside>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable: Quick facts strip (below hero on detail pages)          */
/* ------------------------------------------------------------------ */

const QUICK_FACTS: Array<{
  Icon: (p: { size?: number; className?: string }) => React.ReactElement;
  label: string;
  value: string;
}> = [
  { Icon: ClockIcon, label: "Visit length", value: "30 — 90 mins" },
  { Icon: HeartIcon, label: "Comfort", value: "Gentle pacing" },
  { Icon: ShieldIcon, label: "Anesthesia", value: "Local · as needed" },
  { Icon: SparkleIcon, label: "Outcome", value: "Healthy, natural" },
];

function QuickFactsStrip() {
  return (
    <Section padding="tight" className="!pt-0">
      <Container>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_FACTS.map((f) => (
            <li
              key={f.label}
              className="flex items-start gap-4 bg-paper p-6 sm:p-7"
            >
              <f.Icon size={26} className="mt-1 shrink-0 text-fg" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-soft">
                  {f.label}
                </div>
                <div className="mt-2 font-serif text-[20px] leading-[1.2] tracking-[-0.01em] text-fg">
                  {f.value}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable: Process / What to expect                                */
/* ------------------------------------------------------------------ */

const DETAIL_PROCESS: Array<{ step: string; title: string; body: string }> = [
  {
    step: "01",
    title: "Comprehensive consult.",
    body: "We start with a calm conversation, exam and imaging — and explain every option in plain language.",
  },
  {
    step: "02",
    title: "A clear, fair plan.",
    body: "You receive an itemised treatment plan with timing and costs — no pressure, no surprises.",
  },
  {
    step: "03",
    title: "Treatment, gently delivered.",
    body: "Every appointment is paced for your comfort, with modern tools and a steady, careful hand.",
  },
];

function ProcessSection() {
  return (
    <Section tone="ink" className="relative overflow-hidden">
      <DottedBackground />
      <Container>
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Stack gap="md">
              <Eyebrow tone="ink">How we work</Eyebrow>
              <Heading level="h2" className="!text-white">
                What to expect.
              </Heading>
              <Divider variant="accent" />
              <p className="text-[15.5px] leading-[1.7] text-night-text">
                A predictable, calm experience — from your first call through
                follow-up care.
              </p>
            </Stack>
          </div>
          <ol className="lg:col-span-8 grid gap-px bg-white/10 sm:grid-cols-3">
            {DETAIL_PROCESS.map((p) => (
              <li key={p.step} className="bg-fg p-7 sm:p-8">
                <div className="font-serif text-5xl leading-[1] tracking-[-0.02em] text-accent">
                  {p.step}
                </div>
                <div className="mt-8 font-serif text-[22px] leading-[1.2] tracking-[-0.01em] text-white">
                  {p.title}
                </div>
                <p className="mt-3 text-[14px] leading-[1.65] text-white/70">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable: Related procedures grid                                 */
/* ------------------------------------------------------------------ */

function RelatedSection({
  parent,
  currentHref,
}: {
  parent: NavItem;
  currentHref: string;
}) {
  const siblings = (parent.children ?? []).filter(
    (c) => c.href !== currentHref,
  );
  if (siblings.length === 0) return null;
  const items = siblings.slice(0, 6);

  return (
    <Section tone="surface">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Related</Eyebrow>
            <Heading level="h2" className="mt-4 max-w-2xl">
              More in {parent.label}.
            </Heading>
          </div>
          <ButtonLink href={parent.href} variant="primary">
            All {parent.label} <ArrowRightIcon size={14} />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <li key={s.href} className="bg-surface">
              <Link
                href={s.href}
                className="group flex h-full flex-col p-6 hover:bg-fg hover:text-ink-contrast sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-soft group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowRightIcon
                    size={14}
                    className="text-soft group-hover:text-accent"
                  />
                </div>
                <div className="mt-10 font-serif text-[20px] leading-[1.2] tracking-[-0.01em] sm:text-[22px]">
                  {s.label}
                </div>
                <span className="mt-6 text-[13px] leading-[1.65] text-muted group-hover:text-white/70">
                  Learn more about this treatment.
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable: Per-page FAQ                                            */
/* ------------------------------------------------------------------ */

const PAGE_FAQS: Array<{ q: string; a: string }> = [
  {
    q: "How long will my appointment take?",
    a: "Most visits run 30 to 90 minutes depending on the treatment. We confirm timing when you schedule and never rush a procedure.",
  },
  {
    q: "Will I be comfortable during treatment?",
    a: "Comfort is our priority. We use local anesthetic where appropriate and pace each step to your needs — please tell us if anything feels off.",
  },
  {
    q: "How much will it cost?",
    a: "We provide a clear, itemised estimate before any treatment begins, and we work with most major PPO insurance plans plus CareCredit financing.",
  },
];

function FaqSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Stack gap="md">
              <Eyebrow>Common questions</Eyebrow>
              <Heading level="h2">Helpful answers.</Heading>
              <Divider variant="accent" />
              <p className="text-[15.5px] leading-[1.7] text-muted">
                Don&rsquo;t see your question? Reach out — we&rsquo;ll always
                take the time to answer.
              </p>
              <div className="pt-2">
                <ButtonLink href="/faqs/" variant="primary">
                  All FAQs <ArrowRightIcon size={14} />
                </ButtonLink>
              </div>
            </Stack>
          </div>

          <div className="lg:col-span-8">
            <ul>
              {PAGE_FAQS.map((f, i) => (
                <li key={f.q} className="py-6 first:pt-0 last:pb-0">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                      <span className="font-serif text-[20px] leading-[1.3] tracking-[-0.01em] text-fg sm:text-[22px]">
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className="relative mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center bg-surface text-soft transition-colors group-open:bg-accent group-open:text-accent-fg"
                      >
                        <span className="block h-px w-3 bg-current" />
                        <span className="absolute left-1/2 top-1/2 block h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current group-open:hidden" />
                      </span>
                    </summary>
                    <p className="mt-4 max-w-3xl text-[15px] leading-[1.7] text-muted">
                      {f.a}
                    </p>
                  </details>
                  {i < PAGE_FAQS.length - 1 ? <Hr className="mt-6" /> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Legacy FAQ page accordion                                         */
/* ------------------------------------------------------------------ */

type LegacyFaqItem = {
  question: string;
  answerHtml: string;
};

function extractLegacyFaqItems(bodyHtml: string): LegacyFaqItem[] {
  const $ = cheerio.load(bodyHtml);

  return $(".accordion .page-item")
    .toArray()
    .map((el) => {
      const $item = $(el);
      const $question = $item.find(".title").first().clone();
      $question.find(".question").remove();

      const $answer = $item.find(".content").first().clone();
      $answer.find(".answer").remove();

      return {
        question: $question.text().replace(/\s+/g, " ").trim(),
        answerHtml: $answer.html()?.trim() ?? "",
      };
    })
    .filter((item) => item.question && item.answerHtml);
}

function LegacyFaqAccordion({
  items,
}: {
  items: LegacyFaqItem[];
}) {
  return (
    <Section padding="tight" className="!pt-0">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <Card tone="ink" padding="default">
              <Eyebrow tone="ink">FAQ</Eyebrow>
              <Heading level="h3" className="mt-5 !text-white">
                Questions, answered clearly.
              </Heading>
              <p className="mt-4 text-[14.5px] leading-[1.7] text-night-text">
                Open any question to read the full answer from the original
                Oasis Dental FAQ library.
              </p>
              <ButtonAnchor
                href={`tel:${PHONE}`}
                variant="accent"
                size="sm"
                className="mt-7"
              >
                Call {PHONE_DISPLAY}
              </ButtonAnchor>
            </Card>
          </aside>

          <div className="lg:col-span-8">
            <ul className="bg-surface-2">
              {items.map((item, i) => (
                <li key={item.question} className="bg-bg">
                  <details className="group" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 px-6 py-7 sm:px-8">
                      <span className="font-serif text-[24px] leading-[1.18] tracking-[-0.02em] text-fg sm:text-[28px]">
                        {item.question}
                      </span>
                      <span
                        aria-hidden
                        className="relative mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center bg-surface text-soft transition-colors group-open:bg-accent group-open:text-accent-fg"
                      >
                        <span className="block h-px w-3.5 bg-current" />
                        <span className="absolute left-1/2 top-1/2 block h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current group-open:hidden" />
                      </span>
                    </summary>
                    <div className="px-6 pb-8 sm:px-8">
                      <Prose className="[&_p:first-child]:mt-0">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.answerHtml,
                          }}
                        />
                      </Prose>
                    </div>
                  </details>
                  {i < items.length - 1 ? <Hr /> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable: Testimonial pull-quote                                  */
/* ------------------------------------------------------------------ */

function TestimonialBlock() {
  return (
    <Section padding="tight" tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Media photo={PHOTOS.patientCare} ratio="square" />
          </div>
          <div className="lg:col-span-8 lg:self-center">
            <QuoteIcon size={32} className="text-accent" />
            <p className="mt-6 font-serif text-[24px] leading-[1.3] tracking-[-0.01em] text-fg sm:text-[28px]">
              &ldquo;Honestly the calmest dental visit I&rsquo;ve ever had.
              Modern equipment, kind staff, and zero pressure to do more than I
              needed.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-5">
              <span className="h-px w-12 bg-fg" aria-hidden />
              <div>
                <div className="text-[14px] font-semibold tracking-tight text-fg">
                  Priya K.
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-soft">
                  Cleaning &amp; exam
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable: Final CTA card                                          */
/* ------------------------------------------------------------------ */

function CtaCard() {
  return (
    <Section padding="tight">
      <Container>
        <AccentPanel>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Ready when you are</Eyebrow>
              <Heading level="h2" className="mt-5">
                Book your visit with Oasis.
              </Heading>
              <p className="mt-5 max-w-xl text-[15.5px] leading-[1.7]">
                Call the office or send a quick message — we&rsquo;ll find a
                time that fits your schedule and answer any questions before
                you arrive.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <ButtonAnchor href={`tel:${PHONE}`} variant="primary">
                <PhoneIcon size={14} />
                Call {PHONE_DISPLAY}
              </ButtonAnchor>
              <ButtonLink href="/contact/" variant="inverse">
                Contact the office
              </ButtonLink>
            </div>
          </div>
        </AccentPanel>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable: Section sidebar (used on category pages)                */
/* ------------------------------------------------------------------ */

function SectionSidebar({
  heading,
  items,
  cover,
}: {
  heading: string;
  items: Array<{ href: string; label: string }>;
  cover?: ReturnType<typeof coverPhotoFor>;
}) {
  return (
    <aside className="space-y-px">
      {cover ? <Media photo={cover} ratio="landscape" /> : null}
      <Card tone="surface" padding="default">
        <Eyebrow>{heading}</Eyebrow>
        <ul className="mt-5">
          {items.map((c, i) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="flex items-center justify-between py-3 text-[14.5px] font-medium text-ink hover:bg-accent hover:text-accent-fg"
              >
                <span className="pr-4">{c.label}</span>
                <span aria-hidden className="text-soft">
                  →
                </span>
              </Link>
              {i < items.length - 1 ? <Hr /> : null}
            </li>
          ))}
          {!items.length ? (
            <li className="py-3 text-sm text-muted">More pages coming soon.</li>
          ) : null}
        </ul>
      </Card>

      <Card tone="ink" padding="default">
        <Eyebrow tone="ink">Have a question?</Eyebrow>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-night-text">
          Speak with our team about treatment options — we&rsquo;re happy to
          help.
        </p>
        <ButtonAnchor
          href={`tel:${PHONE}`}
          variant="accent"
          size="sm"
          className="mt-6"
        >
          Call {PHONE_DISPLAY}
        </ButtonAnchor>
      </Card>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default async function LegacyPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const pathname = joinPath(slug);

  const pages = await listLegacyPages();
  const match = pages.find((p) => p.path === pathname);
  if (!match) notFound();

  const content = await readLegacyHtmlMain(match.htmlPath, match);

  /* ────────────  Contact / Appointment  ──────────── */
  if (match.kind === "contact" || match.kind === "appointmentRequest") {
    const isContact = match.kind === "contact";
    const title = isContact ? "Get in touch" : "Request an appointment";
    const subtitle = isContact
      ? "Call or email us with questions, comments, or to schedule an appointment."
      : "To request an appointment, please call or email our office — we'll find a time that works for you.";

    const tiles = [
      {
        Icon: PhoneIcon,
        eyebrow: "Call",
        href: `tel:${PHONE}`,
        title: PHONE_DISPLAY,
        body: "Mon — Thu 7:30a — 5:00p · Fri 7:30a — 12:00p",
        action: "Tap to call",
      },
      {
        Icon: MailIcon,
        eyebrow: "Email",
        href: `mailto:${EMAIL}`,
        title: EMAIL,
        body: "We typically respond within one business day.",
        action: "Send email",
        breakAll: true,
      },
      {
        Icon: PinIcon,
        eyebrow: "Visit",
        href: MAPS_HREF,
        title: "10796 Pines Boulevard, Suite 203",
        body: "Pembroke Pines, FL 33026",
        action: "Map & directions",
        external: true,
      },
    ];

    return (
      <main className="flex-1">
        <PageHero
          eyebrow={isContact ? "Contact" : "Appointment"}
          title={title}
          subtitle={subtitle}
          path={match.path}
        />

        <Section padding="tight" className="!pt-0">
          <Container>
            <ul className="grid gap-px bg-line lg:grid-cols-3">
              {tiles.map((t) => (
                <li key={t.eyebrow} className="bg-bg">
                  <a
                    href={t.href}
                    target={t.external ? "_blank" : undefined}
                    rel={t.external ? "noopener noreferrer" : undefined}
                    className="group flex h-full flex-col justify-between p-8 hover:bg-fg hover:text-ink-contrast sm:p-10"
                  >
                    <div className="flex items-center justify-between">
                      <t.Icon
                        size={28}
                        className="text-fg group-hover:text-accent"
                      />
                      <Eyebrow className="group-hover:!text-accent">
                        {t.eyebrow}
                      </Eyebrow>
                    </div>
                    <div className="mt-12">
                      <div
                        className={`font-serif text-[26px] leading-[1.15] tracking-[-0.01em] sm:text-[28px] ${
                          t.breakAll ? "break-all" : ""
                        }`}
                      >
                        {t.title}
                      </div>
                      <p className="mt-4 text-[14.5px] leading-[1.7] text-muted group-hover:text-white/75">
                        {t.body}
                      </p>
                    </div>
                    <span className="mt-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] group-hover:text-accent">
                      {t.action} <ArrowRightIcon size={12} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-px bg-accent px-8 py-6 text-[14px] leading-[1.6] text-accent-fg">
              <span className="font-semibold uppercase tracking-[0.22em]">
                A note on forms ·
              </span>{" "}
              This site does not submit forms online. Please call or email
              instead and we&rsquo;ll take care of you directly.
            </div>
          </Container>
        </Section>

        <ProcessSection />
        <FaqSection />
      </main>
    );
  }

  /* ────────────  Procedures / Gallery index  ──────────── */
  if (match.kind === "proceduresIndex" || match.kind === "galleryIndex") {
    const navItem = findNavItemByHref(match.path, PRIMARY_NAV);
    const sections = navItem?.children ?? [];
    const title =
      match.kind === "proceduresIndex" ? "Procedures" : "Smile gallery";
    const eyebrow =
      match.kind === "proceduresIndex" ? "What we offer" : "Real results";

    return (
      <main className="flex-1">
        <PageHero
          eyebrow={eyebrow}
          title={title}
          subtitle={content.description}
          path={match.path}
          layout="centered"
        />

        <Section padding="tight" className="!pt-0">
          <Container>
            <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((s, i) => {
                const Icon = SERVICE_ICONS[s.href];
                return (
                  <li key={s.href} className="bg-bg">
                    <Link
                      href={s.href}
                      className="group flex h-full flex-col p-8 hover:bg-fg hover:text-ink-contrast sm:p-10"
                    >
                      <div className="flex items-center justify-between">
                        {Icon ? (
                          <Icon
                            size={28}
                            className="text-fg group-hover:text-accent"
                          />
                        ) : (
                          <span />
                        )}
                        <Eyebrow className="group-hover:!text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </Eyebrow>
                      </div>
                      <div className="mt-10 font-serif text-[26px] leading-[1.15] tracking-[-0.01em] sm:text-[28px]">
                        {s.label}
                      </div>
                      <p className="mt-3 text-[14.5px] leading-[1.65] text-muted group-hover:text-white/75">
                        {s.children?.length
                          ? `${s.children.length} ${s.children.length === 1 ? "page" : "pages"} in this section`
                          : "Explore this section"}
                      </p>
                      <span className="mt-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] group-hover:text-accent">
                        Explore <ArrowRightIcon size={12} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>

        {content.bodyHtml ? (
          <Section tone="surface">
            <Container width="narrow">
              <Prose>
                <div dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
              </Prose>
            </Container>
          </Section>
        ) : null}

        <ProcessSection />
        <TestimonialBlock />
        <CtaCard />
      </main>
    );
  }

  /* ────────────  Procedures / Gallery category  ──────────── */
  if (
    match.kind === "proceduresCategory" ||
    match.kind === "galleryCategory"
  ) {
    const navItem = findNavItemByHref(match.path, PRIMARY_NAV);
    const children = navItem?.children ?? [];
    const sectionLabel =
      navItem?.label ?? content.h2 ?? content.h1 ?? "Section";
    const cover = coverPhotoFor(match.path);

    /* "What's included" tiles — show first 4 children with icons */
    const featured = children.slice(0, 4);

    return (
      <main className="flex-1">
        <PageHero
          eyebrow={
            match.kind === "proceduresCategory"
              ? "Procedures"
              : "Smile gallery"
          }
          title={sectionLabel}
          subtitle={content.description}
          path={match.path}
        />

        {featured.length > 0 ? (
          <Section padding="tight" className="!pt-0 bg-surface">
            <Container>
              <div className="grid gap-px bg-surface-2 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((c, i) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group min-h-40 bg-surface px-7 py-8 transition-colors hover:bg-brand-soft sm:px-8 lg:min-h-44 lg:px-10 lg:py-10"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <CheckIcon
                        size={14}
                        className="mt-1 shrink-0 text-accent"
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-9 max-w-[15rem] font-serif text-[18px] leading-[1.18] tracking-[-0.015em] text-fg sm:text-[20px]">
                      {c.label}
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        <Section padding={featured.length ? "default" : "tight"} className={featured.length ? "" : "!pt-0"}>
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <article className="lg:col-span-8">
                <Prose>
                  <div dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
                </Prose>
              </article>
              <div className="lg:col-span-4">
                <SectionSidebar
                  heading="In this section"
                  items={children}
                  cover={cover}
                />
              </div>
            </div>
          </Container>
        </Section>

        <ProcessSection />
        <FaqSection />
        <TestimonialBlock />
        <CtaCard />
      </main>
    );
  }

  /* ────────────  Standard / detail page  ──────────── */
  const heading = content.h1 ?? content.title ?? "Oasis Dental";
  const eyebrow = (() => {
    switch (match.kind) {
      case "proceduresDetail":
        return "Procedures";
      case "galleryDetail":
        return "Smile gallery";
      case "financingIndex":
      case "financingDetail":
        return "Financing";
      case "patientForms":
        return "Patient forms";
      case "testimonials":
        return "Testimonials";
      default:
        return undefined;
    }
  })();

  if (match.path === "/faqs/") {
    const faqItems = extractLegacyFaqItems(content.bodyHtml);

    return (
      <main className="flex-1">
        <PageHero
          eyebrow="Common questions"
          title={heading}
          subtitle={content.description}
          path={match.path}
        />

        <LegacyFaqAccordion items={faqItems} />
        <TestimonialBlock />
        <CtaCard />
      </main>
    );
  }

  const parent = findParentOfHref(match.path);
  const isProcedureLike =
    match.kind === "proceduresDetail" || match.kind === "galleryDetail";

  if (match.path === "/meet-dr-fajardo/") {
    return (
      <main className="flex-1">
        <Section padding="hero">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
              <article className="lg:col-span-7 lg:self-center">
                <Prose className="[&_h2]:mt-0 [&_h2]:bg-transparent [&_h2]:px-0 [&_h2]:py-0 [&_h2]:text-[40px] [&_h2]:sm:text-[52px] [&_h2]:lg:text-[64px] [&_h2]:leading-[1.02] [&_h2]:max-w-2xl">
                  <div dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
                </Prose>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/appointment-request/" variant="primary">
                    Request appointment
                  </ButtonLink>
                  <ButtonAnchor href={`tel:${PHONE}`} variant="ghost">
                    <PhoneIcon size={14} /> Call {PHONE_DISPLAY}
                  </ButtonAnchor>
                </div>
              </article>

              <aside className="lg:col-span-5">
                <div className="space-y-px">
                  <Media
                    photo={PHOTOS.doctor}
                    ratio="hero"
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    width={1200}
                  />
                  <Card tone="surface" padding="default">
                    <Eyebrow>Why Oasis</Eyebrow>
                    <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                      {[
                        "Modern, gentle technology",
                        "Honest, transparent pricing",
                        "Insurance + CareCredit accepted",
                        "Family-focused, calm chair-side",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[14px] leading-[1.55] text-ink"
                        >
                          <CheckIcon
                            size={18}
                            className="mt-0.5 shrink-0 text-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                  <Card tone="ink" padding="default">
                    <Eyebrow tone="ink">Talk to us</Eyebrow>
                    <p className="mt-4 text-[14px] leading-[1.7] text-night-text">
                      Questions about care with Dr. Fajardo? We&rsquo;re here.
                    </p>
                    <ButtonAnchor
                      href={`tel:${PHONE}`}
                      variant="accent"
                      size="sm"
                      className="mt-6"
                    >
                      <PhoneIcon size={12} /> Call {PHONE_DISPLAY}
                    </ButtonAnchor>
                  </Card>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        <FaqSection />
        <TestimonialBlock />
        <CtaCard />
      </main>
    );
  }

  return (
    <main className="flex-1">
      <PageHero
        eyebrow={eyebrow}
        title={heading}
        subtitle={content.description}
        path={match.path}
      />

      {isProcedureLike ? <QuickFactsStrip /> : null}

      <Section padding="default" className={isProcedureLike ? "!pt-0" : ""}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <article className="lg:col-span-8">
              <Prose>
                <div dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
              </Prose>

              {match.kind === "patientForms" ? (
                <Card tone="accent" padding="default" className="mt-14">
                  <Eyebrow>Patient forms</Eyebrow>
                  <p className="mt-4 max-w-xl text-[15px] leading-[1.7]">
                    This rebuilt site does not submit forms online. Please call
                    or email our office and we&rsquo;ll send you what you need.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonAnchor href={`tel:${PHONE}`} variant="primary">
                      Call {PHONE_DISPLAY}
                    </ButtonAnchor>
                    <ButtonAnchor href={`mailto:${EMAIL}`} variant="inverse">
                      Email us
                    </ButtonAnchor>
                  </div>
                </Card>
              ) : null}
            </article>

            <aside className="lg:col-span-4 space-y-px">
              <Media photo={coverPhotoFor(match.path)} ratio="portrait" />
              <Card tone="surface" padding="default">
                <Eyebrow>Why Oasis</Eyebrow>
                <ul className="mt-5 space-y-4">
                  {[
                    "Modern, gentle technology",
                    "Honest, transparent pricing",
                    "Insurance + CareCredit accepted",
                    "Family-focused, calm chair-side",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] leading-[1.55] text-ink"
                    >
                      <CheckIcon
                        size={18}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card tone="ink" padding="default">
                <Eyebrow tone="ink">Talk to us</Eyebrow>
                <p className="mt-4 text-[14px] leading-[1.7] text-night-text">
                  Questions about this treatment? We&rsquo;re here.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonAnchor
                    href={`tel:${PHONE}`}
                    variant="accent"
                    size="sm"
                  >
                    <PhoneIcon size={12} /> Call {PHONE_DISPLAY}
                  </ButtonAnchor>
                  <ButtonLink
                    href="/appointment-request/"
                    variant="inverse"
                    size="sm"
                  >
                    Request appointment
                  </ButtonLink>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>

      {isProcedureLike ? <ProcessSection /> : null}

      {parent && parent.children && parent.children.length > 1 ? (
        <RelatedSection parent={parent} currentHref={match.path} />
      ) : null}

      <FaqSection />
      <TestimonialBlock />
      <CtaCard />
    </main>
  );
}

import Link from "next/link";
import {
  AccentPanel,
  ButtonAnchor,
  ButtonLink,
  Card,
  Container,
  Divider,
  DottedBackground,
  Eyebrow,
  FeatureTile,
  Heading,
  Hr,
  Lead,
  Media,
  Section,
  Stack,
  Stat,
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
  StethoscopeIcon,
} from "@/components/icons";
import { PHOTOS } from "@/lib/media";

const SERVICES: Array<{
  title: string;
  href: string;
  description: string;
}> = [
  {
    title: "Cleanings & prevention",
    href: "/procedures/cleanings-prevention/",
    description:
      "Exams, hygiene, sealants and digital x-rays to keep your smile healthy for life.",
  },
  {
    title: "Cosmetic dentistry",
    href: "/procedures/cosmetic-dentistry/",
    description:
      "Veneers, crowns, whitening and full smile design — refined results, gently delivered.",
  },
  {
    title: "Restorations",
    href: "/procedures/restorations/",
    description:
      "Fillings, bridges, dentures and implants — restored function with a natural look.",
  },
  {
    title: "Periodontics",
    href: "/procedures/periodontics/",
    description:
      "Gum and bone care, scaling and root planing, periodontal maintenance.",
  },
  {
    title: "Oral surgery",
    href: "/procedures/oral-maxillofacial-surgery/",
    description:
      "Wisdom teeth, implants, bone grafting and TMJ treatment with a calm hand.",
  },
  {
    title: "Periodontal disease",
    href: "/procedures/periodontal-disease/",
    description:
      "Diagnosis, treatment and education — protecting your overall health.",
  },
];

const REASONS: Array<{
  Icon: (p: { size?: number; className?: string }) => React.ReactElement;
  title: string;
  body: string;
}> = [
  {
    Icon: SparkleIcon,
    title: "Modern, gentle technology.",
    body: "Digital x-rays, intra-oral cameras and contemporary techniques — for safer, more accurate care.",
  },
  {
    Icon: HeartIcon,
    title: "A genuinely calm experience.",
    body: "Treatment paced to your comfort, never to a clock. We listen first, then plan.",
  },
  {
    Icon: ShieldIcon,
    title: "Honest, transparent pricing.",
    body: "Plans explained in plain language with clear estimates — no surprises at checkout.",
  },
  {
    Icon: StethoscopeIcon,
    title: "One practice, full-spectrum care.",
    body: "From routine cleanings to implants, periodontics and oral surgery — all under one roof.",
  },
];

const PROCESS: Array<{ step: string; title: string; body: string }> = [
  {
    step: "01",
    title: "Reach out.",
    body: "Call or email — we'll find a time that fits and answer questions before you arrive.",
  },
  {
    step: "02",
    title: "Comprehensive exam.",
    body: "We start with a thorough exam, x-rays and a friendly conversation about your goals.",
  },
  {
    step: "03",
    title: "Plan together.",
    body: "We walk you through every option, in plain language, with timelines and fair pricing.",
  },
  {
    step: "04",
    title: "Care delivered.",
    body: "Treatment is paced for your comfort — gentle hands, modern tools, calm room.",
  },
];

const TOUR: Array<{ key: keyof typeof PHOTOS; label: string }> = [
  { key: "tour1", label: "Reception" },
  { key: "office", label: "Treatment rooms" },
  { key: "tour2", label: "Hygiene suite" },
];

const SMILE_GALLERY: Array<{
  key: keyof typeof PHOTOS;
  caption: string;
  procedure: string;
}> = [
  { key: "smile", caption: "Porcelain veneers", procedure: "Cosmetic dentistry" },
  { key: "smileAfter", caption: "Full mouth restoration", procedure: "Restorations" },
  { key: "smileBefore", caption: "Tooth whitening", procedure: "Cosmetic dentistry" },
  { key: "consult", caption: "Dental implants", procedure: "Oral surgery" },
];

const TESTIMONIALS: Array<{ quote: string; name: string; treatment: string }> = [
  {
    quote:
      "From the moment I walked in I felt at ease. Dr. Fajardo took the time to explain everything and never rushed a single appointment.",
    name: "Maria S.",
    treatment: "Cosmetic veneers",
  },
  {
    quote:
      "The whole team is exceptional. They got me in quickly, walked me through the costs up-front, and the result is genuinely beautiful.",
    name: "Daniel R.",
    treatment: "Implant restoration",
  },
  {
    quote:
      "Honestly the calmest dental visit I've ever had. Modern equipment, kind staff, and zero pressure to do more than I needed.",
    name: "Priya K.",
    treatment: "Cleaning & exam",
  },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Are you accepting new patients?",
    a: "Yes — we're actively welcoming new patients of all ages. Call or email and we'll get you on the schedule promptly.",
  },
  {
    q: "Do you accept dental insurance?",
    a: "We work with most major PPO insurance plans and will help you understand your benefits. Call our office to verify your specific plan.",
  },
  {
    q: "What payment options are available?",
    a: "We accept all major credit cards, cash, and offer financing through CareCredit so you can spread treatment costs over time.",
  },
  {
    q: "How often should I come in for a cleaning?",
    a: "For most patients, every six months is ideal. We'll personalize that based on your gum health, history, and risk factors.",
  },
  {
    q: "Do you treat children?",
    a: "Yes — Oasis Dental is a family practice. We see kids, teens and adults, with a calm chair-side manner that puts younger patients at ease.",
  },
  {
    q: "What should I expect on my first visit?",
    a: "A comprehensive exam, digital x-rays, a thorough conversation about your goals, and a clear plan in plain language. Plan on about an hour.",
  },
];

const FINANCING: Array<{
  Icon: (p: { size?: number; className?: string }) => React.ReactElement;
  title: string;
  body: string;
  cta: { label: string; href: string };
}> = [
  {
    Icon: ShieldIcon,
    title: "Most PPO insurances accepted",
    body: "We work with most major PPO plans. Bring your card and we'll handle the verification.",
    cta: { label: "Call to verify", href: "tel:954-499-1599" },
  },
  {
    Icon: SparkleIcon,
    title: "CareCredit financing",
    body: "Spread treatment costs over time with healthcare financing tailored to dentistry.",
    cta: { label: "Learn more", href: "/financing-options/financing-with-carecredit/" },
  },
  {
    Icon: HeartIcon,
    title: "Transparent estimates",
    body: "Every treatment plan is itemised with clear pricing — no surprises, ever.",
    cta: { label: "Request a plan", href: "/contact/" },
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* ─────────────────  HERO  ───────────────── */}
      <Section padding="hero">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Stack gap="lg">
                <Eyebrow tone="accent">Pembroke Pines · Florida</Eyebrow>
                <Heading level="display" as="h1">
                  Modern dentistry,
                  <br />
                  delivered with care.
                </Heading>
                <Lead className="max-w-xl">
                  Family and cosmetic dental care from{" "}
                  <span className="font-medium text-fg">Dr. Fajardo</span> and
                  team — calm, honest, and centred entirely on you.
                </Lead>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <ButtonLink href="/appointment-request/" variant="primary">
                    Request appointment
                  </ButtonLink>
                  <ButtonAnchor href="tel:954-499-1599" variant="accent">
                    <PhoneIcon size={14} />
                    Call 954·499·1599
                  </ButtonAnchor>
                </div>

                <div className="grid grid-cols-3 gap-px bg-line pt-10">
                  <Stat
                    value="20+"
                    label="Years caring"
                    className="bg-bg pr-6 pt-6 sm:pt-8"
                  />
                  <Stat
                    value="5★"
                    label="Patient rated"
                    className="bg-bg px-6 pt-6 sm:pt-8"
                  />
                  <Stat
                    value="6"
                    label="Specialties"
                    className="bg-bg pl-6 pt-6 sm:pt-8"
                  />
                </div>
              </Stack>
            </div>

            <aside className="lg:col-span-5">
              <div className="relative">
                <Media
                  photo={PHOTOS.hero}
                  ratio="hero"
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  width={1400}
                />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ─────────────────  SERVICES  ───────────────── */}
      <Section tone="ink" className="relative overflow-hidden">
        <DottedBackground />
        <Container>
          <div className="relative">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Stack gap="md">
                  <Eyebrow tone="ink">Dental services</Eyebrow>
                  <Heading level="h2" className="!text-white">
                    Services for every stage of your smile.
                  </Heading>
                  <Divider variant="accent" />
                  <p className="max-w-md text-[15.5px] leading-[1.75] text-night-text">
                    Explore focused dental care across prevention, cosmetic
                    dentistry, restorations, periodontal care, and oral surgery.
                  </p>
                  <div className="pt-2">
                    <ButtonLink href="/procedures/" variant="accent">
                      View all procedures
                      <ArrowRightIcon size={14} />
                    </ButtonLink>
                  </div>
                </Stack>
              </div>

              <ul className="grid gap-px bg-white/12 lg:col-span-8 sm:grid-cols-2">
                {SERVICES.map((s, i) => {
                  const Icon = SERVICE_ICONS[s.href];
                  return (
                    <li key={s.href} className="bg-brand-deep/35">
                      <Link
                        href={s.href}
                        className="group flex h-full min-h-72 flex-col p-7 transition-colors hover:bg-accent hover:text-accent-fg sm:p-9"
                      >
                        <div className="flex items-start justify-between gap-8">
                          {Icon ? (
                            <Icon
                              size={34}
                              className="text-accent group-hover:text-accent-fg"
                            />
                          ) : (
                            <span />
                          )}
                          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-night-text group-hover:text-accent-fg/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="mt-10 font-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-white group-hover:text-accent-fg sm:text-[32px]">
                          {s.title}
                        </div>
                        <p className="mt-4 text-[14.5px] leading-[1.7] text-night-text group-hover:text-accent-fg/80">
                          {s.description}
                        </p>
                        <span className="mt-auto inline-flex pt-10 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent group-hover:text-accent-fg">
                          Learn more <ArrowRightIcon size={12} />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────  WHY CHOOSE US  ───────────────── */}
      <Section tone="surface">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:self-center">
              <Stack gap="md">
                <Eyebrow>Why Oasis</Eyebrow>
                <Heading level="h2">
                  Care that respects your time, money, and peace of mind.
                </Heading>
                <Divider variant="accent" />
                <Lead>
                  Every detail of the practice is designed around the way
                  modern dentistry should feel — calm, considered, and built on
                  trust.
                </Lead>
              </Stack>
            </div>

            <ul className="grid gap-5 lg:col-span-7 sm:grid-cols-2">
              {REASONS.map((r, i) => (
                <li key={r.title}>
                  <FeatureTile
                    icon={<r.Icon size={34} />}
                    title={r.title}
                    index={i}
                  >
                    {r.body}
                  </FeatureTile>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ─────────────────  DOCTOR  ───────────────── */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Media
                photo={PHOTOS.doctor}
                ratio="hero"
                sizes="(min-width: 1024px) 40vw, 100vw"
                width={1200}
              />
            </div>

            <div className="lg:col-span-7 lg:self-center">
              <Stack gap="md">
                <Eyebrow>Meet the practice</Eyebrow>
                <Heading level="h2">Care led by Dr. Fajardo.</Heading>
                <Divider variant="accent" />
                <Lead>
                  A practice built on clinical excellence and a calm,
                  respectful chair-side manner. We take time to understand your
                  goals — and explain every option clearly.
                </Lead>

                <ul className="grid gap-px bg-line pt-4 sm:grid-cols-2">
                  {[
                    { label: "Comprehensive exams", body: "Thorough, gentle assessments at every visit." },
                    { label: "Same-day estimates", body: "Clear, itemised pricing before you commit." },
                    { label: "Modern equipment", body: "Digital x-rays and intra-oral cameras as standard." },
                    { label: "Family-focused", body: "Care for kids, teens, adults — everyone welcome." },
                  ].map((f) => (
                    <li key={f.label} className="bg-bg p-5">
                      <div className="flex items-center gap-3 text-[14.5px] font-semibold text-fg">
                        <CheckIcon size={18} className="text-accent" />
                        {f.label}
                      </div>
                      <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">
                        {f.body}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <ButtonLink href="/meet-dr-fajardo/" variant="primary">
                    Read full bio <ArrowRightIcon size={14} />
                  </ButtonLink>
                </div>
              </Stack>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────  PROCESS / WHAT TO EXPECT  ───────────────── */}
      <Section tone="ink" className="relative overflow-hidden">
        <DottedBackground />
        <Container>
          <div className="relative">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4 lg:self-end">
                <Stack gap="md">
                  <Eyebrow tone="ink">How it works</Eyebrow>
                  <Heading level="h2" className="!text-white">
                    What to expect, step by step.
                  </Heading>
                  <Divider variant="accent" />
                  <p className="text-[15.5px] leading-[1.7] text-night-text">
                    From first call to follow-up, we keep things calm,
                    thorough, and easy to understand.
                  </p>
                </Stack>
              </div>

              <ol className="lg:col-span-8 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS.map((p) => (
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
          </div>
        </Container>
      </Section>

      {/* ─────────────────  SMILE GALLERY PREVIEW  ───────────────── */}
      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Real smiles</Eyebrow>
              <Heading level="h2" className="mt-4 max-w-2xl">
                A glimpse of work we&rsquo;re proud of.
              </Heading>
            </div>
            <ButtonLink href="/smile-gallery/" variant="secondary">
              View full gallery <ArrowRightIcon size={14} />
            </ButtonLink>
          </div>

          <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SMILE_GALLERY.map((s, i) => (
              <li key={i} className="group bg-bg">
                <Media photo={PHOTOS[s.key]} ratio="portrait" />
                <div className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-soft">
                    {s.procedure}
                  </div>
                  <div className="mt-2 font-serif text-[18px] leading-[1.2] tracking-[-0.01em] text-fg">
                    {s.caption}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ─────────────────  TESTIMONIALS GRID  ───────────────── */}
      <Section tone="surface">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Patient stories</Eyebrow>
            <Heading level="h2" className="mt-4">
              People kindly say nice things.
            </Heading>
            <div className="mt-8 flex justify-center">
              <Divider variant="accent" />
            </div>
          </div>

          <ul className="mt-14 grid gap-px bg-line lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <li key={t.name} className="bg-surface p-8 sm:p-10">
                <QuoteIcon size={32} className="text-accent" />
                <p className="mt-6 font-serif text-[22px] leading-[1.35] tracking-[-0.01em] text-fg">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <span className="h-px w-8 bg-fg" aria-hidden />
                  <div>
                    <div className="text-[14px] font-semibold tracking-tight text-fg">
                      {t.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-soft">
                      {t.treatment}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex justify-center">
            <ButtonLink href="/testimonials/" variant="primary">
              Read all testimonials <ArrowRightIcon size={14} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ─────────────────  TOUR THE OFFICE  ───────────────── */}
      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Inside the practice</Eyebrow>
              <Heading level="h2" className="mt-4 max-w-2xl">
                A calm, modern space — designed for you.
              </Heading>
            </div>
            <ButtonLink href="/tour-the-office/" variant="secondary">
              Tour the office <ArrowRightIcon size={14} />
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-px bg-line sm:grid-cols-3">
            {TOUR.map((t, i) => (
              <div key={t.key} className="bg-bg">
                <Media
                  photo={PHOTOS[t.key]}
                  ratio={i === 1 ? "portrait" : "landscape"}
                />
                <div className="flex items-center justify-between p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-soft">
                    {String(i + 1).padStart(2, "0")} · {t.label}
                  </div>
                  <span className="text-soft" aria-hidden>
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─────────────────  INSURANCE & FINANCING  ───────────────── */}
      <Section tone="surface">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4 lg:self-center">
              <Stack gap="md">
                <Eyebrow>Costs &amp; coverage</Eyebrow>
                <Heading level="h2">Care that fits your budget.</Heading>
                <Divider variant="accent" />
                <Lead>
                  Insurance, financing, and clear estimates — three ways we
                  make great dentistry accessible.
                </Lead>
              </Stack>
            </div>
            <ul className="grid gap-px bg-line lg:col-span-8 sm:grid-cols-3">
              {FINANCING.map((f) => (
                <li key={f.title} className="bg-surface p-7 sm:p-8">
                  <f.Icon size={28} className="text-fg" />
                  <div className="mt-7 font-serif text-[20px] leading-[1.2] tracking-[-0.01em] text-fg">
                    {f.title}
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.65] text-muted">
                    {f.body}
                  </p>
                  <Link
                    href={f.cta.href}
                    className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-fg hover:text-accent"
                  >
                    {f.cta.label} <ArrowRightIcon size={12} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ─────────────────  FAQ  ───────────────── */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Stack gap="md">
                <Eyebrow>Common questions</Eyebrow>
                <Heading level="h2">Helpful answers, before you call.</Heading>
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
                {FAQS.map((f, i) => (
                  <li key={f.q} className="py-7 first:pt-0 last:pb-0">
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
                    {i < FAQS.length - 1 ? <Hr className="mt-7" /> : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────  CONTACT BLOCK (DARK)  ───────────────── */}
      <Section tone="ink" className="relative overflow-hidden">
        <DottedBackground />
        <Container>
          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <QuoteIcon className="text-accent" />
              <p className="mt-8 font-serif text-3xl leading-[1.25] tracking-[-0.015em] text-white sm:text-4xl lg:text-[40px]">
                We treat every patient the way we&rsquo;d treat our own
                family — with patience, honesty, and the time it takes to do
                it right.
              </p>
              <div className="mt-10 flex items-center gap-5">
                <span className="h-px w-12 bg-accent" aria-hidden />
                <div>
                  <div className="text-[15px] font-semibold tracking-tight text-white">
                    Dr. Fajardo, DMD
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                    Oasis Dental
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-white/10">
                <Card tone="ink" padding="default">
                  <Eyebrow tone="ink">Visit</Eyebrow>
                  <p className="mt-4 text-[14.5px] leading-[1.7] text-night-text">
                    10796 Pines Boulevard, Suite 203
                    <br />
                    Pembroke Pines, FL 33026
                  </p>
                  <a
                    className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-accent hover:text-white"
                    href="https://maps.google.com/?daddr=10796+Pines+Boulevard,Pembroke+Pines,FL+33026"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PinIcon size={14} /> Directions
                  </a>
                </Card>
                <Card tone="ink" padding="default">
                  <Eyebrow tone="ink">Hours</Eyebrow>
                  <dl className="mt-4 space-y-3 text-[13.5px] text-white/85">
                    <div>
                      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        Mon — Thu
                      </dt>
                      <dd className="font-medium tabular-nums">7:30a — 5p</dd>
                    </div>
                    <div>
                      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        Friday
                      </dt>
                      <dd className="font-medium tabular-nums">
                        7:30a — 12p
                      </dd>
                    </div>
                  </dl>
                </Card>
                <Card tone="ink" padding="default" className="col-span-2">
                  <Eyebrow tone="ink">Talk to us</Eyebrow>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <a
                      href="tel:954-499-1599"
                      className="group flex items-center gap-3 text-white/90 hover:text-accent"
                    >
                      <PhoneIcon size={20} />
                      <span className="font-serif text-xl tracking-[-0.01em]">
                        954·499·1599
                      </span>
                    </a>
                    <a
                      href="mailto:oasisdental10796@gmail.com"
                      className="group flex items-center gap-3 text-[14px] text-white/85 hover:text-accent"
                    >
                      <MailIcon size={18} />
                      <span className="break-all">
                        oasisdental10796@gmail.com
                      </span>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────  FINAL CTA  ───────────────── */}
      <Section padding="tight">
        <Container>
          <AccentPanel>
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Eyebrow>Ready when you are</Eyebrow>
                <Heading level="h2" className="mt-5">
                  Let&rsquo;s plan your next visit.
                </Heading>
                <p className="mt-5 max-w-xl text-[15.5px] leading-[1.7]">
                  Call the office or send a quick message — we&rsquo;ll find a
                  time that fits your schedule and answer any questions before
                  you arrive.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <ButtonAnchor href="tel:954-499-1599" variant="primary">
                  <PhoneIcon size={14} />
                  Call 954·499·1599
                </ButtonAnchor>
                <ButtonLink href="/contact/" variant="inverse">
                  Contact the office
                </ButtonLink>
              </div>
            </div>
          </AccentPanel>
        </Container>
      </Section>
    </main>
  );
}

import Link from "next/link";
import { Container, Eyebrow, Hr } from "./ds";
import { MailIcon, PhoneIcon, PinIcon } from "./icons";

const SECTIONS: Array<{
  heading: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    heading: "Treatments",
    links: [
      { label: "Procedures", href: "/procedures/" },
      { label: "Smile gallery", href: "/smile-gallery/" },
      { label: "Cleanings & prevention", href: "/procedures/cleanings-prevention/" },
      { label: "Cosmetic dentistry", href: "/procedures/cosmetic-dentistry/" },
    ],
  },
  {
    heading: "Patients",
    links: [
      { label: "Appointment request", href: "/appointment-request/" },
      { label: "Patient forms", href: "/patient-forms/" },
      { label: "Financing", href: "/financing-options/" },
      { label: "Testimonials", href: "/testimonials/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-fg text-ink-contrast">
      <Container>
        <div className="grid gap-14 py-20 md:grid-cols-12 md:gap-10 lg:py-24">
          <div className="md:col-span-3">
            <div className="font-serif text-3xl leading-tight tracking-[-0.015em]">
              Oasis Dental
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-white/65">
              Family and cosmetic dentistry from Dr. Fajardo and team — calm,
              modern care in Pembroke Pines, Florida.
            </p>

            <div className="mt-8 inline-flex items-center bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-fg">
              Accepting new patients
            </div>
          </div>

          <address className="not-italic md:col-span-3">
            <Eyebrow tone="ink">Visit &amp; Contact</Eyebrow>
            <ul className="mt-5 space-y-5 text-[14.5px] leading-[1.65]">
              <li className="flex gap-3">
                <PinIcon size={20} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <div className="font-medium text-white">Oasis Dental</div>
                  <div className="mt-1 text-white/75">
                    10796 Pines Boulevard, Suite 203
                    <br />
                    Pembroke Pines, FL 33026
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="tel:954-499-1599"
                  className="flex items-center gap-3 font-medium text-white hover:text-accent"
                >
                  <PhoneIcon size={20} className="shrink-0 text-accent" />
                  954·499·1599
                </a>
              </li>
              <li>
                <a
                  href="mailto:oasisdental10796@gmail.com"
                  className="flex items-center gap-3 break-all text-white/75 hover:text-accent"
                >
                  <MailIcon size={20} className="shrink-0 text-accent" />
                  oasisdental10796@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <a
                className="inline-flex items-center text-[12px] font-semibold uppercase tracking-[0.22em] text-accent hover:text-white"
                href="https://maps.google.com/?daddr=10796+Pines+Boulevard,Pembroke+Pines,FL+33026"
                target="_blank"
                rel="noopener noreferrer"
              >
                Map &amp; directions
              </a>
            </div>
          </address>

          {SECTIONS.map((section) => (
            <nav
              key={section.heading}
              aria-label={section.heading}
              className="md:col-span-2"
            >
              <Eyebrow tone="ink">{section.heading}</Eyebrow>
              <ul className="mt-4 space-y-3 text-[14.5px]">
                {section.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/85 hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-2">
            <Eyebrow tone="ink">Hours</Eyebrow>
            <dl className="mt-4 space-y-4 text-[14px] leading-[1.5]">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Mon – Thu
                </dt>
                <dd className="mt-1 font-medium tabular-nums text-white/90">
                  7:30a – 5:00p
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Friday
                </dt>
                <dd className="mt-1 font-medium tabular-nums text-white/90">
                  7:30a – 12:00p
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Sat – Sun
                </dt>
                <dd className="mt-1 font-medium text-white/90">Closed</dd>
              </div>
            </dl>
          </div>
        </div>

        <Hr tone="invert" />
        <div className="flex flex-col items-start justify-between gap-3 py-6 text-[12px] text-white/55 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Oasis Dental. All rights reserved.</span>
          <span className="uppercase tracking-[0.22em]">
            Pembroke Pines · FL
          </span>
        </div>
      </Container>
    </footer>
  );
}

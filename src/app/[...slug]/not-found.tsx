import {
  ButtonAnchor,
  ButtonLink,
  Container,
  Divider,
  Eyebrow,
  Heading,
  Lead,
  Section,
  Stack,
} from "@/components/ds";

export default function NotFound() {
  return (
    <main className="flex-1">
      <Section padding="hero">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Stack gap="md">
              <div className="flex justify-center">
                <Eyebrow tone="accent">404 · Not found</Eyebrow>
              </div>
              <Heading level="h1">
                This page isn&rsquo;t here.
              </Heading>
              <Lead className="mx-auto">
                The page you&rsquo;re looking for doesn&rsquo;t exist (or
                hasn&rsquo;t been migrated yet).
              </Lead>
              <div className="flex justify-center pt-2">
                <Divider variant="accent" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <ButtonLink href="/" variant="primary">
                  Back to home
                </ButtonLink>
                <ButtonAnchor href="tel:954-499-1599" variant="accent">
                  Call 954·499·1599
                </ButtonAnchor>
              </div>
            </Stack>
          </div>
        </Container>
      </Section>
    </main>
  );
}

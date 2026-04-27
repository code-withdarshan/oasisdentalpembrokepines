/**
 * Centralized media registry for the Oasis Dental site.
 *
 * All photography is sourced from Unsplash and referenced by photo id +
 * descriptive alt text. Routing every image through this module keeps
 * imagery part of the design system and makes future swaps trivial.
 */

const UNSPLASH = "https://images.unsplash.com";

/** Build a properly sized Unsplash URL with sensible defaults. */
export function unsplash(
  id: string,
  opts: { w?: number; h?: number; q?: number } = {},
) {
  const { w = 1600, h, q = 80 } = opts;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
  });
  if (h) params.set("h", String(h));
  return `${UNSPLASH}/${id}?${params.toString()}`;
}

export type Photo = {
  id: string;
  alt: string;
  /** Optional cropping hint passed through to next/image (objectPosition). */
  position?: string;
};

/* ------------------------------------------------------------------ */
/*  Library                                                           */
/* ------------------------------------------------------------------ */

export const PHOTOS = {
  hero: {
    id: "photo-1588776814546-1ffcf47267a5",
    alt: "Dentist examining a patient's smile in a modern, well-lit clinic.",
    position: "center",
  },
  smile: {
    id: "photo-1606811841689-23dfddce3e95",
    alt: "Patient smiling confidently in a dental chair.",
    position: "center",
  },
  office: {
    id: "photo-1629909613654-28e377c37b09",
    alt: "Bright, contemporary dental treatment room.",
    position: "center",
  },
  officeWide: {
    id: "photo-1609840114035-3c981b782dfe",
    alt: "Wide view of a modern dental office reception and waiting area.",
    position: "center",
  },
  tools: {
    id: "photo-1606811971618-4486d14f3f99",
    alt: "Sterilized dental instruments arranged on a clinic tray.",
    position: "center",
  },
  doctor: {
    id: "photo-1612349317150-e413f6a5b16d",
    alt: "Portrait of a friendly dental clinician in a clean clinic.",
    position: "top",
  },
  consult: {
    id: "photo-1581595220892-b0739db3ba8c",
    alt: "Dentist consulting with a patient about treatment options.",
    position: "center",
  },
  smileBefore: {
    id: "photo-1532323544230-7191fd51bc1b",
    alt: "Close-up smile showing dental work — before treatment.",
    position: "center",
  },
  smileAfter: {
    id: "photo-1677026010083-78ec7f1b84ed",
    alt: "Close-up smile showing dental work — after treatment.",
    position: "center",
  },
  tour1: {
    id: "photo-1629909615184-74f495363b67",
    alt: "Modern dental waiting area with natural light.",
    position: "center",
  },
  tour2: {
    id: "photo-1704455306251-b4634215d98f",
    alt: "Calm, clean treatment room interior.",
    position: "center",
  },
  tour3: {
    id: "photo-1571772996211-2f02c9727629",
    alt: "Reception desk with dental practice signage.",
    position: "center",
  },
  patientCare: {
    id: "photo-1559757148-5c350d0d3c56",
    alt: "Friendly dental hygienist greeting a patient.",
    position: "center",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

/* ------------------------------------------------------------------ */
/*  Procedure-category cover imagery                                  */
/* ------------------------------------------------------------------ */

const PROCEDURE_COVERS: Record<string, PhotoKey> = {
  "/procedures/cleanings-prevention/": "tools",
  "/procedures/cosmetic-dentistry/": "smile",
  "/procedures/restorations/": "consult",
  "/procedures/periodontics/": "patientCare",
  "/procedures/oral-maxillofacial-surgery/": "office",
  "/procedures/periodontal-disease/": "consult",
  "/procedures/": "hero",
  "/smile-gallery/": "smile",
  "/smile-gallery/cosmetic-dentistry/": "smileAfter",
  "/smile-gallery/restorations/": "smileAfter",
  "/smile-gallery/other-procedures/": "smile",
  "/welcome/": "hero",
  "/our-practice/": "officeWide",
  "/meet-dr-fajardo/": "doctor",
  "/tour-the-office/": "tour1",
  "/contact/": "tour3",
  "/appointment-request/": "consult",
  "/financing-options/": "officeWide",
  "/financing-options/financing-with-carecredit/": "officeWide",
  "/patient-forms/": "office",
  "/testimonials/": "smile",
  "/dental-videos/": "tools",
  "/faqs/": "consult",
  "/links/": "officeWide",
};

/**
 * Resolve a hero / cover image for a given route. Walks up the path until
 * a registered cover is found; falls back to the hero photo.
 */
export function coverPhotoFor(path: string): Photo {
  const segs = path.split("/").filter(Boolean);
  for (let i = segs.length; i >= 0; i--) {
    const candidate = `/${segs.slice(0, i).join("/")}/`.replaceAll(
      "//",
      "/",
    );
    const key = PROCEDURE_COVERS[candidate];
    if (key) return PHOTOS[key];
  }
  return PHOTOS.hero;
}

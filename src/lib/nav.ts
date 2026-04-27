export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const PRIMARY_NAV: NavItem[] = [
  { label: "Our Practice", href: "/our-practice/" },
  { label: "Meet Dr. Fajardo", href: "/meet-dr-fajardo/" },
  { label: "Tour the Office", href: "/tour-the-office/" },
  {
    label: "Procedures",
    href: "/procedures/",
    children: [
      {
        label: "Cleanings & Prevention",
        href: "/procedures/cleanings-prevention/",
        children: [
          { label: "How to Properly Brush & Floss", href: "/procedures/cleanings-prevention/how-to-properly-brush-floss/" },
          { label: "Dental Exams & Cleanings", href: "/procedures/cleanings-prevention/dental-exams-cleanings/" },
          { label: "Digital X-Rays", href: "/procedures/cleanings-prevention/digital-x-rays/" },
          { label: "Fluoride Treatment", href: "/procedures/cleanings-prevention/fluoride-treatment/" },
          { label: "Home Care", href: "/procedures/cleanings-prevention/home-care/" },
          { label: "Oral Hygiene Aids", href: "/procedures/cleanings-prevention/oral-hygiene-aids/" },
          { label: "Sealants", href: "/procedures/cleanings-prevention/sealants/" },
        ],
      },
      {
        label: "Cosmetic Dentistry",
        href: "/procedures/cosmetic-dentistry/",
        children: [
          { label: "Dental Implants", href: "/procedures/cosmetic-dentistry/dental-implants/" },
          { label: "Composite Fillings", href: "/procedures/cosmetic-dentistry/composite-fillings/" },
          { label: "Porcelain Crowns (Caps)", href: "/procedures/cosmetic-dentistry/porcelain-crowns-caps/" },
          { label: "Porcelain Fixed Bridges", href: "/procedures/cosmetic-dentistry/porcelain-fixed-bridges/" },
          { label: "Porcelain Veneers", href: "/procedures/cosmetic-dentistry/porcelain-veneers/" },
          { label: "Tooth Whitening", href: "/procedures/cosmetic-dentistry/tooth-whitening/" },
        ],
      },
      {
        label: "Restorations",
        href: "/procedures/restorations/",
        children: [
          { label: "Dental Implants", href: "/procedures/restorations/dental-implants/" },
          { label: "Composite Fillings", href: "/procedures/restorations/composite-fillings/" },
          { label: "Crowns (Caps)", href: "/procedures/restorations/crowns-caps/" },
          { label: "Dentures & Partial Dentures", href: "/procedures/restorations/dentures-partial-dentures/" },
          { label: "Fixed Bridges", href: "/procedures/restorations/fixed-bridges/" },
          { label: "Root Canal Therapy", href: "/procedures/restorations/root-canal-therapy/" },
        ],
      },
      {
        label: "Periodontal Disease",
        href: "/procedures/periodontal-disease/",
        children: [
          { label: "What is Periodontal (Gum) Disease?", href: "/procedures/periodontal-disease/what-is-periodontal-gum-disease/" },
          { label: "Diagnosis", href: "/procedures/periodontal-disease/diagnosis/" },
          { label: "Treatment", href: "/procedures/periodontal-disease/treatment/" },
          { label: "Maintenance", href: "/procedures/periodontal-disease/maintenance/" },
          { label: "Causes of Periodontal Disease", href: "/procedures/periodontal-disease/causes-of-periodontal-disease/" },
          { label: "Types of Periodontal Disease", href: "/procedures/periodontal-disease/types-of-periodontal-disease/" },
          { label: "Signs & Symptoms of Periodontal Disease", href: "/procedures/periodontal-disease/signs-symptoms-of-periodontal-disease/" },
          { label: "Mouth - Body Connection", href: "/procedures/periodontal-disease/mouth-body-connection/" },
          { label: "Periodontal Disease and Diabetes", href: "/procedures/periodontal-disease/periodontal-disease-and-diabetes/" },
          { label: "Periodontal Disease, Heart Disease and Stroke", href: "/procedures/periodontal-disease/periodontal-disease-heart-disease-and-stroke/" },
          { label: "Periodontal Disease and Pregnancy", href: "/procedures/periodontal-disease/periodontal-disease-and-pregnancy/" },
          { label: "Periodontal Disease and Osteoporosis", href: "/procedures/periodontal-disease/periodontal-disease-and-osteoporosis/" },
          { label: "Periodontal Disease and Respiratory Disease", href: "/procedures/periodontal-disease/periodontal-disease-and-respiratory-disease/" },
        ],
      },
      {
        label: "Oral & Maxillofacial Surgery",
        href: "/procedures/oral-maxillofacial-surgery/",
        children: [
          { label: "Botox® as an Alternative Treatment for TMJ", href: "/procedures/oral-maxillofacial-surgery/botox%C2%AE-as-an-alternative-treatment-for-tmj/" },
          { label: "Apicoectomy", href: "/procedures/oral-maxillofacial-surgery/apicoectomy/" },
          { label: "Bone Grafting", href: "/procedures/oral-maxillofacial-surgery/bone-grafting/" },
          { label: "Dental Implants", href: "/procedures/oral-maxillofacial-surgery/dental-implants/" },
          { label: "Oral Pathology", href: "/procedures/oral-maxillofacial-surgery/oral-pathology/" },
          { label: "TMJ (Tempro-Mandibular Joint Dysfunction)", href: "/procedures/oral-maxillofacial-surgery/tmj-tempro-mandibular-joint-dysfunction/" },
          { label: "Wisdom Teeth Extractions", href: "/procedures/oral-maxillofacial-surgery/wisdom-teeth-extractions/" },
        ],
      },
      {
        label: "Periodontics",
        href: "/procedures/periodontics/",
        children: [
          { label: "What is a Periodontist?", href: "/procedures/periodontics/what-is-a-periodontist/" },
          { label: "When to See a Periodontist", href: "/procedures/periodontics/when-to-see-a-periodontist/" },
          { label: "Antibiotic Treatment", href: "/procedures/periodontics/antibiotic-treatment/" },
          { label: "Bone Grafting", href: "/procedures/periodontics/bone-grafting/" },
          { label: "Bruxism", href: "/procedures/periodontics/bruxism/" },
          { label: "Crown Lengthening", href: "/procedures/periodontics/crown-lengthening/" },
          { label: "Gum & Jawbone Corrective Treatments", href: "/procedures/periodontics/gum-jawbone-corrective-treatments/" },
          { label: "Gum Grafting", href: "/procedures/periodontics/gum-grafting/" },
          { label: "Gum Recession", href: "/procedures/periodontics/gum-recession/" },
          { label: "Oral Cancer Exam", href: "/procedures/periodontics/oral-cancer-exam/" },
          { label: "Periodontal Scaling & Root Planing", href: "/procedures/periodontics/periodontal-scaling-root-planing/" },
          { label: "Pocket Irrigation", href: "/procedures/periodontics/pocket-irrigation/" },
          { label: "Pocket Reduction Surgery", href: "/procedures/periodontics/pocket-reduction-surgery/" },
          { label: "Prophylaxis (Teeth Cleaning)", href: "/procedures/periodontics/prophylaxis-teeth-cleaning/" },
          { label: "Regenerative Procedures", href: "/procedures/periodontics/regenerative-procedures/" },
          { label: "Ridge Modification", href: "/procedures/periodontics/ridge-modification/" },
          { label: "Sinus Augmentation", href: "/procedures/periodontics/sinus-augmentation/" },
          { label: "Soft Tissue Grafting", href: "/procedures/periodontics/soft-tissue-grafting/" },
        ],
      },
    ],
  },
  { label: "Dental Videos", href: "/dental-videos/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Links", href: "/links/" },
  {
    label: "Smile Gallery",
    href: "/smile-gallery/",
    children: [
      {
        label: "Cosmetic Dentistry",
        href: "/smile-gallery/cosmetic-dentistry/",
        children: [{ label: "Porcelain Crowns (Caps)", href: "/smile-gallery/cosmetic-dentistry/porcelain-crowns-caps/" }],
      },
      {
        label: "Restorations",
        href: "/smile-gallery/restorations/",
        children: [
          { label: "Crowns (Caps)", href: "/smile-gallery/restorations/crowns-caps/" },
          { label: "Dentures & Partial Dentures", href: "/smile-gallery/restorations/dentures-partial-dentures/" },
        ],
      },
      {
        label: "Other Procedures",
        href: "/smile-gallery/other-procedures/",
        children: [{ label: "Dental Implants", href: "/smile-gallery/other-procedures/dental-implants/" }],
      },
    ],
  },
  {
    label: "Financing Options",
    href: "/financing-options/",
    children: [{ label: "Financing With CareCredit", href: "/financing-options/financing-with-carecredit/" }],
  },
  { label: "Appointment Request", href: "/appointment-request/" },
  { label: "Patient Forms", href: "/patient-forms/" },
  { label: "Contact", href: "/contact/" },
];

export function findNavItemByHref(
  href: string,
  items: NavItem[] = PRIMARY_NAV,
): NavItem | null {
  for (const item of items) {
    if (item.href === href) return item;
    if (item.children?.length) {
      const found = findNavItemByHref(href, item.children);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Walk the nav tree and return the parent of the given href, if any.
 * Useful for "related pages in this section" lists on detail pages.
 */
export function findParentOfHref(
  href: string,
  items: NavItem[] = PRIMARY_NAV,
  parent: NavItem | null = null,
): NavItem | null {
  for (const item of items) {
    if (item.href === href) return parent;
    if (item.children?.length) {
      const found = findParentOfHref(href, item.children, item);
      if (found !== null) return found;
    }
  }
  return null;
}


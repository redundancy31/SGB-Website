import { companyProfile } from "@/data/company-profile";

export const company = {
  name: companyProfile.company.name,
  shortName: companyProfile.company.shortName,
  tagline: companyProfile.company.tagline,
  establishedYear: companyProfile.company.establishedYear,
  yearsExperience: `Since ${companyProfile.company.establishedYear}`,
  location: companyProfile.company.location,
  address: companyProfile.company.address,
  phone: companyProfile.company.phone,
  email: companyProfile.company.email,
  consultationEmail: companyProfile.company.email,
  operatingHours: companyProfile.company.operatingHours,
  responseTime: companyProfile.company.responseTime,
  heroImage: companyProfile.hero.visuals[0]?.src ?? companyProfile.company.coverImage.outputPath,
  contactPerson: companyProfile.company.contactPerson,
  contactRole: companyProfile.company.contactRole,
  mission:
    "Deliver reliable procurement, installation, termination and rectification support for electrical, communication and security systems through disciplined execution.",
  vision:
    "Be the trusted Singapore execution partner clients turn to when project teams need visible capability, safe delivery and clean closeout standards.",
  values: [
    "Quality and reliability",
    "Visible site readiness",
    "Practical project execution",
    "Long-term client relationships"
  ],
  trustHighlights: [
    `Established in ${companyProfile.company.establishedYear}`,
    "Electrical, communication and security systems focus",
    "Current and upcoming rail-related project references",
    "ISO 9001, ISO 45001, bizSAFE STAR, and BCA highlighted in profile"
  ],
  proofItems: companyProfile.overview.stats,
  stats: companyProfile.overview.stats
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Safety & Quality", href: "/safety-quality" },
  { label: "Contact", href: "/contact" }
];

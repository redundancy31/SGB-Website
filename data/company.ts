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
  heroImage: companyProfile.company.coverImage?.outputPath ?? "",
  contactPerson: companyProfile.company.contactPerson,
  contactRole: companyProfile.company.contactRole,
  mission:
    "Deliver reliable engineering and trading support for electrical, communication, and security systems through disciplined execution and long-term client relationships.",
  vision:
    "Be a trusted Singapore engineering partner for clients seeking dependable project execution across installation, rectification, and technical coordination scopes.",
  values: [
    "Quality and reliability",
    "Long-term client relationships",
    "Practical project execution",
    "Responsive contractor support"
  ],
  trustHighlights: [
    `Established in ${companyProfile.company.establishedYear}`,
    "Electrical, communication, and security systems focus",
    "Main contractor and subcontractor experience",
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

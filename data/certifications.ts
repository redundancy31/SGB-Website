export type Accreditation = {
  id: string;
  title: string;
  category: "Certification" | "Accreditation" | "Registration" | "Safety";
  standard?: string;
  issuingBody?: string;
  certificateNumber?: string;
  issueDate?: string;
  originallyIssued?: string;
  validityStart?: string;
  validityEnd?: string;
  validUntil?: string;
  scope?: string;
  workhead?: string;
  grade?: string;
  description: string;
  holderNameShownOnCertificate?: string;
  imagePath: string;
  altText: string;
  shortBadgeLabel: string;
  trustSummary: string;
  featured?: boolean;
  orderPriority: number;
  verificationStatus: "verified-from-file" | "partially-verified" | "manual-review-needed";
};

export const accreditations: Accreditation[] = [
  {
    id: "iso-9001-2015",
    title: "ISO 9001:2015 Quality Management System",
    category: "Certification",
    standard: "ISO 9001:2015",
    issuingBody: "ISOCert Pte Ltd",
    certificateNumber: "QMS-2021-152",
    validityStart: "13 MAY 2024",
    validityEnd: "10 JUNE 2027",
    validUntil: "10 JUNE 2027",
    originallyIssued: "11 JUNE 2021",
    scope: "INSTALLATION OF ELECTRICAL & COMMUNICATION SYSTEM",
    description:
      "Certificate of registration for quality management system covering installation of electrical and communication system.",
    holderNameShownOnCertificate: "SGB ENGINEERING & TRADING PTE LTD",
    imagePath: "/accreditations/sgb-iso-9001-2024.jpg",
    altText: "ISO 9001:2015 certificate shown for SGB Engineering and Trading Pte Ltd.",
    shortBadgeLabel: "ISO 9001:2015",
    trustSummary: "Quality management system certification with scope stated on certificate.",
    featured: true,
    orderPriority: 1,
    verificationStatus: "verified-from-file"
  },
  {
    id: "iso-45001-2018",
    title: "ISO 45001:2018 Occupational Health and Safety Management System",
    category: "Safety",
    standard: "ISO 45001:2018",
    issuingBody: "ISOCert Pte Ltd",
    certificateNumber: "OHSM-2021-155",
    validityStart: "13 MAY 2024",
    validityEnd: "10 JUNE 2027",
    validUntil: "10 JUNE 2027",
    originallyIssued: "11 JUNE 2021",
    scope: "INSTALLATION OF ELECTRICAL & COMMUNICATION SYSTEM",
    description:
      "Certificate of registration for occupational health and safety management system covering installation of electrical and communication system.",
    holderNameShownOnCertificate: "SGB ENGINEERING & TRADING PTE LTD",
    imagePath: "/accreditations/sgb-iso-45001-2024.jpg",
    altText: "ISO 45001:2018 certificate shown for SGB Engineering and Trading Pte Ltd.",
    shortBadgeLabel: "ISO 45001:2018",
    trustSummary: "Occupational health and safety management system certification with stated scope.",
    featured: true,
    orderPriority: 2,
    verificationStatus: "verified-from-file"
  },
  {
    id: "bizsafe-star",
    title: "bizSAFE Level Star Certificate",
    category: "Safety",
    standard: "bizSAFE Level Star",
    issuingBody: "Workplace Safety and Health Council",
    certificateNumber: "E23859",
    issueDate: "15/05/2024",
    validUntil: "10/06/2027",
    description: "Certificate states requirements fulfilled to attain bizSAFE Level Star.",
    holderNameShownOnCertificate: "SGB ENGINEERING & TRADING PTE. LTD.",
    imagePath: "/accreditations/sgb-bizsafe-star-2024.jpg",
    altText: "bizSAFE Level Star certificate shown for SGB Engineering and Trading Pte. Ltd.",
    shortBadgeLabel: "bizSAFE Star",
    trustSummary: "WSH Council certificate showing bizSAFE Level Star and validity date.",
    featured: true,
    orderPriority: 3,
    verificationStatus: "verified-from-file"
  },
  {
    id: "industry-registration-workheads",
    title: "Industry Registration Workheads (Supporting File)",
    category: "Registration",
    issuingBody: "BCA label inferred from filename - Verify manually",
    workhead: "ME04 Communication & Security Systems; ME05 Electrical Engineering",
    grade: "L1 (existing/applied/approved shown in file)",
    description:
      "Supporting image shows workhead rows for ME04 and ME05 with renewal application and L1 grades.",
    imagePath: "/accreditations/bca-license-workheads.png",
    altText: "Supporting table image showing workheads ME04 and ME05 with L1 grades.",
    shortBadgeLabel: "ME04/ME05 L1",
    trustSummary: "Workhead and grade table visible in supporting registration image.",
    featured: true,
    orderPriority: 4,
    verificationStatus: "partially-verified"
  }
];

export const featuredAccreditations = accreditations
  .filter((item) => item.featured)
  .sort((a, b) => a.orderPriority - b.orderPriority);

export const accreditationGroups = {
  quality: accreditations.filter((item) => item.category === "Certification"),
  safety: accreditations.filter((item) => item.category === "Safety"),
  registrations: accreditations.filter((item) => item.category === "Registration"),
  corporate: accreditations.filter((item) => item.category === "Accreditation")
};

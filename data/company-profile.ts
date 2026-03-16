import importedProfile from "@/data/generated/company-profile.json";

type ImportedImage = {
  outputPath: string;
  altText: string;
  isLikelyDecorative?: boolean;
};

type ImportedSlide = {
  slideNumber: number;
  images?: ImportedImage | ImportedImage[];
};

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  description?: string;
};

type ProjectReference = {
  name: string;
  period: string;
  client: string;
  status: "Ongoing" | "Completed";
};

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

const slides = asArray(importedProfile.slides as ImportedSlide[]);

function getSlideImages(slideNumber: number) {
  const slide = slides.find((item) => item.slideNumber === slideNumber);
  return asArray(slide?.images).filter((image) => !image.isLikelyDecorative);
}

function getImage(slideNumber: number, index = 0) {
  return getSlideImages(slideNumber)[index];
}

function getGalleryItem(slideNumber: number, title: string, description?: string, index = 0): GalleryItem {
  const image = getImage(slideNumber, index);
  return {
    src: image?.outputPath ?? "",
    alt: image?.altText ?? title,
    title,
    description
  };
}

const serviceTitles = [
  "Construction Radio Installation & Termination",
  "CCTV Installation & Termination",
  "Cable Management Work",
  "LDB & LBF Termination",
  "PA Termination With Labelling",
  "Radio Cable Termination",
  "UPS Bypass Termination",
  "VSS Power DB Termination With Labelling",
  "VSS ITB Installation & Termination",
  "VSS Cabinet Splicing Box Installation & Termination",
  "Cabinets Installation & Termination",
  "DB & Cabinet Termination With Labelling",
  "PABX Termination with Labelling",
  "Mobile Antenna Termination With Labelling"
];

const ongoingProjects: ProjectReference[] = [
  { name: "JW2-TAWAS - J160, J155", period: "01/2025 - 12/2026", client: "ST Engineering Urban Solutions", status: "Ongoing" },
  { name: "ESS - J160 - J155", period: "01/2025 - 12/2026", client: "ST Engineering Urban Solutions", status: "Ongoing" },
  { name: "C830G (KCDE)", period: "03/2023 - 04/2025", client: "ST Engineering Urban Solutions", status: "Ongoing" },
  { name: "CC30 - Keppel - C860E, C861E & C830G", period: "08/2023 - 04/2025", client: "ST Engineering Urban Solutions", status: "Ongoing" },
  { name: "CC32 - Prince Edward - C860E, C861E & C830G", period: "08/2023 - 04/2025", client: "ST Engineering Urban Solutions", status: "Ongoing" },
  { name: "DT04 (Hume Station) - COMMS, ISCS, FCIS & MMS", period: "12/2022 - 12/2024", client: "ST Engineering Urban Solutions", status: "Ongoing" }
];

const completedProjects: ProjectReference[] = [
  { name: "DT17 (Downtown) - VSS System", period: "06/2024 - 10/2024", client: "ST Engineering Urban Solutions", status: "Completed" },
  { name: "DT18 (Telok Ayer) - VSS System", period: "04/2024 - 06/2024", client: "ST Engineering Urban Solutions", status: "Completed" },
  { name: "DT26 (MacPherson) - VSS System", period: "04/2024 - 06/2024", client: "ST Engineering Urban Solutions", status: "Completed" },
  { name: "DT25 (Mattar) - VSS System", period: "10/2023 - 01/2024", client: "ST Engineering Urban Solutions", status: "Completed" },
  { name: "C830G (ISCS SYSTEM)", period: "02/2021 - 09/2023", client: "ST Engineering Urban Solutions", status: "Completed" },
  { name: "DT33 (Tampines East) - VSS System", period: "02/2021 - 10/2023", client: "ST Engineering Urban Solutions", status: "Completed" },
  { name: "COMM, FCIS & MMS SYSTEM @ TE29", period: "01/2023 - 04/2023", client: "Safetech Engineering Pte Ltd", status: "Completed" },
  { name: "DT31 (Tampines West) - VSS System", period: "09/2022 - 12/2022", client: "ST Engineering Electronics Ltd", status: "Completed" },
  { name: "DT09 (Botanic Gardens Station) - VSS System", period: "01/2022 - 08/2022", client: "ST Engineering Electronics Ltd", status: "Completed" },
  { name: "DT11 (Newton Station) - VSS System", period: "05/2021 - 02/2022", client: "ST Engineering Electronics Ltd", status: "Completed" },
  { name: "J160 VSS & PA System", period: "10/2021 - 02/2022", client: "ST Engineering Electronics Ltd", status: "Completed" },
  { name: "DT13 (Rocher Station) - VSS System", period: "05/2019 - 12/2021", client: "ST Engineering Electronics Ltd", status: "Completed" },
  { name: "COMM, FCIS & MMS SYSTEM @ TE09", period: "09/2016 - 11/2016", client: "Safetech Engineering Pte Ltd", status: "Completed" },
  { name: "Cabinet Installation", period: "09/2016 - 11/2016", client: "Safetech Engineering Pte Ltd", status: "Completed" },
  { name: "VSS Wiring Work - C8377 VSS Wiring at Site", period: "09/2016 - 11/2016", client: "Singapore Technologies Electronics Limited", status: "Completed" },
  { name: "VSS Wiring Work - C8377 IOCC VSS Wiring at Site", period: "01/2017 - 02/2017", client: "Singapore Technologies Electronics Limited", status: "Completed" },
  { name: "Laying Cable & Termination", period: "03/2017 - 04/2017", client: "Singapore Technologies Electronics Limited", status: "Completed" },
  { name: "FO Cable Decommission", period: "04/2017 - 06/2017", client: "Singapore Technologies Electronics Limited", status: "Completed" },
  { name: "Removal of Cable & Cable Management", period: "05/2017 - 09/2017", client: "Singapore Technologies Electronics Limited", status: "Completed" },
  { name: "Dispose Radio Equipment", period: "06/2017 - 09/2017", client: "Singapore Technologies Electronics Limited", status: "Completed" },
  { name: "Replacement of CCTV Camera", period: "06/2017 - 09/2017", client: "Singapore Technologies Electronics Limited", status: "Completed" },
  { name: "Tapping of CCTV Images from CCTV Rack to Singtel Encoder", period: "07/2017 - 09/2017", client: "Singapore Technologies Electronics Limited", status: "Completed" }
];

export const companyProfile = {
  company: {
    name: "SGB ENGINEERING & TRADING PTE. LTD.",
    shortName: "SGB Engineering & Trading",
    tagline: "Reliable Delivery for Electrical, Communication & Security Systems",
    establishedYear: "2012",
    location: "Singapore",
    contactPerson: "Mohammad Mozammal Hoque",
    contactRole: "Operations Director",
    phone: "+65 6322 3970",
    email: "sgb.hoque@gmail.com",
    address: "3018 Bedok North Street 5, #05-44, EASTLINK, SG(486132)",
    operatingHours: "Mon-Fri, 8:30 AM - 6:00 PM (SGT)",
    responseTime: "We respond within 1-2 business days.",
    coverImage: {
      outputPath: "/sgb-logo.png",
      altText: "SGB Engineering logo"
    }
  },
  hero: {
    eyebrow: "SGB Engineering & Trading Pte. Ltd.",
    title: "Electrical, communication, and security systems execution for small to medium-sized projects",
    summary:
      "SGB Engineering & Trading delivers procurement, installation, rectification works, and project management as both a main contractor and subcontractor.",
    highlights: [
      "Established in 2012",
      "Procurement, installation, and rectification expertise",
      "Electrical, communication, and security system focus",
      "Repeat business and referral-driven relationships"
    ]
  },
  overview: {
    title: "Company Overview",
    paragraphs: [
      "Established in 2012, SGB Engineering & Trading Pte. Ltd. specializes in the installation of electrical, communication, and security systems.",
      "The company has extensive experience in procurement, installation, rectification works, and project management across multiple sectors.",
      "Today, SGB operates as both a main contractor and subcontractor for small to medium-sized projects, providing end-to-end project execution.",
      "SGB is committed to quality, reliability, and long-term client relationships, resulting in repeat business and referrals."
    ],
    trustHighlights: ["BCA registered", "ISO 9001", "ISO 45001", "bizSAFE STAR"],
    stats: [
      { label: "Established", value: "2012" },
      { label: "Project References", value: "28+" },
      { label: "Service Scopes", value: "15+" },
      { label: "Specialist Roles", value: "16+" }
    ]
  },
  clients: [
    "ST ENGINEERING URBAN SOLUTIONS LTD",
    "ST ENGINEERING ELECTRONICS LTD",
    "SIEMENS MOBILITY PTE LTD",
    "Safetech Engineering PTE LTD",
    "Singapore Technologies Electronics Limited"
  ],
  certifications: [
    {
      id: "iso-9001",
      title: "ISO 9001",
      summary: "Quality management certification.",
      image: getImage(4, 0)
    },
    {
      id: "iso-45001",
      title: "ISO 45001",
      summary: "Occupational health and safety management certification.",
      image: getImage(4, 1)
    },
    {
      id: "bizsafe-star",
      title: "bizSAFE STAR",
      summary: "Workplace safety accreditation.",
      image: getImage(4, 2)
    },
    {
      id: "bca-certification",
      title: "BCA Certification",
      summary: "BCA certification highlighted in the corporate profile.",
      image: getImage(4, 3)
    }
  ],
  manpower: {
    onsite: [
      { designation: "Project Manager", headcount: "2" },
      { designation: "Safety Coordinator", headcount: "2" },
      { designation: "Work at Height Assessor", headcount: "8" },
      { designation: "Project Engineer", headcount: "1" },
      { designation: "LEW", headcount: "1x Regular, 2x Outsourced" },
      { designation: "Site / Safety Supervisor", headcount: "14" },
      { designation: "Installers", headcount: "16" }
    ],
    skilled: [
      { designation: "Confined Space Safety Assessor", headcount: "2" },
      { designation: "Lifting Supervisor", headcount: "2" },
      { designation: "Rigger / Signalman", headcount: "4" },
      { designation: "Rescuer", headcount: "4" },
      { designation: "First Aider", headcount: "9" },
      { designation: "Scaffold Supervisor", headcount: "3" },
      { designation: "Scaffold Erector", headcount: "3" },
      { designation: "Boom Lift Operator", headcount: "4" },
      { designation: "Scissor Lift Operator", headcount: "8" }
    ],
    additionalResources: [
      { companyName: "IBR ENGINEERING PTE LTD", workerType: "Skilled", availability: "Immediate On Request" },
      { companyName: "CALPEN CONTRACTORS PTE LTD", workerType: "Skilled", availability: "Immediate On Request" },
      { companyName: "DC CONTRACTORS PT LTD", workerType: "Skilled", availability: "Immediate On Request" }
    ],
    visuals: [
      getGalleryItem(7, "Organizational Chart", "Company reporting structure."),
      getGalleryItem(8, "CRL Construction Radio Team", "Dedicated team structure for construction radio work."),
      getGalleryItem(13, "Termination Team", "Field team capability."),
      getGalleryItem(14, "Key Staff", "Key staff profile."),
      getGalleryItem(15, "Key Staff", "Key staff profile."),
      getGalleryItem(16, "Key Staff", "Key staff profile.")
    ]
  },
  quality: {
    intro: "SGB applies documented quality checks together with specialized testing workflows and equipment records.",
    processVisuals: [
      getGalleryItem(10, "Quality Check Procedure", "Quality control workflow overview."),
      getGalleryItem(18, "Fluke Cable Analyzer DSX5000", "Testing workflow for cable analyzer verification."),
      getGalleryItem(21, "Anritsu Site Master S331L", "Testing workflow for site master verification."),
      getGalleryItem(23, "Anritsu OTDR MT9085A-063", "Testing workflow for OTDR verification.")
    ],
    equipmentVisuals: [
      getGalleryItem(11, "Equipment Record"),
      getGalleryItem(12, "Equipment Record"),
      getGalleryItem(17, "Termination & Testing Equipment"),
      getGalleryItem(19, "Termination & Testing Equipment"),
      getGalleryItem(20, "Termination & Testing Equipment"),
      getGalleryItem(22, "Termination & Testing Equipment")
    ],
    equipmentNotes: ["Fluke Cable Analyzer DSX5000", "Anritsu Site Master S331L", "Anritsu OTDR MT9085A-063"]
  },
  services: serviceTitles.map((title, index) => ({
    id: `service-${index + 1}`,
    title,
    summary: "Capability offered by SGB Engineering & Trading.",
    images: getSlideImages(25 + index)
  })),
  projectReferences: {
    ongoing: ongoingProjects,
    completed: completedProjects,
    visual: getGalleryItem(39, "Selected Project Portfolio", "Representative portfolio summary.")
  },
  seo: {
    homeTitle: "SGB Engineering & Trading | Company Profile",
    homeDescription:
      "Investor and client-facing company profile for SGB Engineering & Trading, covering certifications, service capabilities, manpower strength, and project portfolio.",
    aboutDescription:
      "Company overview, clients, manpower profile, and organization visuals for SGB Engineering & Trading.",
    servicesDescription:
      "Service capabilities offered by SGB Engineering & Trading across installation, termination, cable management, and related systems work.",
    projectsDescription:
      "Ongoing and completed projects delivered by SGB Engineering & Trading across communications, VSS, ISCS, FCIS, MMS, and related systems.",
    certificationsDescription:
      "Certification and compliance highlights for SGB Engineering & Trading.",
    safetyDescription:
      "Quality check procedure, testing workflows, and equipment records for SGB Engineering & Trading."
  }
};

export const companyProfileSource = importedProfile.source;

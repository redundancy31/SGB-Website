type ImageRecord = {
  outputPath: string;
  altText: string;
};

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  description?: string;
};

type ProjectReference = {
  name: string;
  description: string;
  period: string;
  client: string;
  status: "Ongoing" | "Upcoming" | "Recently Completed" | "Archive";
  poNumber?: string;
};

function image(outputPath: string, altText: string): ImageRecord {
  return { outputPath, altText };
}

function gallery(src: string, alt: string, title: string, description?: string): GalleryItem {
  return { src, alt, title, description };
}

const recentProjectReferences: ProjectReference[] = [
  {
    name: "CC30 - Keppel - C860E, C861E & C830G",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the C860E, C861E and C830G systems.",
    period: "08/2023 - 04/2025",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E3H0290/64"
  },
  {
    name: "CC32 - Prince Edward - C860E, C861E & C830G",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the C860E, C861E and C830G systems.",
    period: "08/2023 - 04/2025",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E3H0290/64"
  },
  {
    name: "KCDE - Kim Chuan Depot Extension - C830G",
    description: "Supply and installation of cable support systems, accessories, cable laying, testing, termination, and AMS equipment installation.",
    period: "04/2023 - 06/2026",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E3H0155/64"
  },
  {
    name: "DT04 (Hume Station) - COMMS, ISCS, FCIS & MMS",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for AMS, ISCS and MMS systems.",
    period: "12/2022 - 12/2024",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E2Y0504/64"
  },
  {
    name: "COMM, FCIS & MMS System @ TE30",
    description: "Installation subcontract works for Thomson-East Coast Line Stage 3 Project T260, T261 and T256 at TE30 Bedok South MRT.",
    period: "09/2021 - 08/2023",
    client: "Safetech Engineering Pte Ltd",
    status: "Recently Completed",
    poNumber: "21224"
  },
  {
    name: "DT17 (Downtown) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT17.",
    period: "06/2024 - 10/2024",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E2Y0405/64"
  },
  {
    name: "DT18 (Telok Ayer) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT18.",
    period: "04/2024 - 06/2024",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E2Y0405/64"
  },
  {
    name: "DT26 (MacPherson) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT26.",
    period: "04/2024 - 06/2024",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E2Y0405/64"
  },
  {
    name: "DT25 (Mattar) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT25.",
    period: "10/2023 - 01/2024",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E2Y0405/64"
  },
  {
    name: "C830G (ISCS System)",
    description: "Power trunking and cabling works for the ISCS system across Circle Line station packages and depot scope.",
    period: "02/2021 - 09/2023",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "EYH0440/64"
  },
  {
    name: "DT33 (Tampines East) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT33.",
    period: "02/2021 - 10/2023",
    client: "ST Engineering Urban Solutions Ltd",
    status: "Recently Completed",
    poNumber: "E2Y0405/64"
  },
  {
    name: "COMM, FCIS & MMS System @ TE23",
    description: "Installation subcontract works for Thomson-East Coast Line Stage 3 Project T260, T261 and T256 at TE23 Tanjong Rhu MRT.",
    period: "12/2021 - 12/2023",
    client: "Safetech Engineering Pte Ltd",
    status: "Recently Completed",
    poNumber: "21224"
  }
];

const archiveProjectReferences: ProjectReference[] = [
  {
    name: "COMM, FCIS & MMS System @ TE29",
    description: "Installation subcontract works for Thomson-East Coast Line Stage 3 Project T260, T261 and T256 at TE29 Bayshore MRT.",
    period: "01/2023 - 04/2023",
    client: "Safetech Engineering Pte Ltd",
    status: "Archive",
    poNumber: "21224"
  },
  {
    name: "DT31 (Tampines West) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT31.",
    period: "09/2022 - 12/2022",
    client: "ST Engineering Electronics Ltd",
    status: "Archive",
    poNumber: "E2Y0405/64"
  },
  {
    name: "DT09 (Botanic Gardens Station) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT09.",
    period: "01/2022 - 08/2022",
    client: "ST Engineering Electronics Ltd",
    status: "Archive",
    poNumber: "E2Y0405/64"
  },
  {
    name: "DT11 (Newton Station) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT11.",
    period: "05/2021 - 02/2022",
    client: "ST Engineering Electronics Ltd",
    status: "Archive",
    poNumber: "EYL0298/64"
  },
  {
    name: "J160 VSS & PA System",
    description: "Supply and installation of cable support systems, cable laying, testing, records, equipment installation, and termination at JE5 Jurong East Station.",
    period: "10/2021 - 02/2022",
    client: "ST Engineering Electronics Ltd",
    status: "Archive",
    poNumber: "EYV0090/64"
  },
  {
    name: "DT13 (Rocher Station) - VSS System",
    description: "Installation of cable support systems, cable laying, termination, and equipment termination for the VSS system at DT13.",
    period: "05/2019 - 12/2021",
    client: "ST Engineering Electronics Ltd",
    status: "Archive",
    poNumber: "EYL0290/64"
  },
  {
    name: "COMM, FCIS & MMS System @ TE21",
    description: "Installation subcontract works for Thomson-East Coast Line Stage 3 Project T260, T261 and T256 at TE21.",
    period: "06/2018 - 07/2020",
    client: "Safetech Engineering Pte Ltd",
    status: "Archive",
    poNumber: "10019"
  },
  {
    name: "COMM, FCIS & MMS System @ TE09",
    description: "Installation subcontract works for Thomson-East Coast Line Stage 2 Project T260, T261 and T256 at TE09.",
    period: "09/2016 - 11/2016",
    client: "Safetech Engineering Pte Ltd",
    status: "Archive",
    poNumber: "22018"
  },
  {
    name: "Cabinet Installation",
    description: "Inter-rack cable laying and termination, DVR support bracket supply, cable labelling, cable testing, and rack-to-rack cabling.",
    period: "09/2016 - 11/2016",
    client: "Safetech Engineering Pte Ltd",
    status: "Archive",
    poNumber: "ETK0264/64"
  },
  {
    name: "VSS Wiring Works - C8377",
    description: "VSS wiring works at site together with IOCC and station wiring support under separate purchase orders.",
    period: "09/2016 - 02/2017",
    client: "Singapore Technologies Electronics Limited",
    status: "Archive",
    poNumber: "ETK0954/64 and ETVA088/64"
  },
  {
    name: "Cable Laying, CCTV and Decommissioning Works",
    description: "Cable laying, FO cable decommissioning, cable removal and management, CCTV replacement, radio disposal, and CCTV tapping works across rail environments.",
    period: "03/2017 - 09/2017",
    client: "Singapore Technologies Electronics Limited",
    status: "Archive",
    poNumber: "Multiple purchase orders"
  }
];

export const companyProfile = {
  company: {
    name: "SGB ENGINEERING & TRADING PTE. LTD.",
    shortName: "SGB Engineering & Trading",
    tagline: "Trusted execution for electrical, communication, and security systems",
    establishedYear: "2012",
    location: "Singapore",
    contactPerson: "Mohammad Mozammal Hoque",
    contactRole: "Operations Director",
    phone: "+65 6322 3970",
    email: "sgb.hoque@gmail.com",
    address: "3018 Bedok North Street 5, #05-44, EASTLINK, SG(486132)",
    operatingHours: "Mon-Fri, 8:30 AM - 6:00 PM (SGT)",
    responseTime: "We respond within 1-2 business days.",
    coverImage: image("/sgb-logo.png", "SGB Engineering logo")
  },
  hero: {
    eyebrow: "Singapore engineering delivery partner",
    title: "Procurement, installation, rectification works, and project execution for transport and infrastructure systems",
    summary:
      "SGB is positioned as a dependable subcontractor for small to medium-sized projects, backed by real team deployment charts, current pipeline references, and documented QA discipline.",
    highlights: [
      "Established in 2012 with repeat-business relationships",
      "Electrical, communication and security systems focus",
      "Current, upcoming and recently completed rail-related references",
      "BCA, ISO 9001, ISO 45001 and bizSAFE STAR trust stack"
    ],
    visuals: [
      gallery(
        "/company-profile/updated/hero-site-room.png",
        "Electrical room and installed cabinets",
        "Live project environments",
        "Delivery proof drawn from the updated company profile."
      ),
      gallery(
        "/company-profile/updated/service-equipment-device.png",
        "Installed cabinet equipment and labelled devices",
        "Clean installation standards"
      ),
      gallery(
        "/company-profile/updated/service-vss-power-db.png",
        "Labelled power DB termination work",
        "Termination and labelling discipline"
      )
    ]
  },
  overview: {
    title: "Company Overview",
    paragraphs: [
      "SGB Engineering & Trading Pte. Ltd., established in 2012, specializes in the installation of electrical, communication, and security systems.",
      "The company has extensive experience in procurement, installation, rectification works, and project management, delivering projects across multiple sectors.",
      "Today, SGB operates as a subcontractor for small to medium-sized projects, providing end-to-end project execution.",
      "SGB is committed to quality, reliability, and long-term client relationships, resulting in repeat business and referrals."
    ],
    trustHighlights: ["BCA Registered", "ISO 9001", "ISO 45001", "bizSAFE STAR"],
    stats: [
      { label: "Established", value: "2012" },
      { label: "Service Scopes", value: "17" },
      { label: "Active + Upcoming References", value: "6" },
      { label: "Existing Clients", value: "4" }
    ],
    pillars: [
      {
        title: "Execution Reliability",
        description: "SGB presents current and recently completed references, not just legacy credentials, to show live operating capability."
      },
      {
        title: "Deployment Visibility",
        description: "Team charts make site structure, reporting lines, safety roles, and installer capacity visible to potential clients."
      },
      {
        title: "Technical Breadth",
        description: "The revised service scope now spans metal works, equipment installation, communications systems, terminations, testing and labelling."
      },
      {
        title: "Compliance Readiness",
        description: "Certification, procurement quality checks, and testing workflow are surfaced early to reduce trust friction in buyer reviews."
      }
    ]
  },
  clients: [
    "ST ENGINEERING URBAN SOLUTIONS LTD",
    "SIEMENS MOBILITY PTE LTD",
    "Safetech Engineering PTE LTD",
    "Singapore Technologies Electronics Limited"
  ],
  certifications: [
    {
      id: "bca-certification",
      title: "BCA Certification",
      summary: "BCA registration presented as a first-line credibility signal.",
      image: image("/accreditations/bca-license-workheads.png", "BCA certification and workheads")
    },
    {
      id: "iso-9001",
      title: "ISO 9001",
      summary: "Quality management certification supporting disciplined delivery processes.",
      image: image("/accreditations/sgb-iso-9001-2024.jpg", "ISO 9001 certificate")
    },
    {
      id: "iso-45001",
      title: "ISO 45001",
      summary: "Occupational health and safety management certification.",
      image: image("/accreditations/sgb-iso-45001-2024.jpg", "ISO 45001 certificate")
    },
    {
      id: "bizsafe-star",
      title: "bizSAFE STAR",
      summary: "Safety accreditation highlighted as part of SGB's tender-ready profile.",
      image: image("/accreditations/sgb-bizsafe-star-2024.jpg", "bizSAFE STAR certificate")
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
      { companyName: "CALPEN CONTRACTORS PTE LTD", workerType: "Skilled", availability: "Immediate On Request" },
      { companyName: "DC CONTRACTORS PT LTD", workerType: "Skilled", availability: "Immediate On Request" }
    ],
    visuals: [
      gallery(
        "/company-profile/updated/org-overall.png",
        "SGB overall organization chart",
        "Organization Chart - Overall",
        "Overall reporting structure, safety roles and installer bench."
      ),
      gallery(
        "/company-profile/updated/team-jw2.png",
        "JW2 site organization chart",
        "JRL - JW2 (TAWAS Station) Team Chart",
        "Project-specific deployment chart for the JW2 team."
      ),
      gallery(
        "/company-profile/updated/team-kcd-ar.jpg",
        "KCD AR site organization chart",
        "CCL - KCD (AMS AR) Team Chart",
        "Dedicated structure for the KCD AMS AR scope."
      ),
      gallery(
        "/company-profile/updated/team-changi-east.png",
        "Changi East Depot site organization chart",
        "CRL - Changi East Depot Team Chart",
        "Updated site organization chart for the Changi East Depot scope."
      )
    ]
  },
  quality: {
    intro:
      "Procurement quality checks, testing procedures, and equipment readiness are presented as part of SGB's delivery discipline rather than a separate afterthought.",
    processVisuals: [
      gallery(
        "/company-profile/updated/quality-flow.png",
        "Quality check procedure flowchart",
        "Quality Check Procedure",
        "Material requisition, vendor coordination, quality acceptance, error handling and site delivery flow."
      ),
      gallery(
        "/company-profile/quality/slide-18-testing-procedure-1-01.jpeg",
        "Fluke cable analyzer testing procedure",
        "Testing Procedure - Fluke Cable Analyzer DSX5000",
        "Cable testing workflow for verification and records."
      ),
      gallery(
        "/company-profile/quality/slide-23-testing-procedure-3-02.png",
        "OTDR testing procedure",
        "Testing Procedure - Anritsu OTDR MT9085A-063",
        "Optical testing workflow for verification and records."
      ),
      gallery(
        "/company-profile/quality/slide-21-testing-procedure-3-01.png",
        "Site master testing procedure",
        "Testing Procedure - Anritsu Site Master S331L",
        "RF and site master verification workflow."
      )
    ],
    equipmentVisuals: [
      gallery(
        "/company-profile/updated/service-testing-collage.png",
        "Termination and testing work collage",
        "Termination & Testing Equipment",
        "Updated work visuals showing installed cabinets, fibre handling and field verification."
      ),
      gallery(
        "/company-profile/equipment/slide-17-termination-testing-equipment-1-01.png",
        "Fluke cable analyzer equipment visual",
        "Fluke Cable Analyzer - DSX 5000"
      ),
      gallery(
        "/company-profile/equipment/slide-20-termination-testing-equipment-3-01.png",
        "Fujikura fusion splicer visual",
        "Fujikura Fusion Splicer 90S+"
      ),
      gallery(
        "/company-profile/equipment/slide-22-termination-testing-equipment-4-01.png",
        "Field testing equipment visual",
        "Field Testing Equipment"
      ),
      gallery(
        "/company-profile/updated/service-equipment-device.png",
        "Installed equipment device visual",
        "Installed Equipment Devices"
      )
    ],
    equipmentNotes: [
      "Procurement and incoming material quality check flow",
      "Fluke Cable Analyzer DSX5000",
      "Anritsu OTDR MT9085A-063",
      "Anritsu Site Master S331L",
      "Field installation and termination evidence"
    ]
  },
  services: [
    {
      id: "metal-works-cable-trunking-tray-installation",
      title: "Metal Works - Cable Trunking & Tray Installation",
      summary: "Fabrication and installation support for route preparation, containment and cable support systems.",
      images: [image("/company-profile/updated/service-metal-tray-installation.png", "Metal works cable trunking and tray installation")]
    },
    {
      id: "metal-works-equipment-device-installation",
      title: "Metal Works - Equipment Device Installation",
      summary: "Equipment device positioning, mounting and coordinated installation for project environments.",
      images: [image("/company-profile/updated/service-equipment-installation.png", "Equipment device installation work")]
    },
    {
      id: "construction-radio-installation-termination",
      title: "Construction Radio Installation & Termination",
      summary: "Construction radio installation, cable handling and terminations for site communication scopes.",
      images: [image("/company-profile/general/slide-25-construction-radio-installation-termination-01.png", "Construction radio installation and termination")]
    },
    {
      id: "cctv-installation-termination",
      title: "CCTV Installation & Termination",
      summary: "CCTV hardware installation, cable management and termination works.",
      images: [image("/company-profile/general/slide-26-cctv-installation-termination-01.jpeg", "CCTV installation and termination")]
    },
    {
      id: "speaker-installation-termination",
      title: "Speaker Installation & Termination",
      summary: "Public address speaker installation and termination support for operational sites and transport environments.",
      images: [image("/company-profile/updated/service-equipment-device.png", "Speaker and device installation support")]
    },
    {
      id: "cable-management-work",
      title: "Cable Management Work",
      summary: "Cable routing, dressing, segregation and general cable management execution.",
      images: [image("/company-profile/general/slide-27-cable-management-work-01.jpeg", "Cable management work")]
    },
    {
      id: "ldb-lbf-termination",
      title: "LDB & LBF Termination",
      summary: "Termination works for low distribution and feeder board related scopes.",
      images: [image("/company-profile/general/slide-28-ldb-lbf-termination-01.jpeg", "LDB and LBF termination")]
    },
    {
      id: "pa-cabinet-clb-termination-labelling",
      title: "PA Cabinet & CLB Termination With Labelling",
      summary: "PA cabinet and CLB termination with disciplined identification and labelling.",
      images: [image("/company-profile/updated/service-labelling-termination.png", "PA cabinet termination with labelling")]
    },
    {
      id: "radio-cable-termination",
      title: "Radio Cable Termination",
      summary: "Radio cable terminations, records and structured routing support.",
      images: [image("/company-profile/general/slide-30-radio-cable-termination-01.jpeg", "Radio cable termination")]
    },
    {
      id: "ups-bypass-termination",
      title: "UPS Bypass Termination",
      summary: "UPS bypass termination and integration support for site electrical systems.",
      images: [image("/company-profile/general/slide-31-ups-bypass-termination-01.jpeg", "UPS bypass termination")]
    },
    {
      id: "vss-power-db-termination-labelling",
      title: "VSS Power DB Termination With Labelling",
      summary: "Termination and labelled handover work for VSS power distribution board scopes.",
      images: [image("/company-profile/updated/service-vss-power-db.png", "VSS power DB termination with labelling")]
    },
    {
      id: "vss-itb-iscs-itb-termination",
      title: "VSS ITB & ISCS ITB Termination",
      summary: "Integrated termination works for VSS and ISCS ITB packages.",
      images: [image("/company-profile/general/slide-33-vss-itb-installation-termination-02.png", "VSS and ISCS ITB termination")]
    },
    {
      id: "vss-cabinet-splicing-box-installation-termination",
      title: "VSS Cabinet Splicing Box Installation & Termination",
      summary: "Splicing box installation, cabinet integration and termination for VSS system work packages.",
      images: [image("/company-profile/general/slide-34-vss-cabinet-splicing-box-installation-termination-01.jpeg", "VSS cabinet splicing box installation and termination")]
    },
    {
      id: "cabinets-installation-termination",
      title: "Cabinets Installation & Termination",
      summary: "Cabinet installation, dressing and termination for communication and electrical systems.",
      images: [image("/company-profile/updated/service-cabinet-termination.png", "Cabinets installation and termination")]
    },
    {
      id: "db-cabinet-termination-labelling",
      title: "DB & Cabinet Termination With Labelling",
      summary: "Structured DB and cabinet terminations with clear cable and point labelling.",
      images: [image("/company-profile/general/slide-36-db-cabinet-termination-with-labelling-01.jpeg", "DB and cabinet termination with labelling")]
    },
    {
      id: "pabx-termination-labelling",
      title: "PABX Termination with Labelling",
      summary: "PABX terminations supported by neat routing and labelled completion standards.",
      images: [image("/company-profile/general/slide-37-pabx-termination-with-labelling-01.jpeg", "PABX termination with labelling")]
    },
    {
      id: "mobile-antenna-termination-labelling",
      title: "Mobile Antenna Termination With Labelling",
      summary: "Mobile antenna termination works with site-ready labelling and closeout quality.",
      images: [image("/company-profile/general/slide-38-mobile-antenna-termination-with-labelling-01.jpeg", "Mobile antenna termination with labelling")]
    }
  ],
  projectReferences: {
    ongoing: [
      {
        name: "JW2-TAWAS - J160, J155, J172",
        description: "Installation of cable support systems, cable laying, termination, and equipment termination for COMMS, ISCS and AFC systems.",
        period: "01/2025 - 12/2026",
        client: "ST Engineering Urban Solutions Ltd",
        status: "Ongoing",
        poNumber: "E4H0414/64"
      },
      {
        name: "ESS - J160 - J155",
        description: "Installation of cable support systems, cable laying, termination, and equipment termination for COMMS and ISCS systems.",
        period: "01/2025 - 12/2026",
        client: "ST Engineering Urban Solutions Ltd",
        status: "Ongoing",
        poNumber: "E4H0414/64"
      },
      {
        name: "C830G (KCD) AMS AR",
        description: "Supply and installation of cable support systems, testing records, equipment installation and terminations for Kim Chuan Depot AMS AR scope.",
        period: "06/2025 - 12/2026",
        client: "ST Engineering Urban Solutions Ltd",
        status: "Ongoing",
        poNumber: "E5H0266/64"
      }
    ],
    upcoming: [
      {
        name: "Renewal of Public Address System - CCL Stations and BOCC",
        description: "Renewal scope for the public address system across CCL stations and BOCC.",
        period: "Not Confirmed Yet",
        client: "ST Engineering Urban Solutions Ltd",
        status: "Upcoming",
        poNumber: "E5H0270/64"
      },
      {
        name: "JE4 (Toh Guan) - J160, J155, J172",
        description: "Installation of cable support systems, cable laying, termination, and equipment termination for COMMS, ISCS and AFC systems.",
        period: "Not Confirmed Yet",
        client: "ST Engineering Urban Solutions Ltd",
        status: "Upcoming",
        poNumber: "E4H0414/64"
      },
      {
        name: "JE7 (Pandan Reservoir) - J160, J155, J172",
        description: "Installation of cable support systems, cable laying, termination, and equipment termination for COMMS, ISCS and AFC systems.",
        period: "Not Confirmed Yet",
        client: "ST Engineering Urban Solutions Ltd",
        status: "Upcoming",
        poNumber: "E4H0414/64"
      }
    ],
    recentlyCompleted: recentProjectReferences,
    archiveCompleted: archiveProjectReferences,
    completed: [...recentProjectReferences, ...archiveProjectReferences],
    visuals: [
      gallery(
        "/company-profile/updated/service-equipment-installation.png",
        "Installed equipment cabinet room",
        "Installed equipment environments"
      ),
      gallery(
        "/company-profile/updated/service-cabinet-termination.png",
        "Cabinet termination work collage",
        "Cabinet termination proof"
      ),
      gallery(
        "/company-profile/updated/service-vss-power-db.png",
        "Labelled VSS power DB termination",
        "Labelled closeout standards"
      )
    ]
  },
  seo: {
    homeTitle: "SGB Engineering & Trading | Singapore Systems Execution Partner",
    homeDescription:
      "Client-facing pitch website for SGB Engineering & Trading, covering live project references, certifications, manpower deployment, service scope and QA readiness.",
    aboutDescription:
      "Company overview, client list, manpower capacity and team charts for SGB Engineering & Trading.",
    servicesDescription:
      "Service scope for SGB Engineering & Trading across metal works, equipment installation, communications systems, terminations and labelling.",
    projectsDescription:
      "Ongoing, upcoming, recently completed and archive project references for SGB Engineering & Trading.",
    certificationsDescription:
      "Certification and compliance highlights for SGB Engineering & Trading.",
    safetyDescription:
      "Quality check procedure, testing workflow and equipment readiness for SGB Engineering & Trading."
  }
};

export const companyProfileSource = {
  sourceFileName: "SGB PROFILE Updated.pdf",
  sourceRelativePath: "c:/Users/siamu/Downloads/SGB PROFILE Updated.pdf",
  importedAt: "2026-03-17T14:56:59+08:00",
  note: "Content refreshed from the PDF provided by the user and selected visuals extracted through a local Word conversion."
};

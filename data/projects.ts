export type ProjectItem = {
  slug: string;
  title: string;
  sector: "Transport" | "Industrial" | "Commercial" | "Public Infrastructure";
  serviceType:
    | "M&E Installation"
    | "Electrical Systems"
    | "Communications"
    | "Signalling / Control"
    | "Maintenance"
    | "Project Management";
  location: string;
  duration: string;
  scope: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
};

export const projects: ProjectItem[] = [
  {
    slug: "north-corridor-transit-interface-upgrade",
    title: "North Corridor Transit Interface Upgrade",
    sector: "Transport",
    serviceType: "Signalling / Control",
    location: "Singapore (Location Placeholder)",
    duration: "18 months",
    scope: "Control panel upgrades, route cabling and integration support within operating rail-adjacent environment.",
    challenge: "High interface complexity and limited engineering windows.",
    solution: "Phased cutover plan with coordinated testing and strict permit controls.",
    result: "System transition completed with controlled disruption and documented verification.",
    image: "/placeholders/project-01.jpg"
  },
  {
    slug: "jurong-industrial-power-reliability-program",
    title: "Jurong Industrial Power Reliability Program",
    sector: "Industrial",
    serviceType: "Electrical Systems",
    location: "Singapore (Location Placeholder)",
    duration: "12 months",
    scope: "HV/LV distribution upgrades, protection studies support and commissioning readiness.",
    challenge: "Maintaining uptime during phased power migration.",
    solution: "Night-shift migration sequencing with temporary supply continuity plans.",
    result: "Reliability uplift achieved with safe energization process.",
    image: "/placeholders/project-02.jpg"
  },
  {
    slug: "downtown-commercial-tower-me-package",
    title: "Downtown Commercial Tower M&E Package",
    sector: "Commercial",
    serviceType: "M&E Installation",
    location: "Singapore (Location Placeholder)",
    duration: "20 months",
    scope: "End-to-end M&E installation coordination for mechanical plant and electrical infrastructure.",
    challenge: "Tight ceiling spaces and multi-trade clashes.",
    solution: "Front-loaded interface workshops and coordinated weekly look-ahead planning.",
    result: "Progress milestones met with reduced rework.",
    image: "/placeholders/project-03.jpg"
  },
  {
    slug: "regional-hospital-networking-modernization",
    title: "Regional Hospital Networking Modernization",
    sector: "Public Infrastructure",
    serviceType: "Communications",
    location: "Singapore (Location Placeholder)",
    duration: "10 months",
    scope: "Structured cabling and communications infrastructure enhancement.",
    challenge: "Operational facility with critical service continuity requirements.",
    solution: "Zone-based rollout with strict access protocols and testing records.",
    result: "Improved backbone resilience and traceable as-built documentation.",
    image: "/placeholders/project-04.jpg"
  },
  {
    slug: "campus-lifecycle-maintenance-and-retrofit",
    title: "Campus Lifecycle Maintenance and Retrofit",
    sector: "Public Infrastructure",
    serviceType: "Maintenance",
    location: "Singapore (Location Placeholder)",
    duration: "Ongoing annual contract",
    scope: "Preventive maintenance, replacement planning and targeted upgrade works.",
    challenge: "Balancing service reliability against budget and site access.",
    solution: "Priority-based maintenance matrix and quarterly performance reviews.",
    result: "Steadier fault trend and improved system availability.",
    image: "/placeholders/project-05.jpg"
  },
  {
    slug: "integrated-airside-systems-coordination",
    title: "Integrated Airside Systems Coordination",
    sector: "Transport",
    serviceType: "Project Management",
    location: "Singapore (Location Placeholder)",
    duration: "14 months",
    scope: "Technical coordination across control, electrical and communications interfaces.",
    challenge: "Complex stakeholder alignment across concurrent contractors.",
    solution: "Centralized issue tracking with structured technical review cycles.",
    result: "Improved package integration visibility and streamlined closeout.",
    image: "/placeholders/project-06.jpg"
  }
];

export const projectSectors = ["All", "Transport", "Industrial", "Commercial", "Public Infrastructure"] as const;
export const projectServiceTypes = [
  "All",
  "M&E Installation",
  "Electrical Systems",
  "Communications",
  "Signalling / Control",
  "Maintenance",
  "Project Management"
] as const;

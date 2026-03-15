import type React from "react";
import {
  BriefcaseBusiness,
  Cable,
  ClipboardList,
  Gauge,
  Network,
  Wrench
} from "lucide-react";

export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  overview: string;
  scope: string[];
  industries: string[];
  strengths: string[];
  compliance: string[];
};

export const services: ServiceItem[] = [
  {
    id: "me-installation",
    title: "Mechanical & Electrical Installation",
    summary:
      "Coordinated M&E installation works including sprinkler, electrical and related system interfaces.",
    icon: Wrench,
    image: "/placeholders/service-me-install.jpg",
    overview:
      "We execute practical M&E installation scopes from planning to testing and handover, with clear sequencing and trade integration.",
    scope: [
      "Sprinkler system installation and associated M&E interfaces",
      "Plant room and equipment installation",
      "Containment, cabling and power distribution interfaces",
      "BMS-ready integration support",
      "Testing, commissioning and as-built closeout"
    ],
    industries: ["Commercial developments", "Public infrastructure", "Industrial facilities"],
    strengths: ["Interface risk planning", "Method statement discipline", "Structured handover support"],
    compliance: ["Permit-to-work controls", "Risk assessments and SWP", "Client and statutory documentation"]
  },
  {
    id: "electrical-hvlv",
    title: "Electrical Systems (HV/LV)",
    summary:
      "Implementation support for HV/LV electrical systems with safety, reliability and maintainability focus.",
    icon: Gauge,
    image: "/placeholders/service-electrical.jpg",
    overview:
      "Our electrical teams support full lifecycle activities for critical power systems, emphasizing uptime, compliance and maintainable design intent.",
    scope: [
      "HV/LV switchgear and distribution deployment",
      "Sub-main cabling and termination works",
      "Cable routing, termination and testing",
      "Protection coordination support",
      "Commissioning and energization readiness"
    ],
    industries: ["Transport infrastructure", "Data-support facilities", "Large mixed-use assets"],
    strengths: ["Technical submittal quality", "Systematic testing protocols", "Stakeholder coordination"],
    compliance: ["Electrical safety standards", "Inspection test plans", "Statutory submission support"]
  },
  {
    id: "communications-networking",
    title: "Communications & Networking Systems",
    summary:
      "Infrastructure cabling and communications system works including fiber optic deployment for rail-related environments.",
    icon: Network,
    image: "/placeholders/service-comms.jpg",
    overview:
      "We deliver communications network scope with robust documentation and labeling standards for maintainability and handover clarity.",
    scope: [
      "Structured cabling deployment",
      "Fiber optic and copper network pathways",
      "Fiber optic cabling support for MRT system environments",
      "Racks, cabinets and passive network infrastructure",
      "Testing, tagging and records"
    ],
    industries: ["Commercial towers", "Public transit", "Institutional campuses"],
    strengths: ["Documentation consistency", "Coordination with ICT vendors", "Quality punchlist closure"],
    compliance: ["Installation standards adherence", "Traceable test reports", "Asset identification discipline"]
  },
  {
    id: "signalling-control",
    title: "Security, Access Control & ELV Systems",
    summary:
      "Security and ELV-related installation support for controlled access and integrated systems environments.",
    icon: Cable,
    image: "/placeholders/service-signalling.jpg",
    overview:
      "Our teams support access control and ELV packages with careful interface management, verification planning and site safety controls.",
    scope: [
      "EM lock installations and access control device wiring",
      "Control panel and field device installation",
      "Route and interface cabling works",
      "Functional testing support",
      "System migration and cutover support"
    ],
    industries: ["Commercial facilities", "Transport-related assets", "Critical facilities"],
    strengths: ["High-coordination execution", "Change management support", "Operational readiness checks"],
    compliance: ["Strict access and permit control", "Functional verification records", "Safety-critical work discipline"]
  },
  {
    id: "maintenance-upgrading",
    title: "Maintenance & Upgrading Works",
    summary:
      "Planned maintenance and upgrading programs to sustain performance, reduce downtime and extend asset life.",
    icon: ClipboardList,
    image: "/placeholders/service-maintenance.jpg",
    overview:
      "We provide maintenance and upgrading works that keep systems compliant and operational through preventive, corrective and enhancement interventions.",
    scope: [
      "Preventive and corrective maintenance",
      "Lifecycle replacement planning",
      "System upgrades and retrofits",
      "Documentation updates and closeout"
    ],
    industries: ["Public assets", "Commercial facilities", "Operational infrastructure"],
    strengths: ["Minimal disruption planning", "Fast issue response", "Clear reporting cadence"],
    compliance: ["Maintenance safety procedures", "PTW and lockout controls", "Service traceability"]
  },
  {
    id: "project-management",
    title: "Project Management & Technical Coordination",
    summary:
      "Integrated planning, technical coordination and progress governance across multidisciplinary stakeholders.",
    icon: BriefcaseBusiness,
    image: "/placeholders/service-pm.jpg",
    overview:
      "Our coordination teams align scope, schedule, safety and quality requirements to maintain clear execution visibility throughout delivery.",
    scope: [
      "Project controls and look-ahead planning",
      "Technical coordination and interfaces",
      "Risk register and issue tracking support",
      "Handover package planning"
    ],
    industries: ["Main contractor environments", "Public procurement projects", "Complex build programs"],
    strengths: ["Structured reporting", "Schedule awareness", "Cross-discipline communication"],
    compliance: ["Document control discipline", "QA/QC workflow support", "Client reporting requirements"]
  }
];

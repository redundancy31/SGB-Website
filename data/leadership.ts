export type Leader = {
  name: string;
  role: string;
  profile: string;
  image: string;
};

export const leadership: Leader[] = [
  {
    name: "Managing Director Placeholder",
    role: "Managing Director",
    profile:
      "Oversees strategic direction, governance standards and long-term client partnerships across engineering delivery programs.",
    image: "/placeholders/team-managing-director.jpg"
  },
  {
    name: "Technical Director Placeholder",
    role: "Technical Director",
    profile:
      "Leads multidisciplinary technical planning with focus on constructability, compliance and engineering risk management.",
    image: "/placeholders/team-technical-director.jpg"
  },
  {
    name: "Head of Operations Placeholder",
    role: "Head of Operations",
    profile:
      "Drives execution controls, site coordination and handover performance for active project portfolios.",
    image: "/placeholders/team-operations-head.jpg"
  }
];

export const timeline = [
  {
    year: "2008",
    title: "Company Formation",
    detail: "SGB Engineering established in Singapore with core M&E project capabilities."
  },
  {
    year: "2013",
    title: "Capability Expansion",
    detail: "Expanded electrical and systems integration support for infrastructure projects."
  },
  {
    year: "2018",
    title: "Governance Enhancement",
    detail: "Formalized QA/QC and HSE frameworks across all major project workflows."
  },
  {
    year: "2024",
    title: "Regional Readiness",
    detail: "Strengthened corporate systems to support future regional project participation."
  }
];

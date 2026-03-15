import type { Metadata } from "next";

import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProfileTable } from "@/components/sections/ProfileTable";

export const metadata: Metadata = {
  title: "Projects",
  description: companyProfile.seo.projectsDescription
};

export default function ProjectsPage() {
  return (
    <>
      <section className="section-space pb-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Projects"
            title="Ongoing and Completed Projects"
            description="Selected project references are organized below by current status to present delivery history clearly and professionally."
          />
        </div>
      </section>

      <section className="section-space section-subtle pt-0">
        <div className="container-shell">
          <SectionHeading eyebrow="Ongoing" title="Current Projects" description="Representative ongoing references." />
          <div className="mt-8">
            <ProfileTable
              columns={[
                { key: "name", label: "Project" },
                { key: "period", label: "Period" },
                { key: "client", label: "Client" }
              ]}
              rows={companyProfile.projectReferences.ongoing}
            />
          </div>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell">
          <SectionHeading eyebrow="Completed" title="Completed Projects" description="Selected completed project references." />
          <div className="mt-8">
            <ProfileTable
              columns={[
                { key: "name", label: "Project" },
                { key: "period", label: "Period" },
                { key: "client", label: "Client" }
              ]}
              rows={companyProfile.projectReferences.completed}
            />
          </div>
        </div>
      </section>
    </>
  );
}

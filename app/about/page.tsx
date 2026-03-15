import type { Metadata } from "next";

import { company } from "@/data/company";
import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { ProfileTable } from "@/components/sections/ProfileTable";

export const metadata: Metadata = {
  title: "About",
  description: companyProfile.seo.aboutDescription
};

export default function AboutPage() {
  return (
    <>
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
          <SectionHeading
            eyebrow="About"
            title={company.name}
            description="Company overview, client references, and manpower capability for SGB Engineering & Trading."
          />
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-primary">Established:</span> {company.establishedYear}
              </p>
              <p>
                <span className="font-medium text-primary">Location:</span> {company.location}
              </p>
              <p>
                <span className="font-medium text-primary">Primary Contact in Profile:</span> {company.contactPerson}, {company.contactRole}
              </p>
            </div>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {companyProfile.overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-primary">Existing Clients Listed in the Profile</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {companyProfile.clients.map((client) => (
                <li key={client} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                  {client}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-space section-subtle">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Organization & Team"
            title="Organization Charts and Key Staff Visuals"
            description="Organization and team visuals support the company profile with an operational view of structure and field capability."
          />
          <div className="mt-10">
            <ImageGallery items={companyProfile.manpower.visuals} imageClassName="h-72 w-full rounded-none object-contain bg-slate-50" />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Manpower"
            title="On-Site Manpower Capabilities"
            description="The following manpower counts are transcribed directly from the company profile tables."
          />
          <div className="mt-8">
            <ProfileTable
              columns={[
                { key: "designation", label: "Designation" },
                { key: "headcount", label: "Pax / Availability" }
              ]}
              rows={companyProfile.manpower.onsite}
            />
          </div>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Skilled Personnel"
              title="Certified and Operational Support Roles"
              description="These roles reinforce specialist site-readiness and operational support capacity."
            />
            <div className="mt-8">
              <ProfileTable
                columns={[
                  { key: "designation", label: "Designation" },
                  { key: "headcount", label: "Pax" }
                ]}
                rows={companyProfile.manpower.skilled}
              />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Additional Resources"
              title="Additional Manpower Resources"
              description="Supplementary manpower resources available on request."
            />
            <div className="mt-8">
              <ProfileTable
                columns={[
                  { key: "companyName", label: "Company Name" },
                  { key: "workerType", label: "Worker Type" },
                  { key: "availability", label: "Availability" }
                ]}
                rows={companyProfile.manpower.additionalResources}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

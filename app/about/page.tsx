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
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="About"
              title={company.name}
              description="The updated profile now reads less like a company brochure and more like a buyer review pack: who SGB is, who engages them, and how teams are deployed on site."
            />
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-primary">Established:</span> {company.establishedYear}
              </p>
              <p>
                <span className="font-medium text-primary">Location:</span> {company.location}
              </p>
              <p>
                <span className="font-medium text-primary">Primary Contact:</span> {company.contactPerson}, {company.contactRole}
              </p>
            </div>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {companyProfile.overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-primary">Existing Clients Listed in the Updated Deck</h2>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                {companyProfile.clients.map((client) => (
                  <li key={client} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
                    {client}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-primary">Trust Stack</h2>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                {companyProfile.overview.trustHighlights.map((item) => (
                  <li key={item} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space section-subtle">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Team Deployment"
            title="Updated organization and project team charts"
            description="The new slides replace the older key-staff style visuals with clearer organization and project-specific deployment charts."
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
            title="On-site manpower capabilities"
            description="The manpower profile remains positioned as execution proof: project management, safety, supervision, LEW support and installer bench strength."
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
              title="Certified and operational support roles"
              description="These roles reinforce site-readiness for lifting, scaffolding, rescue, first aid and access equipment operations."
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
              title="Additional manpower resources"
              description="Supplementary skilled manpower can be activated on request to support project peaks and accelerated deployment needs."
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

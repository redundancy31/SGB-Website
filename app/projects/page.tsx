import type { Metadata } from "next";

import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImageGallery } from "@/components/sections/ImageGallery";

export const metadata: Metadata = {
  title: "Projects",
  description: companyProfile.seo.projectsDescription
};

function ProjectCard({
  name,
  description,
  period,
  client,
  poNumber
}: {
  name: string;
  description: string;
  period: string;
  client: string;
  poNumber?: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-base font-semibold text-primary">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-4 grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="font-medium text-primary">Period</p>
          <p className="mt-1">{period}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="font-medium text-primary">Client</p>
          <p className="mt-1">{client}</p>
        </div>
      </div>
      {poNumber ? (
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-secondary">PO: {poNumber}</p>
      ) : null}
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <section className="section-space pb-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Projects"
            title="Project portfolio presented as pipeline, proof and track record"
            description="The project portfolio is structured around ongoing scopes, upcoming opportunities, recently completed work and archive references that show delivery continuity."
          />
          <div className="mt-10">
            <ImageGallery items={companyProfile.projectReferences.visuals} imageClassName="h-72 w-full rounded-none object-cover bg-slate-50" />
          </div>
        </div>
      </section>

      <section className="section-space section-subtle pt-0">
        <div className="container-shell">
          <SectionHeading eyebrow="Ongoing" title="Current delivery scopes" description="Active references that show live delivery capability." />
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {companyProfile.projectReferences.ongoing.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Upcoming"
            title="Pipeline opportunities"
            description="Forthcoming scopes that show continuity in demand and sector relevance."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {companyProfile.projectReferences.upcoming.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space section-subtle">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Recently Completed"
            title="Recent delivery proof"
            description="These references reinforce current execution capability rather than relying only on older legacy work."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {companyProfile.projectReferences.recentlyCompleted.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Archive References"
            title="Earlier project history"
            description="Older references are still retained to show continuity of work across rail, VSS, PA, communications and associated systems."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {companyProfile.projectReferences.archiveCompleted.map((project) => (
              <article key={project.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
                <h3 className="text-base font-semibold text-primary">{project.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <p className="mt-4 text-xs font-medium text-secondary">{project.period}</p>
                <p className="mt-1 text-xs text-muted-foreground">{project.client}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

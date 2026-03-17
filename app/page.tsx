import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { company } from "@/data/company";
import { companyProfile } from "@/data/company-profile";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ImageGallery } from "@/components/sections/ImageGallery";

export default function HomePage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: "https://www.sgbengineering.sg",
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      streetAddress: company.address
    }
  };

  const certificationPreview = companyProfile.certifications.map((item) => ({
    src: item.image.outputPath,
    alt: item.image.altText,
    title: item.title,
    description: item.summary
  }));

  const servicePreview = companyProfile.services.slice(0, 6).map((service) => ({
    src: service.images[0]?.outputPath ?? "",
    alt: service.images[0]?.altText ?? service.title,
    title: service.title,
    description: service.summary
  }));

  return (
    <>
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <section className="section-space pb-10">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                {companyProfile.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-tight text-primary sm:text-5xl">
                {company.tagline}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/90">{companyProfile.hero.title}</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{companyProfile.hero.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button>Discuss Your Requirement</Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline">Review Project Proof</Button>
                </Link>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {companyProfile.hero.highlights.map((item) => (
                  <li key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-muted-foreground shadow-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
                <ImagePlaceholder
                  src={companyProfile.hero.visuals[0].src}
                  alt={companyProfile.hero.visuals[0].alt}
                  className="h-72 w-full rounded-xl object-cover"
                  label={companyProfile.hero.visuals[0].title}
                />
              </div>
              {companyProfile.hero.visuals.slice(1).map((item) => (
                <div key={item.src} className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
                  <ImagePlaceholder src={item.src} alt={item.alt} className="h-52 w-full rounded-xl object-cover" label={item.title} />
                  <div className="px-1 pb-1 pt-3">
                    <p className="text-sm font-semibold text-primary">{item.title}</p>
                    {item.description ? <p className="mt-1 text-xs text-muted-foreground">{item.description}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
            <StatsStrip stats={companyProfile.overview.stats} />
          </div>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Why SGB"
                title="A client-facing pitch built around trust, capability and visible execution"
                description="The updated slides move the story from a static brochure toward live capability proof: who is deployed, what is being delivered now, and how work quality is controlled."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {companyProfile.overview.pillars.map((pillar) => (
                  <article key={pillar.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-base font-semibold text-primary">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-primary">Existing Clients</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The updated profile highlights an active client roster centered on transport, infrastructure and systems execution environments.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {companyProfile.clients.map((client) => (
                  <li key={client} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
                    {client}
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
            eyebrow="Certifications & Compliance"
            title="Trust signals presented before buyers need to ask"
            description="BCA certification, ISO 9001, ISO 45001 and bizSAFE STAR are surfaced early because they are part of the buying decision, not supporting detail."
          />
          <div className="mt-10">
            <ImageGallery items={certificationPreview} imageClassName="h-72 w-full rounded-none object-contain bg-slate-50" />
          </div>
          <Link href="/certifications" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
            View certifications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Live Pipeline"
            title="Current work, upcoming opportunities and recently completed proof"
            description="The updated project section is now positioned like a pipeline review: what is running, what is pending and what has just been delivered."
          />
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-primary">Ongoing</h3>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                {companyProfile.projectReferences.ongoing.map((project) => (
                  <li key={project.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="font-medium text-primary">{project.name}</p>
                    <p className="mt-2 text-xs leading-relaxed">{project.description}</p>
                    <p className="mt-3 text-xs font-medium text-secondary">{project.period}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-primary">Upcoming</h3>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                {companyProfile.projectReferences.upcoming.map((project) => (
                  <li key={project.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="font-medium text-primary">{project.name}</p>
                    <p className="mt-2 text-xs leading-relaxed">{project.description}</p>
                    <p className="mt-3 text-xs font-medium text-secondary">{project.period}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-primary">Recently Completed</h3>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                {companyProfile.projectReferences.recentlyCompleted.slice(0, 4).map((project) => (
                  <li key={project.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="font-medium text-primary">{project.name}</p>
                    <p className="mt-2 text-xs leading-relaxed">{project.description}</p>
                    <p className="mt-3 text-xs font-medium text-secondary">{project.period}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/projects" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
            Review the full project portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-space section-subtle">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Capabilities"
            title="Breadth that goes beyond a basic installation contractor profile"
            description="The revised service list expands beyond earlier references to include metal works, equipment device installation, labelled closeout scopes and integrated system termination work."
          />
          <div className="mt-10">
            <ImageGallery items={servicePreview} />
          </div>
          <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
            Explore the full capability list
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-primary">Team deployment is visible, not abstract</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The updated profile now shows overall organization and project-specific team charts so buyers can see the safety, supervision and installer structure behind the promise.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-bold text-primary">16</p>
                <p className="mt-2 text-sm text-muted-foreground">Installers listed in the on-site manpower profile</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-bold text-primary">9</p>
                <p className="mt-2 text-sm text-muted-foreground">First aiders presented in skilled personnel support</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about">
                <Button variant="outline">View manpower and team charts</Button>
              </Link>
              <Link href="/safety-quality">
                <Button>Review QA and testing</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-primary bg-primary p-8 text-white shadow-soft sm:p-10">
            <h2 className="text-balance text-3xl font-bold">Discuss your next scope with SGB</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">
              Contact {company.contactPerson}, {company.contactRole}, for capability alignment, supporting documents and project discussions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button variant="accent">Contact SGB</Button>
              </Link>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`}>
                <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
              </a>
              <a href={`mailto:${company.email}`}>
                <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                  <Mail className="h-4 w-4" />
                  Email Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

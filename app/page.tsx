import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { company } from "@/data/company";
import { companyProfile } from "@/data/company-profile";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
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

  const certificationPreview = companyProfile.certifications
    .filter((item) => item.image?.outputPath)
    .map((item) => ({
      src: item.image!.outputPath,
      alt: item.image!.altText,
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
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                {companyProfile.hero.eyebrow}
              </p>
              <h1 className="mt-5 text-balance text-4xl font-bold leading-tight text-primary sm:text-5xl">{company.tagline}</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{companyProfile.hero.title}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{companyProfile.hero.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button>Request Company Profile Support</Button>
                </Link>
                <Link href="/certifications">
                  <Button variant="outline">View Certifications</Button>
                </Link>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {companyProfile.hero.highlights.map((item) => (
                  <li key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
              <ImagePlaceholder
                src={company.heroImage}
                alt={company.tagline}
                className="h-[420px] w-full bg-slate-50 object-contain"
                label="SGB Engineering logo"
              />
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
            <StatsStrip stats={companyProfile.overview.stats} />
          </div>
        </div>
      </section>

      <section className="section-subtle py-10">
        <div className="container-shell">
          <TrustBar items={company.trustHighlights} />
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Company Overview"
              title="Investor and Client Snapshot"
              description="SGB Engineering & Trading is positioned around the priorities investors, clients, and partners expect to review first: company overview, compliance, capabilities, delivery record, technical strength, and contact."
            />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {companyProfile.overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-primary">Existing Clients</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
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
            eyebrow="Certifications & Compliance"
            title="Trust Signals Presented Early"
            description="SGB highlights BCA registration together with ISO 9001, ISO 45001, and bizSAFE STAR."
          />
          <div className="mt-10">
            <ImageGallery items={certificationPreview} imageClassName="h-72 w-full rounded-none object-contain bg-slate-50" />
          </div>
          <Link href="/certifications" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
            View certification section
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Capabilities"
            title="Core Service Capabilities"
            description="SGB offers a focused set of installation, termination, cable management, and systems support capabilities across operational project environments."
          />
          <div className="mt-10">
            <ImageGallery items={servicePreview} />
          </div>
          <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
            Explore full capability list
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-space section-subtle">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Project Proof"
            title="Ongoing and Completed Project References"
            description="Selected ongoing and completed projects are presented as named references to reinforce delivery credibility and execution history."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-primary">Ongoing</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {companyProfile.projectReferences.ongoing.slice(0, 4).map((project) => (
                  <li key={project.name} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="font-medium text-primary">{project.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{project.period}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-primary">Completed</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {companyProfile.projectReferences.completed.slice(0, 5).map((project) => (
                  <li key={project.name} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="font-medium text-primary">{project.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{project.period}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/projects" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
            Review project portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-primary">Manpower and Technical Strength</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              SGB maintains defined on-site and skilled manpower capacity together with additional manpower resources, organization support, and
              testing equipment capability.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-bold text-primary">16</p>
                <p className="mt-2 text-sm text-muted-foreground">Installers shown in on-site manpower capability</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-bold text-primary">9</p>
                <p className="mt-2 text-sm text-muted-foreground">First aiders listed in skilled-personnel capability</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Link href="/about">
                <Button variant="outline">View company strength</Button>
              </Link>
              <Link href="/safety-quality">
                <Button>Review QA and testing</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-primary p-8 text-white shadow-soft sm:p-10">
            <h2 className="text-balance text-3xl font-bold">Discuss Your Requirement</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              Contact {company.contactPerson}, {company.contactRole}, or send your inquiry to our team for profile documents, capability alignment,
              and project discussions.
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

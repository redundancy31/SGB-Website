import type { Metadata } from "next";

import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "Safety & Quality",
  description: companyProfile.seo.safetyDescription
};

export default function SafetyQualityPage() {
  return (
    <>
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Safety & Quality"
              title="Quality control and testing are part of the delivery pitch"
              description={companyProfile.quality.intro}
            />
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {companyProfile.quality.equipmentNotes.map((note) => (
                <li key={note} className="rounded-md border border-slate-200 bg-white p-3">
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
            <ImagePlaceholder
              src={companyProfile.quality.processVisuals[0]?.src ?? ""}
              alt={companyProfile.quality.processVisuals[0]?.alt ?? "Quality procedure visual"}
              className="h-56 w-full rounded-none object-contain bg-slate-50 p-4"
              label="Quality procedure"
            />
            <div className="p-6">
              <h2 className="text-lg font-semibold text-primary">Why this matters to buyers</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The profile makes quality visible in practical terms: incoming material checks, documented testing procedure, named equipment
                and real field-installation evidence. That improves trust for both tender reviews and direct client evaluation.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Incoming QC</p>
                  <p className="mt-2 text-sm text-muted-foreground">Checks before materials are released to site.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Testing</p>
                  <p className="mt-2 text-sm text-muted-foreground">Named equipment and documented verification workflows.</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Handover</p>
                  <p className="mt-2 text-sm text-muted-foreground">Traceable records that support clean closeout.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space section-subtle">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Procedure Visuals"
            title="Quality check and testing workflow"
            description="Updated visual references for procurement checks, verification workflow and testing procedure."
          />
          <div className="mt-10">
            <ImageGallery items={companyProfile.quality.processVisuals} imageClassName="h-80 w-full rounded-none object-contain bg-slate-50" />
          </div>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Equipment Readiness"
            title="Termination and testing equipment"
            description="Equipment records and testing visuals positioned as proof that SGB can verify, document and hand over work cleanly."
          />
          <div className="mt-10">
            <ImageGallery items={companyProfile.quality.equipmentVisuals} imageClassName="h-72 w-full rounded-none object-cover bg-slate-50" />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";

import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImageGallery } from "@/components/sections/ImageGallery";

export const metadata: Metadata = {
  title: "Safety & Quality",
  description: companyProfile.seo.safetyDescription
};

export default function SafetyQualityPage() {
  return (
    <>
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
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
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-primary">Why this matters to buyers</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The profile makes quality visible in practical terms: incoming material checks, documented testing procedure, named equipment
              and real field-installation evidence. That improves trust for both tender reviews and direct client evaluation.
            </p>
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

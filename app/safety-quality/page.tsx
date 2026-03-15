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
              title="Quality Check Procedure and Testing Workflow"
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
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-primary">Compliance Context</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Quality and testing are presented together with the company&apos;s certification stack of ISO 9001, ISO 45001, bizSAFE STAR, and
              BCA certification.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space section-subtle">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Procedure Visuals"
            title="Quality and Testing Workflow Visuals"
            description="Visual references for quality checks and testing workflow."
          />
          <div className="mt-10">
            <ImageGallery items={companyProfile.quality.processVisuals} imageClassName="h-80 w-full rounded-none object-contain bg-slate-50" />
          </div>
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Equipment Records"
            title="Termination and Testing Equipment"
            description="Equipment records supporting technical capability and testing readiness."
          />
          <div className="mt-10">
            <ImageGallery items={companyProfile.quality.equipmentVisuals} imageClassName="h-72 w-full rounded-none object-contain bg-slate-50" />
          </div>
        </div>
      </section>
    </>
  );
}

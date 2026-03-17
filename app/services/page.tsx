import type { Metadata } from "next";
import Link from "next/link";

import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "Services",
  description: companyProfile.seo.servicesDescription
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-space pb-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Services"
            title="Capability areas shown in the updated profile"
            description="The new deck expands the services story beyond earlier installation references to include metal works, equipment device installation and labelled closeout scopes."
          />
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            These capabilities are presented as buyer-facing proof of range. The list is still non-exhaustive and should be treated as a current capability snapshot rather than a hard limit.
          </p>
        </div>
      </section>

      <section className="section-space section-subtle pt-0">
        <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {companyProfile.services.map((service) => (
            <article key={service.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
              <ImagePlaceholder
                src={service.images[0]?.outputPath ?? ""}
                alt={service.images[0]?.altText ?? service.title}
                className="h-56 w-full rounded-none object-cover"
                label={service.title}
              />
              <div className="p-5">
                <h2 className="text-base font-semibold text-primary">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space section-alt">
        <div className="container-shell rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <SectionHeading
            eyebrow="Need a Fit Check?"
            title="Match your scope against SGB's current capability set"
            description="Use the contact page to share your system scope, timeline, tender requirements or supporting document needs."
          />
          <div className="mt-6">
            <Link href="/contact">
              <Button>Request a Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

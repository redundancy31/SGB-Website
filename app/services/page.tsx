import type { Metadata } from "next";
import Link from "next/link";

import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description: companyProfile.seo.servicesDescription
};

export default function ServicesPage() {
  return (
    <section className="section-space pb-10">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Services"
          title="Services Offered"
          description="SGB Engineering & Trading supports installation, termination, cable management, and related systems work for operational project environments."
        />
        <p className="mt-5 max-w-3xl text-sm text-muted-foreground">
          This list is non-exhaustive. Contact us for consultations on your project scope, technical requirements, and execution needs.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {companyProfile.services.map((service) => (
            <div key={service.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-base font-semibold text-primary">{service.title}</h2>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/contact">
            <Button>Request a Consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

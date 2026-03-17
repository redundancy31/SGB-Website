import type { Metadata } from "next";
import { Mail, MapPin, Phone, User2 } from "lucide-react";

import { company } from "@/data/company";
import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact SGB Engineering & Trading for company profile, certifications, and project capability inquiries."
};

export default function ContactPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Request capability details, supporting files or a project discussion"
          description="Use the form to request the latest company profile, supporting certification files, or a discussion on scope fit and delivery capability."
        />
        <div className="mt-8 grid gap-7 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-semibold text-primary">Contact Details</h3>
            <p className="text-sm text-muted-foreground">{company.responseTime}</p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <User2 className="mt-0.5 h-4 w-4 text-accent" />
                {company.contactPerson}, {company.contactRole}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                {company.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {company.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href={`mailto:${company.email}`} className="hover:text-primary">
                  {company.email}
                </a>
              </p>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Operating Hours</p>
              <p>{company.operatingHours}</p>
            </div>
            <ImagePlaceholder
              src={companyProfile.hero.visuals[0]?.src ?? companyProfile.company.coverImage.outputPath}
              alt={company.tagline}
              className="h-64 w-full border border-slate-200 bg-slate-50 object-cover"
              label="Current project visual"
            />
          </aside>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

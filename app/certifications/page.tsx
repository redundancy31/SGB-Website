import type { Metadata } from "next";

import { companyProfile } from "@/data/company-profile";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImageGallery } from "@/components/sections/ImageGallery";

export const metadata: Metadata = {
  title: "Accreditations & Certifications",
  description: companyProfile.seo.certificationsDescription,
  openGraph: {
    title: "SGB Engineering & Trading Certifications",
    description: companyProfile.seo.certificationsDescription,
    images: [companyProfile.certifications[0]?.image?.outputPath ?? ""]
  }
};

export default function CertificationsPage() {
  const items = companyProfile.certifications
    .filter((item) => item.image?.outputPath)
    .map((item) => ({
      src: item.image!.outputPath,
      alt: item.image!.altText,
      title: item.title,
      description: item.summary
    }));

  return (
    <>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Certifications"
            title="Certification and Compliance Highlights"
            description="BCA certification, ISO 9001, ISO 45001, and bizSAFE STAR are presented as core trust signals."
          />
          <p className="mt-5 rounded-md border border-slate-200 bg-white p-3 text-sm text-muted-foreground">
            Contact the team for the latest supporting files where tender documentation requires it.
          </p>
        </div>
      </section>

      <section className="section-space section-subtle">
        <div className="container-shell">
          <ImageGallery items={items} imageClassName="h-80 w-full rounded-none object-contain bg-slate-50" />
        </div>
      </section>
    </>
  );
}

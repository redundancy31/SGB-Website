"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

import type { Accreditation } from "@/data/certifications";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

type CertificationCardProps = {
  certification: Accreditation;
  compact?: boolean;
};

export function CertificationCard({ certification, compact = false }: CertificationCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden border-slate-200 shadow-none transition-all hover:border-secondary/40 hover:shadow-soft">
        <ImagePlaceholder src={certification.imagePath} alt={certification.altText} className="h-44 w-full rounded-none" label="Accreditation Image" />
        <div className="space-y-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-primary">{certification.category}</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{certification.shortBadgeLabel}</span>
          </div>

          <h3 className="text-base font-semibold text-primary">{certification.title}</h3>
          <p className="text-sm text-muted-foreground">{certification.trustSummary}</p>

          <div className="space-y-1 text-sm text-foreground">
            {certification.issuingBody ? (
              <p>
                <span className="font-medium">Issuing Body:</span> {certification.issuingBody}
              </p>
            ) : null}
            {certification.certificateNumber ? (
              <p>
                <span className="font-medium">Certificate No:</span> {certification.certificateNumber}
              </p>
            ) : null}
            {certification.validUntil ? (
              <p>
                <span className="font-medium">Valid Until:</span> {certification.validUntil}
              </p>
            ) : certification.validityEnd ? (
              <p>
                <span className="font-medium">Validity End:</span> {certification.validityEnd}
              </p>
            ) : null}
            {certification.grade ? (
              <p>
                <span className="font-medium">Grade:</span> {certification.grade}
              </p>
            ) : null}
          </div>

          {!compact ? (
            <>
              <Button variant="outline" className="mt-2 w-full" onClick={() => setOpen(true)}>
                <FileText className="h-4 w-4" />
                View Certificate
              </Button>
              <p className="text-xs text-muted-foreground">Status: {certification.verificationStatus}</p>
            </>
          ) : null}
        </div>
      </Card>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/60 p-4">
          <Card className="w-full max-w-3xl p-5">
            <h4 className="text-lg font-semibold text-primary">{certification.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{certification.description}</p>
            <ImagePlaceholder src={certification.imagePath} alt={certification.altText} className="mt-4 h-[60vh] w-full border border-slate-200" />
            <Button className="mt-5" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Card>
        </div>
      ) : null}
    </>
  );
}

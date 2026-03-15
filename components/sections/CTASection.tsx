import Link from "next/link";

import { company } from "@/data/company";
import { Button } from "@/components/ui/button";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title,
  description,
  primaryLabel = "Request a Consultation",
  primaryHref = "/contact",
  secondaryLabel = "View Capabilities",
  secondaryHref = "/services"
}: CTASectionProps) {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Project Inquiry</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-primary">{title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            No obligation consultation. {company.responseTime}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={primaryHref}>
              <Button>{primaryLabel}</Button>
            </Link>
            <Link href={secondaryHref}>
              <Button variant="outline">{secondaryLabel}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

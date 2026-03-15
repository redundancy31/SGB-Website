import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentType } from "react";

import { Card } from "@/components/ui/card";

type ServiceCardProps = {
  title: string;
  summary: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export function ServiceCard({ title, summary, href, icon: Icon }: ServiceCardProps) {
  return (
    <Card className="group h-full border-slate-200 p-6 shadow-none transition-all hover:-translate-y-0.5 hover:border-secondary/50 hover:shadow-soft">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/5 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
        View service scope
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Card>
  );
}

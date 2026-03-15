import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ProjectItem } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

type ProjectCardProps = {
  project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-slate-200 shadow-none transition-all hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-soft">
      <ImagePlaceholder src={project.image} alt={project.title} className="h-48 w-full rounded-none" label="Project Placeholder" />
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{project.sector}</span>
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">{project.serviceType}</span>
        </div>
        <h3 className="text-lg font-semibold text-primary">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.scope}</p>
        <p className="mt-3 text-sm text-foreground">
          <span className="font-medium">Result:</span> {project.result}
        </p>
        <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
          View project details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
}

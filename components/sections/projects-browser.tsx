"use client";

import { useMemo, useState } from "react";

import { projectSectors, projects, projectServiceTypes } from "@/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";

export function ProjectsBrowser() {
  const [sector, setSector] = useState<(typeof projectSectors)[number]>("All");
  const [serviceType, setServiceType] = useState<(typeof projectServiceTypes)[number]>("All");

  const filtered = useMemo(() => {
    return projects.filter((item) => {
      const matchesSector = sector === "All" || item.sector === sector;
      const matchesServiceType = serviceType === "All" || item.serviceType === serviceType;
      return matchesSector && matchesServiceType;
    });
  }, [sector, serviceType]);

  return (
    <>
      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <div>
          <label htmlFor="sector-filter" className="mb-1.5 block text-sm font-medium text-primary">
            Filter by Sector
          </label>
          <select
            id="sector-filter"
            value={sector}
            onChange={(e) => setSector(e.target.value as (typeof projectSectors)[number])}
            className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm"
          >
            {projectSectors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service-filter" className="mb-1.5 block text-sm font-medium text-primary">
            Filter by Service Type
          </label>
          <select
            id="service-filter"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value as (typeof projectServiceTypes)[number])}
            className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm"
          >
            {projectServiceTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {!filtered.length ? (
        <p className="mt-6 rounded-md border border-dashed border-slate-300 p-4 text-sm text-muted-foreground">
          No projects found for this filter combination.
        </p>
      ) : null}
    </>
  );
}

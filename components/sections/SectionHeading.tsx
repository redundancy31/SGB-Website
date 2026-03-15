import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-bold leading-tight text-primary sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  );
}

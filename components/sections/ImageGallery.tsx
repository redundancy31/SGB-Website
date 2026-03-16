import { ImagePlaceholder } from "@/components/ui/image-placeholder";

type ImageGalleryItem = {
  src: string;
  alt: string;
  title: string;
  description?: string;
};

type ImageGalleryProps = {
  items: ImageGalleryItem[];
  imageClassName?: string;
};

export function ImageGallery({ items, imageClassName }: ImageGalleryProps) {
  const visibleItems = items.filter((item) => item.src);

  if (visibleItems.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-muted-foreground">
        Visual content is currently unavailable.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleItems.map((item) => (
        <article key={`${item.title}-${item.src}`} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <ImagePlaceholder src={item.src} alt={item.alt} className={imageClassName ?? "h-56 w-full rounded-none"} label={item.title} />
          <div className="p-4">
            <h3 className="text-base font-semibold text-primary">{item.title}</h3>
            {item.description ? <p className="mt-2 text-sm text-muted-foreground">{item.description}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

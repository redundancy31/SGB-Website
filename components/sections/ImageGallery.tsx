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
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items
        .filter((item) => item.src)
        .map((item) => (
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

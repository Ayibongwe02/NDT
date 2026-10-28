import { Link } from "@tanstack/react-router";
import type { Artwork } from "@/lib/museum-data";

export function ArtworkCard({ work }: { work: Artwork }) {
  return (
    <Link
      to="/work/$id"
      params={{ id: work.id }}
      className="group block overflow-hidden rounded-lg bg-surface shadow-[0_2px_12px_rgba(28,20,18,0.06)] ring-1 ring-border/60 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(28,20,18,0.1)] hover:ring-gold/30"
    >
      <div className="aspect-[4/3] overflow-hidden bg-border">
        <img
          src={work.image}
          alt={work.title}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-4 py-4">
        <h3 className="font-serif text-xl font-semibold leading-snug text-fg">
          {work.title}
        </h3>
        <p className="mt-0.5 text-sm text-muted">
          {work.artist} · {work.year}
        </p>
        <p className="mt-2 text-xs font-medium tracking-[0.08em] text-primary uppercase">
          {work.collection}
        </p>
      </div>
    </Link>
  );
}

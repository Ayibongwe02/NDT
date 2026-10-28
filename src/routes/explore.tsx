import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useState } from "react";
import { ArtworkCard } from "@/components/artwork-card";
import { AutoplayViewer } from "@/components/autoplay-viewer";
import { BRAND } from "@/lib/brand";
import {
  artworksByCollection,
  COLLECTIONS,
  type CollectionName,
} from "@/lib/museum-data";
import { cn } from "@/lib/utils";

type Search = { collection?: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    collection: typeof s.collection === "string" ? s.collection : undefined,
  }),
  component: Explore,
});

function Explore() {
  const { collection } = Route.useSearch();
  const list = artworksByCollection(collection as CollectionName | undefined);
  const [autoplayOpen, setAutoplayOpen] = useState(false);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Explore</h1>
          <p className="mt-1 mb-6 text-muted">
            {collection ? (
              <>
                Showing works in{" "}
                <strong className="text-fg">{collection}</strong>
                {" · "}
                <Link to="/explore" className="text-primary no-underline">
                  Clear filter
                </Link>
              </>
            ) : (
              `All published works in ${BRAND.name}`
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/virtual"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary px-4 py-2.5 text-sm font-medium text-primary no-underline transition-colors hover:bg-primary hover:text-surface"
          >
            3D gallery
          </Link>
          {list.length > 0 && (
            <button
              type="button"
              onClick={() => setAutoplayOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-surface no-underline transition-colors hover:bg-primary-dark"
            >
              <Play className="size-4" />
              Autoplay {collection ?? "gallery"}
            </button>
          )}
        </div>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.slug}
            to="/explore"
            search={{ collection: c.name }}
            className={cn(
              "rounded-full bg-border px-3.5 py-1.5 text-sm text-fg no-underline transition-colors hover:bg-primary hover:text-surface",
              collection === c.name && "bg-primary text-surface",
            )}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <ArtworkCard key={a.id} work={a} />
        ))}
        {list.length === 0 && (
          <p className="text-muted">No works in this collection yet.</p>
        )}
      </div>
      {autoplayOpen && list.length > 0 && (
        <AutoplayViewer works={list} onClose={() => setAutoplayOpen(false)} />
      )}
    </main>
  );
}

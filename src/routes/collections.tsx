import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
import { COLLECTIONS } from "@/lib/museum-data";

export const Route = createFileRoute("/collections")({ component: CollectionsPage });

function CollectionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-3xl font-semibold">Explore by collection</h1>
      <p className="mt-1 mb-8 text-muted">
        Community voices plus five visual languages stewarded by {BRAND.partner}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.slug}
            to="/explore"
            search={{ collection: c.name }}
            className="rounded-lg border-l-4 border-primary bg-surface px-6 py-6 no-underline shadow-[0_2px_12px_rgba(28,20,18,0.04)] transition-transform hover:-translate-y-0.5"
          >
            <h2 className="font-serif text-xl font-semibold text-fg">{c.name}</h2>
            <p className="mt-1 text-sm text-muted">{c.desc}</p>
            <p className="mt-3 text-xs tracking-wide text-primary">{c.gallery}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

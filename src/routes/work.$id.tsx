import { createFileRoute, Link } from "@tanstack/react-router";
import { artworkById } from "@/lib/museum-data";
import { SpeakButton } from "@/components/speak-button";

export const Route = createFileRoute("/work/$id")({
  component: WorkDetail,
});

function WorkDetail() {
  const { id } = Route.useParams();
  const a = artworkById(id);
  if (!a) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-muted">This work is not in the current hanging.</p>
        <Link to="/explore" className="mt-4 inline-block text-primary no-underline">
          ← Back to explore
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <Link
        to="/explore"
        className="mb-4 inline-block text-sm text-primary no-underline"
      >
        ← Explore
      </Link>
      <div className="grid gap-10 md:grid-cols-[1.15fr_1fr]">
        <div className="overflow-hidden rounded-lg bg-border">
          <img
            src={a.image}
            alt={`${a.title} by ${a.artist}`}
            width={1200}
            height={900}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-full min-h-80 w-full object-cover md:min-h-[26rem]"
          />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-semibold">
            {a.title}, {a.year}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-border text-xs font-semibold text-muted">
              {a.artist.slice(0, 2)}
            </div>
            <div>
              <div className="font-semibold">{a.artist}</div>
              <div className="text-sm text-muted">{a.loc}</div>
            </div>
          </div>
          <p className="mt-4 text-muted">
            {a.medium} · {a.dim}
            <br />
            Collection: <strong className="text-fg">{a.collection}</strong>
          </p>
          <SpeakButton
            className="mt-4"
            label="Listen to description"
            text={`${a.title}, ${a.year}, by ${a.artist}. ${a.medium}. ${a.desc} Historic reference: ${a.historic.name}, ${a.historic.years}. ${a.historic.note}`}
          />
          <p className="mt-4 text-muted">{a.desc}</p>
          <div className="mt-6 rounded-lg bg-surface p-5 shadow-sm">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-primary">
              HISTORIC REFERENCE
            </p>
            <div className="font-serif text-lg font-semibold">{a.historic.name}</div>
            <div className="mb-2 text-sm text-muted">{a.historic.years}</div>
            <p className="text-sm text-muted">{a.historic.note}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

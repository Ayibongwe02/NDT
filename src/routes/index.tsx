import { createFileRoute, Link } from "@tanstack/react-router";
import { ArtworkCard } from "@/components/artwork-card";
import { COLLECTIONS, COMMUNITY_WORKS, MUSEUM_WORKS } from "@/lib/museum-data";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-hero text-hero-fg">
        <img
          src="/hero-old-arts.jpg"
          alt="Old Arts Building, Hatfield Campus, in black and white"
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,20,18,0.78),rgba(28,20,18,0.42))]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:items-center md:py-24">
          <div>
            <h1 className="font-serif text-4xl font-semibold text-hero-fg md:text-5xl">
              Code Community
              <br />
              Museum
            </h1>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/explore"
                className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-surface no-underline hover:bg-primary-dark"
              >
                Explore the galleries
              </Link>
              <Link
                to="/podcasts"
                className="inline-flex rounded-md border border-hero-fg/30 bg-hero-fg/10 px-5 py-2.5 text-sm font-medium text-hero-fg no-underline backdrop-blur-sm hover:bg-hero-fg/20"
              >
                Listen to podcasts
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.slug}
                  to="/explore"
                  search={{ collection: c.name }}
                  className="rounded-full border border-hero-fg/25 bg-hero-fg/10 px-3 py-1.5 text-xs text-hero-fg no-underline backdrop-blur-sm hover:bg-primary"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to="/explore"
              className="flex size-44 flex-col items-center justify-center rounded-full border border-hero-fg/25 bg-hero-fg/10 text-center text-sm font-semibold tracking-wide text-hero-fg no-underline shadow-lg backdrop-blur-sm transition-transform hover:scale-[1.04] hover:bg-hero-fg/20 md:size-52"
            >
              VIEW
              <br />
              GALLERY
            </Link>
          </div>
        </div>
      </section>

      {/* Website features from design brief */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            THE PLATFORM
          </p>
          <h2 className="font-serif text-3xl font-semibold">
            Built for community connection
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <h3 className="font-semibold text-fg">Resource database</h3>
              <p className="mt-2 text-sm text-muted">
                Easy access to important local resources and services.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <h3 className="font-semibold text-fg">Explore the area</h3>
              <p className="mt-2 text-sm text-muted">
                Discover the top places, attractions and hidden gems in each
                community.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <h3 className="font-semibold text-fg">Community conversations</h3>
              <p className="mt-2 text-sm text-muted">
                Comment, share reviews and give feedback so the conversation
                continues beyond the podcast.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <h3 className="font-semibold text-fg">Easy &amp; interactive</h3>
              <p className="mt-2 text-sm text-muted">
                A simple, accessible platform designed to encourage
                participation and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary">
          COMMUNITY VOICES
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITY_WORKS.map((a) => (
            <ArtworkCard key={a.id} work={a} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/60">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            FROM UP MUSEUMS
          </p>
          <h2 className="font-serif text-3xl font-semibold">
            Historic collections
          </h2>
          <p className="mt-1 mb-8 text-muted">
            Mapungubwe gold, Highveld light, Villa bronze, and Van Tilburg
            ceramics — still hanging, still ours to learn from
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MUSEUM_WORKS.map((a) => (
              <ArtworkCard key={a.id} work={a} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

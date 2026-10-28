import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary">
        ABOUT US
      </p>
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">
        It Starts With Us
      </h1>
      <p className="mt-1 mb-8 text-muted">
        Community-based tourism · Local voices first
      </p>

      <p className="mb-5 text-muted leading-relaxed">
        It Starts With Us is a team of tourism experts passionate about
        developing and promoting authentic, community-based tourism. We believe
        that meaningful tourism starts with the people who make each destination
        unique.
      </p>
      <p className="mb-5 text-muted leading-relaxed">
        Our mission is to empower communities to take the lead in their own
        tourism development, sharing their stories, preserving their heritage
        and showcasing their culture on their own terms. Through digital
        promotion and increased online visibility, we aim to connect communities
        with travellers who want to experience tourism that makes a real
        difference.
      </p>
      <p className="mb-5 text-muted leading-relaxed">
        We believe in promoting communities, not speaking for them. By putting
        local voices first, we strive to create opportunities for sustainable
        tourism that benefits the people at its heart.
      </p>
      <p className="mb-8 text-muted leading-relaxed">
        So, go ahead and click Learn More. Discover the communities, hear their
        stories and support tourism on a level that truly matters. Because
        meaningful change starts with us.
      </p>

      <div className="mt-2 flex flex-wrap gap-3">
        <Link
          to="/explore"
          className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-surface no-underline hover:bg-primary-dark"
        >
          Learn More — Explore the galleries
        </Link>
        <Link
          to="/studio"
          className="inline-flex rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg no-underline hover:bg-border/40"
        >
          Artist desk
        </Link>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-surface/60 p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-primary">
          ALSO ON THIS SITE
        </p>
        <h2 className="mt-1 mb-3 font-serif text-2xl">
          {BRAND.name}
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          The Code Community Museum hangs community photographs and paintings
          from places such as Mamelodi, Soweto and the Eastern Cape beside the
          historic collections of the University of Pretoria Museums —
          Mapungubwe gold, Highveld light, sculpture and ceramics — so that
          local stories and university holdings can be seen together.
        </p>
      </div>
    </main>
  );
}

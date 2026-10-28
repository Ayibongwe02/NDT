import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/podcasts")({ component: Podcasts });

const EPISODES = [
  {
    id: "zT6Axd30rMs",
    title: "PREVIEW: The Man Who Cannot Be Confirmed",
    author: "Mzingaye Hlabano",
    description:
      "A conversation about community art, local artists, and the possibilities of sculpture, murals and hangings at a jazz and community site — keeping culture and place in dialogue.",
    youtubeId: "zT6Axd30rMs",
  },
  {
    id: "vai9CFxZYc4",
    title: "Mamelodi stories: The Rondavels with Pat Ranoto and Mfana Mathibela",
    author: "Gugulethu Ndhlovu",
    description:
      "Stories from Mamelodi — the rondavels, the people who live and remember them, and the everyday heritage that visitors and residents still walk through.",
    youtubeId: "vai9CFxZYc4",
  },
];

function Podcasts() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary">
        PODCASTS &amp; STORIES
      </p>
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">
        Listen to the community
      </h1>
      <p className="mt-2 mb-10 max-w-2xl text-muted">
        Community conversations, Mamelodi stories and local voices — so the
        conversation continues beyond the gallery walls.
      </p>

      <div className="space-y-12">
        {EPISODES.map((ep) => (
          <article
            key={ep.id}
            className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
          >
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${ep.youtubeId}`}
                title={ep.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-primary">
                {ep.author}
              </p>
              <h2 className="mt-1 font-serif text-xl font-semibold text-fg sm:text-2xl">
                {ep.title}
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {ep.description}
              </p>
              <a
                href={`https://youtu.be/${ep.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-primary no-underline hover:underline"
              >
                Open on YouTube →
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

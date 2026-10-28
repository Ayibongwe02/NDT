import { createFileRoute, Link } from "@tanstack/react-router";
import { VirtualGallery } from "@/components/virtual-gallery";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/virtual")({
  component: VirtualPage,
});

function VirtualPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            IMMERSIVE
          </p>
          <h1 className="font-serif text-3xl font-semibold">
            3D virtual gallery
          </h1>
          <p className="mt-1 max-w-xl text-muted">
            Walk the hall of {BRAND.name} — community paintings and UP Museums
            works hung in a digital Old Arts wing. Drag to look around, scroll
            to zoom, click a frame for its label.
          </p>
        </div>
        <Link
          to="/explore"
          className="text-sm font-medium text-primary no-underline hover:underline"
        >
          ← Flat explore view
        </Link>
      </div>
      <VirtualGallery />
      <p className="mt-4 text-center text-xs text-muted">
        Best experienced on a desktop or tablet with WebGL. On phones, drag with
        one finger and pinch to zoom.
      </p>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useSubmissions } from "@/lib/submissions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/status")({ component: Status });

const STEPS = ["Submitted", "Under review", "Decision", "Published"] as const;

function Status() {
  const latest = useSubmissions((s) => s.items.at(-1));
  const active = latest ? 1 : 0;

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-semibold">Submission status</h1>
        <p className="mt-1 text-muted">
          {latest
            ? `Tracking “${latest.title}”`
            : "Submit a work from the artist desk to begin a review."}
        </p>
      </div>
      <div className="relative mx-auto mt-10 mb-8 flex max-w-xl justify-between">
        <div className="absolute top-[17px] right-[10%] left-[10%] h-0.5 bg-border" />
        {STEPS.map((label, i) => (
          <div key={label} className="relative z-10 flex-1 text-center">
            <div
              className={cn(
                "mx-auto mb-2 flex size-9 items-center justify-center rounded-full text-sm font-semibold",
                i < active && "bg-primary text-surface",
                i === active && "bg-border text-primary-dark ring-4 ring-primary/20",
                i > active && "bg-border text-muted",
              )}
            >
              {i + 1}
            </div>
            <div className="text-sm text-muted">{label}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-surface p-7 shadow-[0_2px_16px_rgba(28,20,18,0.05)]">
        <h2 className="font-serif text-2xl">
          {latest
            ? "Your work is currently under digital review"
            : "No submission on file"}
        </h2>
        <p className="mt-3 text-muted">
          {latest
            ? "A curator is examining originality, quality, and collection fit. Typical digital review: 2–5 business days. You will see the decision here."
            : "When you submit from the artist desk, progress appears on this timeline."}
        </p>
      </div>
    </main>
  );
}

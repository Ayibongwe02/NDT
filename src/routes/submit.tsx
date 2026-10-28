import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { COLLECTIONS, checkCopyrightRisk, suggestCollection } from "@/lib/museum-data";
import { useSubmissions } from "@/lib/submissions";
import { useLoading } from "@/components/loading-overlay";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/submit")({ component: Submit });

function Submit() {
  const navigate = useNavigate();
  const add = useSubmissions((s) => s.add);
  const [title, setTitle] = useState("");
  const [medium, setMedium] = useState("");
  const [year, setYear] = useState("2026");
  const [dim, setDim] = useState("");
  const [collection, setCollection] = useState("");
  const [review, setReview] = useState<"digital" | "physical">("digital");
  const [ml, setMl] = useState<ReturnType<typeof suggestCollection> | null>(
    null,
  );
  const [copyright, setCopyright] = useState<ReturnType<
    typeof checkCopyrightRisk
  > | null>(null);

  const { run } = useLoading();

  function onSuggest() {
    void run(() => {
      const result = suggestCollection(title, medium, dim);
      setMl(result);
      setCollection(result.suggested);
    });
  }

  function onCheckCopyright() {
    void run(() => setCopyright(checkCopyrightRisk(title, medium)));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    add({
      title: title || "Untitled",
      medium: medium || "Unspecified",
      year: Number(year) || 2026,
      dimensions: dim,
      collection,
      reviewPath: review,
    });
    void navigate({ to: "/status" });
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-3xl font-semibold">Submit new work</h1>
      <p className="mt-1 mb-8 text-muted">
        All submissions are reviewed for originality and quality before
        publication
        <span className="ml-2 rounded bg-border px-2 py-0.5 text-xs font-semibold text-primary">
          ML ASSISTED
        </span>
      </p>
      <form
        onSubmit={onSubmit}
        className="grid gap-8 md:grid-cols-2 md:items-start"
      >
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface text-center text-muted">
          <div className="text-2xl">↑</div>
          <div className="mt-1">Artwork photograph</div>
          <div className="text-sm">Prototype — metadata only</div>
        </div>
        <div>
          <label className="mb-3 block text-sm">
            <span className="mb-1 block text-xs font-medium text-muted">Title</span>
            <input
              className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-fg outline-none focus:border-primary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Golden Horizon"
            />
          </label>
          <label className="mb-3 block text-sm">
            <span className="mb-1 block text-xs font-medium text-muted">
              Medium
            </span>
            <input
              className="w-full rounded-md border border-border bg-surface px-3 py-2.5 outline-none focus:border-primary"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="e.g. Oil on canvas"
            />
          </label>
          <label className="mb-3 block text-sm">
            <span className="mb-1 block text-xs font-medium text-muted">Year</span>
            <input
              type="number"
              className="w-full rounded-md border border-border bg-surface px-3 py-2.5 outline-none focus:border-primary"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label className="mb-3 block text-sm">
            <span className="mb-1 block text-xs font-medium text-muted">
              Dimensions
            </span>
            <input
              className="w-full rounded-md border border-border bg-surface px-3 py-2.5 outline-none focus:border-primary"
              value={dim}
              onChange={(e) => setDim(e.target.value)}
              placeholder="e.g. 90 × 120 cm"
            />
          </label>
          <div className="mb-3">
            <span className="mb-1 block text-xs font-medium text-muted">
              Collection (optional)
            </span>
            <select
              className="w-full rounded-md border border-border bg-surface px-3 py-2.5 outline-none focus:border-primary"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            >
              <option value="">Select a collection…</option>
              {COLLECTIONS.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={onSuggest}
              className="mt-2 rounded-md border border-primary px-3 py-2 text-sm font-medium text-primary"
            >
              Suggest collection with ML
            </button>
            {ml && (
              <p className="mt-2 text-sm text-muted">
                Suggested: <strong className="text-fg">{ml.suggested}</strong>{" "}
                (confidence {ml.confidence})
                <br />
                <span className="text-xs">{ml.note}</span>
              </p>
            )}
          </div>
          <div className="mb-4 rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted">
                Copyright / originality check
                <span className="ml-2 rounded bg-border px-2 py-0.5 text-[10px] font-semibold text-primary">
                  CONCEPT
                </span>
              </span>
              <button
                type="button"
                onClick={onCheckCopyright}
                className="rounded-md border border-primary px-3 py-1.5 text-xs font-medium text-primary"
              >
                Run check
              </button>
            </div>
            {copyright && (
              <div className="mt-2">
                <span
                  className={cn(
                    "inline-block rounded-full px-2.5 py-1 text-xs font-semibold",
                    copyright.status === "clear"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800",
                  )}
                >
                  {copyright.label}
                </span>
                {copyright.matches.length > 0 && (
                  <p className="mt-2 text-sm text-muted">
                    Closest match:{" "}
                    <strong className="text-fg">{copyright.matches[0].title}</strong>{" "}
                    — {copyright.matches[0].source}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted">{copyright.note}</p>
              </div>
            )}
          </div>
          <p className="mb-1 text-xs font-medium text-muted">Review path</p>
          <div className="mb-4 flex gap-2">
            {(
              [
                ["digital", "Digital review"],
                ["physical", "Ship to Hatfield"],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setReview(val)}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2.5 text-sm",
                  review === val
                    ? "border-primary bg-border text-primary-dark font-medium"
                    : "border-border bg-surface",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-surface hover:bg-primary-dark"
          >
            Submit for review
          </button>
        </div>
      </form>
    </main>
  );
}

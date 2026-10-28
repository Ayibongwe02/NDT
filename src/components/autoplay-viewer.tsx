import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import type { Artwork } from "@/lib/museum-data";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6000;
const FADE_MS = 480;

/**
 * Full-screen story-style autoplay. Artwork lives in its own stage
 * (`object-contain`) so the caption dock never covers it on mobile.
 * Progress timing uses refs so advancing a slide cannot leak the previous
 * slide's elapsed time (that caused skip/glitch on every change).
 */
export function AutoplayViewer({
  works,
  startIndex = 0,
  onClose,
}: {
  works: Artwork[];
  startIndex?: number;
  onClose: () => void;
}) {
  const n = works.length;
  const [index, setIndex] = useState(
    () => ((startIndex % n) + n) % n,
  );
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [outgoing, setOutgoing] = useState<Artwork | null>(null);

  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % n) + n) % n;
      if (next === indexRef.current) return;
      setOutgoing(works[indexRef.current] ?? null);
      progressRef.current = 0;
      setProgress(0);
      setIndex(next);
    },
    [n, works],
  );

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);
  const work = works[index];

  useEffect(() => {
    if (!outgoing) return;
    const t = window.setTimeout(() => setOutgoing(null), FADE_MS);
    return () => window.clearTimeout(t);
  }, [outgoing]);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const started = performance.now() - (progressRef.current / 100) * SLIDE_MS;
    let cancelled = false;

    function tick(now: number) {
      if (cancelled) return;
      const pct = Math.min(100, ((now - started) / SLIDE_MS) * 100);
      progressRef.current = pct;
      setProgress(pct);
      if (pct >= 100) {
        progressRef.current = 0;
        setProgress(0);
        goTo(indexRef.current + 1);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, index, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!work) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-hero"
      role="dialog"
      aria-modal="true"
      aria-label={`Autoplay: ${work.title}`}
    >
      <div className="relative z-20 shrink-0 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5">
        <div className="flex gap-1.5" aria-hidden="true">
          {works.map((w, i) => (
            <div
              key={w.id}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
            >
              <div
                className="h-full rounded-full bg-gold"
                style={{
                  width:
                    i < index ? "100%" : i === index ? `${progress}%` : "0%",
                  transition: i === index ? "none" : "width 180ms ease",
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between sm:mt-3">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-white/70 sm:text-[11px]">
            <span>CODE COMMUNITY</span>
            <span className="opacity-50" aria-hidden="true">
              ·
            </span>
            <span className="text-gold">AUTOPLAY</span>
            <span className="opacity-50" aria-hidden="true">
              ·
            </span>
            <span>
              {index + 1} / {works.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close autoplay"
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <X className="size-4.5" />
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 touch-manipulation">
        {outgoing && <SlideFrame work={outgoing} visible={false} />}
        <SlideFrame work={work} visible />

        <button
          type="button"
          aria-label="Previous work"
          onClick={prev}
          className="absolute inset-y-0 left-0 z-10 w-1/3 sm:w-1/4"
        />
        <button
          type="button"
          aria-label="Next work"
          onClick={next}
          className="absolute inset-y-0 right-0 z-10 w-1/3 sm:w-1/4"
        />

        <button
          type="button"
          onClick={prev}
          aria-label="Previous work"
          className="absolute left-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/20 sm:flex"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next work"
          className="absolute right-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/20 sm:flex"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="relative z-20 shrink-0 border-t border-white/10 bg-hero px-4 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-4 sm:pb-6">
        <div className="mx-auto flex w-full max-w-3xl items-end gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause autoplay" : "Play autoplay"}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/25 sm:size-11"
          >
            {playing ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 translate-x-0.5" />
            )}
          </button>

          <div
            key={work.id}
            className="min-w-0 flex-1 animate-[caption-fade_280ms_ease-out] text-white"
          >
            <p className="text-[10px] font-semibold tracking-[0.18em] text-gold">
              {work.collection.toUpperCase()}
            </p>
            <h2 className="mt-0.5 font-serif text-lg font-semibold leading-tight sm:text-2xl">
              {work.title}
            </h2>
            <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
              {work.artist} · {work.year} · {work.loc}
            </p>
            <p className="mt-1.5 hidden text-sm leading-relaxed text-white/85 sm:line-clamp-3 sm:block">
              {work.desc}
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-white/80 sm:hidden">
              {work.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideFrame({ work, visible }: { work: Artwork; visible: boolean }) {
  return (
    <img
      src={work.image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={cn(
        "absolute inset-0 h-full w-full object-contain object-center transition-opacity ease-out",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      draggable={false}
    />
  );
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Default time (ms) the overlay stays up when there's no natural "done"
 * signal to hide it on (e.g. a decorative trigger, or the safety ceiling
 * for route navigation). Real async work started via `run()` hides as
 * soon as it resolves, unless that's faster than this floor.
 */
const DEFAULT_TIMEOUT = 2000;

type RunOptions = { minDuration?: number };

type LoadingContextValue = {
  isLoading: boolean;
  /** Current animation duration (ms) driving the progress bar. */
  duration: number;
  /** Show the overlay, auto-hiding after `duration` ms (default 2s). */
  show: (duration?: number) => void;
  /** Hide the overlay immediately. */
  hide: () => void;
  /**
   * Show the overlay while `task` runs, keeping it up for at least
   * `minDuration` ms (default 2s) even if the task finishes sooner --
   * use this on buttons that kick off real work, so the animation
   * doesn't just flash on screen.
   */
  run: <T,>(task: () => Promise<T> | T, options?: RunOptions) => Promise<T>;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(DEFAULT_TIMEOUT);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const hide = useCallback(() => {
    clearTimer();
    setIsLoading(false);
  }, [clearTimer]);

  const show = useCallback(
    (ms: number = DEFAULT_TIMEOUT) => {
      clearTimer();
      setDuration(ms);
      setIsLoading(true);
      hideTimer.current = setTimeout(() => setIsLoading(false), ms);
    },
    [clearTimer],
  );

  const run = useCallback(
    async <T,>(task: () => Promise<T> | T, options?: RunOptions) => {
      const minDuration = options?.minDuration ?? DEFAULT_TIMEOUT;
      clearTimer();
      setDuration(minDuration);
      setIsLoading(true);
      const started = Date.now();
      try {
        return await task();
      } finally {
        const remaining = Math.max(0, minDuration - (Date.now() - started));
        if (remaining === 0) {
          setIsLoading(false);
        } else {
          hideTimer.current = setTimeout(() => setIsLoading(false), remaining);
        }
      }
    },
    [clearTimer],
  );

  useEffect(() => clearTimer, [clearTimer]);

  const value = useMemo(
    () => ({ isLoading, duration, show, hide, run }),
    [isLoading, duration, show, hide, run],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading must be used within a <LoadingProvider>");
  }
  return ctx;
}

/**
 * Fires once when the app first mounts in the browser -- the "someone
 * enters the app" overlay. Lives in the root layout, so it only ever
 * fires once per document load, not on every client-side navigation.
 */
export function EntryLoader() {
  const { show } = useLoading();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    show();
  }, [show]);

  return null;
}

/**
 * Bridges TanStack Router's navigation state to the overlay so every
 * page/section visit shows it automatically, with no per-link wiring.
 * Uses a short grace period on the way out so fast loads still get a
 * full, unhurried animation instead of a flash -- capped by the normal
 * 2s default in case a navigation hangs.
 */
export function RouteLoadingBridge() {
  const status = useRouterState({ select: (s) => s.status });
  const { show, hide } = useLoading();
  const pending = useRef(false);

  useEffect(() => {
    if (status === "pending") {
      pending.current = true;
      show();
      return;
    }
    if (pending.current) {
      pending.current = false;
      const t = setTimeout(hide, 220);
      return () => clearTimeout(t);
    }
  }, [status, show, hide]);

  return null;
}

/**
 * The overlay itself -- an animated frame/rosette in the site's gold
 * and maroon palette, with a progress bar timed to the active duration.
 * Mount once (e.g. in the root layout); it reads its visibility from
 * context, so nothing else needs to render it conditionally.
 */
export function LoadingOverlay() {
  const { isLoading, duration } = useLoading();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    if (isLoading) {
      setMounted(true);
      raf = requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      timeout = setTimeout(() => setMounted(false), 300);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!isLoading}
      className={cn(
        "fixed inset-0 z-[999] flex items-center justify-center bg-bg/92 backdrop-blur-sm transition-opacity duration-300 ease-out",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative size-20">
          {/* slow dashed gold ring */}
          <svg
            viewBox="0 0 80 80"
            className="size-20 animate-[loader-spin_2.4s_linear_infinite]"
          >
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
              strokeDasharray="3 11"
              strokeLinecap="round"
            />
          </svg>
          {/* frame corners drawing themselves in, staggered */}
          <svg
            viewBox="0 0 80 80"
            className="absolute inset-0 size-20 [&>path]:animate-[loader-corner_600ms_ease-out_both]"
          >
            <path
              d="M10,26 V10 H26"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animationDelay: "0ms" }}
            />
            <path
              d="M54,10 H70 V26"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animationDelay: "80ms" }}
            />
            <path
              d="M70,54 V70 H54"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animationDelay: "160ms" }}
            />
            <path
              d="M26,70 H10 V54"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animationDelay: "240ms" }}
            />
          </svg>
          {/* pulsing rosette at the centre */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="size-3 rotate-45 animate-[loader-pulse_1.6s_ease-in-out_infinite] bg-primary" />
          </span>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <span className="animate-[loader-rise_500ms_ease-out_both] font-serif text-sm font-semibold tracking-[0.35em] text-fg">
            COMMUNITY
          </span>
          <span className="h-px w-28 overflow-hidden rounded-full bg-border">
            <span
              key={duration}
              className="block h-full origin-left animate-[loader-progress_var(--loading-duration)_linear_forwards] bg-gold"
              style={{ "--loading-duration": `${duration}ms` } as React.CSSProperties}
            />
          </span>
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

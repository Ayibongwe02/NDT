import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Speaks the given text aloud using the browser's built-in
 * speechSynthesis API, for visitors who are blind or have low vision.
 * No external API or network call -- this runs entirely on-device and
 * works offline, so it costs nothing and has no rate limit.
 *
 * Support: available in all current major browsers, but the tool tests
 * for `window.speechSynthesis` and quietly hides itself if it's
 * missing (e.g. some older or locked-down embedded browsers) rather
 * than showing a button that does nothing.
 */
export function SpeakButton({
  text,
  label = "Listen to description",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" && "speechSynthesis" in window,
    );
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported) return null;

  function toggle() {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel(); // clear anything already queued
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    utterRef.current = utter;
    synth.speak(utter);
    setSpeaking(true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={speaking}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-primary px-3 py-2 text-sm font-medium text-primary",
        className,
      )}
    >
      <span aria-hidden="true">{speaking ? "◼" : "🔊"}</span>
      {speaking ? "Stop" : label}
    </button>
  );
}

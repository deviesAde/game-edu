"use client";

import { useEffect } from "react";
import { initBGM, playBGMIfEnabled, playSound } from "@/lib/sound";

export default function SoundManager() {
  useEffect(() => {
    // Initialize background music state
    initBGM();

    const handleInteraction = (e: Event) => {
      // 1. Play BGM on first interaction if enabled
      playBGMIfEnabled();

      // 2. Synthesize click sound for UI buttons/links
      const target = e.target as HTMLElement;
      if (!target) return;

      let current: HTMLElement | null = target;
      let isInteractive = false;

      while (current) {
        const tag = current.tagName.toLowerCase();
        if (
          tag === "button" ||
          tag === "a" ||
          current.getAttribute("role") === "button" ||
          current.classList.contains("btn") ||
          current.classList.contains("btn-squishy") ||
          current.classList.contains("interactive")
        ) {
          isInteractive = true;
          break;
        }
        current = current.parentElement;
      }

      if (isInteractive) {
        playSound("pop");
      }
    };

    // Attach listeners
    window.addEventListener("click", handleInteraction, { capture: true });
    window.addEventListener("touchstart", handleInteraction, { capture: true });

    return () => {
      window.removeEventListener("click", handleInteraction, { capture: true });
      window.removeEventListener("touchstart", handleInteraction, { capture: true });
    };
  }, []);

  return null;
}

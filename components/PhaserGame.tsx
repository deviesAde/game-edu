"use client";

import { useEffect, useRef } from "react";
import { ThemeId, LevelId } from "@/lib/questionGenerator";

export default function PhaserGameWrapper({ theme, level }: { theme: ThemeId, level: LevelId }) {
  const gameRef = useRef<any>(null);

  useEffect(() => {
    if (gameRef.current) return;
    
    let isMounted = true;
    
    import("@/game/gameConfig").then(({ initGame }) => {
      if (isMounted) {
        gameRef.current = initGame("game-container", theme, level);
      }
    });

    return () => {
      isMounted = false;
      if (gameRef.current) {
         gameRef.current.destroy(true);
         gameRef.current = null;
      }
    };
  }, [theme, level]);

  return <div id="game-container" className="w-full h-full min-h-[600px] flex items-center justify-center bg-sky-100" />;
}

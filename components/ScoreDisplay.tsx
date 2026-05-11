"use client";

import { useEffect, useState } from "react";
import { getTokens } from "@/lib/storage";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RewardPopup from "./RewardPopup";

export default function ScoreDisplay() {
  const [tokens, setTokens] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [lastMilestone, setLastMilestone] = useState(0);

  useEffect(() => {
    // Initial load
    setTokens(getTokens());

    // Polling untuk update skor secara real-time
    const interval = setInterval(() => {
      const currentTokens = getTokens();
      
      // Logika deteksi kelipatan 25
      if (currentTokens > 0 && currentTokens % 25 === 0 && currentTokens !== lastMilestone) {
        setShowReward(true);
        setLastMilestone(currentTokens);
      }
      
      setTokens(currentTokens);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastMilestone]);

  return (
    <div className="flex items-center gap-4">
      <motion.div 
        key={tokens}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-3 bg-white text-yellow-500 px-6 py-3 rounded-full font-black text-xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] border-4 border-yellow-100"
      >
        <Star size={28} fill="currentColor" className="animate-pulse" />
        <span className="text-2xl">{tokens}</span>
      </motion.div>

      <AnimatePresence>
        {showReward && (
          <RewardPopup 
            score={tokens} 
            onClose={() => setShowReward(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { getTokens, getLastCelebratedMilestone, setLastCelebratedMilestone } from "@/lib/storage";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ScoreDisplay() {
  const [tokens, setTokens] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");
  // Refs ensure the interval callback always reads fresh values without re-registering
  const showRewardRef = useRef(false);
  const lastCelebratedRef = useRef(0);
  const tokensRef = useRef(0);

  const messages = [
    "WAW! KAMU PINTAR SEKALI! 🌟",
    "KAMU JUARA MATEMATIKA! 🏆",
    "TERUSKAN! KAMU HEBAT! 🚀",
    "LUAR BIASA! AYOO LAGI! ✨",
    "KEREN! KAMU CERDAS SEKALI! 🧠",
    "MANTAP! KAMU ANAK HEBAT! 💎"
  ];

  useEffect(() => {
    // Initialize from localStorage once on mount
    const initial = getTokens();
    tokensRef.current = initial;
    lastCelebratedRef.current = getLastCelebratedMilestone();
    setTokens(initial);
    setIsInitialized(true);

    const checkScore = () => {
      const live = getTokens();

      // Only update state if value actually changed
      if (live !== tokensRef.current) {
        tokensRef.current = live;
        setTokens(live);

        // Check milestone — never trigger if popup is already open
        const milestone = Math.floor(live / 25);
        const lastCelebrated = Math.max(lastCelebratedRef.current, getLastCelebratedMilestone());

        if (milestone > lastCelebrated && live > 0 && !showRewardRef.current) {
          showRewardRef.current = true;
          lastCelebratedRef.current = milestone;
          setLastCelebratedMilestone(milestone);
          
          // Pick random motivational message
          const randomMsg = messages[Math.floor(Math.random() * messages.length)];
          setRewardMessage(randomMsg);
          setShowReward(true);
        }
      }
    };

    window.addEventListener("tokensUpdated", checkScore);
    const interval = setInterval(checkScore, 2000);

    return () => {
      window.removeEventListener("tokensUpdated", checkScore);
      clearInterval(interval);
    };
  }, []); // Empty deps — never re-registers

  const handleClose = () => {
    setShowReward(false);
    showRewardRef.current = false;
  };

  return (
    <div className="flex items-center gap-4 relative">
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ x: 30, opacity: 0, scale: 0.3, rotate: -10 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: { type: "spring", stiffness: 260, damping: 20 } 
            }}
            exit={{ x: 30, opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="absolute right-full mr-6 bg-gradient-to-br from-yellow-300 via-orange-500 to-pink-500 text-white px-8 py-4 rounded-[2rem] font-black text-2xl shadow-[0_10px_30px_-10px_rgba(245,158,11,0.5)] whitespace-nowrap border-4 border-white flex items-center gap-4 group"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl"
            >
              🏆
            </motion.div>
            <span className="drop-shadow-md">{rewardMessage}</span>
            <button 
              onClick={handleClose}
              className="ml-2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all active:scale-90"
            >
              <Star size={24} fill="white" strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="flex items-center gap-3 bg-white text-yellow-500 px-6 py-3 rounded-full font-black text-xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] relative z-10">
        <Star size={28} fill="currentColor" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={tokens}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-2xl tabular-nums"
          >
            {tokens}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}


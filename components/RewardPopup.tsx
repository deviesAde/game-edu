"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, X } from "lucide-react";
import { playSound } from "@/lib/sound";

interface RewardPopupProps {
  score: number;
  onClose: () => void;
}

export default function RewardPopup({ score, onClose }: RewardPopupProps) {
  useEffect(() => {
    // Mainkan suara sukses saat muncul
    playSound('success');
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="rounded-[3.5rem] p-12 max-w-md w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] text-center relative border-[12px] border-white bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600"
      >
        <div className="absolute inset-[-18px] border-[8px] border-pink-400 rounded-[4.5rem] opacity-50 animate-pulse pointer-events-none" />
        <div className="absolute inset-[-28px] border-[4px] border-amber-300 rounded-[5rem] opacity-35 animate-pulse pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute -top-6 -right-6 p-4 bg-red-500 hover:bg-red-400 rounded-full text-white shadow-[0_8px_0_0_#991b1b] transition-all hover:rotate-90 active:scale-95 border-4 border-white"
        >
          <X size={24} strokeWidth={4} />
        </button>

        <div className="flex justify-center mb-8 relative">
          <motion.div 
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="bg-gradient-to-br from-yellow-300 to-orange-500 p-8 rounded-full shadow-[0_10px_0_0_#c2410c] border-4 border-white"
          >
            <Trophy size={80} className="text-white fill-white drop-shadow-lg" />
          </motion.div>
          <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -left-4 text-4xl">✨</motion.div>
          <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-4 -right-4 text-4xl">🌟</motion.div>
        </div>

        <h2 className="text-6xl font-black text-white mb-4 uppercase tracking-tighter drop-shadow-md">HEBAT!</h2>
        <div className="bg-white/20 rounded-3xl p-6 mb-8 border-4 border-dashed border-white/30 text-white backdrop-blur-sm">
          <p className="text-3xl font-bold mb-1 text-white/90">Kamu Berhasil!</p>
          <p className="text-4xl font-black text-white"><span className="text-7xl text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">{score}</span> Bintang</p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i} 
              initial={{ scale: 0, rotate: -30 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.6 + (i * 0.12) }}
              whileHover={{ scale: 1.3, rotate: 15 }}
            >
              <Star size={44} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_4px_6px_rgba(250,204,21,0.4)] cursor-pointer" />
            </motion.div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="btn-squishy w-full bg-green-500 hover:bg-green-400 text-white font-black text-4xl py-6 rounded-[2.5rem] shadow-[0_10px_0_0_#15803d] border-4 border-green-200 transition-all active:translate-y-2 active:shadow-none uppercase tracking-widest"
        >
          KEREN BANGET!
        </button>
      </motion.div>
    </div>
  );
}

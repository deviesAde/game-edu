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
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl border-8 border-yellow-400 text-center relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0] 
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-yellow-400 p-6 rounded-full shadow-lg"
          >
            <Trophy size={64} className="text-white fill-white" />
          </motion.div>
        </div>

        <h2 className="text-4xl font-black text-sky-600 mb-2 uppercase tracking-tight">Luar Biasa!</h2>
        <p className="text-xl text-slate-600 mb-6 font-bold">
          Kamu sudah mengumpulkan <span className="text-pink-500 text-2xl px-2">{score}</span> Bintang!
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
            >
              <Star size={32} className="text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-400 text-white font-black text-2xl py-5 rounded-2xl shadow-[0_6px_0_0_rgba(22,163,74,1)] active:shadow-none transform transition-all active:translate-y-2"
        >
          MAINKAN LAGI!
        </button>
      </motion.div>
    </div>
  );
}

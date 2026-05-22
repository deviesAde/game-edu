"use client";

import Link from "next/link";
import ScoreDisplay from "./ScoreDisplay";
import { Home, Music, Music4, LayoutGrid, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toggleBGM } from "@/lib/sound";
import { resetTokens } from "@/lib/storage";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleMusic = () => {
    const newState = toggleBGM();
    setIsPlaying(newState);
  };

  const handleResetScore = () => {
    if (confirm("Apakah kamu yakin ingin mereset skor bintangmu?")) {
      resetTokens();
    }
  };

  return (
    <nav className="p-6 px-10 grid grid-cols-1 md:grid-cols-3 items-center bg-sky-400 border-b-[10px] border-sky-600 shadow-xl sticky top-0 z-50 gap-6">
      <div className="hidden md:flex justify-start">
        <Link href="/" className="btn-squishy group flex items-center gap-3 bg-sky-500/30 text-white px-6 py-3 rounded-[1.5rem] font-black border-4 border-white/20 hover:bg-sky-500 transition-all">
          <Home size={28} className="group-hover:scale-125 transition-transform" />
          <span className="text-xl uppercase tracking-wider">Beranda</span>
        </Link>
      </div>
      
      <div className="flex justify-center gap-4">
        <Link href="/" className="md:hidden btn-squishy group flex items-center justify-center bg-sky-500 text-white p-4 rounded-[1.5rem] shadow-[0_6px_0_0_#0369a1] border-4 border-white/20">
          <Home size={32} />
        </Link>
        <Link href="/themes" className="btn-squishy group flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-[2rem] font-black shadow-[0_8px_0_0_#c2410c] border-4 border-white/30">
          <LayoutGrid size={32} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-2xl uppercase tracking-widest">MISI</span>
        </Link>
        <button 
          onClick={handleToggleMusic}
          className={`btn-squishy flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black border-4 transition-all ${isPlaying ? 'bg-pink-500 text-white border-pink-300 shadow-[0_8px_0_0_#be185d]' : 'bg-white text-slate-400 border-slate-100 shadow-[0_8px_0_0_#e2e8f0]'}`}
        >
          {isPlaying ? <Music size={32} className="animate-wiggle" /> : <Music4 size={32} />}
          <span className="hidden sm:inline text-xl uppercase tracking-widest">{isPlaying ? 'On' : 'Off'}</span>
        </button>
        <button 
          onClick={handleResetScore}
          className="btn-squishy flex items-center gap-2 px-6 py-4 rounded-[2rem] font-black bg-red-500 text-white border-4 border-red-300 shadow-[0_8px_0_0_#b91c1c] hover:bg-red-400"
          title="Reset Skor"
        >
          <RotateCcw size={28} />
          <span className="hidden lg:inline text-lg uppercase tracking-widest">Reset</span>
        </button>
      </div>
      
      <div className="flex justify-center md:justify-end">
        <div className="transform transition-transform hover:scale-110">
          <ScoreDisplay />
        </div>
      </div>
    </nav>
  );
}

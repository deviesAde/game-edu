"use client";

import Link from "next/link";
import { Home, Music, Music4, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { toggleBGM } from "@/lib/sound";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleMusic = () => {
    const newState = toggleBGM();
    setIsPlaying(newState);
  };

  return (
    <nav className="p-6 px-10 flex items-center justify-between bg-sky-400 border-b-[10px] border-sky-600 shadow-xl sticky top-0 z-50 gap-6">
      <div className="flex justify-start">
        <Link href="/" className="btn-squishy group flex items-center gap-3 bg-sky-500/30 text-white px-6 py-3 rounded-[1.5rem] font-black border-4 border-white/20 hover:bg-sky-500 transition-all">
          <Home size={28} className="group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline text-xl uppercase tracking-wider font-fredoka">Beranda</span>
        </Link>
      </div>
      
      <div className="flex justify-end gap-4">
        <Link href="/themes" className="btn-squishy group flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-[2rem] font-black shadow-[0_8px_0_0_#c2410c] border-4 border-white/30">
          <LayoutGrid size={32} className="group-hover:rotate-12 transition-transform" />
          <span className="text-2xl uppercase tracking-widest font-fredoka">MISI</span>
        </Link>
        <button 
          onClick={handleToggleMusic}
          className={`btn-squishy flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black border-4 transition-all ${isPlaying ? 'bg-pink-500 text-white border-pink-300 shadow-[0_8px_0_0_#be185d]' : 'bg-white text-slate-400 border-slate-100 shadow-[0_8px_0_0_#e2e8f0]'}`}
        >
          {isPlaying ? <Music size={32} className="animate-wiggle" /> : <Music4 size={32} />}
          <span className="hidden sm:inline text-xl uppercase tracking-widest font-fredoka">{isPlaying ? 'On' : 'Off'}</span>
        </button>
      </div>
    </nav>
  );
}

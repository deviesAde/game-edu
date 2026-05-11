"use client";

import Link from "next/link";
import ScoreDisplay from "./ScoreDisplay";
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
    <nav className="p-4 px-8 flex justify-between items-center bg-sky-400 border-b-8 border-sky-600 shadow-lg sticky top-0 z-50">
      <div className="flex gap-4">
        <Link href="/" className="group flex items-center gap-2 bg-sky-400 text-white px-5 py-3 rounded-full font-black shadow-[0_4px_0_0_rgba(12,74,110,0.3)] hover:shadow-none hover:translate-y-1 transition-all border-4 border-white/20">
          <Home size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline text-lg uppercase tracking-wider">Beranda</span>
        </Link>
        <Link href="/themes" className="group flex items-center gap-2 bg-orange-400 text-white px-5 py-3 rounded-full font-black shadow-[0_4px_0_0_rgba(194,65,12,0.3)] hover:shadow-none hover:translate-y-1 transition-all border-4 border-white/20">
          <LayoutGrid size={24} className="group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline text-lg uppercase tracking-wider">Pilih Game</span>
        </Link>
        <button 
          onClick={handleToggleMusic}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-black shadow-[0_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-y-1 transition-all border-4 ${isPlaying ? 'bg-pink-400 text-white border-pink-500' : 'bg-white text-slate-400 border-slate-100'}`}
        >
          {isPlaying ? <Music size={24} /> : <Music4 size={24} />}
          <span className="hidden sm:inline uppercase tracking-wider">{isPlaying ? 'Musik On' : 'Musik Off'}</span>
        </button>
      </div>
      
      <ScoreDisplay />
    </nav>
  );
}

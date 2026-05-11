import Link from "next/link";
import { PlayCircle, Star, Trophy, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 bg-sky-100 text-sky-900 min-h-[calc(100vh-80px)] relative overflow-hidden">
      <div className="bg-white/80 backdrop-blur-sm p-12 rounded-[4rem] shadow-2xl border-8 border-white text-center max-w-lg w-full relative z-10 transform transition-transform hover:scale-[1.02]">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="bg-yellow-400 p-6 rounded-full shadow-inner animate-bounce">
              <Trophy size={64} className="text-white fill-white" />
            </div>
            <div className="absolute -top-4 -right-4 text-pink-500 animate-pulse">
              <Sparkles size={32} />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-sky-600 mb-6 drop-shadow-lg tracking-tight leading-tight">
          DUNIA <span className="text-pink-500">ANGKA</span>
        </h1>
        <p className="text-2xl md:text-3xl text-slate-600 mb-12 font-bold leading-relaxed">
          Ayo kumpulkan bintang dan jadi juara matematika!
        </p>
        
        <Link 
          href="/themes"
          className="group inline-flex items-center justify-center gap-4 bg-green-500 hover:bg-green-400 text-white font-black text-4xl py-8 px-16 rounded-full shadow-[0_12px_0_0_rgba(22,163,74,1)] hover:shadow-[0_8px_0_0_rgba(22,163,74,1)] active:shadow-none transform transition-all active:translate-y-4 hover:-translate-y-2"
        >
          <PlayCircle size={48} />
          MULAI!
        </Link>
      </div>
    </main>
  );
}

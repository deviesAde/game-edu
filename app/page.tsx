import Link from "next/link";
import { PlayCircle, Star, Trophy, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 bg-sky-200 text-sky-900 min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Animated Clouds */}
      <div className="absolute top-20 left-0 w-40 h-20 bg-white rounded-full blur-xl opacity-60 animate-cloud" style={{ animationDuration: '45s' }}></div>
      <div className="absolute top-40 left-0 w-60 h-24 bg-white rounded-full blur-2xl opacity-40 animate-cloud" style={{ animationDuration: '60s', animationDelay: '-10s' }}></div>
      <div className="absolute top-10 left-0 w-32 h-16 bg-white rounded-full blur-lg opacity-50 animate-cloud" style={{ animationDuration: '35s', animationDelay: '-20s' }}></div>

      {/* Decorative Sun */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      
      {/* Meadow Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-green-400 rounded-t-[100%] scale-x-125 transform translate-y-10 border-t-8 border-green-500"></div>

      <div className="glass-card p-12 text-center max-w-2xl w-full relative z-10 transform hover:rotate-1 transition-transform">
        <div className="flex justify-center mb-10">
          <div className="relative group">
            <div className="bg-yellow-400 p-8 rounded-[2rem] shadow-[0_12px_0_0_#ca8a04] animate-float">
              <Trophy size={80} className="text-white fill-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -top-6 -right-6 text-pink-500 animate-wiggle">
              <Sparkles size={48} />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-sky-600 mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] tracking-tight leading-none">
          DUNIA <span className="text-pink-500 drop-shadow-[0_4px_0_#db2777]">ANGKA</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-slate-600 mb-14 font-bold max-w-md mx-auto leading-tight">
          Ayo kumpulkan <span className="text-yellow-500">Bintang</span> dan jadi <span className="text-green-500">Juara</span> matematika!
        </p>
        
        <Link 
          href="/themes"
          className="btn-squishy group inline-flex items-center justify-center gap-6 bg-green-500 hover:bg-green-400 text-white font-black text-5xl py-10 px-20 rounded-[3rem] shadow-[0_15px_0_0_#16a34a] hover:shadow-[0_10px_0_0_#16a34a] active:shadow-none"
        >
          <PlayCircle size={64} className="group-hover:rotate-12 transition-transform" />
          MULAI!
        </Link>
      </div>

      {/* Floating Flowers */}
      <div className="absolute bottom-10 left-10 text-4xl animate-wiggle">🌸</div>
      <div className="absolute bottom-20 right-20 text-5xl animate-wiggle delay-1">🌼</div>
      <div className="absolute bottom-5 left-1/4 text-3xl animate-wiggle delay-2">🌷</div>
    </main>
  );
}

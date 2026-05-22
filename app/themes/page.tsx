import Link from "next/link";
import { Ruler, Shapes, Binary, Clock, Sparkles } from "lucide-react";

const themes = [
  { id: 'size', title: 'Tema 1: Ukuran', desc: 'Besar & Kecil', icon: Ruler, color: 'bg-emerald-400', borderColor: 'border-emerald-600' },
  { id: 'shape', title: 'Tema 2: Bentuk', desc: 'Geometri Lucu', icon: Shapes, color: 'bg-orange-400', borderColor: 'border-orange-600' },
  { id: 'number', title: 'Tema 3: Angka', desc: 'Ayo Berhitung!', icon: Binary, color: 'bg-purple-400', borderColor: 'border-purple-600' },
  { id: 'time', title: 'Tema 4: Waktu', desc: 'Siang & Malam', icon: Clock, color: 'bg-pink-400', borderColor: 'border-pink-600' },
];

export default function ThemesPage() {
  return (
    <div className="flex-1 flex flex-col p-8 bg-sky-200 min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-14">
          <h1 className="text-6xl md:text-8xl font-black text-sky-800 mb-4 drop-shadow-[0_4px_0_#fff] tracking-tight">
            PILIH <span className="text-yellow-500 drop-shadow-[0_4px_0_#ca8a04]">MISI!</span>
          </h1>
          <p className="text-3xl text-sky-900/60 font-bold">Materi apa yang mau dipelajari hari ini?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {themes.map((theme, idx) => {
            const Icon = theme.icon;
            const animDelay = `delay-${(idx % 3) + 1}`;
            return (
              <div 
                key={theme.id} 
                className={`animate-float ${animDelay} flex flex-col p-10 rounded-[4rem] border-b-[16px] shadow-2xl ${theme.color} ${theme.borderColor} text-white transform transition-all hover:scale-[1.02] hover:-rotate-1`}
              >
                <div className="flex items-center gap-8 mb-10">
                  <div className="bg-white/30 p-8 rounded-[2.5rem] shadow-inner relative overflow-hidden group">
                    <Icon size={72} className="drop-shadow-lg text-white group-hover:rotate-12 transition-transform" />
                    <Sparkles size={24} className="absolute top-2 right-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black tracking-tight drop-shadow-md">{theme.title}</h2>
                    <p className="text-2xl font-bold opacity-90 italic">"{theme.desc}"</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link 
                    href={`/play/${theme.id}/1`}
                    className="btn-squishy bg-white text-slate-700 hover:bg-sky-50 p-8 rounded-[2rem] text-center flex flex-col items-center justify-center gap-1 shadow-lg"
                  >
                    <span className="text-3xl font-black">BELAJAR</span>
                    <span className="text-sm font-black text-sky-500 uppercase tracking-[0.2em] bg-sky-100 px-4 py-1 rounded-full">Level 1</span>
                  </Link>
                  <Link 
                    href={`/play/${theme.id}/2`}
                    className="btn-squishy bg-yellow-400 text-yellow-900 hover:bg-yellow-300 p-8 rounded-[2rem] text-center flex flex-col items-center justify-center gap-1 shadow-[0_10px_0_0_#ca8a04]"
                  >
                    <span className="text-3xl font-black">BERMAIN</span>
                    <span className="text-sm font-black text-yellow-700 uppercase tracking-[0.2em] bg-yellow-500/20 px-4 py-1 rounded-full">Level 2</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 text-6xl animate-wiggle opacity-30">🎈</div>
      <div className="absolute bottom-1/4 left-10 text-6xl animate-wiggle delay-2 opacity-30">🚀</div>
    </div>
  );
}

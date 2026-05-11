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
    <div className="flex-1 flex flex-col p-8 bg-sky-50 min-h-[calc(100vh-80px)] relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black text-sky-700 mb-4 drop-shadow-md tracking-tight">
            PILIH <span className="text-yellow-500">MISI!</span>
          </h1>
          <p className="text-2xl text-slate-500 font-bold">Materi apa yang mau dipelajari hari ini?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <div 
                key={theme.id} 
                className={`flex flex-col p-8 rounded-[3rem] border-b-[12px] shadow-xl ${theme.color} ${theme.borderColor} text-white`}
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="bg-white/30 p-6 rounded-3xl shadow-inner">
                    <Icon size={60} className="drop-shadow-lg text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">{theme.title}</h2>
                    <p className="text-xl font-bold opacity-90">{theme.desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    href={`/play/${theme.id}/1`}
                    className="bg-white text-slate-700 hover:bg-sky-50 p-6 rounded-2xl text-center font-black text-xl shadow-md transition-all hover:-translate-y-1 active:translate-y-1"
                  >
                    Level 1<br/>
                    <span className="text-sm font-bold text-sky-500 uppercase tracking-widest">Konsep</span>
                  </Link>
                  <Link 
                    href={`/play/${theme.id}/2`}
                    className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 p-6 rounded-2xl text-center font-black text-xl shadow-md transition-all hover:-translate-y-1 active:translate-y-1"
                  >
                    Level 2<br/>
                    <span className="text-sm font-bold text-yellow-700 uppercase tracking-widest">Latihan</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

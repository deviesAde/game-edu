import Link from "next/link";
import { ArrowLeft, Star, Sparkles } from "lucide-react";

export default async function LevelSelectionPage({ params }: { params: Promise<{ themeId: string }> }) {
  const { themeId } = await params;
  
  const themeTitles: Record<string, string> = {
    size: 'Ukuran',
    shape: 'Bentuk Geometri',
    number: 'Angka',
    time: 'Waktu'
  };

  const title = themeTitles[themeId] || 'Tema Tidak Dikenal';

  return (
    <div className="flex-1 flex flex-col p-8 bg-sky-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex items-center mb-10">
          <Link href="/themes" className="bg-white p-4 rounded-full shadow-md text-sky-600 hover:bg-sky-100 hover:scale-105 transition-all border-2 border-sky-200">
            <ArrowLeft size={32} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 flex-1 text-center pr-16 drop-shadow-sm">{title}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            href={`/play/${themeId}/1`}
            className="group flex flex-col items-center p-10 bg-white rounded-3xl border-b-8 border-indigo-500 shadow-lg hover:bg-indigo-50 transition-all transform hover:-translate-y-2 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 opacity-10 text-indigo-500">
              <Sparkles size={120} />
            </div>
            <div className="bg-indigo-100 p-6 rounded-full mb-6 text-indigo-500 group-hover:scale-110 transition-transform shadow-inner">
              <Sparkles size={64} />
            </div>
            <h2 className="text-4xl font-bold text-indigo-700 mb-2">Level 1</h2>
            <p className="text-xl text-slate-500 font-medium text-center">Pengenalan Konsep</p>
          </Link>
          
          <Link 
            href={`/play/${themeId}/2`}
            className="group flex flex-col items-center p-10 bg-white rounded-3xl border-b-8 border-fuchsia-500 shadow-lg hover:bg-fuchsia-50 transition-all transform hover:-translate-y-2 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 opacity-10 text-fuchsia-500">
              <Star size={120} />
            </div>
            <div className="bg-fuchsia-100 p-6 rounded-full mb-6 text-fuchsia-500 group-hover:scale-110 transition-transform shadow-inner">
              <Star size={64} className="fill-fuchsia-500" />
            </div>
            <h2 className="text-4xl font-bold text-fuchsia-700 mb-2">Level 2</h2>
            <p className="text-xl text-slate-500 font-medium text-center">Latihan Soal</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

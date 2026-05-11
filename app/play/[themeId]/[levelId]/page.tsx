import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhaserGameWrapper from "@/components/PhaserGame";
import { ThemeId, LevelId } from "@/lib/questionGenerator";

export default async function PlayPage({ params }: { params: Promise<{ themeId: string, levelId: string }> }) {
  const { themeId, levelId } = await params;
  
  return (
    <div className="flex-1 flex flex-col p-4 bg-sky-50 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-5xl mx-auto mb-4 flex items-center">
        <Link href={`/themes/${themeId}`} className="bg-white p-3 rounded-full shadow-md text-sky-600 hover:bg-sky-100 border-2 border-sky-200">
          <ArrowLeft size={24} />
        </Link>
      </div>
      <div className="flex-1 w-full max-w-5xl mx-auto bg-white rounded-3xl border-8 border-sky-300 shadow-xl overflow-hidden relative">
        <PhaserGameWrapper theme={themeId as ThemeId} level={parseInt(levelId) as LevelId} />
      </div>
    </div>
  );
}

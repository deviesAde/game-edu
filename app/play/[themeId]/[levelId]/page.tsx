import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhaserGameWrapper from "@/components/PhaserGame";
import { ThemeId, LevelId } from "@/lib/questionGenerator";

export default async function PlayPage({ params }: { params: Promise<{ themeId: string, levelId: string }> }) {
  const { themeId, levelId } = await params;
  
  return (
    <div className="fixed inset-0 w-full h-full bg-sky-50 z-0">
      <div className="absolute top-4 left-4 z-50">
        <Link href={`/themes/${themeId}`} className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-sky-600 hover:bg-white transition-all hover:scale-110 active:scale-95 flex items-center justify-center">
          <ArrowLeft size={28} strokeWidth={3} />
        </Link>
      </div>
      <div className="w-full h-full overflow-hidden">
        <PhaserGameWrapper theme={themeId as ThemeId} level={parseInt(levelId) as LevelId} />
      </div>
    </div>
  );
}

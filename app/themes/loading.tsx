export default function Loading() {
  return (
    <div className="flex-1 flex flex-col p-8 bg-sky-200 min-h-[calc(100vh-80px)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-14">
          <div className="h-20 w-3/4 bg-white/30 skeleton mx-auto mb-4 rounded-3xl"></div>
          <div className="h-8 w-1/2 bg-white/20 skeleton mx-auto rounded-xl"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="flex flex-col p-10 rounded-[4rem] border-b-[16px] bg-white/40 border-white/20 h-[450px]"
            >
              <div className="flex items-center gap-8 mb-10">
                <div className="w-24 h-24 bg-white/50 skeleton rounded-[2.5rem]"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-10 w-3/4 bg-white/50 skeleton rounded-xl"></div>
                  <div className="h-6 w-1/2 bg-white/30 skeleton rounded-lg"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
                <div className="h-24 bg-white/60 skeleton rounded-[2rem]"></div>
                <div className="h-24 bg-white/60 skeleton rounded-[2rem]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

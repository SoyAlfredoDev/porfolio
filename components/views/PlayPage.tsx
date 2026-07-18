import { WordGame } from "@/components/game/WordGame";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlayAtmosphere } from "@/components/views/PlayAtmosphere";

export function PlayPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-white flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[128px]" />
          <PlayAtmosphere />
        </div>

        <div className="container mx-auto relative z-10">
          <WordGame />
        </div>
      </div>

      <Footer />
    </main>
  );
}

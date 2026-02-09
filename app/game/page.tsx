import { WordGame } from "@/components/game/WordGame"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function GamePage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-6 relative">
         {/* Background Elements */}
         <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
         <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />
         
         <div className="container mx-auto relative z-10">
            <WordGame />
         </div>
      </div>

      <Footer />
    </main>
  )
}

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { LobbyExplore } from "@/components/sections/LobbyExplore";
import { Projects } from "@/components/sections/Projects";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-white overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <LobbyExplore />
      <Projects limit={2} showArchiveLink={false} preview />
      <Footer />
    </main>
  );
}

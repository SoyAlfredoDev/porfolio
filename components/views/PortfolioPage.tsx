import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioWorks } from "@/components/sections/PortfolioWorks";

export function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-white overflow-hidden">
      <Navbar />
      <div className="pt-24">
        <PortfolioWorks />
      </div>
      <Footer />
    </main>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";

export function ContactPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-white overflow-hidden">
      <Navbar />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

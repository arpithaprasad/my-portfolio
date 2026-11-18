import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Play from "./components/Play";
import SiteModelHero from "./components/SiteModelHero";
import Navbar from "./components/Navbar";
import Work from "./components/Work";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main>
        <SiteModelHero />
        <Work />
        <About />
        <Play />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

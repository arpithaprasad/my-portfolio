import About from "./components/About";
import CurrentlyMapping from "./components/CurrentlyMapping";
import FieldNotes from "./components/FieldNotes";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Work from "./components/Work";

export default function Home() {
  return (
    <div className="drafting-lines min-h-screen text-[var(--foreground)]">
      <Navbar />
      <main>
        <Hero />
        <CurrentlyMapping />
        <Work />
        <FieldNotes />
        <About />
      </main>
      <Footer />
    </div>
  );
}

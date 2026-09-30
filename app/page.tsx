import FinalQuestion from "./components/FinalQuestion";
import Hero from "./components/Hero";
import MemoryCards from "./components/MemoryCards";
import OurPlaces from "./components/OurPlaces";
import PerformanceReview from "./components/PerformanceReview";
import Reveal from "./components/Reveal";
import Stats from "./components/Stats";
import ThingsILearned from "./components/ThingsILearned";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <div className="scrap-page">
      <Hero />
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal>
        <Timeline />
      </Reveal>
      <Reveal>
        <ThingsILearned />
      </Reveal>
      <Reveal>
        <OurPlaces />
      </Reveal>
      <Reveal>
        <PerformanceReview />
      </Reveal>
      <Reveal>
        <MemoryCards />
      </Reveal>
      <FinalQuestion />
    </div>
  );
}

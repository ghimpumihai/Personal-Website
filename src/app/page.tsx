import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Timeline />
      <Skills />
      <Projects />
    </div>
  );
}
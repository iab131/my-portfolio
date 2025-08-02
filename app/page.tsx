import Hero from "@/components/Hero";
import Image from "next/image";
import About from "@/components/About";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <main className="relative bg-slate-900 flex justify-center items-center flex-col overflow">
      <div className=" w-full dark">
        <Hero />
      </div>
        
      <div id="about" className='h-auto z-10 mb-20'>
        <About />
      </div>
      <div id="projects" className=' h-auto  z-10'>
        <Projects />
      </div>
      <div className='h-auto  z-10'>
        <TechStack />
      </div>
      <div id="robot" className="h-auto z-10">
        {/* <robot /> */}
      </div>
    </main>
  );
}

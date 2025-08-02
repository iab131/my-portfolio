import Hero from "@/components/Hero";
import Image from "next/image";
import About from "@/components/About";
export default function Home() {
  return (
    <main className="relative bg-slate-900 flex justify-center items-center flex-col overflow mx-auto ">
      <div className=" w-full dark">
        <Hero />
      </div>
        
      <div id="about" className='bg-slate-900 flex flex-col  h-screen relative z-10'>
        <About />
      </div>
      <div id="projects" className='bg-slate-900 flex flex-col items-center justify-center h-screen relative z-10 overflow-hidden'>
        {/* <Projects /> */}
      </div>
      <div className='h-10 bg-sky-400'/>
      <div className='h-10 bg-indigo-400'/>
      <div className='h-10 bg-cyan-300'/>
      <div className='h-10 bg-emerald-400'/>
      <div className='h-10 bg-zinc-700'/>
    </main>
  );
}

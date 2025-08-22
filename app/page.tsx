import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Robot from "@/components/Robot";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative bg-slate-900 flex justify-center items-center flex-col ">
      <div className=" w-full dark">
        <Hero />
      </div>

      <div id="about" className="h-auto z-10 mb-20">
        <About />
      </div>
      <div id="projects" className=" h-auto  z-10">
        <Projects />
      </div>
      <div className="h-auto  z-10 mb-40">
        <TechStack />
      </div>

      <div className="w-full flex justify-center mt-10 mb-45 px-4">
        <Link
          href="/robot"
          className="
      group relative block rounded-3xl
      bg-slate-800/80 backdrop-blur-md
      ring-1 ring-white/10
      px-10 py-10
      shadow-lg shadow-blue-500/20
      hover:shadow-[0_0_80px_rgba(59,130,246,0.55)]
      transition-all duration-300
      max-w-3xl w-full text-center
    "
        >
          {/* glow border */}
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/40 to-cyan-400/40 blur-3xl opacity-75 group-hover:opacity-100 transition-opacity"></span>

          <div className="flex flex-col items-center">
            <div className="text-white font-extrabold text-3xl md:text-4xl tracking-tight">
              Explore Robot Showcase
            </div>
            <div className="text-slate-300/80 text-lg md:text-xl mt-3">
              Diffy Swerve & Hydra • Interactive 3D Experience
            </div>
          </div>
        </Link>
      </div>




      <div id="footer" className="h-full w-full">
        <Footer />
      </div>
    </main>
  );
}

"use client";
import React from "react";
// Update the import path below if the file is located elsewhere
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
export function BgBoxes() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-screen bg-slate-900 z-5 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      <div className="z-10  max-w-4xl pointer-events-none flex flex-col  relative">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl mx-4 sm:mx-10">
          <TextGenerateEffect
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 -mt-8 drop-shadow-lg"
            words="Hi, I&apos;m Enhe 👋"
          />
          <motion.h2
            className="text-xl md:text-2xl text-gray-200 mb-4 font-medium leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            I build <span className="text-white">interactive robots</span>,{" "}
            <span className="text-white">educational tools</span>, and{" "}
            <span className="text-white">immersive games</span>.
          </motion.h2>
          <motion.p
            className="text-md md:text-lg text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.75, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            CS student at the University of Waterloo passionate about robotics,
            simulation, and creative development.
            <br className="hidden md:block" />
            From LEGO-style robot simulators to 3D printable designs, I bring
            hands-on experiences to life through code.
          </motion.p>
          <div className="flex justify-center items-center mt-7 -mb-5">
            <a href="#about" aria-label="Scroll down">
              <ChevronDownIcon className="animate-bounce pointer-events-auto text-blue-400 w-15 h-15 self-center cursor-pointer hover:text-blue-500 hover:scale-110  transition duration-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BgBoxes;

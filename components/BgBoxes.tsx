"use client";
import React from "react";
// Update the import path below if the file is located elsewhere
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "./ui/text-generate-effect";
 
export function BgBoxes() {
  return (

    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-screen bg-slate-900 z-5 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
 
      <Boxes />

        <div className="z-10  px-4 max-w-3xl pointer-events-none flex flex-col -mt-60 relative">
            <TextGenerateEffect
              className=" text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white drop-shadow"
              words = "Hi, I’m Enhe 👋"
            />
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            I build interactive robots, intelligent systems, and immersive games.
          </h2>
          <p className="text-md md:text-lg text-gray-400 mb-8">
            CS student at the University of Waterloo passionate about robotics, game dev, and 3D simulation.  
            I create intuitive tools and bring physical systems to life through code.
          </p>
        </div>
    </div>
  );
}

export default BgBoxes;
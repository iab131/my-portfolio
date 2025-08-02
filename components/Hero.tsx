import React from "react";
import { BgBoxes } from "@/components/BgBoxes";
import { Navbar } from "@/components/NavBar";
import { Spotlight } from "@/components/ui/spotlight-new";

const Hero = () => {
  return (
    <div className="relative w-full flex flex-col">
      <Navbar />
      <div className=" absolute z-50 w-full  overflow-hidden h-screen pointer-events-none">
        <Spotlight />
      </div>
      <BgBoxes />
    </div>
  );
};

export default Hero;

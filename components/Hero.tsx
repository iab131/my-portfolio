import React from 'react'
import { BgBoxes } from "@/components/BgBoxes";
import { Navbar } from "@/components/NavBar";
import { Spotlight } from "@/components/ui/spotlight-new";

const Hero = () => {
  return (
    <div className='relative w-full flex flex-col'>
        
        <Navbar />
        <div className=' absolute z-50 w-full  overflow-hidden h-screen pointer-events-none'>
            <Spotlight />
        </div>
        <BgBoxes />
        
        <div className='bg-slate-900 flex flex-col items-center justify-center h-screen relative z-10 overflow-hidden'>

        </div><div className='bg-slate-900 flex flex-col items-center justify-center h-screen relative z-10 overflow-hidden'>

        </div>
        <div className='h-10 bg-sky-400'/>
        <div className='h-10 bg-indigo-400'/>
        <div className='h-10 bg-cyan-300'/>
        <div className='h-10 bg-emerald-400'/>
        <div className='h-10 bg-zinc-700'/>
        
   
    </div>
  )
}

export default Hero
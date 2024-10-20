import React from 'react'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { Card } from './ui/Card'

const Hero = () => {
  return (
    <div className='h-fit w-full flex flex-col items-center  pointer-events-none relative -top-10'>
      <div>
        <TextGenerateEffect
          className="text-center text-[40px] md:text-5xl lg:text-6xl"
          words="Transforming Concepts into Seamless Experiences" />
      </div>
    {/* </div><div>
        <Card />
      </div></>    */}
    </div>
  );
}

export default Hero
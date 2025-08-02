"use client";
import React from "react";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { textVariant, fadeIn } from "@/lib/motion";
import { services } from "@/lib/constants";

import { EvervaultCard, Icon } from "./ui/evervault-card";
import { CometCard } from "@/components/ui/comet-card";
const About = () => {
  return (
    <div className="px-4 sm:px-10">
      {/* initial="hidden" whileInView="show" className='flex flex-col items-center justify-center text-center mt-10' */}
      <div className="flex flex-col justify-center items-start mt-10 max-w-8xl">
        <div>
          <motion.div
            variants={textVariant()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
              Introduction
            </p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
              Overview.
            </h2>
          </motion.div>

          <motion.p
            variants={fadeIn("up", "spring", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            I'm a Computer Science student at the University of Waterloo with a
            passion for robotics, 3D simulation, and interactive systems. I
            specialize in building immersive, hands-on learning tools that blend
            code with physical logic — from LEGO-style robot simulators to
            real-time block-based programming environments. Whether I'm
            designing intuitive UIs, coding motion logic, or simulating hardware
            behaviors, I strive to make technology feel both powerful and
            accessible. My work combines technical depth with creative design,
            always aiming to bridge the gap between imagination and
            implementation.
          </motion.p>
        </div>
      </div>
      <div className="flex gap-10 flex-wrap my-20 justify-center items-center">
        {services.map((service, index) => (
          <TiltCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

type TiltCardProps = {
  title: string;
  index: number;
  icon?: StaticImageData;
};

const TiltCard = ({ title, index, icon }: TiltCardProps) => {
  return (
    <CometCard>
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        viewport={{ once: false, amount: 0.25 }}
        initial="hidden"
        animate="show"
        className=" flex w-60 cursor-pointer flex-col items-stretch rounded-[24px]  bg-[#1F2121] p-2  md:p-2"
        aria-label={title}
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full">
            <EvervaultCard text={icon ?? "hover"} className="rounded-lg " />
          </div>
        </div>
        <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
          <div className="text-xs">{title}</div>
          <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
        </div>
      </motion.div>
    </CometCard>
  );
};
export default About;

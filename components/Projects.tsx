"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion, transform } from "framer-motion";
import { fadeIn, slideIn, textVariant, zoomIn } from "@/lib/motion";
import { Project, projects } from "@/lib/constants";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";

const Projects = () => {
  return (
    <div className="pt-35 max-w-screen">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="flex flex-col items-center justify-center text-center"
      >
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          what i have done so far
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Recent Projects.
        </h2>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-16 my-20 px-4 sm:px-0  ">
        {projects.map(({ id, title, des, img, iconLists, link }) => (
          <ProjectCard
            key={id}
            id={id}
            title={title}
            des={des}
            img={img}
            iconLists={iconLists}
            link={link}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;

const ProjectCard = ({ title, des, img, iconLists, link }: Project) => {
  return (
    <motion.div 
    
      variants={fadeIn("up","spring", 0.5, 0.75)}
      viewport={{ once: true, amount: 0.05 }}
      initial="hidden"
      whileInView="show">
    <CardContainer className="inter-var ">
      <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-gray-800 border-white/[0.2]  w-full md:w-[40rem] sm:w-[30rem] h-auto rounded-4xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="lg:text-3xl md:text-2xl text-xl line-clamp-1 font-bold text-white pointer-events-none"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-base max-w-md mt-4 text-neutral-300 pointer-events-none"
        >
          {des}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-6">
          <div className="relative flex items-center justify-center w-full sm:h-[40vh] h-[30vh]">
            <div
              className="relative w-full h-full overflow-hidden rounded-xl lg:rounded-3xl bg-gray-700/50 border border-white/[0.2] flex items-center justify-center"
            >
              <img src="/img/bg.png" alt="bgimg" className="absolute inset-0 w-full h-full object-cover" />
              <img
                src={img}
                className="relative top-10 z-10 w-auto h-auto max-w-[90%] max-h-[90%] object-contain rounded-2xl shadow-lg transform rotate-4"
                alt="cover"
              />
            </div>
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem translateZ={50} as="div" className="py-1">
            <div className="flex items-center">
              {iconLists.map((icon, index) => (
                <div
                  key={icon}
                  className="border border-gray-600 rounded-full bg-gray-800 lg:w-12 lg:h-12 w-10 h-10 flex justify-center items-center"
                  style={{ transform: `translateX(-${5 * index * 2}px)` }}
                >
                  <img src={icon} alt={icon} className="p-2" />
                </div>
              ))}
            </div>
          </CardItem>
          <CardItem
            translateZ={50}
            as="a"
            target="_blank"
            href={link}
            rel="noopener noreferrer"
            className="flex lg:text-[15px] md:text-xs text-sm px-4 py-2 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-white font-bold border-white/[0.2] border"
          >
            <div className="flex justify-center items-center">
              Check Live Site
              <FaLocationArrow className="ms-3" />
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    </motion.div>
  );
};

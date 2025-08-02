'use client'
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BallCanvas } from "./canvas/ball";
import { technologies } from "@/lib/constants"

const TechStack = () => {
  return (
        <div className="flex flex-row flex-wrap max-w-7xl justify-center gap-10 px-5 sm:px-0">

            {technologies.map((technology) => (
                <div className="w-28 h-28" key={technology.name}>
                    <BallCanvas icon={technology.icon} />
                </div>
            ))}
        </div>
  );
};

export default TechStack;

"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import {
  useMotionValue,
  useMotionTemplate,
  motion,
  MotionValue,
} from "framer-motion"; // fix: correct framer-motion import
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { web } from "@/src/assets";

interface EvervaultCardProps {
  text?: string | StaticImageData;
  className?: string;
}

export const EvervaultCard = ({ text, className }: EvervaultCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState<string>("");

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "bg-transparent aspect-square flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />

        <div className="relative z-10 flex items-center justify-center">
          <div className="relative w-30 h-30 rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <div className="absolute w-full h-full bg-gradient-to-br from-cyan-500/50 to-blue-600/50 blur-sm rounded-full" />
            {typeof text === "string" ? (
              <span className="text-white z-20">{text}</span>
            ) : (
              <Image
                src={text || web}
                alt="icon"
                className="z-20 w-20 object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardPatternProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;

  randomString: string;
}

export function CardPattern({
  mouseX,
  mouseY,
  randomString,
}: CardPatternProps) {
  const maskImage = useMotionTemplate`radial-gradient(150px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-lg [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length: number): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const Icon = ({ className, ...rest }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

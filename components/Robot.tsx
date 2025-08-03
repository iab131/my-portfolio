// components/RobotShowcase.tsx
"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/Loader";
import DiffySwerve from "./canvas/DiffySwerve";
import Hydra from "./canvas/Hydra";

export default function RobotShowcase() {
  const [focused, setFocused] = useState<"swerve" | "hydra" | null>("swerve");

  return (
    <div className="relative w-screen h-screen bg-slate-900 flex">
      {/* Left Hover Area */}
      <div
        className={`transition-all duration-500 h-full cursor-pointer z-10 ${
          focused === "swerve"
            ? "w-full"
            : focused === "hydra"
            ? "w-1/6"
            : "w-1/4 hover:w-1/2"
        }`}
        onClick={() => setFocused("swerve")}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls enableZoom={true} enablePan={true} />
            <ambientLight intensity={1.0} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.8} />
            <directionalLight position={[0, 10, 0]} intensity={1.2} />
            <pointLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, -5, -5]} intensity={0.6} />
            <DiffySwerve focused={focused === "swerve"} />
          </Suspense>
        </Canvas>
      </div>

      {/* Right Hover Area */}
      <div
        className={`transition-all duration-500 h-full cursor-pointer z-10 ${
          focused === "hydra"
            ? "w-full"
            : focused === "swerve"
            ? "w-1/6"
            : "w-1/4 hover:w-1/2"
        }`}
        onClick={() => setFocused("hydra")}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls enableZoom={true} enablePan={true} />
            <ambientLight intensity={1.0} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.8} />
            <directionalLight position={[0, 10, 0]} intensity={1.2} />
            <pointLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, -5, -5]} intensity={0.6} />
            <Hydra focused={focused === "hydra"} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

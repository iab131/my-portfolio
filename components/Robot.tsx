// components/RobotShowcase.tsx
"use client";

import { Suspense, useEffect, useState, useRef, RefObject } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import CanvasLoader from "../components/Loader";
import DiffySwerve from "./canvas/DiffySwerve";
import Hydra from "./canvas/Hydra";
import CanvasLabel from "./canvas/CanvasLabel";
import Link from "next/link";

/* ───────── Config ───────── */

type V3 = [number, number, number];
interface RobotCfg {
  defaultPosition: V3;
  defaultScale: number;
  defaultRotation: V3;
  defaultCameraPosition: V3;
  defaultCameraRotation: V3;
}

const ROBOT: Record<"swerve" | "hydra", RobotCfg> = {
  swerve: {
    defaultPosition: [-1.7, 0, 0],
    defaultScale: 7,
    defaultRotation: [0, 0.4, 0],
    defaultCameraPosition: [0, 2, 4.5],
    defaultCameraRotation: [0, 0, 0],
  },
  hydra: {
    defaultPosition: [1.4, -0.6, 0],
    defaultScale: 5,
    defaultRotation: [0, 0.6, 0],
    defaultCameraPosition: [0, 2, 6],
    defaultCameraRotation: [0, 0, 0],
  },
};

const VIEW = {
  hoverScale: 7,
  focusScale: 8,
  animationSpeed: 0.05,
};

/* ───────── Reset helper ───────── */

function ResetSide({
  side,
  focus,
  hover,
  ctrlRef,
}: {
  side: "swerve" | "hydra";
  focus: "swerve" | "hydra" | null;
  hover: "swerve" | "hydra" | null;
  ctrlRef: RefObject<OrbitControlsImpl | null>;
}) {
  const { camera, scene } = useThree();

  useEffect(() => {
    const cfg = ROBOT[side];
    const idle = focus !== side && hover !== side;

    if (idle) {
      camera.position.set(...cfg.defaultCameraPosition);
      camera.rotation.set(...cfg.defaultCameraRotation);

      if (ctrlRef.current) {
        ctrlRef.current.reset();
        ctrlRef.current.enabled = false;
      }

      const robot = scene.getObjectByName(side);
      if (robot) {
        robot.position.set(...cfg.defaultPosition);
        robot.rotation.set(...cfg.defaultRotation);
        robot.scale.setScalar(cfg.defaultScale);
      }
    } else if (focus === side && ctrlRef.current) {
      ctrlRef.current.enabled = true;
    }
  }, [focus, hover, side, camera, scene, ctrlRef]);

  return null;
}

function useViewportWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // Set initial width (client only)
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

/* ───────── Showcase ───────── */

export default function RobotShowcase() {
  const [focused, setFocused] = useState<"swerve" | "hydra" | null>(null);
  const [hovered, setHovered] = useState<"swerve" | "hydra" | null>(null);
  const width = useViewportWidth();
  const [hydraPlaying, setHydraPlaying] = useState(false);
  const [swervePlaying, setSwervePlaying] = useState(false);
  /* width % that belongs to LEFT panel (Swerve) */
  let leftPct = 50;
  if (hovered === "swerve") leftPct = 60;
  if (hovered === "hydra") leftPct = 40;
  if (focused === "swerve") leftPct = 70;
  if (focused === "hydra") leftPct = 30;

  const swerveCtrl = useRef<OrbitControlsImpl | null>(null);
  const hydraCtrl = useRef<OrbitControlsImpl | null>(null);

  // Estimate pixel width per world unit at z = 0

  // Find center of canvas in pixels
  const canvasSwerve = (leftPct / 100) * width;
  const canvasHydra = ((100 - leftPct) / 100) * width;
  console.log(focused, hovered);
  return (
    <div className=" relative flex w-full h-screen overflow-hidden bg-slate-900">
      {/* BACK TO PORTFOLIO BUTTON */}
      <Link
        href="/"
        className="
    absolute top-4 left-4 lg:top-6 lg:left-6
    z-50
    bg-slate-800/80 hover:bg-slate-700/80
    text-white

    
    px-4 py-2 text-base
    lg:px-5 lg:py-2.5 lg:text-lg
    rounded-lg font-semibold shadow
  "
      >
        ← Back to Portfolio
      </Link>

      {/* LEFT / SWERVE */}
      <div
        className="relative shrink-0 transition-[width] duration-300 border-r border-slate-600"
        style={{ width: `${leftPct}%` }}
        onMouseEnter={() => setHovered("swerve")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => {
          setFocused("swerve");
          setHydraPlaying(false);
        }}
      >
        <Canvas
          resize={{ debounce: 0 }}
          camera={{ position: ROBOT.swerve.defaultCameraPosition, fov: 50 }}
          className="w-full h-full"
        >
          <Suspense fallback={<CanvasLoader />}>
            <CanvasLabel
              text={"Diffy\nSwerve"}
              hex={
                focused === "swerve" ? "#60a5fa" : "#7dd3fc"
              } /* brighter on focus */
              active={focused === "swerve"}
              hydraDOMWidth={canvasSwerve}
            />
            <ResetSide
              side="swerve"
              focus={focused}
              hover={hovered}
              ctrlRef={swerveCtrl}
            />
            <OrbitControls
              ref={swerveCtrl}
              enableRotate={focused === "swerve"}
              enableZoom={focused === "swerve"}
              enablePan={false}
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
              maxDistance={7}
            />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[10, 10, -10]} intensity={1.5} />
            <directionalLight position={[-10, 10, -10]} intensity={1.5} />
            <directionalLight position={[-10, 10, 10]} intensity={1.5} />
            <directionalLight position={[0, -5, 0]} intensity={1.5} />
            <DiffySwerve
              name="swerve"
              focused={focused === "swerve"}
              hovered={hovered === "swerve"}
              isLeft
              config={ROBOT.swerve}
              hoverScale={VIEW.hoverScale}
              focusScale={VIEW.focusScale}
              animationSpeed={VIEW.animationSpeed}
              playing={swervePlaying}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* RIGHT / HYDRA */}
      <div
        className="relative flex-1 border-l border-slate-600 ml-auto"
        onMouseEnter={() => setHovered("hydra")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => {
          setFocused("hydra");
          setSwervePlaying(false);
        }}
      >
        <Canvas
          resize={{ debounce: 0 }}
          camera={{ position: ROBOT.hydra.defaultCameraPosition, fov: 50 }}
          className="w-full h-full"
        >
          <Suspense fallback={<CanvasLoader />}>
            <CanvasLabel
              text="H y d r a"
              hex={
                focused === "hydra" ? "#f87171" : "#fca5a5"
              } /* brighter on focus */
              active={focused === "hydra"}
              hover={hovered}
              current={focused}
              hydraDOMWidth={canvasHydra}
              swerveCanvaWidth={canvasSwerve} // pass xOffset for
            />
            <ResetSide
              side="hydra"
              focus={focused}
              hover={hovered}
              ctrlRef={hydraCtrl}
            />
            <OrbitControls
              ref={hydraCtrl}
              enableRotate={focused === "hydra"}
              enableZoom={focused === "hydra"}
              enablePan={false}
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
              maxDistance={7}
            />
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, 10, 10]} intensity={1} />
            <directionalLight position={[0, -5, 0]} intensity={1.5} />

            <Hydra
              name="hydra"
              focused={focused === "hydra"}
              hovered={hovered === "hydra"}
              isLeft={false}
              config={ROBOT.hydra}
              hoverScale={VIEW.hoverScale}
              focusScale={VIEW.focusScale}
              animationSpeed={VIEW.animationSpeed}
              hydraDOMWidth={canvasHydra}
              playing={hydraPlaying}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* RESET BUTTON */}
      {focused && (
        <button
          onClick={() => {
            setFocused(null);
            setHovered(null);
            setHydraPlaying(false);
            setSwervePlaying(false);
          }}
          onMouseEnter={() => setHovered(focused)}
          onMouseLeave={() => setHovered(null)}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 cursor-pointer bg-slate-800/80 hover:bg-slate-700/80 text-white px-4 py-2 rounded-lg font-semibold"
        >
          ← Back to Both
        </button>
      )}
      {focused === "hydra" && (
        <button
          onClick={() => setHydraPlaying(!hydraPlaying)}
          onMouseEnter={() => setHovered("hydra")}
          onMouseLeave={() => setHovered(null)}
          className={`absolute bottom-10 left-3/4 -translate-x-1/2 z-50
      px-4 py-2 rounded-lg font-semibold transition text-white
      ${
        hydraPlaying
          ? "bg-red-500 hover:bg-red-600" // “Stop” (red tones)
          : "bg-red-300 hover:bg-red-400"
      }
      `}
        >
          {hydraPlaying ? "Stop Animation" : "Play Animation"}
        </button>
      )}
      {focused === "swerve" && (
        <button
          onClick={() => setSwervePlaying(!swervePlaying)}
          onMouseEnter={() => setHovered("swerve")}
          onMouseLeave={() => setHovered(null)}
          className={`absolute bottom-10 left-1/4 -translate-x-1/2 z-50 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold ${
            swervePlaying
              ? "bg-blue-500 hover:bg-blue-600" // “Stop” (red tones)
              : "bg-blue-300 hover:bg-blue-400"
          }
      `}
        >
          {swervePlaying ? "Stop Animation" : "Play Animation"}
        </button>
      )}
    </div>
  );
}

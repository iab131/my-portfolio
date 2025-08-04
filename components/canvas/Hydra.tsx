"use client";

import { useRef, useMemo, forwardRef, useEffect } from "react";
import { useFrame,useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";
import * as THREE from "three";
interface RobotConfig {
  defaultPosition: number[];
  defaultScale: number;
  defaultRotation: number[];
}

interface Props {
  name?: string;

  focused: boolean;
  hovered: boolean;
  isLeft: boolean;
  config: RobotConfig;
  hoverScale: number;
  focusScale: number;
  animationSpeed: number;
  hydraDOMWidth: number; // ← new
}

const Hydra = forwardRef<Group, Props>((props, ref) => {
  const {
    focused,
    hovered,
    isLeft,
    config,
    hoverScale,
    focusScale,
    animationSpeed,
    name = "hydra",
    hydraDOMWidth, // ← new
  } = props;

  const group = useRef<Group>(null);
  const { scene } = useGLTF("/Robotics/hydra-compressed-new.glb");
  const memoScene = useMemo(() => scene, [scene]);

  const tgtPos = useRef(new Vector3());
  const tgtScale = useRef(config.defaultScale);
  const delayDone = useRef(false);

  const { viewport, size } = useThree();
  const actualCanvaWidth = size.width + 12 ;
  const worldPerPixel = viewport.width / actualCanvaWidth;
  const offsetWorld =  ((actualCanvaWidth  - hydraDOMWidth) / 2) * worldPerPixel;
  
  useEffect(() => {
    if (focused) {
      delayDone.current = false; // reset flag
      const id = setTimeout(() => {
        delayDone.current = true; // enable after 1 s
      }, 1000);
      return () => clearTimeout(id); // cleanup
    } else {
      delayDone.current = false; // reset when unfocused
    }
  }, [focused]);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    if (focused) {
      tgtPos.current.set(0, -0.8, 0);
      tgtScale.current = 6.5;
    } else if (hovered) {
      tgtPos.current.set(0.4, 0, 0);
      tgtScale.current = 6;
    } else {
      tgtPos.current.set(...config.defaultPosition);
      tgtScale.current = 6;
    }
const pos = group.current.position;
pos.x = THREE.MathUtils.lerp(pos.x, -offsetWorld + tgtPos.current.x, animationSpeed);
pos.y = THREE.MathUtils.lerp(pos.y, tgtPos.current.y, animationSpeed);
pos.z = THREE.MathUtils.lerp(pos.z, tgtPos.current.z ?? 0, animationSpeed);

    group.current.position.lerp(tgtPos.current, animationSpeed);
    group.current.scale.lerp(
      new Vector3(tgtScale.current, tgtScale.current, tgtScale.current),
      animationSpeed
    );

    if (focused) {
      group.current.rotation.y += 0.003;
    } else {
      group.current.rotation.set(...config.defaultRotation);
    }

    if (hovered && !focused) {
      group.current.position.y = Math.sin(t * 2) * 0.1;
    } else {
      if (!focused)
      group.current.position.y = config.defaultPosition[1];
    }
  });

  return (
  <group ref={ref || group} position={[-offsetWorld/1.4, 0, 0]} name={name}>
    <primitive object={memoScene} />
  </group>
);

});

Hydra.displayName = "Hydra";
export default Hydra;

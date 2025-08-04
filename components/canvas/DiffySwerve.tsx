"use client";

import { useRef, useMemo, forwardRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";

interface RobotConfig {
  defaultPosition: number[];
  defaultScale: number;
  defaultRotation: number[];
}

interface Props {
  /* React-Three can store this name so SideResetter can find the mesh */
  name?: string;

  focused: boolean;
  hovered: boolean;
  isLeft: boolean;
  config: RobotConfig;
  hoverScale: number;
  focusScale: number;
  animationSpeed: number;
}

const DiffySwerve = forwardRef<Group, Props>((props, ref) => {
  const {
    focused,
    hovered,
    isLeft,
    config,
    hoverScale,
    focusScale,
    animationSpeed,
    name = "swerve",
  } = props;

  const group = useRef<Group>(null);
  const { scene } = useGLTF("/Robotics/diffy-swervy-compressed-new.glb");

  const memoScene = useMemo(() => scene, [scene]);

  const delayDone = useRef(false);
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


  const tgtPos = useRef(new Vector3());
  const tgtScale = useRef(config.defaultScale);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    /* choose target */
    if (focused) {
      tgtPos.current.set(0, 0, 0);
      tgtScale.current = focusScale;
    } else if (hovered) {
      tgtPos.current.set(-0.9, 0, 0);
      tgtScale.current = hoverScale;
    } else {
      tgtPos.current.set(...config.defaultPosition);
      tgtScale.current = config.defaultScale;
    }

    /* lerp */
    group.current.position.lerp(tgtPos.current, animationSpeed);
    group.current.scale.lerp(
      new Vector3(tgtScale.current, tgtScale.current, tgtScale.current),
      animationSpeed
    );

    /* rotation */
    if (focused) {
      group.current.rotation.y += 0.003;
    } else {
      group.current.rotation.set(...config.defaultRotation);
    }

    /* idle hover wiggle */
    if (hovered && !focused) {
      group.current.position.y = Math.sin(t * 2) * 0.1;
    } else {
      group.current.position.y = config.defaultPosition[1];
    }
  });

  return <primitive ref={ref || group} object={memoScene} name={name} />;
});

DiffySwerve.displayName = "DiffySwerve";
export default DiffySwerve;

"use client";

import { useRef, useMemo, forwardRef, useEffect, } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3, Object3D } from "three";

interface RobotConfig {
  defaultPosition: [number, number, number];
  defaultScale: number;
  defaultRotation: [number, number, number];
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
  playing?: boolean; // ← start/stop wheel spin
}

const DiffySwerve = forwardRef<Group, Props>((props, ref) => {
  const {
    focused,
    hovered,
    config,
    hoverScale,
    focusScale,
    animationSpeed,
    name = "swerve",
    playing = false,
  } = props;

  /* ---------- load model ---------- */
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/Robotics/diffy-swervy-compressed-new.glb");

  /* ---------- locate wheels once ---------- */
  const wheels = useRef<Object3D[]>([]);
  // After: const { scene } = useGLTF("/Robotics/diffy-swervy-compressed-new.glb");

  useEffect(() => {
    if (!scene) return;
    const names: string[] = [];
    scene.traverse((o) => names.push(o.name));
  }, [scene]);

  /* random rad/frame for each wheel (0.5–1.0 deg) */
  const speeds = useMemo<number[]>(
    () =>
      Array.from(
        { length: 8 },
        () => (Math.random() * 0.5 + 0.5) * (Math.PI / 180)
      ),
    []
  );

  /* ---------- position / scale / rotations ---------- */
  const tgtPos = useRef(new Vector3());
  const tgtScale = useRef(config.defaultScale);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    /* wheel spin while playing */
    if (playing) {
      wheels.current.forEach((w, i) => {
        w.rotation.y += speeds[i % speeds.length];
      });
    }

    /* focus / hover transforms */
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

    group.current.position.lerp(tgtPos.current, animationSpeed);
    group.current.scale.lerp(
      new Vector3(tgtScale.current, tgtScale.current, tgtScale.current),
      animationSpeed
    );

    /* base rotation */
    if (focused) {
      group.current.rotation.y += 0.003;
    } else {
      group.current.rotation.set(...config.defaultRotation);
    }

    /* idle wiggle */
    if (hovered && !focused) {
      group.current.position.y = Math.sin(t * 2) * 0.1;
    } else {
      group.current.position.y = config.defaultPosition[1];
    }
  });

  return <primitive ref={ref || group} object={scene} name={name} />;
});

DiffySwerve.displayName = "DiffySwerve";
export default DiffySwerve;

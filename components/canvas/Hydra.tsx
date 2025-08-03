"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

interface Props {
  focused: boolean;
}

export default function Hydra({ focused }: Props) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/Robotics/hydra-compressed-new.glb");

  useFrame(() => {
    if (focused && group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={group} object={scene} scale={5} position={[0, 0, 0]} />;
}

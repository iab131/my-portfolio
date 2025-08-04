// components/CanvasLabel.tsx
"use client";

import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type FocusedType = "swerve" | "hydra" | null;

export default function CanvasLabel({
  text,
  hex,
  active,
  hover,
  current,
  hydraDOMWidth,
  swerveCanvaWidth = 0, // new prop for x-offset
}: {
  text: string;
  hex: string;
  active: boolean;
  hover?: FocusedType;
  current?: FocusedType;
  hydraDOMWidth: number;
  swerveCanvaWidth?: number; // new prop for x-offset
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const { viewport, size } = useThree();
  const fontSize = hydraDOMWidth / 1000; // tweak factor to taste
  const actualCanvaWidth = size.width + 12 ;
  const ABOVE = 0; // y-pos when idle
  const BEHIND = -2; // y-pos when focused

  const worldPerPixel = viewport.width / actualCanvaWidth;

  const offsetWorld =  ((actualCanvaWidth  - hydraDOMWidth) / 2) * worldPerPixel;
  
  let z = 1,
    x = 0;
  if (text === "H y d r a") {   
    if (current === "hydra") {
        x = -offsetWorld;
    }
    else{
        x= -offsetWorld/1.4;
    }
    z = 2;
  }
  useFrame(({ clock }) => {
    if (!mesh.current) return;

    /* Slide to correct baseline + bobbing */
    const baseY = active ? BEHIND : ABOVE;
    let targetY = baseY;
    if (active) {
      targetY += Math.sin(clock.elapsedTime * 0.7) * 0.15;
    }
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      targetY,
      0.1
    );

    /* Pulse scale on focus */
    const targetScale = active ? 1.2 : 1;
    mesh.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    
    <Text
      ref={mesh}
      position={[x, active ? BEHIND : ABOVE, active ? -3 : z]}
      rotation={[-Math.PI / 9, 0, 0]}
      fontSize={active ? fontSize : fontSize }
      color={hex}
      anchorX="center"
      anchorY="middle"
      fillOpacity={0.7}
      // depthWrite={false}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789"
      lineHeight={1}
      whiteSpace="normal"
      textAlign="center"
    >
      {text.toUpperCase()}
    </Text>
  );
}

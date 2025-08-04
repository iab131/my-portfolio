"use client";

import { useRef, useMemo, forwardRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
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
  hydraDOMWidth: number;
  playing?: boolean;
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
    hydraDOMWidth,
    playing = false,
  } = props;

  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/Robotics/hydra-compressed-new.glb");
  const { actions , mixer} = useAnimations(animations, group);
  const memoScene = useMemo(() => scene, [scene]);
  
  /* play-direction stored in a ref → no state flip */
  const dirRef = useRef<1 | -1>(1);   // 1 = fwd, -1 = rev
  const tgtPos = useRef(new Vector3());
  const tgtScale = useRef(config.defaultScale);

  const { viewport, size } = useThree();
  const actualCanvaWidth = size.width + 12;
  const worldPerPixel = viewport.width / actualCanvaWidth;
  const offsetWorld = ((actualCanvaWidth - hydraDOMWidth) / 2) * worldPerPixel;
  
  /* ----------- one-shot effect: (re)play when `playing` flips ----- */
  useEffect(() => {
    if (!actions || !playing) return;

    const all = Object.values(actions).filter(Boolean);

    const playAll = () => {
      all.forEach((a) => {
        if (!a) return;
        const dur = a.getClip().duration;
        a.reset();
        a.setLoop(THREE.LoopOnce, 1);
        a.clampWhenFinished = true;
        a.time = dirRef.current === -1 ? dur : 0;
        a.setEffectiveTimeScale(dirRef.current);
        a.play();
      });
    };

    /* start the first pass */
    playAll();

    let done = 0;
    const onFinish = () => {
      if (++done === all.length) {
        done = 0;
        dirRef.current *= -1; // flip direction ↔
        queueMicrotask(playAll); // replay after paint
      }
    };

    mixer.addEventListener("finished", onFinish);
    return () => {
      mixer.removeEventListener("finished", onFinish);
      all.forEach((a) => a?.stop());
    };
  }, [playing, actions, mixer]);

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
    pos.x = THREE.MathUtils.lerp(
      pos.x,
      -offsetWorld + tgtPos.current.x,
      animationSpeed
    );
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
      if (!focused) group.current.position.y = config.defaultPosition[1];
    }
  });

  return (
    <group ref={ref || group} position={[-offsetWorld / 1.4, 0, 0]} name={name}>
      <primitive object={memoScene} />
    </group>
  );
});

Hydra.displayName = "Hydra";
export default Hydra;

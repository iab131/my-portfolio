"use client";

import {
  useRef, useMemo, forwardRef, useEffect
} from "react";
import { useFrame, useThree }      from "@react-three/fiber";
import { useGLTF, useAnimations }  from "@react-three/drei";
import * as THREE                 from "three";
import { Group, Vector3 }          from "three";

interface RobotConfig {
  defaultPosition: number[];
  defaultScale:   number;
  defaultRotation:number[];
}
interface Props {
  name?: string;
  focused:  boolean;
  hovered:  boolean;
  isLeft:   boolean;
  config:   RobotConfig;
  hoverScale:  number;
  focusScale:  number;
  animationSpeed:number;
  hydraDOMWidth:number;
  playing?: boolean; // external trigger
}

/* --------------------------------------------------------- */

const Hydra = forwardRef<Group, Props>((p, ref) => {
  const {
    focused, hovered, config,
    animationSpeed, name = "hydra",
    hydraDOMWidth, playing = false,
  } = p;

  /* load model + clips */
  const grp    = useRef<Group>(null);
  const { scene, animations } = useGLTF("/Robotics/hydra-compressed-new.glb");
  const { actions, mixer }    = useAnimations(animations, grp);
  const memoScene             = useMemo(() => scene, [scene]);

  /* play-direction stored in a ref → no state flip */
  const dirRef = useRef<1 | -1>(1);   // 1 = fwd, -1 = rev

  /* offset calc */
  const { viewport, size } = useThree();
  const offsetWorld = ((size.width + 12) - hydraDOMWidth) / 2
                    * (viewport.width / (size.width + 12));

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

  /* ----------- per-frame transforms ------------- */
  const tgtPos   = useRef(new Vector3());
  const tgtScale = useRef(config.defaultScale);

  useFrame(({ clock }) => {
    if (!grp.current) return;
    const t = clock.elapsedTime;

    /* choose target */
    if (focused) {
      tgtPos.current.set(-offsetWorld, -0.8, 0);
      tgtScale.current = 6.5;
    } else if (hovered) {
      tgtPos.current.set(0.4-offsetWorld, 0, 0);
      tgtScale.current = 6;
    } else {
      tgtPos.current.set(config.defaultPosition[0] - offsetWorld, config.defaultPosition[1], config.defaultPosition[2]);
      tgtScale.current = config.defaultScale;
    }

    /* single-lerp is enough */
    grp.current.position.lerp(tgtPos.current, animationSpeed);
    grp.current.scale.lerp(
      new Vector3(tgtScale.current, tgtScale.current, tgtScale.current),
      animationSpeed,
    );

    /* spin + wiggle */
    if (focused) grp.current.rotation.y += 0.003;
    else         grp.current.rotation.set(...config.defaultRotation);

    grp.current.position.y =
      hovered && !focused ? Math.sin(t * 2) * 0.1 : config.defaultPosition[1];
  });

  /* ----------- render ------------- */
  return (
    <group
      ref={ref || grp}
      position={[-offsetWorld / 1.4, 0, 0]}
      name={name}
    >
      <primitive object={memoScene} />
    </group>
  );
});

Hydra.displayName = "Hydra";
export default Hydra;

// 'use client';

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// export default function ThreeModelViewer({ modelPath }: { modelPath: string }) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current!;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
//     camera.position.set(0, 2, 5);

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     container.appendChild(renderer.domElement);

//     const light = new THREE.HemisphereLight(0xffffff, 0x444444);
//     scene.add(light);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;

//     const loader = new GLTFLoader();
//     loader.load(modelPath, gltf => {
//       scene.add(gltf.scene);
//     });

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       container.removeChild(renderer.domElement);
//     };
//   }, [modelPath]);

//   return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
// }

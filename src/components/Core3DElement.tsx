"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function SpinningCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 1]} scale={1.8}>
      <meshBasicMaterial 
        color="#06b6d4" 
        wireframe 
        transparent 
        opacity={0.8}
      />
    </Icosahedron>
  );
}

export default function Core3DElement() {
  return (
    <div className="w-16 h-16 relative flex items-center justify-center">
      {/* Fallback glow behind the 3D object */}
      <div className="absolute inset-0 bg-tech-cyan rounded-full animate-ping opacity-20"></div>
      
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <SpinningCore />
      </Canvas>
    </div>
  );
}

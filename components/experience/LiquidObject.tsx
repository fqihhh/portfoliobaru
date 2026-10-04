"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";

export default function LiquidObject() {
  const meshRef =
    useRef<THREE.Mesh>(null);

  const innerRef =
    useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const t =
      state.clock.elapsedTime;

    meshRef.current.rotation.x +=
      delta * 0.08;

    meshRef.current.rotation.y +=
      delta * 0.14;

    meshRef.current.rotation.z =
      Math.sin(t * 0.35) * 0.08;

    const scale =
      1 + Math.sin(t * 0.8) * 0.035;

    meshRef.current.scale.setScalar(
      scale
    );

    if (innerRef.current) {
      innerRef.current.rotation.x +=
        delta * 0.25;

      innerRef.current.rotation.y +=
        delta * 0.4;
    }
  });

  return (
    <group>

      <mesh ref={meshRef}>

        <icosahedronGeometry
          args={[1.35, 5]}
        />

        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={512}
          thickness={0.9}
          chromaticAberration={0.3}
          anisotropy={0.25}
          distortion={0.35}
          distortionScale={0.45}
          temporalDistortion={0.18}
          ior={1.42}
          roughness={0.045}
          color="#ffffff"
          attenuationDistance={1.3}
          attenuationColor="#6878ff"
        />

      </mesh>

      <mesh ref={innerRef}>

        <icosahedronGeometry
          args={[0.48, 3]}
        />

        <meshStandardMaterial
          color="#8a9aff"
          emissive="#5267ff"
          emissiveIntensity={1.4}
          roughness={0.18}
          metalness={0.2}
        />

      </mesh>

    </group>
  );
}
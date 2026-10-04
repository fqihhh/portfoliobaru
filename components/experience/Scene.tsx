"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
} from "@react-three/drei";

import LiquidObject from "./LiquidObject";
import CameraRig from "./CameraRig";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{
        position: [0, 0, 5.5],
        fov: 42,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {/* BASE LIGHT */}
      <ambientLight intensity={0.3} />

      {/* KEY LIGHT */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
      />

      {/* BLUE RIM */}
      <directionalLight
        position={[-5, 1, -4]}
        intensity={1.8}
        color="#5367ff"
      />

      {/* SOFT FRONT LIGHT */}
      <pointLight
        position={[0, 2, 4]}
        intensity={2}
        distance={8}
        color="#ffffff"
      />

      {/* ENVIRONMENT */}
      <Environment preset="city" environmentIntensity={0.7} />

      {/* CAMERA INTERACTION */}
      <CameraRig />

      {/* MAIN OBJECT */}
      <Float
        speed={1.15}
        rotationIntensity={0.18}
        floatIntensity={0.3}
      >
        <group scale={0.72}>
          <LiquidObject />
        </group>
      </Float>
    </Canvas>
  );
}
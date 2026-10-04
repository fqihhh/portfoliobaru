"use client";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import { useEffect, useRef } from "react";

import * as THREE from "three";

export default function CameraRig() {

  const { camera } = useThree();

  const mouse =
    useRef(
      new THREE.Vector2()
    );

  useEffect(() => {

    const move = (
      e: MouseEvent
    ) => {

      mouse.current.x =
        (e.clientX /
          window.innerWidth -
          0.5) * 2;

      mouse.current.y =
        (e.clientY /
          window.innerHeight -
          0.5) * 2;

    };

    window.addEventListener(
      "mousemove",
      move
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );

  }, []);

  useFrame(() => {

    const targetX =
      mouse.current.x * 0.35;

    const targetY =
      -mouse.current.y * 0.2;

    camera.position.x +=
      (targetX -
        camera.position.x) *
      0.035;

    camera.position.y +=
      (targetY -
        camera.position.y) *
      0.035;

    camera.lookAt(
      0,
      0,
      0
    );

  });

  return null;
}
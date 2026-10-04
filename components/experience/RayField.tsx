"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const COUNT = 72;

export default function RayField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;

    if (!field) return;

    const lines =
      field.querySelectorAll<HTMLElement>(".ray-line");

    const handleMouse = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      gsap.to(field, {
        x: x * 25,
        y: y * 18,
        rotateX: y * -3,
        rotateY: x * 4,
        duration: 1.4,
        ease: "power3.out",
      });

      gsap.to(lines, {
        opacity: (index) =>
          0.12 +
          Math.abs(
            Math.sin(index * 0.35 + x * 3)
          ) *
            0.4,
        duration: 1.2,
        stagger: 0.006,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouse);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        {
          scaleY: 0,
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: (index) =>
            0.12 +
            Math.abs(Math.sin(index * 0.35)) * 0.4,
          duration: 1.8,
          stagger: {
            each: 0.012,
            from: "center",
          },
          ease: "power4.out",
        }
      );
    }, field);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={fieldRef} className="ray-system">
      {Array.from({ length: COUNT }).map((_, index) => {
        const angle = (360 / COUNT) * index;

        const length =
          35 + ((index * 19) % 55);

        return (
          <span
            key={index}
            className="ray-line"
            style={{
              transform: `rotate(${angle}deg)`,
              height: `${length}vh`,
            }}
          />
        );
      })}

      <div className="ray-center" />
    </div>
  );
}
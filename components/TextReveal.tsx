"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  className?: string;
};

export default function TextReveal({
  children,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll(".reveal-char");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          y: "110%",
          rotateX: -90,
          opacity: 0,
        },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.025,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children.split("").map((char, i) => (
        <span
          key={i}
          className="reveal-char"
          style={{
            display: "inline-block",
            whiteSpace:
              char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
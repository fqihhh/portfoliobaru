"use client";

import {
  useEffect,
  useRef,
  ReactNode,
} from "react";

import gsap from "gsap";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.5,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(el, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const enter = () => {
      gsap.to(el, {
        scale: 1.08,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const x =
        e.clientX -
        (rect.left + rect.width / 2);

      const y =
        e.clientY -
        (rect.top + rect.height / 2);

      xTo(x * strength);
      yTo(y * strength);
    };

    const leave = () => {
      xTo(0);
      yTo(0);

      gsap.to(el, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={className}
      data-cursor="hover"
    >
      {children}
    </div>
  );
}
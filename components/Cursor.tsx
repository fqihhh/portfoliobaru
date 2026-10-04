"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const follower = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const c = cursor.current;
    const f = follower.current;
    if (!c || !f) return;

    const cx = gsap.quickTo(c, "x", {
      duration: 0.08,
      ease: "power3.out",
    });

    const cy = gsap.quickTo(c, "y", {
      duration: 0.08,
      ease: "power3.out",
    });

    const fx = gsap.quickTo(f, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const fy = gsap.quickTo(f, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const move = (e: MouseEvent) => {
      cx(e.clientX);
      cy(e.clientY);
      fx(e.clientX);
      fy(e.clientY);
    };

    const enter = (e: MouseEvent) => {
      const target = (
        e.target as HTMLElement
      ).closest("[data-cursor]");

      if (!target) return;

      const type =
        target.getAttribute("data-cursor");

      gsap.to(f, {
        scale:
          type === "view"
            ? 3
            : type === "text"
              ? 1.5
              : 2,
        background:
          type === "view"
            ? "#fff"
            : "transparent",
        duration: 0.35,
      });

      if (label.current) {
        label.current.textContent =
          target.getAttribute(
            "data-cursor-label"
          ) || "VIEW";
      }
    };

    const leave = () => {
      gsap.to(f, {
        scale: 1,
        background: "transparent",
        duration: 0.35,
      });

      if (label.current) {
        label.current.textContent = "";
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  return (
    <>
      <div ref={cursor} className="cursor-dot" />

      <div ref={follower} className="cursor-follower">
        <span ref={label} />
      </div>
    </>
  );
}
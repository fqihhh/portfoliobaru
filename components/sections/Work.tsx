"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "TUGAS REACT",
    type: "FRONTEND",
    year: "2026",
    color: "#3048ff",
  },
  {
    number: "02",
    title: "SANTRI APP",
    type: "PRODUCT",
    year: "2026",
    color: "#aaff2f",
  },
  {
    number: "03",
    title: "MOTION LAB",
    type: "INTERACTION",
    year: "2026",
    color: "#ff496c",
  },
  {
    number: "04",
    title: "ARSYAD",
    type: "EXPERIMENTAL",
    year: "2026",
    color: "#d8c15a",
  },
];

export default function Work() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!section.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".work-intro", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 70%",
        },
      });

      gsap.from(".project-row-max", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".project-list-max",
          start: "top 80%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="work"
      className="bg-[#03052d] px-6 py-32 md:px-10 md:py-52"
    >
      <div className="work-intro mb-24">
        <p className="mono mb-6 text-xs text-white/30">
          002 — SELECTED WORK
        </p>

        <h2 className="work-heading">
          SELECTED
          <br />
          WORK
        </h2>
      </div>

      <div className="project-list-max">
        {projects.map((project) => (
          <a
            href="#"
            key={project.number}
            className="project-row-max group relative grid min-h-[170px] grid-cols-[50px_1fr_auto] items-center gap-4 border-t border-white/10 py-5 transition-all duration-500 md:min-h-[220px] md:grid-cols-[100px_1fr_180px_70px] md:px-5"
          >
            <span className="mono text-xs text-white/30">
              {project.number}
            </span>

            <h3 className="text-[8vw] font-black tracking-[-0.075em] transition-transform duration-500 group-hover:translate-x-4 md:text-[5.3vw]">
              {project.title}
            </h3>

            <span className="mono hidden text-[9px] text-white/30 md:block">
              {project.type}
            </span>

            <span className="mono text-xs text-white/30">
              {project.year}
            </span>

            <div
              className="pointer-events-none absolute left-[35%] top-1/2 hidden h-20 w-20 -translate-y-1/2 rounded-full opacity-0 transition-all duration-500 group-hover:scale-[2.2] group-hover:opacity-100 md:block"
              style={{
                background: project.color,
                filter: "blur(1px)",
              }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
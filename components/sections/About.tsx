// components/sections/About.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Scene from "../experience/Scene";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const words =
        section.querySelectorAll<HTMLElement>(".about-word");

      if (words.length) {
        gsap.fromTo(
          words,
          {
            yPercent: 120,
            opacity: 0,
            rotateX: 70,
          },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      const description =
        section.querySelector<HTMLElement>(".about-description");

      if (description) {
        gsap.fromTo(
          description,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              once: true,
            },
          }
        );
      }

      const hudElements =
        section.querySelectorAll<HTMLElement>(
          ".about-label, .about-top-right, .about-mini, .about-visual-label, .about-bottom"
        );

      if (hudElements.length) {
        gsap.fromTo(
          hudElements,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      const stats =
        section.querySelectorAll<HTMLElement>(".about-stat");

      if (stats.length) {
        gsap.fromTo(
          stats,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              once: true,
            },
          }
        );
      }

      const object =
        section.querySelector<HTMLElement>(".about-3d");

      if (object) {
        gsap.fromTo(
          object,
          {
            opacity: 0,
            scale: 0.65,
            rotate: -12,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );

        gsap.to(object, {
          y: -100,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      const grid =
        section.querySelector<HTMLElement>(".about-grid");

      if (grid) {
        gsap.to(grid, {
          yPercent: 25,
          rotate: 4,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      const number =
        section.querySelector<HTMLElement>(".about-number");

      if (number) {
        gsap.to(number, {
          xPercent: -25,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      const orbit =
        section.querySelector<HTMLElement>(".about-orbit");

      if (orbit) {
        gsap.to(orbit, {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: "none",
        });
      }

      const scanLine =
        section.querySelector<HTMLElement>(".about-scan-line");

      if (scanLine) {
        gsap.to(scanLine, {
          xPercent: 120,
          duration: 2.5,
          repeat: -1,
          ease: "power2.inOut",
        });
      }
    }, section);

    const object =
      section.querySelector<HTMLElement>(".about-3d");

    const orbit =
      section.querySelector<HTMLElement>(".about-orbit");

    const grid =
      section.querySelector<HTMLElement>(".about-grid");

    const handleMouse = (event: MouseEvent) => {
      const x =
        event.clientX / window.innerWidth - 0.5;

      const y =
        event.clientY / window.innerHeight - 0.5;

      if (object) {
        gsap.to(object, {
          x: x * 35,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      if (orbit) {
        gsap.to(orbit, {
          x: x * -25,
          y: y * -20,
          duration: 1.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      if (grid) {
        gsap.to(grid, {
          x: x * 15,
          y: y * 15,
          duration: 1.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      if (object) {
        gsap.to(object, {
          x: 0,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      if (orbit) {
        gsap.to(orbit, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      if (grid) {
        gsap.to(grid, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouse);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      section.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-max"
    >
      <div className="about-bg" />

      <div className="about-grid">
        <div className="about-grid-lines" />
      </div>

      <div className="about-glow about-glow-one" />
      <div className="about-glow about-glow-two" />

      <div className="about-top">
        <div className="about-label">
          <span className="about-live-dot" />
          <span>003 — ABOUT ARSYAD</span>
        </div>

        <div className="about-top-right">
          <span>PROFILE / 03</span>
          <span>SCROLL SYSTEM ACTIVE</span>
        </div>
      </div>

      <div className="about-main">
        <div className="about-copy">
          <div className="about-mini">
            <span>01</span>
            <span className="about-mini-line" />
            <span>IDENTITY</span>
          </div>

          <h2 className="about-title">
            <span className="about-word">
              I BUILD
            </span>

            <span className="about-word about-outline">
              DIGITAL
            </span>

            <span className="about-word">
              WORLDS.
            </span>
          </h2>

          <div className="about-description">
            <div className="about-description-line" />

            <p>
              I'm Arsyad — a creative developer
              interested in frontend development,
              interaction, motion and experimental
              digital experiences.
            </p>

            <p className="about-description-small">
              I like turning ideas into interfaces
              that feel alive instead of simply
              sitting on a screen.
            </p>
          </div>
        </div>

        <div className="about-visual">
          <div className="about-orbit">
            <span />
            <span />
            <span />
          </div>

          <div className="about-3d">
            <Scene />
          </div>

          <div className="about-visual-label">
            <span>OBJECT_03</span>
            <span>INTERACTIVE FORM</span>
          </div>

          <div className="about-scan">
            <span className="about-scan-line" />
          </div>
        </div>
      </div>

      <div className="about-stats">
        <div className="about-stat">
          <strong>01</strong>
          <span>DEVELOPER</span>
        </div>

        <div className="about-stat">
          <strong>∞</strong>
          <span>EXPERIMENTS</span>
        </div>

        <div className="about-stat">
          <strong>03</strong>
          <span>CORE SKILLS</span>
        </div>

        <div className="about-stat">
          <strong>26</strong>
          <span>EDITION</span>
        </div>
      </div>

      <div className="about-bottom">
        <span>FRONTEND</span>

        <div className="about-bottom-line">
          <span />
        </div>

        <span>MOTION</span>

        <div className="about-bottom-line">
          <span />
        </div>

        <span>WEBGL</span>
      </div>

      <div className="about-number">
        03
      </div>
    </section>
  );
}


"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Scene from "../experience/Scene";
import Magnetic from "../Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const coords = coordsRef.current;

    if (!section || !coords) return;

    const ctx = gsap.context(() => {
      /* =========================
         INTRO
      ========================= */

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });

      intro
        .fromTo(
          ".contact-kicker",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        )
        .fromTo(
          ".contact-word",
          {
            yPercent: 120,
            rotateX: 70,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.25,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .fromTo(
          ".contact-copy",
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .fromTo(
          ".contact-orbit",
          {
            opacity: 0,
            scale: 0.5,
            rotate: -30,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.6,
            ease: "expo.out",
          },
          "-=1"
        );

      /* =========================
         BIG TEXT PARALLAX
      ========================= */

      gsap.to(".contact-title", {
        yPercent: -18,
        xPercent: -3,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* =========================
         3D PARALLAX
      ========================= */

      gsap.to(".contact-3d", {
        y: -150,
        rotate: 10,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* =========================
         BACKGROUND NUMBER
      ========================= */

      gsap.to(".contact-number", {
        xPercent: -30,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* =========================
         GRID
      ========================= */

      gsap.to(".contact-grid", {
        yPercent: 18,
        rotate: -4,
        scale: 1.12,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* =========================
         ORBIT
      ========================= */

      gsap.to(".contact-orbit", {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      /* =========================
         SCAN
      ========================= */

      gsap.to(".contact-scan-beam", {
        xPercent: 500,
        duration: 3,
        repeat: -1,
        ease: "power2.inOut",
      });

      /* =========================
         FLOATING PARTICLES
      ========================= */

      gsap.to(".contact-particle", {
        y: -35,
        opacity: 0.15,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.25,
          from: "random",
        },
        ease: "sine.inOut",
      });

      /* =========================
         CTA GLOW
      ========================= */

      gsap.to(".contact-cta-ring", {
        scale: 1.12,
        opacity: 0.35,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    /* =========================
       MOUSE PARALLAX
    ========================= */

    const handleMouse = (event: MouseEvent) => {
      const x =
        event.clientX / window.innerWidth - 0.5;

      const y =
        event.clientY / window.innerHeight - 0.5;

      coords.textContent =
        `${String(Math.round(event.clientX)).padStart(4, "0")} / ` +
        `${String(Math.round(event.clientY)).padStart(4, "0")}`;

      gsap.to(".contact-3d", {
        x: x * 55,
        y: y * 35,
        rotationY: x * 10,
        rotationX: -y * 8,
        duration: 1.3,
        ease: "power3.out",
      });

      gsap.to(".contact-orbit", {
        x: x * -30,
        y: y * -20,
        duration: 1.5,
        ease: "power3.out",
      });

      gsap.to(".contact-title", {
        x: x * 12,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.to(".contact-light", {
        x: event.clientX,
        y: event.clientY,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.to(".contact-crosshair", {
        x: event.clientX,
        y: event.clientY,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouse
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-max"
    >
      {/* =================================
          BACKGROUND
      ================================= */}

      <div className="contact-background" />

      <div className="contact-grid">
        <div className="contact-grid-lines" />
      </div>

      <div className="contact-vignette" />

      <div className="contact-light" />

      {/* =================================
          PARTICLES
      ================================= */}

      <div className="contact-particles">
        {Array.from({ length: 22 }).map((_, index) => (
          <span
            key={index}
            className="contact-particle"
            style={{
              left: `${8 + ((index * 37) % 88)}%`,
              top: `${8 + ((index * 61) % 82)}%`,
              animationDelay: `${index * 0.12}s`,
            }}
          />
        ))}
      </div>

      {/* =================================
          CURSOR CROSSHAIR
      ================================= */}

      <div className="contact-crosshair">
        <span />
        <i />
      </div>

      {/* =================================
          TOP HUD
      ================================= */}

      <header className="contact-header">
        <div className="contact-kicker">
          <span className="contact-live-dot" />
          <span>004 — CONTACT</span>
        </div>

        <div className="contact-header-center">
          <span>FINAL SEQUENCE</span>
        </div>

        <div className="contact-header-right">
          <span>LET'S MAKE SOMETHING</span>
          <span>EXTRAORDINARY</span>
        </div>
      </header>

      {/* =================================
          MAIN
      ================================= */}

      <div className="contact-main">
        {/* LEFT / TYPOGRAPHY */}

        <div className="contact-content">
          <div className="contact-mini">
            <span>04</span>

            <span className="contact-mini-line" />

            <span>FINAL TRANSMISSION</span>
          </div>

          <h2 className="contact-title">
            <span className="contact-word">
              LET'S
            </span>

            <span className="contact-word contact-word-muted">
              MAKE
            </span>

            <span className="contact-word">
              NOISE.
            </span>
          </h2>

          <div className="contact-copy">
            <p>
              Have an idea, experiment or digital
              experience in mind?
            </p>

            <p className="contact-copy-small">
              Let's turn it into something people
              remember.
            </p>

            <div className="contact-actions">
              <Magnetic strength={0.3}>
                <a
                  href="#top"
                  className="contact-cta"
                >
                  <span>START A PROJECT</span>
                  <span className="contact-cta-arrow">
                    ↗
                  </span>

                  <span className="contact-cta-ring" />
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#work"
                  className="contact-secondary"
                >
                  VIEW SELECTED WORK
                  <span>↗</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* RIGHT / 3D */}

        <div className="contact-visual">
          <div className="contact-orbit">
            <span />
            <span />
            <span />
          </div>

          <div className="contact-orbit-two" />

          <div className="contact-3d">
            <Scene />
          </div>

          <div className="contact-object-label">
            <span>FINAL_OBJECT</span>
            <span>GLASS / MOTION / WEBGL</span>
            <span>STATUS: ACTIVE</span>
          </div>

          <div className="contact-scan">
            <span className="contact-scan-beam" />
          </div>
        </div>
      </div>

      {/* =================================
          BOTTOM HUD
      ================================= */}

      <div className="contact-bottom">
        <div className="contact-coordinates">
          <span>CURSOR</span>
          <span ref={coordsRef}>
            0000 / 0000
          </span>
        </div>

        <div className="contact-scroll-state">
          <span>END OF EXPERIENCE</span>

          <div className="contact-progress">
            <span />
          </div>

          <span>04 / 04</span>
        </div>

        <div className="contact-location">
          <span>ARSYAD</span>
          <span>INDONESIA / 2026</span>
        </div>
      </div>

      {/* =================================
          GIANT BACKGROUND NUMBER
      ================================= */}

      <div className="contact-number">
        04
      </div>

      {/* =================================
          FOOTER
      ================================= */}

      <footer className="contact-footer">
        <span>© 2026 ARSYAD FAQIH ALHISYAMI</span>

        <span>CREATIVE DEVELOPER</span>

        <span>BUILT WITH CURIOSITY</span>
      </footer>
    </section>
  );
}
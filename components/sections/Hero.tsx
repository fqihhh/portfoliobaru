"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import Scene from "../experience/Scene";
import RayField from "../experience/RayField";
import Magnetic from "../Magnetic";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const meta = metaRef.current;
    const orb = orbRef.current;
    const coords = coordsRef.current;

    if (!hero || !title || !meta || !orb || !coords) return;

    const ctx = gsap.context(() => {
      // INTRO
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        ".hero-top",
        {
          y: -30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
        }
      )
        .fromTo(
          title.querySelectorAll(".hero-word"),
          {
            yPercent: 120,
            rotateX: 45,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
          },
          "-=0.65"
        )
        .fromTo(
          meta,
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.7"
        )
        .fromTo(
          orb,
          {
            scale: 0.5,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
          },
          "-=1"
        );

      // SCROLL ANIMATION
      gsap.to(".hero-content", {
        yPercent: -25,
        opacity: 0.2,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "70% top",
          scrub: 1,
        },
      });

      gsap.to(".hero-orb", {
        scale: 1.35,
        y: -120,
        rotation: 18,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "100% top",
          scrub: 1.5,
        },
      });

      gsap.to(".hero-grid", {
        scale: 1.2,
        opacity: 0.15,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "100% top",
          scrub: 1,
        },
      });

      gsap.to(".hero-scroll", {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "25% top",
          scrub: true,
        },
      });
    }, hero);

    // COORDINATES
    const handleMouse = (e: MouseEvent) => {
      coords.textContent = `${String(Math.round(e.clientX)).padStart(
        4,
        "0"
      )} / ${String(Math.round(e.clientY)).padStart(4, "0")}`;

      gsap.to(".hero-light", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="arsyad-hero">
      {/* BACKGROUND */}
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-noise" />

      {/* MOUSE LIGHT */}
      <div className="hero-light" />

      {/* RAYS */}
      <div className="hero-rays">
        <RayField />
      </div>

      {/* 3D OBJECT */}
      <div ref={orbRef} className="hero-orb">
        <Scene />
      </div>

      {/* TOP NAV */}
      <header className="hero-top">
        <div className="hero-brand">
          <span className="brand-dot" />
          <span>ARSYAD</span>
          <span className="brand-year">©26</span>
        </div>

        <div className="hero-status">
          <span className="status-dot" />
          <span>AVAILABLE FOR WORK</span>
        </div>

        <div className="hero-index">
          <span>01</span>
          <span className="index-line" />
          <span>04</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="hero-content">
        <div className="hero-kicker">
          <span>CREATIVE DEVELOPER</span>
          <span>BASED IN INDONESIA</span>
        </div>

        <h1 ref={titleRef} className="hero-title">
          <span className="hero-word">DIGITAL</span>
          <span className="hero-word hero-title-outline">
            EXPERIENCES
          </span>
          <span className="hero-word hero-title-small">
            BUILT WITH INTENTION.
          </span>
        </h1>

        <div ref={metaRef} className="hero-meta">
          <p>
            I design and build interactive digital experiences
            <br />
            where code, motion and visual direction meet.
          </p>

          <Magnetic strength={0.25}>
            <a href="#work" className="hero-cta">
              <span>EXPLORE WORK</span>
              <span className="hero-arrow">↗</span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* SIDE HUD */}
      <div className="hero-side-left">
        <span>INTERFACE / 001</span>
        <span>WEBGL / MOTION / UI</span>
        <span>SCROLL TO EXPLORE</span>
      </div>

      <div className="hero-side-right">
        <span>LAT 06°10' S</span>
        <span>LON 106°49' E</span>
      </div>

      {/* BOTTOM */}
      <div className="hero-bottom">
        <div className="hero-coordinates">
          <span>CURSOR</span>
          <span ref={coordsRef}>0000 / 0000</span>
        </div>

        <div className="hero-scroll">
          <span>SCROLL</span>

          <div className="scroll-line">
            <span />
          </div>

          <span>01 — 04</span>
        </div>

        <div className="hero-time">
          <span>LOCAL TIME</span>
          <span>09:24:26</span>
        </div>
      </div>

      {/* BIG BACKGROUND NUMBER */}
      <div className="hero-number">01</div>
    </section>
  );
}
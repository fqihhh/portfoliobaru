"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Preloader() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".preloader");
    if (!root) return;

    const counter = { value: 0 };
    const number = root.querySelector<HTMLElement>(".preloader-number");
    const bar = root.querySelector<HTMLElement>(".preloader-progress-bar");
    const status = root.querySelector<HTMLElement>(".preloader-status-text");
    const ready = root.querySelector<HTMLElement>(".preloader-ready");

    if (!number || !bar || !status || !ready) return;

    const labels = [
      "INITIALIZING EXPERIENCE",
      "LOADING VISUAL SYSTEM",
      "BUILDING INTERACTION",
      "CONNECTING MOTION",
      "PREPARING DIGITAL SPACE",
      "WELCOME TO ARSYAD",
    ];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".preloader-grid", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(
          ".preloader-top > *",
          {
            opacity: 0,
            y: -14,
            stagger: 0.08,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".preloader-name-line",
          {
            yPercent: 115,
            rotateX: -75,
            stagger: 0.1,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.25"
        )
        .from(
          ".preloader-meta",
          {
            opacity: 0,
            y: 15,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .to(counter, {
          value: 100,
          duration: 2.4,
          ease: "power2.inOut",
          onUpdate: () => {
            const value = Math.round(counter.value);
            number.textContent = String(value).padStart(3, "0");
            bar.style.transform = `scaleX(${value / 100})`;
            status.textContent = labels[Math.min(labels.length - 1, Math.floor(value / 18))];
          },
        })
        .to(number, {
          color: "#5367ff",
          scale: 1.08,
          duration: 0.25,
          ease: "power3.out",
        })
        .to(status, { opacity: 0, duration: 0.15 }, "<")
        .to(ready, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
        })
        .to(".preloader-flash", {
          scaleY: 1,
          duration: 0.65,
          ease: "power4.inOut",
        }, "+=0.25")
        .to(root, {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        }, "-=0.05")
        .set(root, { display: "none" });

      return () => tl.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="preloader">
      <div className="preloader-grid" />
      <div className="preloader-noise" />

      <header className="preloader-top">
        <div className="preloader-logo">
          ARSYAD<span>©26</span>
        </div>
        <div className="preloader-top-center">DIGITAL / CREATIVE</div>
        <div className="preloader-top-right">
          <span>INDONESIA</span>
          <span>JKT / 07:00</span>
        </div>
      </header>

      <main className="preloader-center">
        <div className="preloader-small">PORTFOLIO / EXPERIENCE</div>

        <div className="preloader-name">
          <div className="preloader-name-line">ARSYAD</div>
          <div className="preloader-name-line">FAQIH</div>
        </div>

        <div className="preloader-meta">
          <span>CREATIVE<br />DEVELOPER</span>
          <span>DESIGN<br />CODE<br />MOTION</span>
        </div>
      </main>

      <div className="preloader-counter">
        <span className="preloader-number">000</span>
        <span className="preloader-percent">%</span>
      </div>

      <footer className="preloader-bottom">
        <div className="preloader-status">
          <span className="preloader-status-index">SYSTEM / 001</span>
          <span className="preloader-status-text">INITIALIZING EXPERIENCE</span>
          <span className="preloader-ready">EXPERIENCE READY</span>
        </div>

        <div className="preloader-progress-wrap">
          <div className="preloader-progress">
            <div className="preloader-progress-bar" />
          </div>
        </div>

        <div className="preloader-location">
          <span>SCROLL</span>
          <span>TO EXPLORE</span>
        </div>
      </footer>

      <div className="preloader-flash" />
    </div>
  );
}

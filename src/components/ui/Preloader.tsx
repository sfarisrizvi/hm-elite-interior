"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress tied to page readiness
    const tl = gsap.timeline();

    // Animate progress to 90% quickly, then slow crawl to completion
    tl.to(
      { val: 0 },
      {
        val: 90,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      }
    );

    const handleLoad = () => {
      tl.to(
        { val: 90 },
        {
          val: 100,
          duration: 0.4,
          ease: "power1.in",
          onUpdate: function () {
            setProgress(Math.round(this.targets()[0].val));
          },
          onComplete: () => {
            // Reveal the page
            gsap.to(preloaderRef.current, {
              yPercent: -100,
              duration: 0.8,
              ease: "power3.inOut",
              delay: 0.3,
              onComplete: () => {
                if (preloaderRef.current) {
                  preloaderRef.current.style.display = "none";
                }
              },
            });
          },
        }
      );
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      tl.kill();
    };
  }, []);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Architectural line drawing animation */}
      <div className="preloader-logo" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Image
          src="/logo.png"
          alt="HM Elite Interiors"
          width={64}
          height={64}
          style={{ objectFit: "contain" }}
        />
        <span>HM <span style={{ color: "var(--accent)" }}>ELITE</span></span>
      </div>

      {/* Blueprint line animation */}
      <svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        style={{ marginBottom: 40, opacity: 0.6 }}
      >
        <path
          d="M10 70 L10 20 L60 5 L110 20 L110 70 Z"
          stroke="var(--accent)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="300"
          strokeDashoffset="300"
          style={{ animation: "drawLine 2s ease forwards" }}
        />
        <path
          d="M40 70 L40 45 L80 45 L80 70"
          stroke="var(--accent)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="120"
          strokeDashoffset="120"
          style={{ animation: "drawLine 2s ease 0.5s forwards" }}
        />
        <path
          d="M20 40 L20 35 L35 35 L35 40"
          stroke="var(--accent)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="50"
          strokeDashoffset="50"
          style={{ animation: "drawLine 1.5s ease 0.8s forwards" }}
        />
        <path
          d="M85 40 L85 35 L100 35 L100 40"
          stroke="var(--accent)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="50"
          strokeDashoffset="50"
          style={{ animation: "drawLine 1.5s ease 1s forwards" }}
        />
      </svg>

      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="preloader-bar-track">
        <div
          ref={fillRef}
          className="preloader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="preloader-percent">{progress}%</div>
    </div>
  );
}

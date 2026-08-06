"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Bespoke lamp pull-cord theme toggle.
 * Approach A (PRD §4.4): Authored pull animation with elastic snapback.
 */
export function LampToggle() {
  const [isDark, setIsDark] = useState(true);
  const cordRef = useRef<SVGPathElement>(null);
  const knobRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Check initial theme
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme !== "light");
  }, []);

  const toggleTheme = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const newIsDark = !isDark;
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // 1. Pull the cord down
    tl.to(knobRef.current, {
      y: 16,
      duration: 0.2,
      ease: "power2.in",
    });

    // 2. Cord stretches
    tl.to(
      cordRef.current,
      {
        attr: { d: "M20 0 L20 38 Q20 44 20 48" },
        duration: 0.2,
        ease: "power2.in",
      },
      "<"
    );

    // 3. Snap back with elastic ease
    tl.to(knobRef.current, {
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });

    tl.to(
      cordRef.current,
      {
        attr: { d: "M20 0 L20 28 Q20 34 20 38" },
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      },
      "<"
    );

    // 4. At the snap point, switch the theme
    tl.call(
      () => {
        if (newIsDark) {
          document.documentElement.removeAttribute("data-theme");
          localStorage.setItem("hm-theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("hm-theme", "light");
        }
        setIsDark(newIsDark);
      },
      [],
      0.3
    );

    // 5. Glow animation
    tl.to(
      glowRef.current,
      {
        opacity: newIsDark ? 0.3 : 0.8,
        r: newIsDark ? 6 : 10,
        duration: 0.6,
        ease: "power2.out",
      },
      0.3
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="lamp-toggle"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 96,
        position: "relative",
      }}
    >
      <svg width="44" height="92" viewBox="0 0 44 92" fill="none">
        {/* Bulb glow */}
        <circle
          ref={glowRef}
          cx="22"
          cy="8"
          r={isDark ? 6 : 11}
          fill="var(--accent)"
          opacity={isDark ? 0.35 : 0.85}
          style={{ filter: "blur(4px)" }}
        />
        {/* Bulb body */}
        <circle
          cx="22"
          cy="8"
          r="5.5"
          fill={isDark ? "var(--text-dim)" : "var(--accent)"}
          style={{ transition: "fill 0.3s ease" }}
        />
        {/* Wiggling Cord Group */}
        <g className="cord-wiggle-group">
          {/* Cord */}
          <path
            ref={cordRef}
            d="M22 13 L22 52 Q22 58 22 62"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Pull knob */}
          <circle
            ref={knobRef}
            cx="22"
            cy="66"
            r="4.5"
            fill="var(--accent)"
            stroke="var(--accent)"
            strokeWidth="1"
          />
        </g>
        {/* Small text indicator */}
        <text
          x="22"
          y="84"
          textAnchor="middle"
          fill="var(--text-dim)"
          fontSize="7.5"
          fontFamily="var(--font-body)"
          letterSpacing="0.1em"
        >
          {isDark ? "DARK" : "LIGHT"}
        </text>
      </svg>
      <style>{`
        .cord-wiggle-group {
          transform-origin: 22px 13px;
          animation: cordWiggle 3.2s ease-in-out infinite alternate;
        }
        @keyframes cordWiggle {
          0% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
          100% { transform: rotate(-2deg); }
        }
      `}</style>
    </button>
  );
}

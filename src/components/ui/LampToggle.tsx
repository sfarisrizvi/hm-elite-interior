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
        width: 40,
        height: 72,
        position: "relative",
      }}
    >
      <svg width="40" height="68" viewBox="0 0 40 68" fill="none">
        {/* Bulb glow */}
        <circle
          ref={glowRef}
          cx="20"
          cy="8"
          r={isDark ? 6 : 10}
          fill="var(--accent)"
          opacity={isDark ? 0.3 : 0.8}
          style={{ filter: "blur(4px)" }}
        />
        {/* Bulb body */}
        <circle
          cx="20"
          cy="8"
          r="5"
          fill={isDark ? "var(--text-dim)" : "var(--accent)"}
          style={{ transition: "fill 0.3s ease" }}
        />
        {/* Cord */}
        <path
          ref={cordRef}
          d="M20 0 L20 28 Q20 34 20 38"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          style={{ transformOrigin: "20px 13px" }}
        />
        {/* Pull knob */}
        <circle
          ref={knobRef}
          cx="20"
          cy="42"
          r="4"
          fill="var(--accent)"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        {/* Small text indicator */}
        <text
          x="20"
          y="60"
          textAnchor="middle"
          fill="var(--text-dim)"
          fontSize="7"
          fontFamily="var(--font-body)"
          letterSpacing="0.1em"
        >
          {isDark ? "DARK" : "LIGHT"}
        </text>
      </svg>
    </button>
  );
}

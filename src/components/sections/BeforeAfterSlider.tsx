"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BeforeAfterSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Hint animation on scroll into view
      gsap.fromTo(
        { pos: 50 },
        { pos: 50 },
        {
          pos: 35,
          duration: 0.8,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
          onUpdate: function () {
            setPosition(this.targets()[0].pos);
          },
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(percent);
  };

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section
      ref={sectionRef}
      id="before-after"
      className="section"
      style={{ background: "var(--surface)" }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>
            The Transformation
          </div>
          <h2>
            Before & <span style={{ color: "var(--accent)" }}>After</span>
          </h2>
          <p
            style={{
              margin: "16px auto 0",
              maxWidth: 500,
              fontSize: 16,
            }}
          >
            Drag the slider to reveal the transformation — see how raw spaces
            become extraordinary interiors.
          </p>
        </div>

        {/* Slider container */}
        <div
          ref={sliderRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1000,
            margin: "0 auto",
            aspectRatio: "16/10",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            cursor: "col-resize",
            border: "1px solid var(--border-subtle)",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          {/* "Before" image (full width behind) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
            }}
          >
            <Image
              src="/before.png"
              alt="Space before HM Elite renovation"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 1000px"
              draggable={false}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                padding: "8px 16px",
                background: "rgba(0,0,0,0.7)",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Before
            </div>
          </div>

          {/* "After" image (clipped) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(0 ${100 - position}% 0 0)`,
            }}
          >
            <Image
              src="/after.jpg"
              alt="Space after HM Elite renovation"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 1000px"
              draggable={false}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: 24,
                padding: "8px 16px",
                background: "var(--accent)",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              After
            </div>
          </div>

          {/* Handle */}
          <div
            ref={handleRef}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${position}%`,
              transform: "translateX(-50%)",
              width: 3,
              background: "#FFFFFF",
              zIndex: 3,
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* Drag circle */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(196, 139, 105, 0.4)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 6L4 12L8 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 6L20 12L16 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

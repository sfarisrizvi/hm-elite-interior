"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_FRAMES = 281;
const MOBILE_FRAMES = 189;

function getFrameUrl(index: number, isMobile: boolean) {
  const paddedIndex = String(index).padStart(3, "0");
  if (isMobile) {
    return `/Mobile-image-sequence/mobile-image-sequence _${paddedIndex}.webp`;
  }
  return `/image-sequence-2/Comp 2_${paddedIndex}.webp`;
}

export function FrameSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;

  // Preload frames for active device sequence
  useEffect(() => {
    const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);
    imagesRef.current = images;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i, isMobile);
      img.onload = () => {
        images[i] = img;
      };
    }
  }, [isMobile, totalFrames]);

  // Canvas drawing & ScrollTrigger pinning setup
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    function renderFrame(index: number) {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const img = imagesRef.current[index];

      ctx.clearRect(0, 0, w, h);

      // Background fill
      ctx.fillStyle = "var(--surface)";
      ctx.fillRect(0, 0, w, h);

      if (img && img.complete) {
        // Draw image scaled to cover canvas (aspect fill)
        const scale = Math.max(w / img.width, h / img.height);
        const x = (w - img.width * scale) / 2;
        const y = (h - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    const gCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(self.progress * (totalFrames - 1)))
          );
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            renderFrame(frameIndex);
          }
        },
      });
    }, sectionRef);

    return () => {
      gCtx.revert();
      window.removeEventListener("resize", resize);
    };
  }, [totalFrames]);

  return (
    <section
      ref={sectionRef}
      id="frame-sequence-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Subtle top & bottom theme fade mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, var(--surface) 0%, transparent 12%, transparent 88%, var(--surface) 100%)",
          zIndex: 2,
        }}
      />

      {/* Floating subtle section kicker overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            background: "var(--overlay)",
            padding: "8px 20px",
            borderRadius: 20,
            backdropFilter: "blur(10px)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          Craftsmanship in Motion
        </div>
      </div>
    </section>
  );
}

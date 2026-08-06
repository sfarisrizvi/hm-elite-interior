"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { name: "Space", image: "/images/living-room/main.jpg" },
  { name: "Kitchen", image: "/images/kitchen/main.jpg" },
  { name: "Bedroom", image: "/images/bedroom/main.jpg" },
  { name: "Media Wall", image: "/images/living-room/living-1.jpg" },
  { name: "Decor Wall", image: "/images/living-room/living-3.jpg" },
  { name: "Walk In Wardrobe", image: "/images/bedroom/bedroom-5.jpg" },
  { name: "Home Office", image: "/images/office-study/main.jpg" },
  { name: "Loft Wardrobe", image: "/images/bedroom/bedroom-6.jpg" },
  { name: "Understairs", image: "/images/understairs/main.jpg" },
];

export function HeroMorph() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const spaceWordRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [serviceIndex, setServiceIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const prevIndexRef = useRef(0);
  const blendRef = useRef({ factor: 1 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const redrawRef = useRef<(() => void) | null>(null);

  // Preload all background images on mount
  useEffect(() => {
    imagesRef.current = servicesList.map((item) => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => {
        if (redrawRef.current) redrawRef.current();
      };
      return img;
    });
  }, []);

  // Sync image crossfade when serviceIndex changes
  useEffect(() => {
    prevIndexRef.current = activeIndexRef.current;
    activeIndexRef.current = serviceIndex;
    blendRef.current.factor = 0;

    gsap.to(blendRef.current, {
      factor: 1,
      duration: 0.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (redrawRef.current) redrawRef.current();
      },
    });
  }, [serviceIndex]);

  // Heading text cycle interval
  useEffect(() => {
    const interval = setInterval(() => {
      const el = spaceWordRef.current;
      if (!el) return;

      gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setServiceIndex((prev) => (prev + 1) % servicesList.length);
          gsap.set(el, { y: 20, opacity: 0 });
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        },
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Canvas drawing setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame();
    };
    window.addEventListener("resize", resize);

    function drawFrame() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Background fill
      ctx.fillStyle = "#0B0B0B";
      ctx.fillRect(0, 0, w, h);

      const factor = blendRef.current.factor;
      const currImg = imagesRef.current[activeIndexRef.current];
      const prevImg = imagesRef.current[prevIndexRef.current];

      const drawScaled = (image: HTMLImageElement, alpha: number) => {
        if (!image || !image.complete) return;
        ctx.globalAlpha = alpha;
        const scale = Math.max(w / image.width, h / image.height);
        const x = (w - image.width * scale) / 2;
        const y = (h - image.height * scale) / 2;
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
      };

      if (factor < 1 && prevImg && prevIndexRef.current !== activeIndexRef.current) {
        drawScaled(prevImg, 1 - factor);
      }
      if (currImg) {
        drawScaled(currImg, factor);
      }

      ctx.globalAlpha = 1;
    }

    redrawRef.current = drawFrame;
    resize();

    const gCtx = gsap.context(() => {
      // Headline entrance animation
      const entranceTl = gsap.timeline({ delay: 0.5 });

      entranceTl
        .fromTo(
          headlineRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => {
      gCtx.revert();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      {/* Background Rotating Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Theme Responsive Overlay (Black in dark mode, subtle White in light mode) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--hero-overlay)",
          backdropFilter: "blur(2px)",
          transition: "background var(--theme-transition)",
          zIndex: 1,
        }}
      />

      {/* Hero Content Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 var(--container-padding)",
          zIndex: 2,
        }}
      >
        <div ref={headlineRef} style={{ opacity: 0 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 28 }}>
            Bespoke Interior Solutions
          </div>
          <h1
            style={{
              color: "var(--text-high)",
              maxWidth: 1300,
              width: "100%",
              padding: "0 clamp(20px, 4vw, 64px)",
              textShadow: "0 2px 30px rgba(0,0,0,0.15)",
              fontSize: "clamp(30px, 4.5vw, 68px)",
              lineHeight: 1.3,
              margin: "0 auto",
            }}
          >
            Design Your{" "}
            <span
              ref={spaceWordRef}
              style={{
                color: "var(--accent)",
                display: "inline-block",
                position: "relative",
                padding: "0 6px",
                lineHeight: 1.1,
              }}
            >
              {servicesList[serviceIndex].name}
            </span>
            ,<br />
            Elevate Your Lifestyle.
          </h1>
        </div>

        <div
          ref={subRef}
          style={{
            opacity: 0,
            marginTop: 28,
            maxWidth: 560,
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.7,
              margin: "0 auto",
            }}
          >
            Premium fitted kitchens, bedrooms, and bespoke interiors —
            crafted to perfection in the United Kingdom.
          </p>
        </div>

        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            marginTop: 44,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a href="/services" className="btn-primary">
            Explore Our Work
          </a>
          <a
            href="/contact"
            className="btn-outline"
          >
            Book Consultation
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
          opacity: 0,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Scroll to explore
        </span>
        <ArrowDown
          size={16}
          style={{
            color: "var(--accent)",
            animation: "bounceDown 2s ease infinite",
          }}
        />
        <style>{`
          @keyframes bounceDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
        `}</style>
      </div>
    </section>
  );
}

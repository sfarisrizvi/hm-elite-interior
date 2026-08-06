"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    number: "01",
    name: "SPACE",
    subtitle: "Interior Design & Architecture",
    description:
      "Creating spaces that inspire living as it is. Crafted with care and luxury design for discerning UK homeowners.",
    image: "/images/living-room/main.jpg",
  },
  {
    number: "02",
    name: "KITCHEN",
    subtitle: "Bespoke Fitted Kitchens",
    description:
      "Precision-crafted fitted kitchens featuring premium materials, intelligent storage, and seamless finishes.",
    image: "/images/kitchen/main.jpg",
  },
  {
    number: "03",
    name: "BEDROOM",
    subtitle: "Fitted Wardrobes & Suites",
    description:
      "Serene sanctuary designs with made-to-measure soft-close wardrobes and integrated ambient lighting.",
    image: "/images/bedroom/main.jpg",
  },
  {
    number: "04",
    name: "MEDIA WALL",
    subtitle: "Custom Entertainment Spaces",
    description:
      "Architectural focal features integrating modern acoustic panelling, LED backlighting, and hidden wiring.",
    image: "/images/living-room/living-2.jpg",
  },
  {
    number: "05",
    name: "HOME OFFICE",
    subtitle: "Study & Workspaces",
    description:
      "Ergonomic, elegant fitted study furniture tailored to your exact dimensions and professional style.",
    image: "/images/office-study/main.jpg",
  },
  {
    number: "06",
    name: "UNDERSTAIRS",
    subtitle: "Smart Storage Solutions",
    description:
      "Transform unused architectural nooks into beautiful pull-out storage solutions and wine displays.",
    image: "/images/understairs/main.jpg",
  },
];

export function HeroMorph() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const [serviceIndex, setServiceIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  const currentService = servicesList[serviceIndex];

  const animateTextChange = (newIndex: number) => {
    const wordEl = wordRef.current;
    const numEl = numberRef.current;

    if (wordEl) {
      gsap.to(wordEl, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setServiceIndex(newIndex);
          gsap.set(wordEl, { y: 30, opacity: 0 });
          gsap.to(wordEl, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    } else {
      setServiceIndex(newIndex);
    }

    if (numEl) {
      gsap.to(numEl, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.to(numEl, {
            scale: 1,
            opacity: 0.06,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    }
  };

  const nextService = () => {
    const nextIdx = (serviceIndex + 1) % servicesList.length;
    animateTextChange(nextIdx);
  };

  const prevService = () => {
    const prevIdx = (serviceIndex - 1 + servicesList.length) % servicesList.length;
    animateTextChange(prevIdx);
  };

  // Auto-play interval for cycling services
  useEffect(() => {
    if (isManual) return;

    const interval = setInterval(() => {
      const nextIdx = (serviceIndex + 1) % servicesList.length;
      animateTextChange(nextIdx);
    }, 4500);

    return () => clearInterval(interval);
  }, [serviceIndex, isManual]);

  const selectService = (idx: number) => {
    setIsManual(true);
    animateTextChange(idx);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "var(--surface)",
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* 2-Column Split Screen Container */}
      <div
        className="hero-split-grid"
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "clamp(440px, 48%, 680px) 1fr",
          minHeight: "100vh",
        }}
      >
        {/* LEFT COLUMN: Editorial Text Panel with Spotlight Glow & Giant Watermark */}
        <div
          style={{
            position: "relative",
            background: "var(--surface)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(120px, 12vh, 160px) clamp(24px, 4vw, 64px) clamp(40px, 6vh, 60px)",
            zIndex: 3,
            overflow: "hidden",
            borderRight: "1px solid var(--border-subtle)",
          }}
        >
          {/* Ambient Warm Spotlight Radial Glow */}
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, var(--accent-glow) 0%, rgba(196, 139, 105, 0.08) 45%, transparent 75%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Giant Watermark Index Number behind text */}
          <div
            ref={numberRef}
            style={{
              position: "absolute",
              top: "14%",
              left: "-10px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(160px, 22vw, 320px)",
              fontWeight: 800,
              color: "var(--text-high)",
              opacity: 0.06,
              lineHeight: 0.8,
              pointerEvents: "none",
              zIndex: 0,
              userSelect: "none",
            }}
          >
            {currentService.number}
          </div>

          {/* Foreground Editorial Text Content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 20,
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: "var(--accent)",
                }}
              />
              {currentService.subtitle}
            </div>

            <div ref={headlineRef}>
              <h1
                style={{
                  fontSize: "clamp(36px, 4.5vw, 68px)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "var(--text-high)",
                  marginBottom: 24,
                  letterSpacing: "-0.02em",
                }}
              >
                Design Your
                <br />
                <span
                  ref={wordRef}
                  style={{
                    color: "var(--accent)",
                    display: "inline-block",
                    marginTop: 4,
                  }}
                >
                  {currentService.name}
                </span>
              </h1>
            </div>

            <div ref={descRef}>
              <p
                style={{
                  fontSize: "clamp(14px, 1.2vw, 17px)",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  maxWidth: 480,
                  marginBottom: 36,
                }}
              >
                {currentService.description}
              </p>
            </div>

            {/* CTA Button */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <a href="/contact" className="btn-primary">
                Book Consultation
                <ArrowRight size={16} />
              </a>
              <a href="/services" className="btn-outline">
                Explore All
              </a>
            </div>
          </div>

          {/* Slide Dots / Counter Pagination */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {servicesList.map((item, idx) => (
                <button
                  key={item.name}
                  onClick={() => selectService(idx)}
                  aria-label={`Go to ${item.name}`}
                  style={{
                    width: idx === serviceIndex ? 32 : 10,
                    height: 8,
                    borderRadius: 4,
                    background: idx === serviceIndex ? "var(--accent)" : "var(--border-subtle)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                {currentService.number}
              </span>
              <span style={{ opacity: 0.4, margin: "0 4px" }}>/</span>
              <span>0{servicesList.length}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Rotating Photography Showcase Frame with Parallax Imagery */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            overflow: "hidden",
            background: "#080808",
          }}
        >
          {/* Rotating Image Crossfade Layers */}
          {servicesList.map((item, idx) => {
            const isActive = idx === serviceIndex;
            return (
              <div
                key={item.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(1.06)",
                  transition:
                    "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: isActive ? 1 : 0,
                }}
              >
                <Image
                  src={item.image}
                  alt={`${item.name} by HM Elite Interiors`}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={idx === 0}
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
                {/* Subtle Theme Vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(11,11,11,0.4) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
              </div>
            );
          })}

          {/* Interactive Prev / Next Chevron Navigation Over Image Frame */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 40,
              zIndex: 10,
              display: "flex",
              gap: 12,
            }}
          >
            <button
              onClick={() => {
                setIsManual(true);
                prevService();
              }}
              aria-label="Previous slide"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(11, 11, 11, 0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => {
                setIsManual(true);
                nextService();
              }}
              aria-label="Next slide"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "var(--accent)",
                border: "none",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 8px 30px var(--accent-glow)",
                transition: "all 0.3s ease",
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

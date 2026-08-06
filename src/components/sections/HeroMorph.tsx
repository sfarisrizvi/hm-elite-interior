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
        {/* LEFT COLUMN: Editorial Text Panel with Spotlight Glow & Bottom Heading */}
        <div
          style={{
            position: "relative",
            background: "var(--surface)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "130px clamp(24px, 4vw, 56px) clamp(36px, 5vh, 64px)",
            zIndex: 3,
            overflow: "hidden",
            borderRight: "1px solid var(--border-subtle)",
          }}
        >
          {/* Ambient Warm Spotlight Radial Glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
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
              top: "16%",
              left: "-10px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(180px, 26vw, 360px)",
              fontWeight: 800,
              color: "var(--text-high)",
              opacity: 0.05,
              lineHeight: 0.8,
              pointerEvents: "none",
              zIndex: 0,
              userSelect: "none",
            }}
          >
            {currentService.number}
          </div>

          {/* Foreground Editorial Text Content - Positioned at Bottom of VH */}
          <div style={{ position: "relative", zIndex: 2, marginTop: "auto" }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 16,
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
                  fontSize: "clamp(34px, 4vw, 62px)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "var(--text-high)",
                  marginBottom: 20,
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
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  maxWidth: 460,
                  marginBottom: 32,
                }}
              >
                {currentService.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <a href="/contact" className="btn-primary">
                Book Consultation
                <ArrowRight size={16} />
              </a>
              <a href="/services" className="btn-outline">
                Explore Work
              </a>
            </div>
          </div>

          {/* Slide Dots / Counter Pagination */}
          <div
            style={{
              paddingTop: 32,
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

        {/* RIGHT COLUMN: Rotating High Quality Photography Showcase with Continuous Zoom Effect */}
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
          {/* Rotating Image Layers with Continuous Subtle Zoom-in */}
          {servicesList.map((item, idx) => {
            const isActive = idx === serviceIndex;
            return (
              <div
                key={item.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1.08)" : "scale(1.0)",
                  transition:
                    "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 5s ease-out",
                  zIndex: isActive ? 1 : 0,
                }}
              >
                <Image
                  src={item.image}
                  alt={`${item.name} by HM Elite Interiors`}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={idx === 0}
                  unoptimized={true}
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
                {/* Subtle Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(11,11,11,0.35) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)",
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

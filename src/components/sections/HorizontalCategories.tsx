"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Kitchens",
    subtitle: "Bespoke Fitted",
    description:
      "The right colour palette and thoughtful spacing between furniture pieces can completely transform your space.",
    image: "/images/kitchen/main.jpg",
    slug: "kitchen",
    features: ["Made in UK", "Huge Range of Colours", "High Quality Materials"],
  },
  {
    title: "Bedrooms",
    subtitle: "Fitted & Freestanding",
    description:
      "Innovative storage solutions with a huge range of colors to choose from. All inclusive prices.",
    image: "/images/bedroom/main.jpg",
    slug: "bedroom",
    features: ["7 Years Guarantee", "Made to Measure", "Soft Close Doors"],
  },
  {
    title: "Media Walls",
    subtitle: "Entertainment Spaces",
    description:
      "Make sure your furniture not only fits but also reflects your professional personality or your brand's identity.",
    image: "/images/living-room/main.jpg",
    slug: "media-wall",
    features: ["Custom Design", "LED Integration", "Premium Finish"],
  },
  {
    title: "Home Offices",
    subtitle: "Study & Workspaces",
    description:
      "Thoughtfully designed workspaces that boost productivity while maintaining elegant aesthetics.",
    image: "/images/office-study/main.jpg",
    slug: "study-offices",
    features: ["Ergonomic Design", "Cable Management", "Built-in Storage"],
  },
  {
    title: "Understairs",
    subtitle: "Storage Solutions",
    description:
      "Maximise every corner of your home with bespoke understairs storage crafted to your exact dimensions.",
    image: "/images/understairs/main.jpg",
    slug: "understairs",
    features: ["Space Maximising", "Custom Fit", "Hidden Storage"],
  },
];

export function HorizontalCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Check if device is desktop vs touch mobile
    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Calculate the total scrollable distance for desktop scrub
        const totalWidth = track.scrollWidth - window.innerWidth;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          snap: 1 / (categories.length - 1),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(track, { x: -totalWidth * self.progress });
          },
        });
      }

      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="horizontal-scroll-section"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--surface-elevated)",
      }}
    >
      {/* Section heading */}
      <div
        ref={headingRef}
        style={{
          position: "absolute",
          top: 36,
          left: 0,
          zIndex: 5,
          padding: "0 var(--container-padding)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          What We Do
        </div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", marginBottom: 16 }}>
          Our <span style={{ color: "var(--accent)" }}>Specialities</span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="specialities-track"
        style={{
          display: "flex",
          height: "100%",
          paddingTop: 130,
          paddingBottom: 40,
          paddingLeft: "var(--container-padding)",
          paddingRight: "var(--container-padding)",
          gap: 24,
          alignItems: "center",
          willChange: "transform",
        }}
      >
        {categories.map((cat, i) => (
          <div
            key={cat.slug}
            className="category-card-wrapper"
            style={{
              flex: "0 0 auto",
              width: "clamp(300px, 75vw, min(520px, calc(100vh - 220px)))",
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "stretch",
              scrollSnapAlign: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                position: "relative",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {/* Background image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                }}
              >
                <Image
                  src={cat.image}
                  alt={`${cat.title} by HM Elite Interiors`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 85vw, 520px"
                  priority={i === 0}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)",
                  }}
                />
              </div>

              {/* Card number */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  fontFamily: "var(--font-display)",
                  fontSize: 64,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.08)",
                  lineHeight: 1,
                }}
              >
                0{i + 1}
              </div>

              {/* Content */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  padding: "clamp(24px, 3.5vw, 40px)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 6,
                  }}
                >
                  {cat.subtitle}
                </div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "clamp(26px, 3.5vw, 40px)",
                    marginBottom: 12,
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 14,
                    maxWidth: 420,
                    marginBottom: 20,
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {cat.description}
                </p>

                {/* Feature tags */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 24,
                  }}
                >
                  {cat.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        fontSize: 11,
                        color: "rgba(255,255,255,0.85)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={`/services/${cat.slug}`}
                  className="btn-primary"
                  style={{ width: "fit-content", padding: "12px 24px", fontSize: 13 }}
                >
                  View {cat.title}
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .horizontal-scroll-section {
            height: auto !important;
            padding: 40px 0 60px !important;
            overflow: visible !important;
          }
          .specialities-track {
            padding-top: 100px !important;
            padding-bottom: 20px !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            touch-action: pan-x !important;
            scrollbar-width: none;
          }
          .specialities-track::-webkit-scrollbar {
            display: none;
          }
          .category-card-wrapper {
            width: 82vw !important;
            aspect-ratio: 1 / 1 !important;
            scroll-snap-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}

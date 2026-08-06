"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handlePointerLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="categories"
      className="section"
      style={{
        position: "relative",
        background: "var(--surface-elevated)",
        paddingTop: "clamp(60px, 8vw, 120px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ marginBottom: 40 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <RevealOnScroll>
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                What We Do
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}>
                Our <span style={{ color: "var(--accent)" }}>Specialities</span>
              </h2>
            </RevealOnScroll>
          </div>

          {/* Navigation Arrow Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                color: canScrollLeft ? "var(--text-high)" : "var(--text-dim)",
                opacity: canScrollLeft ? 1 : 0.4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: canScrollLeft ? "pointer" : "default",
                transition: "all 0.3s ease",
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                color: canScrollRight ? "var(--text-high)" : "var(--text-dim)",
                opacity: canScrollRight ? 1 : 0.4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: canScrollRight ? "pointer" : "default",
                transition: "all 0.3s ease",
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Draggable Carousel Track */}
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeaveOrUp}
        onPointerUp={handlePointerLeaveOrUp}
        onPointerMove={handlePointerMove}
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          paddingLeft: "var(--container-padding)",
          paddingRight: "var(--container-padding)",
          paddingBottom: 20,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
        className="carousel-track"
      >
        {categories.map((cat, i) => (
          <div
            key={cat.slug}
            style={{
              flex: "0 0 auto",
              width: "clamp(300px, 80vw, 460px)",
              aspectRatio: "1 / 1",
              scrollSnapAlign: "start",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {/* Background Image */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image
                  src={cat.image}
                  alt={`${cat.title} by HM Elite Interiors`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 80vw, 460px"
                  priority={i === 0}
                  draggable={false}
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
                  fontSize: 56,
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
                  padding: "clamp(24px, 3.5vw, 36px)",
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
                    fontSize: "clamp(24px, 3vw, 36px)",
                    marginBottom: 10,
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 14,
                    marginBottom: 16,
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
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
                    marginBottom: 20,
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
                  style={{ width: "fit-content", padding: "10px 22px", fontSize: 13 }}
                  draggable={false}
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
        .carousel-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

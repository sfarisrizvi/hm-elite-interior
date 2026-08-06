"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Modern Kitchen Suite",
    category: "Kitchen",
    image: "/images/kitchen/kitchen-1.jpg",
    span: "col-span-2 row-span-2",
    gridArea: "1 / 1 / 3 / 3",
  },
  {
    title: "Fitted Wardrobe System",
    category: "Bedroom",
    image: "/images/bedroom/bedroom-1.jpg",
    span: "col-span-1 row-span-1",
    gridArea: "1 / 3 / 2 / 4",
  },
  {
    title: "Entertainment Centre",
    category: "Media Wall",
    image: "/images/living-room/living-1.jpg",
    span: "col-span-1 row-span-1",
    gridArea: "2 / 3 / 3 / 4",
  },
  {
    title: "Home Office Design",
    category: "Study",
    image: "/images/office-study/office-1.jpg",
    span: "col-span-1 row-span-1",
    gridArea: "3 / 1 / 4 / 2",
  },
  {
    title: "Luxury Bedroom Suite",
    category: "Bedroom",
    image: "/images/bedroom/bedroom-2.jpg",
    span: "col-span-2 row-span-1",
    gridArea: "3 / 2 / 4 / 4",
  },
  {
    title: "Bespoke Kitchen Island",
    category: "Kitchen",
    image: "/images/kitchen/kitchen-3.jpg",
    span: "col-span-1 row-span-1",
    gridArea: "4 / 1 / 5 / 2",
  },
  {
    title: "Under Stairs Storage",
    category: "Understairs",
    image: "/images/understairs/understairs-1.jpg",
    span: "col-span-1 row-span-1",
    gridArea: "4 / 2 / 5 / 3",
  },
  {
    title: "Master Bedroom Walk-in",
    category: "Wardrobe",
    image: "/images/bedroom/bedroom-3.jpg",
    span: "col-span-1 row-span-1",
    gridArea: "4 / 3 / 5 / 4",
  },
];

export function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".bento-card");
    if (!cards) return;

    const ctx = gsap.context(() => {
      // Batch staggered entrance using ScrollTrigger.batch
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            }
          );
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.05,
          });
        },
      });
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      className="section"
      style={{ background: "var(--surface-elevated)" }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 60,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              Selected Work
            </div>
            <h2>
              Our <span style={{ color: "var(--accent)" }}>Portfolio</span>
            </h2>
          </div>
          <a
            href="/services"
            className="btn-outline"
            style={{ flexShrink: 0 }}
          >
            View All Projects
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "clamp(200px, 25vw, 280px)",
            gap: 16,
          }}
          className="bento-grid-container"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="bento-card img-reveal"
              onClick={() => setSelectedProject(project)}
              style={{
                gridArea: project.gridArea,
                position: "relative",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Hover overlay */}
              <div
                className="bento-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "clamp(16px, 2vw, 28px)",
                  opacity: 0,
                  transition: "opacity 0.35s ease",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 6,
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {project.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {selectedProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.9)",
            cursor: "pointer",
          }}
          onClick={() => setSelectedProject(null)}
        >
          <button
            onClick={() => setSelectedProject(null)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <X size={32} />
          </button>
          <div
            style={{
              position: "relative",
              width: "90vw",
              maxWidth: 1200,
              height: "80vh",
              borderRadius: 16,
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="90vw"
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "40px 32px 32px",
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 8,
                  display: "block",
                }}
              >
                {selectedProject.category}
              </span>
              <h3 style={{ color: "#FFFFFF", fontSize: 32 }}>
                {selectedProject.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .bento-card:hover .bento-overlay { opacity: 1 !important; }
        @media (max-width: 768px) {
          .bento-grid-container {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 200px !important;
          }
          .bento-grid-container > * {
            grid-area: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

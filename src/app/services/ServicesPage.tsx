"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const allServices = [
  {
    title: "Kitchen",
    slug: "kitchen",
    image: "/images/kitchen/main.jpg",
    description: "The right colour palette and thoughtful spacing can completely transform your kitchen space.",
    features: ["Made in UK", "Huge Range of Colours", "High Quality Materials", "National Coverage"],
  },
  {
    title: "Bedroom",
    slug: "bedroom",
    image: "/images/bedroom/main.jpg",
    description: "Innovative storage solutions with a huge range of colors. All inclusive prices with 7 years guarantee.",
    features: ["7 Years Guarantee", "Made to Measure", "Innovative Storage", "Great Customer Service"],
  },
  {
    title: "Media Wall",
    slug: "media-wall",
    image: "/images/living-room/main.jpg",
    description: "Make sure your furniture reflects your personality and creates the perfect entertainment space.",
    features: ["Custom Design", "LED Integration", "Premium Finish", "Cable Management"],
  },
  {
    title: "Walk In Wardrobe",
    slug: "walk-in-wardrobe",
    image: "/images/bedroom/bedroom-5.jpg",
    description: "Luxurious walk-in wardrobe solutions designed to maximise space and showcase your collection.",
    features: ["Soft Close Doors", "Internal Lighting", "Made to Measure", "Premium Handles"],
  },
  {
    title: "Study / Offices",
    slug: "study-offices",
    image: "/images/office-study/main.jpg",
    description: "Thoughtfully designed workspaces that boost productivity while maintaining elegant aesthetics.",
    features: ["Ergonomic Design", "Cable Management", "Built-in Storage", "Made in UK"],
  },
  {
    title: "Loft Wardrobe",
    slug: "loft-wardrobe",
    image: "/images/bedroom/bedroom-6.jpg",
    description: "Bespoke loft wardrobes that make the most of awkward spaces and angled ceilings.",
    features: ["Angled Ceiling Fit", "Space Maximising", "Custom Shelving", "Soft Close"],
  },
  {
    title: "Understairs Storage",
    slug: "understairs",
    image: "/images/understairs/main.jpg",
    description: "Transform wasted understairs space into beautifully organised, functional storage.",
    features: ["Space Maximising", "Custom Fit", "Hidden Storage", "Premium Finish"],
  },
  {
    title: "Decor Wall",
    slug: "decor-wall",
    image: "/images/living-room/living-3.jpg",
    description: "Stunning decorative wall features that become the focal point of any room.",
    features: ["Bespoke Design", "Premium Materials", "Feature Lighting", "Modern Aesthetics"],
  },
];

export function ServicesPage() {
  return (
    <div style={{ paddingTop: 120 }}>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <RevealOnScroll>
            <nav style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 40 }}>
              <a href="/" style={{ color: "var(--accent)" }}>Home</a>
              <span style={{ margin: "0 8px" }}>»</span>
              Services
            </nav>
          </RevealOnScroll>

          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <RevealOnScroll>
              <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>
                Our Services
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", marginBottom: 20 }}>
                Bespoke solutions for
                <br />
                <span style={{ color: "var(--accent)" }}>every space</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p style={{ margin: "0 auto", maxWidth: 600, fontSize: 18 }}>
                From fitted kitchens to walk-in wardrobes, we create made-to-measure
                furniture that transforms your home into something extraordinary.
              </p>
            </RevealOnScroll>
          </div>

          {/* Services grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: 24,
            }}
          >
            {allServices.map((service, i) => (
              <RevealOnScroll key={service.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  style={{
                    display: "block",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--surface-elevated)",
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                  }}
                  className="service-card"
                >
                  <div
                    className="img-reveal"
                    style={{
                      position: "relative",
                      aspectRatio: "16/10",
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={`${service.title} by HM Elite Interiors`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
                      }}
                    />
                  </div>
                  <div style={{ padding: "24px 28px 28px" }}>
                    <h3 style={{ fontSize: 24, marginBottom: 10 }}>{service.title}</h3>
                    <p style={{ fontSize: 14, marginBottom: 20 }}>{service.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                      {service.features.map((f) => (
                        <span
                          key={f}
                          style={{
                            padding: "4px 12px",
                            borderRadius: 16,
                            border: "1px solid var(--border-subtle)",
                            fontSize: 11,
                            color: "var(--text-muted)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "var(--accent)",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      View Details <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .service-card:hover {
          transform: translateY(-4px) !important;
          border-color: var(--border) !important;
        }
      `}</style>
    </div>
  );
}

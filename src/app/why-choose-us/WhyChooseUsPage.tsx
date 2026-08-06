"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

const reasons = [
  {
    lottieSrc: "/animated icons/manufacturing.json",
    title: "Manufactured in UK",
    description: "Proudly designed and crafted in the UK, ensuring premium quality and precision in every detail. We support British manufacturing and guarantee consistency across every product.",
    stat: "100%",
    statLabel: "British Made",
    image: "/images/kitchen/kitchen-5.jpg",
  },
  {
    lottieSrc: "/animated icons/certificate.json",
    title: "Guarantee Certificate",
    description: "All HM Elite products come with a guarantee for quality, materials, and workmanship — your peace of mind, guaranteed. We stand behind every piece of furniture we create.",
    stat: "7 Years",
    statLabel: "Full Warranty",
    image: "/images/bedroom/bedroom-7.jpg",
  },
  {
    lottieSrc: "/animated icons/doors.json",
    title: "Soft Close Doors",
    description: "All our fitted furniture features soft close doors and drawers — for a smooth, quiet, and premium experience every time. This standard feature across our entire range ensures longevity and comfort.",
    stat: "100%",
    statLabel: "Soft Close",
    image: "/images/bedroom/bedroom-8.jpg",
  },
  {
    lottieSrc: "/animated icons/fitters.json",
    title: "Own In-House Fitters",
    description: "Our experienced in-house fitters ensure every installation meets the highest standards — no outsourcing, no compromises. From first measurement to final touch, our team handles everything.",
    stat: "Zero",
    statLabel: "Outsourcing",
    image: "/images/kitchen/kitchen-6.jpg",
  },
  {
    lottieSrc: "/animated icons/satisfied.json",
    title: "Customer Satisfaction",
    description: "We work closely with our customers at every stage of the project to be sure that their dream is becoming a reality. Your vision drives our process from start to finish.",
    stat: "5★",
    statLabel: "Average Rating",
    image: "/images/living-room/living-5.jpg",
  },
  {
    lottieSrc: "/animated icons/choices.json",
    title: "200+ Different Choices",
    description: "Customers looking for inspiration can select from an extensive range of different designs, patterns, and colour schemes allowing over 200 different choices to create truly unique spaces.",
    stat: "200+",
    statLabel: "Design Options",
    image: "/images/office-study/office-2.jpg",
  },
];

export function WhyChooseUsPage() {
  return (
    <div style={{ paddingTop: 120 }}>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <RevealOnScroll>
            <nav style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 40 }}>
              <a href="/" style={{ color: "var(--accent)" }}>Home</a>
              <span style={{ margin: "0 8px" }}>»</span>
              Why Choose Us
            </nav>
          </RevealOnScroll>

          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <RevealOnScroll>
              <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>
                Why Choose Us
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", marginBottom: 24 }}>
                Redefining the interior
                <br />
                of <span style={{ color: "var(--accent)" }}>living</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p style={{ margin: "0 auto", maxWidth: 600, fontSize: 18 }}>
                Six compelling reasons why discerning homeowners across the United Kingdom
                trust HM Elite to transform their living spaces.
              </p>
            </RevealOnScroll>
          </div>

          {/* Alternating feature rows */}
          {reasons.map((reason, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div
                key={reason.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(40px, 6vw, 80px)",
                  alignItems: "center",
                  marginBottom: i < reasons.length - 1 ? 80 : 0,
                  direction: isReversed ? "rtl" : "ltr",
                }}
                className="why-row"
              >
                <RevealOnScroll>
                  <div style={{ direction: "ltr" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 14,
                          background: "#141414",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          border: "1px solid rgba(196, 139, 105, 0.35)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                        }}
                      >
                        <AnimatedIcon src={reason.lottieSrc} size={38} />
                      </div>
                    </div>
                    <h3 style={{ marginBottom: 16 }}>{reason.title}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                      {reason.description}
                    </p>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 20px",
                        borderRadius: 24,
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "var(--accent)",
                        }}
                      >
                        {reason.stat}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--text-dim)" }}>
                        {reason.statLabel}
                      </span>
                    </div>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll y={60} delay={0.2}>
                  <div
                    className="img-reveal"
                    style={{
                      direction: "ltr",
                      position: "relative",
                      borderRadius: "var(--radius)",
                      overflow: "hidden",
                      aspectRatio: "4/3",
                    }}
                  >
                    <Image
                      src={reason.image}
                      alt={reason.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </RevealOnScroll>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section
        className="section"
        style={{
          background: `linear-gradient(135deg, var(--accent) 0%, #8A5C3E 100%)`,
          textAlign: "center",
        }}
      >
        <div className="container">
          <RevealOnScroll>
            <h2 style={{ color: "#FFFFFF", marginBottom: 16 }}>
              Ready to experience the difference?
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, maxWidth: 500, margin: "0 auto 32px" }}>
              Book a free consultation and let us show you why HM Elite is the UK&apos;s
              trusted choice for bespoke interiors.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <a
              href="/contact"
              className="btn-primary"
              style={{
                background: "#FFFFFF",
                color: "var(--accent)",
                fontSize: 16,
                padding: "20px 44px",
              }}
            >
              Book Free Consultation
              <ArrowRight size={18} />
            </a>
          </RevealOnScroll>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .why-row { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    lottieSrc: "/animated icons/manufacturing.json",
    title: "Manufactured in UK",
    description:
      "Proudly designed and crafted in the UK, ensuring premium quality and precision in every detail.",
    stat: "100%",
    statLabel: "British Made",
  },
  {
    lottieSrc: "/animated icons/certificate.json",
    title: "Guarantee Certificate",
    description:
      "All HM Elite products come with a guarantee for quality, materials, and workmanship — your peace of mind, guaranteed.",
    stat: "7",
    statLabel: "Years Warranty",
  },
  {
    lottieSrc: "/animated icons/doors.json",
    title: "Soft Close Doors",
    description:
      "All our fitted furniture features soft close doors and drawers — for a smooth, quiet, and premium experience every time.",
    stat: "100%",
    statLabel: "Soft Close",
  },
  {
    lottieSrc: "/animated icons/fitters.json",
    title: "Own In-House Fitters",
    description:
      "Our experienced in-house fitters ensure every installation meets the highest standards — no outsourcing, no compromises.",
    stat: "0",
    statLabel: "Outsourcing",
  },
  {
    lottieSrc: "/animated icons/satisfied.json",
    title: "Customer Satisfaction",
    description:
      "We work closely with our customers at every stage to ensure their dream becomes a reality.",
    stat: "5★",
    statLabel: "Average Rating",
  },
  {
    lottieSrc: "/animated icons/choices.json",
    title: "200+ Different Choices",
    description:
      "Select from an extensive range of designs, patterns, and colour schemes with over 200 different choices.",
    stat: "200+",
    statLabel: "Finishes",
  },
];

export function WhyChooseUsSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = statsRef.current?.querySelectorAll(".why-card");
    if (!cards) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "back.out(1.4)",
              stagger: 0.12,
            }
          );
        },
      });
    }, statsRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="why-choose-us" className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <RevealOnScroll>
            <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>
              Why Choose Us
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2>
              Redefining the interior
              <br />
              of <span style={{ color: "var(--accent)" }}>living</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p style={{ margin: "20px auto 0", maxWidth: 560, fontSize: 16 }}>
              Six reasons why discerning homeowners across the UK trust HM Elite
              to transform their spaces.
            </p>
          </RevealOnScroll>
        </div>

        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="why-card"
              style={{
                padding: "clamp(28px, 3vw, 40px)",
                background: "var(--surface-elevated)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border-subtle)",
                position: "relative",
                overflow: "hidden",
                opacity: 0,
                transition: "border-color 0.3s ease, transform 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Animated Lottie Icon Container */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "#141414",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  border: "1px solid rgba(196, 139, 105, 0.35)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}
              >
                <AnimatedIcon src={feature.lottieSrc} size={38} />
              </div>

              <h4
                style={{
                  marginBottom: 12,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {feature.title}
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                {feature.description}
              </p>

              {/* Stat badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 20,
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}
                >
                  {feature.stat}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-dim)" }}>
                  {feature.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutSection() {
  return (
    <section id="about" className="section" style={{ position: "relative" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left — Editorial statement */}
          <div>
            <RevealOnScroll>
              <div className="eyebrow" style={{ marginBottom: 28 }}>
                Our Philosophy
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 style={{ marginBottom: 32 }}>
                Crafting spaces that
                <br />
                <span style={{ color: "var(--accent)" }}>inspire living</span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p style={{ fontSize: "clamp(16px, 1.5vw, 18px)", marginBottom: 20 }}>
                HM Elite is a trusted name in bespoke interior solutions. We
                specialise in designing and manufacturing high-quality,
                made-to-measure fitted bedrooms, kitchens, loft conversions,
                home offices, study rooms, and more.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <p style={{ fontSize: "clamp(16px, 1.5vw, 18px)", marginBottom: 36 }}>
                With a strong focus on craftsmanship, innovation, and customer
                satisfaction, we transform everyday spaces into elegant,
                functional environments tailored to your lifestyle.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <div style={{ display: "flex", gap: 40 }}>
                {[
                  { number: "200+", label: "Design Choices" },
                  { number: "7", label: "Years Guarantee" },
                  { number: "100%", label: "UK Manufactured" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(28px, 3vw, 40px)",
                        fontWeight: 700,
                        color: "var(--accent)",
                        lineHeight: 1,
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        marginTop: 6,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Right — Image composition */}
          <RevealOnScroll y={80} delay={0.2}>
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: 16,
                height: "clamp(400px, 50vw, 600px)",
              }}
            >
              <div
                className="img-reveal"
                style={{
                  gridRow: "1 / 3",
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src="/images/bedroom/main.jpg"
                  alt="Luxury fitted bedroom by HM Elite Interiors"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div
                className="img-reveal"
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src="/images/kitchen/main.jpg"
                  alt="Bespoke fitted kitchen"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
              </div>
              <div
                className="img-reveal"
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src="/images/office-study/main.jpg"
                  alt="Custom home office design"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
              </div>

              {/* Decorative accent */}
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  zIndex: -1,
                }}
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

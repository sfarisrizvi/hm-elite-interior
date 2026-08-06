"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Shield, Award, Users, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Quality Craftsmanship",
    description: "Every piece of furniture we create is manufactured in the UK with meticulous attention to detail and premium materials.",
  },
  {
    icon: Award,
    title: "Bespoke Design",
    description: "No two spaces are alike. We create made-to-measure solutions that perfectly fit your home and lifestyle.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our experienced in-house designers and fitters work together to deliver seamless results from concept to completion.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "We work closely with our customers at every stage, ensuring their vision becomes reality with no compromises.",
  },
];

export function AboutPage() {
  return (
    <div style={{ paddingTop: 120 }}>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <RevealOnScroll>
            <nav style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 40 }}>
              <a href="/" style={{ color: "var(--accent)" }}>Home</a>
              <span style={{ margin: "0 8px" }}>»</span>
              About
            </nav>
          </RevealOnScroll>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 6vw, 100px)",
              alignItems: "center",
            }}
            className="about-hero-grid"
          >
            <div>
              <RevealOnScroll>
                <div className="eyebrow" style={{ marginBottom: 24 }}>About HM Elite</div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h1 style={{ marginBottom: 28, fontSize: "clamp(40px, 6vw, 72px)" }}>
                  Design your space &<br />
                  <span style={{ color: "var(--accent)" }}>elevate</span> your life
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p style={{ fontSize: 18, marginBottom: 20, lineHeight: 1.8 }}>
                  HM Elite is a trusted name in bespoke interior solutions. We specialise
                  in designing and manufacturing high-quality, made-to-measure fitted
                  bedrooms, kitchens, loft conversions, home offices, study rooms, and more.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <p style={{ fontSize: 18, lineHeight: 1.8 }}>
                  With a strong focus on craftsmanship, innovation, and customer satisfaction,
                  HM Elite transforms everyday spaces into elegant, functional environments
                  tailored to your lifestyle. Whether you&apos;re renovating your home or creating
                  a brand-new look, our team is here to bring your vision to life with
                  precision and style.
                </p>
              </RevealOnScroll>
            </div>

            <RevealOnScroll y={80} delay={0.2}>
              <div
                className="img-reveal"
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  aspectRatio: "4/5",
                }}
              >
                <Image
                  src="/images/kitchen/kitchen-4.jpg"
                  alt="HM Elite kitchen craftsmanship"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: "var(--surface-elevated)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <RevealOnScroll>
              <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>
                Our Values
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2>What drives <span style={{ color: "var(--accent)" }}>everything</span> we do</h2>
            </RevealOnScroll>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <RevealOnScroll key={value.title} delay={i * 0.1}>
                  <div
                    style={{
                      padding: 32,
                      background: "var(--surface)",
                      borderRadius: 16,
                      border: "1px solid var(--border-subtle)",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Icon size={24} color="#FFFFFF" />
                    </div>
                    <h4 style={{ marginBottom: 12 }}>{value.title}</h4>
                    <p style={{ fontSize: 14 }}>{value.description}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--accent) 0%, #8A5C3E 100%)`,
          padding: "60px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 40,
              textAlign: "center",
            }}
          >
            {[
              { stat: "200+", label: "Design Options" },
              { stat: "7 Years", label: "Guarantee" },
              { stat: "100%", label: "UK Manufactured" },
              { stat: "5★", label: "Customer Rating" },
            ].map((item) => (
              <RevealOnScroll key={item.label}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(36px, 4vw, 56px)",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {item.stat}
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>
                    {item.label}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
